/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2024-02-26 16:21:11
 */

const path = require("path");

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    const context = api.getCwd();
    const sassOptions = options.pluginOptions?.sass || {};
    api.chainWebpack((chainWebpack) => {
        /**
         * @param {string[]} names
         */
        function changeSassRule(names) {
            const sassLoaderOption = sassOptions.options || {};
            ["scss", "sass"].forEach((type) => {
                names.forEach((name) => {
                    chainWebpack.module
                        .rule(type)
                        .oneOf(name)
                        .use("sass-loader")
                        .tap((options) => {
                            return Object.assign(options, sassLoaderOption);
                        });
                });
            });
        }
        function addResource(names) {
            const useResource = sassOptions.resource || {
                patterns: [],
            };
            ["scss", "sass"].forEach((type) => {
                names.forEach((name) => {
                    const rule = chainWebpack.module.rule(type).oneOf(name);
                    const hasStyleResource = rule.has("style-resource");
                    if (!hasStyleResource) {
                        rule.use("style-resource").loader("style-resources-loader").options(useResource);
                    } else {
                        rule.use("style-resource").tap((options) => {
                            options.patterns = options.patterns?.push(...useResource) || [];
                            return options;
                        });
                    }
                });
            });
        }
        chainWebpack.resolveLoader.modules.prepend(path.join(__dirname, "node_modules"));
        changeSassRule(["vue", "normal-modules", "normal", "vue-modules"]);
        addResource(["vue", "normal-modules", "normal", "vue-modules"]);

        function changePostcssRule(names) {
            names.forEach((name) => {
                chainWebpack.module
                    .rule("postcss")
                    .oneOf(name)
                    .use("postcss-loader")
                    .tap((options) => {
                        options.postcssOptions.plugins.push(require("postcss-sass-unicode"));
                        return options;
                    });
            });
        }
        changePostcssRule(["vue", "normal-modules", "normal", "vue-modules"]);
    });
};
