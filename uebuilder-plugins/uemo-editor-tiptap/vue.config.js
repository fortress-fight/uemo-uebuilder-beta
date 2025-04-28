/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-28 13:47:43
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
                }),
            ],
        }),
        defineConfig({
            devServer: {
                port: 9007,
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
                index: {
                    entry: "demo/pages/index/index.ts",
                    template: "demo/pages/index/index.ejs",
                },
            },
        })
    );
};
