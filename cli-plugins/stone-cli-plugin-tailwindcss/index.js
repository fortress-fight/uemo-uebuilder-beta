/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-07-06 17:52:06
 */
const path = require("path");
const { logger, chalk } = require("@stone/stone-cli-utils");

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    const context = api.getCwd();
    const tailwindcssOptions = options.tailwindcss || {
        cssPath: "",
        view: {
            port: 3000,
            config: "tailwind.config.js",
            open: true,
        },
    };

    api.chainWebpack((chainWebpack) => {
        const defaultCssPath = path.resolve(__dirname, "./lib/main.css");
        const useCssPath = tailwindcssOptions.cssPath
            ? path.relative(context, tailwindcssOptions.cssPath)
            : defaultCssPath;
        chainWebpack.resolveLoader.modules.prepend(
            path.join(__dirname, "node_modules")
        );
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
                            require("tailwindcss")
                        );
                        return options;
                    });
            });
        }
        changePostcssRule(["vue", "normal-modules", "normal", "vue-modules"]);
    });

    api.registerCommand(
        "tailwindcss-config-viewer",
        {
            description: "start development server",
            usage: "vue-cli-service tailwind-config-viewer [options]",
            options: {
                "--port":
                    "The port to run the viewer on. If occupied it will use next available port. (default: 3000)",
                "--open": "Open the viewer in default browser",
                "--config": "Path to your Tailwind config file",
            },
        },
        (args) => {
            const port = args.port || tailwindcssOptions.view.port || 3000;
            require("tailwind-config-viewer/server")({
                port,
                tailwindConfigProvider: () => {
                    const configPath = path.resolve(
                        context,
                        args.config ||
                            tailwindcssOptions.view.config ||
                            "tailwind.config.js"
                    );
                    delete require.cache[configPath];
                    return require(configPath);
                },
                shouldOpen: args.open || tailwindcssOptions.view.open || true,
            }).start();
            logger.clearConsole();
            console.log();
            console.log(`Tailwind Viewer:`);
            console.log(
                `  - Local:   ${chalk.cyan("http://localhost:" + port)}`
            );
            console.log();
        }
    );
};
