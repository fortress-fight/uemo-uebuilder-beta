/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2024-01-23 22:43:35
 */

const path = require("path");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    const context = api.getCwd();
    const { targetFolder, sprite, svgo } = Object.assign(options.pluginOptions?.svgIcon || {}, {
        sprite: { symbolId: "icon-[name]" },
        svgo: {},
    });

    api.chainWebpack((chainWebpack) => {
        const svgRule = chainWebpack.module.rule("svg");

        chainWebpack.module.rules.delete("svg");

        chainWebpack.module
            .rule("svg")
            .oneOf("svgLoader")
            .resourceQuery(/vue-component/)
            .test(/\.(svg)(\?.*)?$/)
            .use("babel-loader")
            .loader("babel-loader")
            .end()
            .use("vue-svg-loader")
            .loader("vue-svg-loader")
            .options({
                svgo: {
                    plugins: [
                        { removeDimensions: true },
                        { prefixIds: true },
                        { cleanupIDs: true },
                        { convertShapeToPath: false },
                        { convertStyleToAttrs: true },
                    ],
                },
            })
            .end()
            .end()
            .oneOf("defaultSvgLoader")
            .merge(svgRule.toConfig())
            .end();
    });

    api.chainWebpack((chainWebpack) => {
        let icons = chainWebpack.module.rule("icons").test(/\.svg$/);
        if (targetFolder) {
            let addFolderArr = Array.isArray(targetFolder) ? targetFolder : [targetFolder];
            addFolderArr.forEach((folder) => {
                icons.include.add(folder);
                chainWebpack.module.rule("svg").exclude.add(folder).end();
            });
        }
        icons
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options(sprite)
            .end();
        if (sprite.extract) {
            chainWebpack.plugin("SpriteLoaderPlugin").use(SpriteLoaderPlugin);
        }
    });
};
