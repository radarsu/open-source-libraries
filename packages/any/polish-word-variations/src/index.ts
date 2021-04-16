export interface SingularWordDefinition {
    singular: string;
}

export interface SimpleWordDefinition extends SingularWordDefinition {
    plural: string;
}

export interface DualWordDefinition extends SimpleWordDefinition {
    dual: string;
}

export interface WordDefinition {
    nominative: DualWordDefinition;
    genitive?: SimpleWordDefinition;
    dative?: SimpleWordDefinition;
    accusative?: DualWordDefinition;
    instrumental?: SimpleWordDefinition;
    locative?: SimpleWordDefinition;
    vocative?: SingularWordDefinition;
}

export class WordVariationsDictionary {
    dictionary: Record<string, WordDefinition | undefined> = {};

    addWords(wordsMap: Record<string, WordDefinition>) {
        Object.entries(wordsMap).forEach(([wordKey, wordDefinition]) => {
            this.dictionary[wordKey] = wordDefinition;
        });
    }

    // eslint-disable-next-line complexity
    getWord(wordKey: string, count = 1, polishCase: keyof WordDefinition = `nominative`) {
        // Handle negative numbers.
        count = Math.abs(count);

        const word = this.dictionary[wordKey];
        if (!word) {
            throw new Error(`Word ${wordKey} is not defined in dictionary.`);
        }

        let wordDefinition = word[polishCase];
        if (!wordDefinition) {
            throw new Error(`Case ${polishCase} is not defined for word ${wordKey}.`);
        }

        // Handle one.
        if (count === 1) {
            return wordDefinition.singular;
        }

        // Handle floats.
        if (count % 1 !== 0) {
            if (!word.genitive) {
                throw new Error(`Genitive form of word "${wordDefinition.singular}" is required to support floats.`);
            }

            if (count < 2) {
                return word.genitive.singular;
            }

            return (wordDefinition as SimpleWordDefinition).plural;
        }

        // Vocative has always the same plural form as nominative: http://free.of.pl/g/grzegorj/gram/pl/gram04.html
        if (polishCase === `vocative`) {
            wordDefinition = word.nominative;
        }

        if (`dual` in wordDefinition) {
            const lastDigit = count % 10;
            if (lastDigit >= 2 && lastDigit <= 4 && (count < 12 || count > 14)) {
                return wordDefinition.dual;
            }
        }

        return (wordDefinition as SimpleWordDefinition).plural;
    }
}

export const wordVariations = new WordVariationsDictionary();
