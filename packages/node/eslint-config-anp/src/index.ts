import { pluginImport, pluginMaxParamsNoConstructor } from './plugins';

import { layoutAndFormatting } from './layout-and-formatting';
import { pluginJest } from './plugins/jest';
import { possibleProblems } from './possible-problems';
import { suggestions } from './suggestions';
import { typescript } from './typescript';

const eslintConfig = {
    // General config.
    env: {
        browser: true,
        node: true,
        'jest/globals': true,
    },
    ignorePatterns: [
        // Temporary.
        `cache`,
        `tmp`,

        // Generated.
        `dist`,
        `generated`,
        `out`,
        `www`,

        // Resources.
        `android`,
        `assets`,
        `docker-volumes`,
        `ios`,
    ],
    parser: `@typescript-eslint/parser`,
    parserOptions: {
        ecmaVersion: 2022,
        project: `./tsconfig.json`,
        sourceType: `module`,
    },
    plugins: [`@typescript-eslint`, `import`, `jest`, `max-params-no-constructor`],

    // Rules.
    rules: {
        ...suggestions,
        ...layoutAndFormatting,
        ...possibleProblems,
        ...pluginImport,
        ...pluginJest,
        ...pluginMaxParamsNoConstructor,
        ...typescript,
    },
    overrides: [
        // API configs.
        {
            files: [`./apps/*-api/**/*.config.ts`],
            rules: {
                // We allow many parameters for configs due to useFactory function Dependency Injection.
                'max-params-no-constructor/max-params-no-constructor': `off`,
            },
        },
        // API controllers, guards, exception filters, resolvers, scalars.
        {
            files: [`./apps/*-api/**/*.{controller,filter,guard,module,resolver,service,scalar}.ts`],
            rules: {
                // We allow many classes per file for ngxs actions.
                'class-methods-use-this': [`off`],
            },
        },
        // API inputs, outputs.
        {
            files: [`./apps/*-api/**/*.{input,output}.ts`],
            rules: {
                // We allow many classes per file for ngxs actions.
                'max-classes-per-file': `off`,
            },
        },
        // Front-end actions.
        {
            files: [`./apps/*-{desktop,mobile,web}/**/*.actions.ts`],
            rules: {
                // We allow many classes per file for angular ngxs actions.
                'max-classes-per-file': `off`,
            },
        },
        // Front-end state.
        {
            files: [`./apps/*-{desktop,mobile,web}/**/*.state.ts`],
            rules: {
                // We allow many classes per file for ngxs actions.
                'class-methods-use-this': `off`,
            },
        },
        // JavaScript.
        {
            files: [`*.js`],
            rules: {
                '@typescript-eslint/no-var-requires': [`off`],
            },
        },
        // pm2.
        {
            files: [`./ecosystem.config.js`],
            rules: {
                camelcase: [`off`],
            },
        },
        // TailwindCSS.
        {
            files: [`./apps/*-{desktop,mobile,web}/**/*.config.js`],
            rules: {
                'max-lines': [`off`],
            },
        },
        // Types.
        {
            files: [`./apps/*/**/*.types.ts`],
            rules: {
                '@typescript-eslint/no-type-alias': [`off`],
            },
        },
    ],
};

export = eslintConfig;
