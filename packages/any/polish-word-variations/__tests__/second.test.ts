import { second } from '../src/word-definitions/time-measures';
import { wordVariations } from '../src';

test(`second`, async () => {
    const { singular, dual, plural } = second.nominative;

    wordVariations.addWords({ [singular]: second });

    const wordZero = wordVariations.getWord(singular, 0);
    expect(wordZero).toBe(plural);

    const wordSingular = wordVariations.getWord(singular);
    expect(wordSingular).toBe(singular);

    for (let i = 2; i <= 4; ++i) {
        const wordDual = wordVariations.getWord(singular, i);
        expect(wordDual).toBe(dual);
    }

    for (let i = 5; i <= 11; ++i) {
        const wordPlural = wordVariations.getWord(singular, i);
        expect(wordPlural).toBe(plural);
    }

    for (let i = 12; i <= 21; ++i) {
        const twelveToFourteen = wordVariations.getWord(singular, i);
        expect(twelveToFourteen).toBe(plural);
    }


    for (let i = 22; i <= 24; ++i) {
        const wordDual = wordVariations.getWord(singular, i);
        expect(wordDual).toBe(dual);
    }
});
