export interface StartDependencies {
    logger: Partial<Console>;
}

export const start = async ({ logger }: StartDependencies, from: string, to: string) => {
    // const getItemsModule = await import(`./items/get-items.js`);
    // const items = getItemsModule.getItems(token);
    // console.log(`App received:`, token, args, items);
};
