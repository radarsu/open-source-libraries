export const getPluginTailwindCSS = (tailwindcssPath?: string) => {
    return {
        'tailwindcss/classnames-order': [
            `error`,
            {
                config: tailwindcssPath,
            },
        ],
        'tailwindcss/enforces-negative-arbitrary-values': [
            `error`,
            {
                config: tailwindcssPath,
            },
        ],
        'tailwindcss/enforces-shorthand': [
            `error`,
            {
                config: tailwindcssPath,
            },
        ],
        'tailwindcss/migration-from-tailwind-2': [
            `error`,
            {
                config: tailwindcssPath,
            },
        ],
        'tailwindcss/no-arbitrary-value': [
            `error`,
            {
                config: tailwindcssPath,
            },
        ],
        'tailwindcss/no-contradicting-classname': [
            `error`,
            {
                config: tailwindcssPath,
            },
        ],
        'tailwindcss/no-custom-classname': [`off`],
    };
};
