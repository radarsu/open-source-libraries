const prefix = `@typescript-eslint`;

export const typescript = {
    // TypeScript configuration.
    [`${prefix}/adjacent-overload-signatures`]: [`error`],
    [`${prefix}/array-type`]: [`error`],
    [`${prefix}/await-thenable`]: [`error`],
    [`${prefix}/ban-ts-comment`]: [`error`],
    [`${prefix}/ban-tslint-comment`]: [`error`],
    [`${prefix}/ban-types`]: [`error`],
    [`${prefix}/brace-style`]: [`error`],
    [`${prefix}/class-literal-property-style`]: [`error`],
    [`${prefix}/comma-dangle`]: [`error`, `always-multiline`],
    [`${prefix}/comma-spacing`]: [`error`],
    [`${prefix}/consistent-generic-constructors`]: [`error`],
    [`${prefix}/consistent-indexed-object-style`]: [`error`],
    [`${prefix}/consistent-type-assertions`]: [`error`],
    [`${prefix}/consistent-type-definitions`]: [`error`],
    [`${prefix}/consistent-type-exports`]: [`error`],

    // This works bad with Angular services that are types, but are required to exist for Dependency Injection.
    [`${prefix}/consistent-type-imports`]: [`off`],
    [`${prefix}/default-param-last`]: [`error`],
    [`${prefix}/dot-notation`]: [`error`],

    // We don't enforce specifying return types.
    [`${prefix}/explicit-function-return-type`]: [`off`],
    [`${prefix}/explicit-member-accessibility`]: [`error`, { accessibility: `no-public` }],

    // We don't enforce specifying return types even if function is exported.
    [`${prefix}/explicit-module-boundary-types`]: [`off`],
    [`${prefix}/func-call-spacing`]: [`error`],

    // <prettier-incompatibility>
    [`${prefix}/indent`]: [`off`],

    // Incompatible with no-undef-init rule.
    [`${prefix}/init-declarations`]: [`off`],
    [`${prefix}/keyword-spacing`]: [`error`],
    [`${prefix}/lines-between-class-members`]: [
        `error`,
        `always`,
        {
            exceptAfterSingleLine: true,
        },
    ],
    [`${prefix}/member-delimiter-style`]: [`error`],
    [`${prefix}/member-ordering`]: [`error`],
    [`${prefix}/method-signature-style`]: [`error`],
    [`${prefix}/naming-convention`]: [
        `error`,
        {
            custom: {
                match: false,
                regex: `^I[A-Z]`,
            },
            format: [`PascalCase`],
            selector: `interface`,
        },
    ],
    [`${prefix}/no-array-constructor`]: [`error`],
    [`${prefix}/no-base-to-string`]: [`error`],
    [`${prefix}/no-confusing-non-null-assertion`]: [`error`],
    [`${prefix}/no-confusing-void-expression`]: [`error`, { ignoreArrowShorthand: true }],
    [`${prefix}/no-dupe-class-members`]: [`error`],
    [`${prefix}/no-duplicate-enum-values`]: [`error`],
    [`${prefix}/no-duplicate-imports`]: [`error`],
    [`${prefix}/no-dynamic-delete`]: [`error`],
    [`${prefix}/no-empty-function`]: [`warn`],
    [`${prefix}/no-empty-interface`]: [`error`],

    // We allow any for sake of hacks and simplicity.
    [`${prefix}/no-explicit-any`]: [`off`],
    [`${prefix}/no-extra-non-null-assertion`]: [`error`],

    // <prettier-incompatibility>
    [`${prefix}/no-extra-parens`]: [`off`],
    [`${prefix}/no-extra-semi`]: [`error`],

    // Extraneous classes with decorator are normal for Angular. Static are normal for ngxs.
    [`${prefix}/no-extraneous-class`]: [
        `error`,
        {
            allowStaticOnly: true,
            allowWithDecorator: true,
        },
    ],
    [`${prefix}/no-floating-promises`]: [`error`],
    [`${prefix}/no-for-in-array`]: [`error`],

    // <tsc-incompatibility>
    [`${prefix}/no-implied-eval`]: [`error`],
    [`${prefix}/no-inferrable-types`]: [`error`],
    [`${prefix}/no-invalid-this`]: [`error`],
    [`${prefix}/no-invalid-void-type`]: [`error`],
    [`${prefix}/no-loop-func`]: [`error`],
    [`${prefix}/no-loss-of-precision`]: [`error`],

    // We allow "magic" numbers, they're useful to set default params.
    [`${prefix}/no-magic-numbers`]: [`off`],
    [`${prefix}/no-meaningless-void-operator`]: [`error`],
    [`${prefix}/no-misused-new`]: [`error`],
    [`${prefix}/no-misused-promises`]: [
        `error`,
        {
            checksVoidReturn: false,
        },
    ],
    [`${prefix}/no-namespace`]: [`error`],
    [`${prefix}/no-non-null-asserted-nullish-coalescing`]: [`error`],
    [`${prefix}/no-non-null-asserted-optional-chain`]: [`error`],
    [`${prefix}/no-non-null-assertion`]: [`error`],

    [`${prefix}/no-redeclare`]: [`error`],
    [`${prefix}/no-redundant-type-constituents`]: [`error`],
    [`${prefix}/no-require-imports`]: [`error`],
    [`${prefix}/no-restricted-imports`]: [`error`],
    [`${prefix}/no-shadow`]: [`error`],
    [`${prefix}/no-this-alias`]: [`error`],
    [`${prefix}/no-throw-literal`]: [`error`],

    // Aliasing is helpful for unions and intersections and hook functions (callbacks).
    [`${prefix}/no-type-alias`]: [
        `error`,
        {
            allowAliases: `in-unions-and-intersections`,
            allowCallbacks: `always`,
        },
    ],
    [`${prefix}/no-unnecessary-boolean-literal-compare`]: [`error`],
    [`${prefix}/no-unnecessary-condition`]: [`error`],
    [`${prefix}/no-unnecessary-qualifier`]: [`error`],
    [`${prefix}/no-unnecessary-type-arguments`]: [`error`],
    [`${prefix}/no-unnecessary-type-assertion`]: [`error`],
    [`${prefix}/no-unnecessary-type-constraint`]: [`error`],

    // We allow using "any" type to simplify things.
    [`${prefix}/no-unsafe-argument`]: [`off`],
    [`${prefix}/no-unsafe-assignment`]: [`off`],
    [`${prefix}/no-unsafe-call`]: [`off`],
    [`${prefix}/no-unsafe-declaration-merging`]: [`error`],
    [`${prefix}/no-unsafe-member-access`]: [`off`],
    [`${prefix}/no-unsafe-return`]: [`off`],
    [`${prefix}/no-unused-expressions`]: [`error`],
    [`${prefix}/no-unused-vars`]: [
        `warn`,
        {
            args: `after-used`,
            ignoreRestSiblings: false,
            vars: `all`,
        },
    ],
    [`${prefix}/no-use-before-define`]: [`error`],
    [`${prefix}/no-useless-constructor`]: [`error`],
    [`${prefix}/no-useless-empty-export`]: [`error`],
    [`${prefix}/no-var-requires`]: [`error`],
    [`${prefix}/non-nullable-type-assertion-style`]: [`error`],
    [`${prefix}/object-curly-spacing`]: [`error`, `always`],
    [`${prefix}/padding-line-between-statements`]: [`error`],

    // We allow constructor(public ..., etc).
    [`${prefix}/parameter-properties`]: [`off`],
    [`${prefix}/prefer-as-const`]: [`error`],
    [`${prefix}/prefer-enum-initializers`]: [`error`],
    [`${prefix}/prefer-for-of`]: [`error`],
    [`${prefix}/prefer-function-type`]: [`error`],
    [`${prefix}/prefer-includes`]: [`error`],
    [`${prefix}/prefer-literal-enum-member`]: [`error`],
    [`${prefix}/prefer-namespace-keyword`]: [`error`],
    [`${prefix}/prefer-nullish-coalescing`]: [`error`],
    [`${prefix}/prefer-optional-chain`]: [`error`],
    [`${prefix}/prefer-readonly`]: [`error`],

    // Readonly parameters are bloating code too much.
    [`${prefix}/prefer-readonly-parameter-types`]: [`off`],
    [`${prefix}/prefer-reduce-type-parameter`]: [`error`],
    [`${prefix}/prefer-regexp-exec`]: [`error`],
    [`${prefix}/prefer-return-this-type`]: [`error`],
    [`${prefix}/prefer-string-starts-ends-with`]: [`error`],
    [`${prefix}/prefer-ts-expect-error`]: [`error`],
    [`${prefix}/promise-function-async`]: [`error`],
    [`${prefix}/quotes`]: [`error`, `backtick`],
    [`${prefix}/require-array-sort-compare`]: [`error`],

    // We allow promise wrappers for simplicity using .catch over try catch block.
    [`${prefix}/require-await`]: [`off`],
    [`${prefix}/restrict-plus-operands`]: [`error`],

    // We allow expressions inside templates.
    [`${prefix}/restrict-template-expressions`]: [`off`],
    [`${prefix}/return-await`]: [`error`],
    [`${prefix}/semi`]: [`error`],
    [`${prefix}/sort-type-constituents`]: [`error`],
    [`${prefix}/sort-type-union-intersection-members`]: [`error`],
    [`${prefix}/space-before-blocks`]: [`error`],

    // <prettier-incompatibility>
    [`${prefix}/space-before-function-paren`]: [`off`],
    [`${prefix}/space-infix-ops`]: [`error`],

    // We allow if (any).
    [`${prefix}/strict-boolean-expressions`]: [`off`],
    [`${prefix}/switch-exhaustiveness-check`]: [`error`],
    [`${prefix}/triple-slash-reference`]: [`error`],
    [`${prefix}/type-annotation-spacing`]: [`error`],

    // It's recommended to use noImplicitAny and strictPropertyInitialization instead of this option.
    [`${prefix}/typedef`]: [`off`],

    // Ngxs uses static unbound getters as providers to @Select decorator.
    [`${prefix}/unbound-method`]: [
        `error`,
        {
            ignoreStatic: true,
        },
    ],
    [`${prefix}/unified-signatures`]: [`error`],
};
