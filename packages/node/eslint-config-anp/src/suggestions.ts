export const suggestions = {
    'accessor-pairs': [`error`],

    // () => String etc. is useful for resolvers, module forwardRef's and plenty other, although we prefer braces in general.
    'arrow-body-style': [`off`],
    'block-scoped-var': [`error`],
    camelcase: [`error`],

    // Code commented out may not be capitalized.
    'capitalized-comments': [`off`],
    'class-methods-use-this': [`error`],
    complexity: [`error`],

    // We allow function to return various types depending on it's branching.
    'consistent-return': [`off`],
    'consistent-this': [`error`],
    curly: [`error`],
    'default-case': [`error`],
    'default-case-last': [`error`],

    // Extended by @typescript-eslint.
    'default-param-last': [`off`],

    // Extended by @typescript-eslint.
    'dot-notation': [`off`],
    eqeqeq: [`error`],
    'func-name-matching': [`error`],
    'func-names': [`error`],
    'func-style': [`error`],
    'grouped-accessor-pairs': [`error`],
    'guard-for-in': [`error`],
    'id-denylist': [`error`],

    // Variable named i, j etc. is perfectly fine.
    'id-length': [
        `error`,
        {
            exceptions: [
                // Arbitrary objects.
                `a`,
                `b`,
                `c`,
                // Iterators.
                `i`,
                `j`,
                `k`,
                `l`,
                // Mathematical values.
                `x`,
                `y`,
                `z`,
                // Special characters.
                `_`,
                `$`,
            ],
            // Properties, i.e. flag shorthands should be one letter.
            properties: `never`,
        },
    ],
    'id-match': [`error`],

    // Extended by @typescript-eslint.
    'init-declarations': [`off`],
    'logical-assignment-operators': [`error`],
    'max-classes-per-file': [`error`],
    'max-depth': [`error`],
    'max-lines': [
        `error`,
        {
            max: 500,
            skipBlankLines: true,
            skipComments: true,
        },
    ],
    'max-lines-per-function': [
        `error`,
        {
            max: 100,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true,
        },
    ],
    'max-nested-callbacks': [`error`],

    // Should be turned off for max-params-no-constructor plugin.
    'max-params': [`off`],
    'max-statements': [`error`, 100],

    // Multiline // comments are fine as they are commonly used to comment out code with keystroke.
    'multiline-comment-style': [`off`],

    // Disallows uppercase decorators.
    'new-cap': [`off`],
    'no-alert': [`error`],

    // Extended by @typescript-eslint.
    'no-array-constructor': [`off`],
    'no-bitwise': [`error`],
    'no-caller': [`error`],
    'no-case-declarations': [`error`],
    'no-confusing-arrow': [`error`],

    // Console is useful.
    'no-console': [`off`],
    'no-continue': [`error`],
    'no-delete-var': [`error`],
    'no-div-regex': [`error`],
    'no-else-return': [`error`],
    'no-empty': [`error`],

    // Extended by @typescript-eslint.
    'no-empty-function': [`off`],
    'no-empty-static-block': [`error`],
    'no-eq-null': [`error`],
    'no-eval': [`error`],
    'no-extend-native': [`error`],
    'no-extra-bind': [`error`],
    'no-extra-boolean-cast': [`error`],
    'no-extra-label': [`error`],

    // Extended by @typescript-eslint.
    'no-extra-semi': [`off`],
    'no-floating-decimal': [`error`],
    'no-global-assign': [`error`],
    'no-implicit-coercion': [`error`],
    'no-implicit-globals': [`error`],

    // Extended by @typescript-eslint.
    'no-implied-eval': [`off`],
    'no-inline-comments': [`error`],

    // Extended by @typescript-eslint.
    'no-invalid-this': [`off`],
    'no-iterator': [`error`],
    'no-label-var': [`error`],
    'no-labels': [`error`],
    'no-lone-blocks': [`error`],
    'no-lonely-if': [`error`],

    // Extended by @typescript-eslint.
    'no-loop-func': [`off`],

    // Extended by @typescript-eslint.
    'no-magic-numbers': [`off`],

    // Mixing some operators is fine.
    'no-mixed-operators': [`error`],
    'no-multi-assign': [`error`],
    'no-multi-str': [`error`],
    'no-negated-condition': [`error`],
    'no-nested-ternary': [`error`],
    'no-new': [`error`],
    'no-new-func': [`error`],
    'no-new-object': [`error`],
    'no-new-wrappers': [`error`],
    'no-nonoctal-decimal-escape': [`error`],
    'no-octal': [`error`],
    'no-octal-escape': [`error`],
    'no-param-reassign': [`error`],

    // ++ operators are cleaner.
    'no-plusplus': [`off`],
    'no-proto': [`error`],

    // Extended by @typescript-eslint.
    'no-redeclare': [`off`],
    'no-regex-spaces': [`error`],
    'no-restricted-exports': [`error`],
    'no-restricted-globals': [`error`],

    // Extended by @typescript-eslint.
    'no-restricted-imports': [`off`],
    'no-restricted-properties': [`error`],
    'no-restricted-syntax': [`error`],
    'no-return-assign': [`error`],

    // Extended by @typescript-eslint.
    'no-return-await': [`off`],
    'no-script-url': [`error`],
    'no-sequences': [`error`],

    // Extended by @typescript-eslint.
    'no-shadow': [`off`],
    'no-shadow-restricted-names': [`error`],

    // Properly used ternary operator increases readability.
    'no-ternary': [`off`],

    // Extended by @typescript-eslint.
    'no-throw-literal': [`off`],
    'no-undef-init': [`error`],

    // We believe undefined is better than null.
    'no-undefined': [`off`],

    // _def is used by Zod.
    'no-underscore-dangle': [`error`, { allow: [`_def`] }],
    'no-unneeded-ternary': [`error`],

    // Extended by @typescript-eslint.
    'no-unused-expressions': [`off`],
    'no-unused-labels': [`error`],
    'no-useless-call': [`error`],
    'no-useless-catch': [`error`],
    'no-useless-computed-key': [`error`],
    'no-useless-concat': [`error`],

    // Extended by @typescript-eslint.
    'no-useless-constructor': [`off`],
    'no-useless-escape': [`error`],
    'no-useless-rename': [`error`],
    'no-useless-return': [`error`],
    'no-var': [`error`],

    // This is helpful for handling promises with void.
    'no-void': [`error`, { allowAsStatement: true }],

    // We allow TODO, FIXME etc. comments.
    'no-warning-comments': [`off`],
    'no-with': [`error`],
    'object-shorthand': [`error`],
    'one-var': [`error`, `never`],
    'one-var-declaration-per-line': [`error`],
    'operator-assignment': [`error`],
    'prefer-arrow-callback': [`error`],

    // We allow declaring const as let if it's destructing action for sake of simplicity.
    'prefer-const': [
        `warn`,
        {
            destructuring: `all`,
        },
    ],
    'prefer-destructuring': [`error`],
    'prefer-exponentiation-operator': [`error`],
    'prefer-named-capture-group': [`error`],
    'prefer-numeric-literals': [`error`],
    'prefer-object-has-own': [`error`],
    'prefer-object-spread': [`error`],
    'prefer-promise-reject-errors': [`error`],
    'prefer-regex-literals': [`error`, { disallowRedundantWrapping: true }],
    'prefer-rest-params': [`error`],
    'prefer-spread': [`error`],
    'prefer-template': [`error`],

    // Quotes only when needed.
    'quote-props': [`error`, `as-needed`],
    radix: [`error`],

    // Extended by @typescript-eslint.
    'require-await': [`off`],
    'require-unicode-regexp': [`error`],
    'require-yield': [`error`],
    'sort-imports': [`error`],

    // This rule is too troublesome.
    'sort-keys': [
        `error`,
        {
            allowLineSeparatedGroups: true,
        },
    ],
    'sort-vars': [`error`],
    'spaced-comment': [`error`],
    strict: [`off`],
    'symbol-description': [`error`],
    'vars-on-top': [`error`],
    yoda: [`error`],
};
