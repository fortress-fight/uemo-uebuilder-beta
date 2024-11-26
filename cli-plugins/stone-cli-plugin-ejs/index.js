/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-01-28 11:11:13
 */
// config that are specific to --target app
const fs = require("fs");
const path = require("path");

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    api.chainWebpack((webpackConfig) => {
        // only apply when there's no alternative target
        if (
            process.env.VUE_CLI_BUILD_TARGET &&
            process.env.VUE_CLI_BUILD_TARGET !== "app"
        ) {
            return;
        }

        webpackConfig.module
            .rule("ejs")
            .test(/\.ejs$/)
            .use("ejs-compiled-loader")
            .loader("ejs-compiled-loader")
            .options({
                beautify: true,
                htmlmin: webpackConfig.mode === "production",
                htmlminOptions: {
                    removeComments: true,
                },
            })
            .end();

        // HTML plugin
        const multiPageConfig = options.pages;
        const ejsConfig = options.pluginOptions?.ejs;

        // resolve HTML file(s)
        const htmlPath = api.resolve("src/pages/index.ejs");
        const defaultHtmlPath = path.resolve(__dirname, "index-default.ejs");
        const htmlRecord = [];

        const serviceWatchFiles =
            webpackConfig.devServer.get("watchFiles")?.paths || [];

        if (ejsConfig?.watchFiles) {
            serviceWatchFiles.push(...ejsConfig.watchFiles);
        }

        if (!multiPageConfig) {
            // default, single page setup.
            const templatePath = fs.existsSync(htmlPath)
                ? htmlPath
                : defaultHtmlPath;
            serviceWatchFiles.push(templatePath);
            webpackConfig.plugin("html").tap((args) => {
                args[0].template = templatePath;
                return args;
            });
            htmlRecord.push("index");
        } else {
            // multi-page setup
            const pages = Object.entries(multiPageConfig);
            pages.forEach(([name, param]) => {
                const templatePath = api.resolve(
                    param.template || `src/pages/${name}.ejs`
                );
                serviceWatchFiles.push(templatePath);
                webpackConfig.plugin(`html-${name}`).tap((args) => {
                    args[0].template = templatePath;
                    return args;
                });
                htmlRecord.push(name);
            });
        }

        webpackConfig.plugin("define").tap((arg) => {
            arg[0] = Object.assign(arg[0], {
                "process.env.EJS_PAGES": JSON.stringify(htmlRecord),
            });
            return arg;
        });

        webpackConfig.devServer.set("watchFiles", {
            paths: serviceWatchFiles,
        });
    });
};
