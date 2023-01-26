import { getPluginTailwindCSS, pluginImport, pluginJest, pluginMaxParamsNoConstructor } from './plugins';

import { layoutAndFormatting } from './layout-and-formatting';
import { possibleProblems } from './possible-problems';
import { suggestions } from './suggestions';
import { typescript } from './typescript';

export interface GetEslintConfigOptions {
    tailwindcssPath: string;
}

export const getEslintConfig = (options?: GetEslintConfigOptions) => {
    const frontendAppPathsRegex = `./apps/*-{desktop,mobile,web}`;

    return {
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
        parser: `@typescript-eslint/parser`,
        parserOptions: {
            ecmaVersion: 2022,
            project: `./tsconfig.json`,
            sourceType: `module`,
        },
        plugins: [`@typescript-eslint`, `import`, `jest`, `max-params-no-constructor`, `tailwindcss`],

        // Rules.
        rules: {
            ...suggestions,
            ...layoutAndFormatting,
            ...possibleProblems,
            ...pluginImport,
            ...pluginJest,
            ...pluginMaxParamsNoConstructor,
            ...getPluginTailwindCSS(options?.tailwindcssPath),
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
};
