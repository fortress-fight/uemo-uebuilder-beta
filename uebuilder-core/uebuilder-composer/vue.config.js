/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-13 17:01:11
 */

const getBaseConfig = require("@stone/uebuilder-vue-config");
const { defineConfig } = require("@stone/vue-cli-service");

module.exports = () => {
    return Object.assign(
        getBaseConfig(undefined, {
            plugins: [
                require("unplugin-auto-import/webpack").default({
                    dts: true,
                    include: [
                        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                        /\.vue\?vue&type=script/, // .vue
                    ],
                    imports: ["vue", "vue-router", { "@stone/uemo-editor-i18n": ["useI18n"] }],
                    // imports: ["vue", "vue-i18n", "vue-router", { "~/utils/error": ["UeElError", "UeElErrorCode"] }],
                }),
            ],
        }),
        defineConfig({
            devServer: {
                port: 9006,
                server: { type: "https" },
                proxy: {
                    "/UeMaterial.Api": { target: "https://card.uemox.com:8081", changeOrigin: true },
                    "/ai-api": { target: "https://www.uemo.net", changeOrigin: true },
                },
                client: {
                    overlay: { errors: true, warnings: false, runtimeErrors: false },
                },
            },
            pages: {
                // 基础层级，用于展示页面
                index: {
                    entry: "src/pages/index/index.ts",
                    template: "src/pages/index/index.ejs",
                },
                // 工厂层级，用于对页面进行编辑
                factory: {
                    entry: "src/pages/factory/index.ts",
                    template: "src/pages/factory/index.ejs",
                },
            },
            outputDir: `../../dist/uebuilder-${process.env.BUILD_TARGET}/uebuilder-composer`,
        })
    );
};

// devServer: {
//     port: 9006,
//     client: {
//         overlay: { errors: true, warnings: false, runtimeErrors: false },
//     },
// },
// outputDir: `../../dist/uebuilder-${process.env.BUILD_TARGET}/app-start`,
// pages: {
//     index: {
//         entry: "src/pages/index/index.ts",
//         template: "src/pages/index/index.ejs",
//     },
//     factory: {
//         entry: "src/pages/factory/index.ts",
//         template: "src/pages/factory/index.ejs",
//     },
// },
