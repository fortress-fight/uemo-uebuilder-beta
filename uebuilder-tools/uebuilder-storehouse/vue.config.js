/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-22 00:13:02
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
                port: 9004,
                server: {
                    type: "https",
                    options: {
                        cert: "../../ssl/localhost+2.pem",
                        key: "../../ssl/localhost+2-key.pem",
                    },
                },
                proxy: {
                    "/UeMaterial.Api": { target: "https://card.uemox.com:8081", changeOrigin: true },
                    "/ai-api": { target: "https://www.uemo.net", changeOrigin: true },
                },
                client: {
                    overlay: { errors: true, warnings: false, runtimeErrors: false },
                },
            },
            pages: {
                // 基础层级，用于预览页面
                index: {
                    entry: "src/pages/index/index.ts",
                    template: "src/pages/index/index.ejs",
                },
            },
            // 输出到对应的项目目录
            outputDir: "../../dist/uebuilder-tools/app-storehouse",
        })
    );
};
