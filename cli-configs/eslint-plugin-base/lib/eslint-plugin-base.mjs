// eslint.config.mjs
import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import globals from "globals";

const publicRules = {
    "no-console": "off",
    "no-debugger": "off",
    "prefer-const": [
        "error",
        {
            destructuring: "all",
            ignoreReadBeforeAssign: false,
        },
    ],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    // https://github.com/typescript-eslint/typescript-eslint/issues/2462
    // "@typescript-eslint/no-useless-constructor": "error",
    // "@typescript-eslint/no-unused-vars": "off",
    // "@typescript-eslint/explicit-function-return-type": "off",
    // "@typescript-eslint/no-use-before-define": "off",
    // "@typescript-eslint/interface-name-prefix": "off",
    // "@typescript-eslint/no-namespace": "off",
    // "@typescript-eslint/camelcase": "off",
    // "@typescript-eslint/no-empty-function": "off",
    // "@typescript-eslint/ban-ts-ignore": "off",
    // "@typescript-eslint/explicit-module-boundary-types": "off",
    // "@typescript-eslint/ban-ts-comment": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
};

const publicTsRules = {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-argument": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unsafe-call": 0,
    "@typescript-eslint/prefer-function-type": 0,
    "@typescript-eslint/consistent-type-definitions": 0,
    "@typescript-eslint/no-unsafe-return": 0,
    "@typescript-eslint/prefer-nullish-coalescing": 0,
    "@typescript-eslint/no-unused-vars": [
        "error",
        {
            args: "all",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
        },
    ],
    "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
};

export default [
    ...pluginVue.configs["flat/essential"],
    {
        rules: publicRules,
        languageOptions: {
            ecmaVersion: 13,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.nodeBuiltin,
                ...globals.es2022,
                ...globals.commonjs,
            },
        },
    },
    ...vueTsEslintConfig({
        extends: [
            "eslintRecommended",
            "recommended",
            "strict",
            "stylistic",
            "recommendedTypeChecked",
            "stylisticTypeChecked",
        ],
    }),
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.vue"],
        rules: { "no-debugger": "off", "no-undef": "off", ...publicTsRules },
    },
    {
        files: ["**/*.d.ts"],
        rules: { ...publicTsRules },
    },
    {
        files: ["**/*.vue"],
        rules: {
            ...publicTsRules,
            "no-undef": "off",
            "vue/no-v-html": "off",
            "vue/html-indent": "off",
            "vue/max-attributes-per-line": "off",
            "vue/html-self-closing": "off",
            "vue/singleline-html-element-content-newline": "off",
        },
    },
    { files: ["**/*.js", "**/*.mjs"], rules: { ...publicTsRules, "@typescript-eslint/no-require-imports": 0 } },
];
