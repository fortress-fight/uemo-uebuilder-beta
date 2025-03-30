/*
 * @Description: sass stylelint config
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 10:36:08
 */

module.exports = {
    extends: ["stylelint-config-sass-guidelines", "stylelint-prettier/recommended", "./stylelint-config-base-rules"],
    plugins: [
        "stylelint-order",
        "stylelint-no-unsupported-browser-features",
        "stylelint-declaration-block-no-ignored-properties",
    ],
};
