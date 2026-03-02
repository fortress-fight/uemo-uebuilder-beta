/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 12:12:06
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
                proxy: {
                    "/UeMaterial.Api": { target: "https://card.uemox.com:8081", changeOrigin: true },
                    "/ai-api": { target: "https://www.uemo.net", changeOrigin: true },
                },
                client: {
                    overlay: { errors: true, warnings: false, runtimeErrors: false },
                },
                server: {
                    type: "https",
                    options: { cert: "../../ssl/localhost+2.pem", key: "../../ssl/localhost+2-key.pem" },
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
