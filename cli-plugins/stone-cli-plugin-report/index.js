/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-09-09 14:57:56
 */

const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    const reportOption = options.pluginOptions?.report || {
        open: false,
        config: {},
    };
    if (reportOption.open === false) return;
    api.chainWebpack((chainWebpack) => {
        chainWebpack
            .plugin("BundleAnalyzerPlugin")
            .use(BundleAnalyzerPlugin, [reportOption.config || {}]);
    });
};
