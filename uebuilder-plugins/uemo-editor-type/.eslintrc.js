/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-29 14:53:02
 */

module.exports = {
    extends: ["plugin:@stone/base/ts"],
    parserOptions: {
        requireConfigFile: false,
        tsconfigRootDir: __dirname,
    },
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
    },
    globals: { Generator: "readonly", gsap: "readonly" },
    ignorePatterns: ["public/**/*.js", "static/**/*.js"],
};
