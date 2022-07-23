export const createEndlessProxy = () => {
    const endlessProxy: any = new Proxy(() => {}, {
        get: () => {
            return endlessProxy;
        },
    });

    return endlessProxy;
};
