import * as packageJson from '../package.json';
import * as typescript from '@rollup/plugin-typescript';

import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: [`./src/index.ts`],
        output: [
            {
                file: packageJson.main,
                format: `cjs`,
            },
            {
                file: packageJson.module,
                format: `es`,
            },
            {
                file: packageJson.browser['./dist/index.js'],
                format: `iife`,
                name: `wordVariations`,
            },
        ],
        external: [...Object.keys(packageJson.dependencies || {})],
        plugins: [
            typescript.default({
                tsconfig: `${__dirname}/../tsconfig.json`,
                declarationDir: ``,
            }),
            terser(),
        ],
    },
    {
        input: [`./src/word-definitions/clothing/index.ts`],
        output: [
            {
                file: `dist/word-definitions/clothing/index.js`,
                format: `cjs`,
            },
            {
                file: `dist/word-definitions/clothing/index.module.js`,
                format: `es`,
            },
            {
                file: `dist/word-definitions/clothing/index.browser.js`,
                format: `iife`,
                name: `wordVariationsClothing`,
            },
        ],
        external: [...Object.keys(packageJson.dependencies || {})],
        plugins: [
            typescript.default({
                tsconfig: `${__dirname}/../tsconfig.json`,
                declarationDir: ``,
            }),
            terser(),
        ],
    },
    {
        input: [`./src/word-definitions/time-measures/index.ts`],
        output: [
            {
                file: `dist/word-definitions/time-measures/index.js`,
                format: `cjs`,
            },
            {
                file: `dist/word-definitions/time-measures/index.module.js`,
                format: `es`,
            },
            {
                file: `dist/word-definitions/time-measures/index.browser.js`,
                format: `iife`,
                name: `wordVariationsTimeMeasures`,
            },
        ],
        external: [...Object.keys(packageJson.dependencies || {})],
        plugins: [
            typescript.default({
                tsconfig: `${__dirname}/../tsconfig.json`,
                declarationDir: ``,
            }),
            terser(),
        ],
    },
    {
        input: [`./src/word-definitions/medicine/index.ts`],
        output: [
            {
                file: `dist/word-definitions/medicine/index.js`,
                format: `cjs`,
            },
            {
                file: `dist/word-definitions/medicine/index.module.js`,
                format: `es`,
            },
            {
                file: `dist/word-definitions/medicine/index.browser.js`,
                format: `iife`,
                name: `wordVariationsMedicine`,
            },
        ],
        external: [...Object.keys(packageJson.dependencies || {})],
        plugins: [
            typescript.default({
                tsconfig: `${__dirname}/../tsconfig.json`,
                declarationDir: ``,
            }),
            terser(),
        ],
    },
];
