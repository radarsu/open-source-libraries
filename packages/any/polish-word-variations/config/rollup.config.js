/* eslint-disable */
import pkg from '../package.json';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [{
    input: [
        `./src/index.ts`,
    ],
    output: [
        {
            file: pkg.main,
            format: `cjs`,
        },
        {
            file: pkg.module,
            format: `es`,
        },
        {
            file: pkg.browser['./dist/index.js'],
            format: `iife`,
            name: `wordVariations`,
        },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
        typescript(),
        terser(),
    ],
}, {
    input: [
        `./src/word-definitions/clothing/index.ts`,
    ],
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
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
        typescript(),
        terser(),
    ],
}, {
    input: [
        `./src/word-definitions/time-measures/index.ts`,
    ],
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
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
        typescript(),
        terser(),
    ],
}, {
    input: [
        `./src/word-definitions/medicine/index.ts`,
    ],
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
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
        typescript(),
        terser(),
    ],
}];
