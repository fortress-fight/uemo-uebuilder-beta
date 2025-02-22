/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-22 23:25:43
 */

const getBaseConfig = require("@stone/uebuilder-vue-config");
const { defineConfig } = require("@stone/vue-cli-service");

module.exports = () => {
    return Object.assign(
        getBaseConfig(),
        defineConfig({
            devServer: {
                port: 9007,
                server: { type: "https" },
                proxy: {
                    "/UeMaterial.Api": { target: "https://card.uemox.com:8081", changeOrigin: true },
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
