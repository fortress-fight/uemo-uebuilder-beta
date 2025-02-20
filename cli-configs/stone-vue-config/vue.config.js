/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 19:15:21
 */
const { defineConfig } = require("@stone/vue-cli-service");
const path = require("path");
const webpack = require("webpack");

const envShortName =
    {
        development: "dev",
        production: "pro",
    }[process.env.NODE_ENV || "development"] || "dev";

process.setMaxListeners(0);

module.exports = (publicPath = "./", param = {}) => {
    return defineConfig({
        publicPath,
        parallel: process.NODE_ENV === "development",
        // 默认情况下babel-loader忽略node_modules. 您可以启用此选项以避免来自第三方依赖项的意外未转换代码。
        transpileDependencies: [],
        productionSourceMap: false,
        css: {
            sourceMap: process.NODE_ENV === "development",
        },
        configureWebpack: {
            devtool: process.NODE_ENV === "development",
            output: { libraryExport: "default" },
            resolve: {
                alias: {
                    "~": path.resolve(process.cwd(), "./"),
                    "@": path.resolve(process.cwd(), "./src"),
                },
            },
            plugins: [
                // VueMacros(),
                require("unplugin-auto-import/webpack").default({
                    // targets to transform
                    include: [
                        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                        /\.vue\?vue&type=script/, // .vue
                    ],

                    dts: true,

                    // global imports to register
                    imports: ["vue", "vue-i18n"],
                }),
                require("unplugin-vue-macros/webpack")({
                    // overrides plugin options
                }),
                ...(param.plugins || []),
            ],
        },
        chainWebpack: (config) => {
            config.optimization.minimizer("terser").tap((args) => {
                args.map((v) => {
                    v.terserOptions = {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                        },
                    };
                    v.extractComments = true;
                });
                return args;
            });
            config.plugin("fork-ts-checker").tap((args) => {
                args[0]["typescript"]["memoryLimit"] = 4096;
                return args;
            });
            config.plugin("define").tap((definitions) => {
                definitions[0]["process.env"]["PUBLIC_PATH"] = JSON.stringify(publicPath);
                definitions[0]["process.env"]["BUILD_TARGET"] = JSON.stringify(process.env.BUILD_TARGET);
                Object.assign(definitions[0], {
                    __VUE_OPTIONS_API__: "true",
                    __VUE_PROD_DEVTOOLS__: "false",
                    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
                });
                return definitions;
            });
        },
        pluginOptions: {
            dll: { entry: { vendor: ["jquery"] } },
            ...(param.pluginOptions || {}),
        },
    });
};
