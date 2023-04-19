import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import type { RpcRequest, RpcResponse } from 'rpc-chan';

import { createRpcChannel } from 'rpc-chan';
import { filter } from 'rxjs';

export interface IframeChildOptions {
    logging?: boolean;
    methods?: Record<string, any>;
    parentUrlRegExp?: RegExp;
    /**
     * Parameters that allow to manipulate when child is considered fully rendered.
     */
    stability?: {
        counter?: number;
        interval?: number;
    };
}

@Injectable({
    providedIn: `root`,
})
export class IframeChildService {
    options?: IframeChildOptions;
    rpc!: ReturnType<typeof createRpcChannel>;

    router = inject(Router);

    configure(options?: IframeChildOptions) {
        this.rpc = createRpcChannel({
            methods: {
                ...options?.methods,
                ngxIframe: {
                    propagateEmptyClick: () => {
                        document.body.click();
                    },
                    navigate: async (url: string) => {
                        if (this.router.url === url) {
                            return;
                        }

                        return this.router.navigate([url], { queryParams: { ngxIframe: true } });
                    },
                },
            },
            sendRequest: (request) => {
                if (options?.logging) {
                    const toLog = [`[child] -> [parent] "${request.method}"`, request.params].filter(Boolean);
                    console.log(...toLog);
                }

                window.parent.postMessage(request, `*`);
            },
            sendResponse: (response) => {
                window.parent.postMessage(response, `*`);
            },
        });

        this.options = options;
        this.listenParent();

        return this;
    }

    async ready() {
        this.setupRoutingSync();
        this.setupEmptyClicksPropagation();
        this.setupHeightSync();
        return this.rpc.sendRequest({
            method: `ngxIframe.ready`,
        });
    }

    private setupEmptyClicksPropagation() {
        document.onclick = () => {
            void this.rpc.sendRequest({
                method: `ngxIframe.propagateEmptyClick`,
            });
        };
    }

    private async syncHeight(height: number) {
        return this.rpc.sendRequest({
            method: `ngxIframe.setIframeStyle`,
            params: [
                {
                    height: `${height}px`,
                },
            ],
        });
    }

    private setupHeightSync() {
        let lastSentScrollHeight = 0;

        // Initially check for window height and consider it stable when it doesn't change X times.
        const baseStabilityCounter = this.options?.stability?.counter ?? 5;
        let stabilityCounter = baseStabilityCounter;
        const interval = setInterval(() => {
            if (lastSentScrollHeight === window.document.body.scrollHeight) {
                --stabilityCounter;
            } else {
                // Reset counter on height changes.
                stabilityCounter = baseStabilityCounter;
                lastSentScrollHeight = window.document.body.scrollHeight;
                return;
            }

            // When X consecutive intervals do not change height, assume it's stable.
            if (lastSentScrollHeight > 0 && stabilityCounter === 0) {
                void this.syncHeight(lastSentScrollHeight);
                clearInterval(interval);
            }
        }, this.options?.stability?.interval ?? 10);

        // Listen for body changes.
        let resizeTimeout: any;
        const resizeObserver = new ResizeObserver(() => {
            // Prevent sending double events.
            if (lastSentScrollHeight === window.document.body.scrollHeight) {
                return;
            }

            lastSentScrollHeight = window.document.body.scrollHeight;
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                void this.syncHeight(lastSentScrollHeight);
            }, 100);
        });

        resizeObserver.observe(window.document.body);
    }

    private setupRoutingSync() {
        // No need to unsubscribe, because it's endless listener.
        this.router.events
            .pipe(
                filter((event): event is NavigationEnd => {
                    return event instanceof NavigationEnd;
                }),
            )
            .subscribe((event) => {
                // Do not propagate to parent route changes that parent itself directed.
                const [, searchParamsString] = event.urlAfterRedirects.split(`?`);

                if (searchParamsString) {
                    const searchParams = new URLSearchParams(searchParamsString);
                    if (searchParams.has(`ngxIframe`)) {
                        return;
                    }
                }

                // Sync parent route.
                void this.setParentRoute(event.urlAfterRedirects);
            });
    }

    private readonly onParentMessage = async (event: MessageEvent) => {
        // Ignore messages with non-rpc format.
        if (!(typeof event.data === `object`) || !(`id` in event.data)) {
            return;
        }

        // Optional security measure.
        if (this.options?.parentUrlRegExp && !this.options.parentUrlRegExp.test(event.origin)) {
            return;
        }

        const { data } = event as { data: RpcRequest | RpcResponse };

        if (`method` in data) {
            await this.rpc.handleRequest(data);
            return;
        }

        this.rpc.handleResponse(data);
    };

    private listenParent() {
        window.removeEventListener(`message`, this.onParentMessage);
        window.addEventListener(`message`, this.onParentMessage);
    }

    private async setParentRoute(url: string) {
        await this.rpc.sendRequest({
            method: `ngxIframe.navigate`,
            params: [url],
        });
    }
}
