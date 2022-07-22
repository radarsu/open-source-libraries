export const getEndlessProxy = () => {
    // eslint-disable-next-line no-undef, @typescript-eslint/no-empty-function
    const endlessProxy: any = new Proxy(() => {}, {
        get: () => {
            return endlessProxy;
        },
    });

    return endlessProxy;
};
