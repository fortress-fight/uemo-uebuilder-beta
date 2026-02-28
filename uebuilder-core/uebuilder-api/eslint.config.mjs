import eslintPlugin from "@stone/eslint-plugin-base/lib/eslint-plugin-base.mjs";

export default [
    { ignores: ["public/**/*.js", "static/**/*.js", "dll/**/*.js", "**/auto-imports.d.ts"] },
    ...eslintPlugin,
    {
        languageOptions: {
            globals: { Generator: "readonly" },
        },
        rules: {
            "@typescript-eslint/no-var-requires": 0,
            "@typescript-eslint/no-non-null-assertion": 0,
            "vue/multi-word-component-names": 0,
        },
    },
];
