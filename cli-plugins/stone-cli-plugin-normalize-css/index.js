/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2024-11-27 13:41:21
 */

const path = require("path");

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    api.chainWebpack((chainWebpack) => {
        const resetCssConfig = options.pluginOptions?.resetCss;
        if (resetCssConfig === false) {
            return;
        }
        const useCssPath = path.resolve(__dirname, "./lib/reset.css");
        if (!options.pages) {
            chainWebpack.entry("app").add(useCssPath);
        } else {
            Object.keys(options.pages).forEach((name) => {
                chainWebpack.entry(name).prepend(useCssPath);
            });
        }
        function changePostcssRule(names) {
            names.forEach((name) => {
                chainWebpack.module
                    .rule("postcss")
                    .oneOf(name)
                    .use("postcss-loader")
                    .tap((options) => {
                        options.postcssOptions.plugins.push(
                            require("postcss-normalize")()
                        );
                        return options;
                    });
            });
        }
        changePostcssRule(["vue", "normal-modules", "normal", "vue-modules"]);
    });
};
