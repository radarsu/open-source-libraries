const prefix = `import`;

export const pluginImport = {
    [`${prefix}/consistent-type-specifier-style`]: [`error`],
    [`${prefix}/default`]: [`error`],

    // We don't use webpack chunks.
    [`${prefix}/dynamic-import-chunkname`]: [`off`],
    [`${prefix}/export`]: [`error`],
    [`${prefix}/exports-last`]: [`error`],

    // <angular-incompatibility>
    [`${prefix}/extensions`]: [`off`],
    [`${prefix}/first`]: [`error`],

    // Exporting during declaration feels more straightforward.
    [`${prefix}/group-exports`]: [`off`],

    // 10 dependencies forces refactoring too often, when there are not yet clear ways of splitting the code.
    [`${prefix}/max-dependencies`]: [`error`, { max: 20 }],
    [`${prefix}/named`]: [`error`],
    [`${prefix}/namespace`]: [`error`],
    [`${prefix}/newline-after-import`]: [`error`],
    [`${prefix}/no-absolute-path`]: [`error`],
    [`${prefix}/no-amd`]: [`error`],
    [`${prefix}/no-anonymous-default-export`]: [`error`],

    // We allow module.exports etc. for scripts.
    [`${prefix}/no-commonjs`]: [`off`],
    [`${prefix}/no-cycle`]: [`error`],

    // Default exports are fine and make perfect sense.
    [`${prefix}/no-default-export`]: [`off`],
    [`${prefix}/no-deprecated`]: [`error`],
    [`${prefix}/no-duplicates`]: [`error`],
    [`${prefix}/no-dynamic-require`]: [`error`],
    [`${prefix}/no-empty-named-blocks`]: [`error`],
    [`${prefix}/no-extraneous-dependencies`]: [`error`],
    [`${prefix}/no-import-module-exports`]: [`error`],

    // Importing submodules is necessary.
    [`${prefix}/no-internal-modules`]: [`off`],
    [`${prefix}/no-mutable-exports`]: [`error`],
    [`${prefix}/no-named-as-default-member`]: [`error`],
    [`${prefix}/no-named-as-default`]: [`error`],
    [`${prefix}/no-named-default`]: [`error`],

    // We prefer named exports over default exports.
    [`${prefix}/no-named-export`]: [`off`],

    // Namespace is actually great to group imports.
    [`${prefix}/no-namespace`]: [`off`],

    // We use Node.js.
    [`${prefix}/no-nodejs-modules`]: [`off`],

    // We allow relative packages.
    [`${prefix}/no-relative-packages`]: [`off`],

    // Tree directory structure is not always possible.
    [`${prefix}/no-relative-parent-imports`]: [`off`],
    [`${prefix}/no-restricted-paths`]: [`error`],
    [`${prefix}/no-self-import`]: [`error`],
    [`${prefix}/no-unassigned-import`]: [`error`],

    // This rule seems to be working wrong in a lot of cases.
    [`${prefix}/no-unresolved`]: [`off`],
    [`${prefix}/no-unused-modules`]: [`error`],
    [`${prefix}/no-useless-path-segments`]: [`error`],
    [`${prefix}/no-webpack-loader-syntax`]: [`error`],

    // <sort-imports-incompatibility> and other eslint/prettier behaviors.
    [`${prefix}/order`]: [`off`],

    // We prefer named exports over default exports.
    [`${prefix}/prefer-default-export`]: [`off`],

    // Not sure what this one is doing, but doesn't allow module.exports.
    [`${prefix}/unambiguous`]: [`off`],
};
