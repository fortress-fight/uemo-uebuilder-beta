/*
 * @Description: Vue 配置文件
 * @Author: F-Stone
 * @LastEditTime: 2024-11-26 16:19:24
 */

const createVueCli = require("@stone/stone-vue-config");
const path = require("path");
const webpack = require("webpack");
const envShortName =
    {
        development: "dev",
        production: "pro",
    }[process.env.NODE_ENV || "development"] || "dev";

function getCssModulesConfig() {
    const encodeKey = "ue-builder-v4-";
    const appStyleRegexp = /app\.scss$/;

    return {
        localIdentName: process.env.NODE_ENV == "production" ? "[hash:hex:5]" : "[name]-[local]-[hash:hex:5]",
        getLocalIdent: (context, localIdentName, localName, options) => {
            if (!appStyleRegexp.test(context.resourcePath)) return null;

            let localIdentHash = "";
            const hashDigestLength = 5;

            for (let tier = 0; localIdentHash.length < hashDigestLength; tier++) {
                const hash = webpack.util.createHash("xxhash64");
                const tierSalt = Buffer.allocUnsafe(4);

                tierSalt.writeUInt32LE(tier);

                hash.update(tierSalt);
                // TODO: bug in webpack with unicode characters with strings
                hash.update(Buffer.from(encodeKey + localName, "utf8"));

                localIdentHash = (localIdentHash + hash.digest("hex"))
                    // Remove all leading digits
                    .replace(/^\d+/, "")
                    // Replace all slashes with underscores (same as in base64url)
                    .replace(/\//g, "_")
                    // Remove everything that is not an alphanumeric or underscore
                    .replace(/[^A-Za-z0-9_]+/g, "")
                    .slice(0, hashDigestLength);
            }

            return localName + "-" + localIdentHash;
        },
        auto(resourcePath) {
            return appStyleRegexp.test(resourcePath) || /\.module\.\w+$/i.test(resourcePath);
        },
    };
}

module.exports = (publicPath = "./", param = {}) => {
    const useVueCliConfig = createVueCli(publicPath, {});

    useVueCliConfig.css = {
        sourceMap: process.NODE_ENV === "development",
        loaderOptions: { css: { modules: getCssModulesConfig() } },
    };

    const styleAssetsPath = path.dirname(require.resolve("@stone/uemo-editor-assets/assets/style/resource.scss"));
    const iconFontPath = path.dirname(require.resolve("@stone/uemo-icon-font/app.js"));

    useVueCliConfig.pluginOptions = {
        ...useVueCliConfig.pluginOptions,
        sass: {
            resource: {
                patterns: [
                    path.join(styleAssetsPath, "/**/_*.base.scss"),
                    path.join(styleAssetsPath, "/**/_*." + envShortName + ".scss"),
                    "./src/assets/style/resource/_*.scss",
                ],
            },
        },
        svgIcon: {
            targetFolder: [path.resolve(iconFontPath, "./svgo-clean"), path.resolve(iconFontPath, "./svg-raw")],
        },
        ...(param.pluginOptions || {}),
    };

    useVueCliConfig.configureWebpack.plugins.push(...(param.plugins || []));

    return useVueCliConfig;
};
