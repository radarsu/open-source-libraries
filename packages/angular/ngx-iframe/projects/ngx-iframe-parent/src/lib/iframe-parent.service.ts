import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import type { RpcRequest, RpcResponse } from 'rpc-chan';
import { filter, skip } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { createRpcChannel } from 'rpc-chan';

export interface IframeParentOptions {
    children?: Record<string, string>;
    methods?: Record<string, any>;
    logging?: boolean;
}

@Injectable({
    providedIn: `root`,
})
export class IframeParentService {
    iframe?: HTMLIFrameElement;

    /**
     * `unloaded` - when iframe doesn't exist in the DOM.
     *
     * `registered` - when iframe exists in the DOM but hasn't yet loaded.
     *
     * `loaded`- when iframe has loaded content.
     *
     * `ready` - when application embed in an iframe informed parent about readiness.
     */
    status$ = new BehaviorSubject<`loaded` | `ready` | `registered` | `unloaded`>(`unloaded`);
    rpc!: ReturnType<typeof createRpcChannel>;
    router = inject(Router);

    private children!: Required<IframeParentOptions>['children'];

    configure(options: IframeParentOptions) {
        this.children = options.children ?? {};
        this.rpc = createRpcChannel({
            methods: {
                ...options.methods,
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
                    ready: () => {
                        this.status$.next(`ready`);
                    },
                    setIframeStyle: (changesMap: Record<string, string>) => {
                        if (!this.iframe?.src) {
                            return;
                        }

                        const changesList = Object.entries(changesMap);
                        for (const [name, value] of changesList) {
                            if (name in this.iframe.style) {
                                (this.iframe.style as any)[name] = value;
                            }
                        }
                    },
                },
            },
            sendRequest: (request: any) => {
                // Ignore when trying to send request to child, but iframe is not loaded.
                if (!this.iframe?.src) {
                    return;
                }

                if (options.logging) {
                    const toLog = [`[parent] -> [child] "${request.method}"`, request.params].filter(Boolean);
                    console.log(...toLog);
                }

                this.iframe.contentWindow?.postMessage(request, this.iframe.src);
            },
            sendResponse: (response: any) => {
                // Ignore when trying to send request to child, but iframe is not loaded.
                if (!this.iframe?.src) {
                    return;
                }

                this.iframe.contentWindow?.postMessage(response, this.iframe.src);
            },
        });

        this.listenChild();
        this.listenIframeStatus();
        this.setupRoutingSync();
        return this;
    }

    registerIframe(iframe: HTMLIFrameElement) {
        this.iframe = iframe;
        this.status$.next(`registered`);
    }

    private readonly onChildMessage = async (event: MessageEvent) => {
        // Ignore messages with non-rpc format.
        if (!(typeof event.data === `object`) || !(`id` in event.data)) {
            return;
        }

        // Ignore events that do not originate from iframe.
        if (this.iframe && event.origin !== this.iframe.src.slice(0, -1)) {
            return;
        }

        const { data } = event as { data: RpcRequest | RpcResponse };

        if (`method` in data) {
            await this.rpc.handleRequest(data);
            return;
        }

        this.rpc.handleResponse(data);
    };

    private listenChild() {
        window.removeEventListener(`message`, this.onChildMessage);
        window.addEventListener(`message`, this.onChildMessage);
    }

    private listenIframeStatus() {
        // No need to unsubscribe, because it's endless listener.
        this.status$.pipe(skip(1)).subscribe(async (status) => {
            switch (status) {
                case `unloaded`:
                    // Iframe destroyed, reset service state.
                    if (this.iframe?.src) {
                        this.iframe.removeAttribute(`src`);
                    }

                    this.rpc.awaitingResponses = {};
                    break;
                case `registered`:
                    this.setIframeSrcByRoute(this.router.url);
                    break;
                case `loaded`:
                    break;
                case `ready`:
                    // Set initial child route.
                    await this.setChildRoute(this.router.url);
                    break;
                default:
                    throw new Error(`Unknown status "${status}.`);
            }
        });
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
                const childChanged = this.setIframeSrcByRoute(event.urlAfterRedirects);
                if (!childChanged) {
                    // Do not propagate to child route changes that child itself directed.
                    const [, searchParamsString] = event.urlAfterRedirects.split(`?`);

                    if (searchParamsString) {
                        const searchParams = new URLSearchParams(searchParamsString);
                        if (searchParams.has(`ngxIframe`)) {
                            return;
                        }
                    }

                    // Sync child route.
                    void this.setChildRoute(event.urlAfterRedirects);
                }
            });
    }

    private setIframeSrcByRoute(route: string) {
        if (!this.iframe) {
            return;
        }

        const childrenEntries = Object.entries(this.children);
        for (const [routePrefix, childSrc] of childrenEntries) {
            if (route.startsWith(routePrefix)) {
                // Change active child.
                if (this.iframe.src !== childSrc) {
                    this.iframe.src = childSrc;
                    return true;
                }
                return false;
            }
        }

        // If no matching child found, iframe should go into unloaded state.
        this.status$.next(`unloaded`);
        return false;
    }

    private async setChildRoute(url: string) {
        await this.rpc.sendRequest({
            method: `ngxIframe.navigate`,
            params: [url],
        });
    }
}
