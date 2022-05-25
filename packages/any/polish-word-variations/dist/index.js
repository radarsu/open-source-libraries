export class WordVariationsDictionary {
    constructor() {
        this.dictionary = {};
    }
    addWords(wordsMap) {
        Object.entries(wordsMap).forEach(([wordKey, wordDefinition]) => {
            this.dictionary[wordKey] = wordDefinition;
        });
    }
    getWord(wordKey, count = 1, polishCase = `nominative`) {
        count = Math.abs(count);
        const word = this.dictionary[wordKey];
        if (!word) {
            throw new Error(`Word ${wordKey} is not defined in dictionary.`);
        }
        let wordDefinition = word[polishCase];
        if (!wordDefinition) {
            throw new Error(`Case ${polishCase} is not defined for word ${wordKey}.`);
        }
        if (count === 1) {
            return wordDefinition.singular;
        }
        if (count % 1 !== 0) {
            if (!word.genitive) {
                throw new Error(`Genitive form of word "${wordDefinition.singular}" is required to support floats.`);
            }
            if (count < 2) {
                return word.genitive.singular;
            }
            return wordDefinition.plural;
        }
        if (polishCase === `vocative`) {
            wordDefinition = word.nominative;
        }
        if (`dual` in wordDefinition) {
            const lastDigit = count % 10;
            if (lastDigit >= 2 && lastDigit <= 4 && (count < 12 || count > 14)) {
                return wordDefinition.dual;
            }
        }
        return wordDefinition.plural;
    }
}
export const wordVariations = new WordVariationsDictionary();
//# sourceMappingURL=index.js.map