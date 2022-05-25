module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: `tsconfig.tests.json`,
        },
    },
    transform: {
        '^.+\\.ts$': `ts-jest`,
    },
    testRegex: `(/__tests__/.*|(\\.|/)(spec))\\.ts$`,
};
