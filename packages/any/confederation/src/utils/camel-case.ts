export const camelCase = (text: string) => {
    return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, character) => {
        return character.toUpperCase();
    });
};
