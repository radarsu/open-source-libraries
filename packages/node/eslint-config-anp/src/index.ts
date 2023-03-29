import * as fs from 'node:fs';
import * as plugins from './plugins';

import { layoutAndFormatting } from './layout-and-formatting';
import { possibleProblems } from './possible-problems';
import { suggestions } from './suggestions';
import { typescript } from './typescript';

const angularPatterns = [
    `./apps/*-{admin,app,dashboard,desktop,mobile,portal,web}`,
    `./apps/{admin,app,dashboard,desktop,mobile,portal,web}`,
    `./packages/ngx-*`,
];

const astroPatterns = [`./apps/*-{static,www}`, `./apps/{static,www}`];
const nestPatterns = [`./apps/*-{api,gateway}`, `./apps/{api,gateway}`];

const angularAndAstroPatterns = [
    ...angularPatterns,
    ...astroPatterns,
];

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
        // * Base rules for TypeScript and JavaScript files.
        {
            files: [`*.{ts,js,cjs,mjs}`],
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
        // * Just JavaScript.
        {
            files: [`*.{js,cjs,mjs}`],
            rules: {
                // Turned on exclusively for JavaScript.
                'no-undef': [`error`],

                '@typescript-eslint/no-require-imports': [`off`],
                '@typescript-eslint/no-var-requires': [`off`],
            },
        },
        // * Angular HTML.
        {
            files: angularAppsPatterns.map((pattern) => {
                return `${pattern}/**/*.html`;
            }),
            parser: `@angular-eslint/template-parser`,
            plugins: [`tailwindcss`, `@angular-eslint/template`],
            rules: {
                ...plugins.getPluginTailwindCSS(process.env[`ESLINT_TAILWIND_CONFIG_PATH`]),
                ...plugins.pluginAngularEslintTemplate,
            },
        },
        // * Angular TypeScript.
        {
            files: angularAppsPatterns.map((pattern) => {
                return `${pattern}/**/*.ts`;
            }),
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

        // * Nest configurations.
        {
            files: nestPatterns.map((pattern) => {
                return `${pattern}/**/*.config.ts`;
            }),
            rules: {
                // We allow many parameters for configs due to useFactory function Dependency Injection.
                'max-params-no-constructor/max-params-no-constructor': `off`,
            },
        },
        // * Nest controllers, guards, exception filters, resolvers, scalars.
        {
            files: nestPatterns.map((pattern) => {
                return `${pattern}/**/*.{controller,filter,guard,interceptor,module,resolver,scalar,service,strategy}.ts`;
            }),
            rules: {
                // We allow many classes per file for ngxs actions.
                'class-methods-use-this': [`off`],
            },
        },
        // * Nest inputs, outputs.
        {
            files: [`./apps/*-api/**/*.{args,input,model,output}.ts`],
            rules: {
                // We allow many classes per file for ngxs actions.
                'max-classes-per-file': `off`,
            },
        },
        // * pm2.
        {
            files: [`./ecosystem.config.{js,cjs,mjs}`],
            rules: {
                camelcase: [`off`],
            },
        },
        // * TailwindCSS.
        {
            files: angularAndAstroPatterns.map((pattern) => {
                return `${pattern}/**/tailwind.config.{js,cjs,mjs}`;
            }),
            rules: {
                'max-lines': [`off`],
                'sort-keys': [`off`],
            },
        },
    ],
};

export = eslintConfig;
