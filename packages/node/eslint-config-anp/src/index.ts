import * as plugins from './plugins';

import { layoutAndFormatting } from './layout-and-formatting';
import { possibleProblems } from './possible-problems';
import { suggestions } from './suggestions';
import { typescript } from './typescript';

const frontendAppPathsRegex = `./apps/*-{desktop,mobile,web}`;
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
        `*.generated.*`,
        `out`,
        `www`,

        // Resources.
        `android`,
        `assets`,
        `docker-volumes`,
        `ios`,
    ],
    overrides: [
        // Core extensions.
        {
            files: [`*.ts`, `*.js`, `*.cjs`, `*.mjs`],
            parser: `@typescript-eslint/parser`,
            parserOptions: {
                ecmaVersion: 2022,
                project: `./tsconfig.json`,
                sourceType: `module`,
            },
            plugins: [`@typescript-eslint`, `import`, `jest`, `max-params-no-constructor`],
            rules: {
                ...suggestions,
                ...layoutAndFormatting,
                ...possibleProblems,
                ...plugins.pluginImport,
                ...plugins.pluginJest,
                ...plugins.pluginMaxParamsNoConstructor,
                ...typescript,
            },
        },
        {
            files: [`*.html`],
            parser: `@angular-eslint/template-parser`,
            plugins: [`tailwindcss`, `@angular-eslint/template`],
            rules: {
                ...plugins.getPluginTailwindCSS(process.env[`ESLINT_TAILWIND_CONFIG_PATH`]),
                ...plugins.pluginAngularEslintTemplate,
            },
        },
        {
            files: [`${frontendAppPathsRegex}/**/*.ts`, `./packages/ngx-*/**/*.ts`],
            parser: `@typescript-eslint/parser`,
            parserOptions: {
                ecmaVersion: 2022,
                project: `./tsconfig.json`,
                sourceType: `module`,
            },
            plugins: [`@angular-eslint`],
            rules: {
                ...plugins.pluginAngularEslint,
            },
        },

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
            files: [`./apps/*-api/**/*.{controller,filter,guard,interceptor,module,resolver,strategy,service,scalar}.ts`],
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
            files: [`${frontendAppPathsRegex}/**/*.actions.ts`],
            rules: {
                // We allow many classes per file for angular ngxs actions.
                'max-classes-per-file': `off`,
            },
        },
        // Front-end state.
        {
            files: [`${frontendAppPathsRegex}/**/*.state.ts`],
            rules: {
                // We allow many classes per file for ngxs actions.
                'class-methods-use-this': `off`,
            },
        },
        // JavaScript.
        {
            files: [`*.js`],
            rules: {
                // Turned on exclusively for JavaScript.
                'no-undef': [`error`],

                '@typescript-eslint/no-require-imports': [`off`],
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
            files: [`${frontendAppPathsRegex}/**/*.config.js`],
            rules: {
                'max-lines': [`off`],
                'sort-keys': [`off`],
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
