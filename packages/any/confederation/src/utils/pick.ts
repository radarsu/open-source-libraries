export const pick = (object: any, properties: string[]) => {
    return Object.assign(
        {},
        ...properties.map((property) => {
            return {
                [property]: object[property],
            };
        }),
    );
};
