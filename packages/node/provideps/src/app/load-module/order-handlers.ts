export type OnMissingProviderOrder = OnMissingProviderReplaceOrder;
export type OnMissingMethodOrder = OnMissingMethodReplaceOrder;

export interface OnMissingProviderReplaceOrder {
    replaceWith: any;
}

export interface OnMissingMethodReplaceOrder {
    replaceWith: (...args: any[]) => any;
}

export const onMissingProviderOrderHandler = (order: OnMissingProviderOrder) => {
    if ('replaceWith' in order) {
        return order.replaceWith;
    }

    return;
};

export const onMissingMethodOrderHandler = (order: OnMissingMethodOrder, actualProviders: any[]) => {
    if ('replaceWith' in order) {
        return order.replaceWith(...actualProviders);
    }

    return;
};
