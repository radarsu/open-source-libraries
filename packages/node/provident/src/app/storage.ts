export const storage = new Map<
    any,
    {
        getProviders: () => Promise<Map<any, any>>;
        options?: any;
    }
>();
