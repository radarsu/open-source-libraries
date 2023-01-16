/* eslint-disable @typescript-eslint/no-dynamic-delete */
const get = (obj: any, path: string, defaultValue = undefined) => {
    const travel = (regexp: RegExp) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

    const result = travel(/[,[\]]+?/u) || travel(/[,[\].]+?/u);
    return result === undefined || result === obj ? defaultValue : result;
};

interface RpcRequest {
    id: string;
    method: string;
    params?: any[];
}

interface RpcResponse {
    id: string;
    data?: any;
}

interface RpcChannelOptions {
    methods: Record<string, any>;
    sendRequest: (request: RpcRequest) => any;
    sendResponse: (response: RpcResponse) => void;
    timeout?: number;
}

const createRpcChannel = (options: RpcChannelOptions) => {
    const awaitingResponses: Record<string, (response: any) => void> = {};
    const timeout = options.timeout ?? 60000;

    return {
        async sendRequest(request: Omit<RpcRequest, 'id'>) {
            return new Promise((resolve, reject) => {
                // console.log(`[client-console] Sending to Fullcube Admin:`, request);

                const id = Date.now().toString();
                awaitingResponses[id] = (response) => {
                    resolve(response);
                };

                setTimeout(() => {
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete awaitingResponses[id];
                    reject(new Error(`Request id "${id}" has timed out.`));
                }, timeout);

                options.sendRequest({
                    id,
                    ...request,
                });
            });
        },
        sendResponse(response: RpcResponse) {
            options.sendResponse(response);
        },
        async handleRequest(request: RpcRequest) {
            let method: ((...params: any[]) => any) | undefined = get(options.methods, request.method);

            if (!method) {
                throw new Error(`Handler for method "${request.method}" not found.`);
            }

            const methodParts = request.method.split(`.`);

            let boundedContext: any;

            if (methodParts.length > 1) {
                methodParts.pop();
                const contextPath = methodParts.join(`.`);
                boundedContext = get(options.methods, contextPath);
                method = method.bind(boundedContext);
            }

            const data = await method(...(request.params ?? []));

            const response: RpcResponse = {
                id: request.id,
                data,
            };

            this.sendResponse(response);
        },
        handleResponse(response: RpcResponse) {
            awaitingResponses[response.id]?.(response.data);
            delete awaitingResponses[response.id];
        },
    };
};

export type { RpcRequest, RpcResponse, RpcChannelOptions };
export { createRpcChannel };
