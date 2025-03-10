/*
 * @Description: sass stylelint config
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 10:35:33
 */

module.exports = {
    extends: ["stylelint-config-sass-guidelines", "stylelint-prettier/recommended", "./stylelint-config-base-rules"],
    plugins: [
        "stylelint-order",
        "stylelint-no-unsupported-browser-features",
        "stylelint-declaration-block-no-ignored-properties",
    ],
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
