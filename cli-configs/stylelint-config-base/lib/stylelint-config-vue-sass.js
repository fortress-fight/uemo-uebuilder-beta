/*
 * @Description: sass stylelint config
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 00:27:44
 */

module.exports = {
    extends: ["stylelint-config-sass-guidelines", "stylelint-prettier/recommended", "./stylelint-config-base-rules"],
    plugins: [
        "stylelint-order",
        "stylelint-no-unsupported-browser-features",
        "stylelint-declaration-block-no-ignored-properties",
    ],
    rules: {
        "plugin/no-unsupported-browser-features": [
            true,
            {
                severity: "warning",
                browsers: [">=0.2%", "defaults", "not OperaMini all", "not IE 11"],
                ignore: [
                    "grid-template-columns",
                    "css-gradients",
                    "css3-cursors",
                    "css3-cursors-grab",
                    "css-appearance",
                    "css-nesting",
                    "css-when-else",
                    "css-math-functions",
                    "css-focus-within",
                    "css-color-function",
                    "css-overflow",
                ],
            },
        ],
        "plugin/declaration-block-no-ignored-properties": true,
        "scss/selector-no-redundant-nesting-selector": null,
        "scss/dollar-variable-pattern": "^[a-z][a-z0-9\\-_]*[a-z0-9]*$",

        "@stylistic/function-parentheses-space-inside": null,
    },
    overrides: [
        {
            files: "**/*.ejs",
            customSyntax: "postcss-html",
        },
        {
            files: "**/*.html",
            customSyntax: "postcss-html",
        },
        {
            files: "**/*.vue",
            customSyntax: "postcss-html",
        },
        {
            files: "**/*.scss",
            customSyntax: "postcss-scss",
        },
    ],
};
