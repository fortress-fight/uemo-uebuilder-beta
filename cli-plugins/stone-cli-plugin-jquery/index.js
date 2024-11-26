/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-09-13 00:06:39
 */

const webpack = require("webpack");
const path = require("path");

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    api.chainWebpack((chainWebpack) => {
        chainWebpack.resolveLoader.modules.prepend(
            path.join(__dirname, "node_modules")
        );
        if (chainWebpack.plugins.has("ProvidePlugin")) {
            chainWebpack.plugin("ProvidePlugin").tap((args) => {
                args[0].$ = "jquery";
            });
        } else {
            chainWebpack.plugin("ProvidePlugin").use(webpack.ProvidePlugin, [
                {
                    $: "jquery",
                },
            ]);
        }

        const jqConfig = options.pluginOptions?.jquery || { exposes: false };
        if (!jqConfig.exposes) return;
        chainWebpack.module
            .rule("jquery-exposer")
            .test(require.resolve("jquery"))
            .use("expose-loader")
            .loader(require.resolve("expose-loader"))
            .options({ exposes: jqConfig.exposes });
    });
};
