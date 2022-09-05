export const pick = (object: any, properties: string[]) => {
    return Object.assign(
        {},
        ...properties.map((property) => {
            if (!(property in object)) {
                return undefined;
            }

            return {
                [property]: object[property],
            };
        }),
    );
};
