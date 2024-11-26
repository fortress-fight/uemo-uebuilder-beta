/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2024-11-27 14:57:50
 */

const getBaseConfig = require("@stone/uebuilder-vue-config");
const { defineConfig } = require("@stone/vue-cli-service");

module.exports = () => {
    return Object.assign(
        getBaseConfig(),
        defineConfig({
            devServer: {
                port: 9007,
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
