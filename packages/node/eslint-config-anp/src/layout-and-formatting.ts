export const layoutAndFormatting = {
    // Stylistic issues.
    'array-bracket-newline': [`error`],
    'array-bracket-spacing': [`error`],

    // <prettier-incompatibility>
    'array-element-newline': [`off`],
    'arrow-parens': [`error`],
    'arrow-spacing': [`error`],
    'block-spacing': [`error`],

    // Extended by @typescript-eslint.
    'brace-style': [`off`],

    // Trailing commas are good in multiline, but it's extended by @typescript-eslint.
    'comma-dangle': [`off`],

    // Extended by @typescript-eslint.
    'comma-spacing': [`off`],
    'comma-style': [`error`],
    'computed-property-spacing': [`error`],

    // Property is required to be consistent with prettier.
    'dot-location': [`error`, `property`],
    'eol-last': [`error`],

    // Extended by @typescript-eslint.
    'func-call-spacing': [`off`],
    'function-call-argument-newline': [`error`, `consistent`],
    'function-paren-newline': [`error`, `consistent`],
    'generator-star-spacing': [`error`],

    // <prettier-incompatibility>
    'implicit-arrow-linebreak': [`off`],

    // Extended by @typescript-eslint.
    indent: [`off`],
    'jsx-quotes': [`error`],
    'key-spacing': [`error`],

    // Extended by @typescript-eslint.
    'keyword-spacing': [`off`],
    'line-comment-position': [`error`],
    'linebreak-style': [`error`],

    // <prettier-incompatibility>
    'lines-around-comment': [`off`],

    // Extended by @typescript-eslint.
    'lines-between-class-members': [`off`],

    // Comments and strings get wrapped by IDE, so it's ok for them to be long.
    'max-len': [
        `error`,
        {
            code: 150,
            tabWidth: 4,
            ignoreComments: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        },
    ],
    'max-statements-per-line': [`error`],

    // Ternary operators should be used in single line, otherwise they are too complex and should be replaced with if statements.
    'multiline-ternary': [`error`, `never`],
    'new-parens': [`error`],

    // <prettier-incompatibility>
    'newline-per-chained-call': [`off`],

    // Extended by @typescript-eslint.
    'no-extra-parens': [`off`],

    'no-mixed-spaces-and-tabs': [`error`],
    'no-multi-spaces': [`error`],
    'no-multiple-empty-lines': [`error`],
    'no-tabs': [`error`],
    'no-trailing-spaces': [`error`],
    'no-whitespace-before-property': [`error`],
    'nonblock-statement-body-position': [`error`],
    'object-curly-newline': [`error`],

    // Extended by @typescript-eslint.
    'object-curly-spacing': [`off`],
    'object-property-newline': [`error`],
    'operator-linebreak': [`error`],
    'padded-blocks': [`error`, `never`],
    'padding-line-between-statements': [`error`],

    // Extended by @typescript-eslint.
    quotes: [`off`],
    'rest-spread-spacing': [`error`],

    // Extended by @typescript-eslint.
    semi: [`off`],
    'semi-spacing': [`error`],
    'semi-style': [`error`],

    // Extended by @typescript-eslint.
    'space-before-blocks': [`off`],

    // Extended by @typescript-eslint.
    'space-before-function-paren': [`off`],
    'space-in-parens': [`error`],

    // Extended by @typescript-eslint.
    'space-infix-ops': [`off`],
    'space-unary-ops': [`error`],
    'switch-colon-spacing': [`error`],
    'template-curly-spacing': [`error`],
    'template-tag-spacing': [`error`],
    'unicode-bom': [`error`],
    'wrap-iife': [`error`],

    // <prettier-incompatibility>
    'wrap-regex': [`off`],
    'yield-star-spacing': [`error`],
};
