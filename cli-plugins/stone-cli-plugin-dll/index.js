const { logger, fs, spinner } = require("@stone/stone-cli-utils");
const webpack = require("webpack");
const path = require("path");
const cssPath = "css";
const jsPath = "js";

const defaults = {
    clean: true,
};

function getAssetPath(options, filePath) {
    return options.assetsDir
        ? path.posix.join(options.assetsDir, filePath)
        : filePath;
}

/**
 * @param {import("../stone-cli-service/types").PluginAPI} api
 * @param {import("../stone-cli-service/types").ProjectOptions} options
 */
function getDllOutputInfo(api, options) {
    const { pluginOptions, filenameHashing } = options;
    const { filename, library, outputDir, entry } = pluginOptions?.dll || {};
    const dllName =
        filename || `[name]_dll${filenameHashing ? ".[fullhash:8]" : ""}`;
    const dllLib =
        library || `[name]_dll${filenameHashing ? "_[fullhash:8]" : ""}`;

    return {
        entry: entry,
        library: dllLib,
        filename: dllName,
        outputPath: api.resolve(outputDir || "dll"),
        outputJsFileName: getAssetPath(options, `${jsPath}/${dllName}.js`),
        outputCssFileName: getAssetPath(options, `${cssPath}/${dllName}.css`),
    };
}

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    const abort = (msg) => {
        logger.log();
        logger.error(msg);
        process.exit(1);
    };
    api.registerCommand(
        "dll",
        {
            description: "build for dll",
            usage: "stone-cli-service dll",
            options: {},
        },
        async (args) => {
            for (const key in defaults) {
                if (args[key] == null) {
                    args[key] = defaults[key];
                }
            }
            const entry = options.pluginOptions.dll.entry;

            if (!entry) {
                abort(
                    `Failed to resolve dll entry: Make sure to specify the correct entry file.`
                );
                return;
            }
            process.env.VUE_CLI_DLL_BUILD = true;
            process.env.VUE_CLI_BUILD_TARGET = "dll";

            logger.log();

            const mode = api.service.mode;
            spinner.logWithSpinner(`Building dll for ${mode}...`);

            const webpackConfig = resolveDllConfig(api, options);

            if (args.stdin) {
                process.stdin.on("end", () => {
                    process.exit(0);
                });
                process.stdin.resume();
            }

            const { outputPath } = getDllOutputInfo(api, options);
            if (args.clean) {
                await fs.emptyDir(outputPath);
            }

            // const formatStats = require(path.resolve(
            //     require.resolve("@stone/vue-cli-service"),
            //     "../../lib/commands/build/format-stats.js"
            // ));
            return new Promise((resolve, reject) => {
                webpack(webpackConfig, (err, stats) => {
                    spinner.stopSpinner(false);
                    if (err) {
                        return reject(err);
                    }

                    if (stats.hasErrors()) {
                        return reject(new Error("Build failed with errors."));
                    }

                    if (!args.silent) {
                        // const targetDirShort = path.relative(
                        //     api.service.context,
                        //     outputPath
                        // );
                        // logger.log(formatStats(stats, targetDirShort, api));
                    }

                    resolve();
                });
            });
        }
    );

    api.chainWebpack((config) => {
        if (process.env.VUE_CLI_DLL_BUILD) return;

        const { outputPath, entry } = getDllOutputInfo(api, options);
        if (!entry) return;

        if (fs.existsSync(outputPath)) {
            fs.readdirSync(outputPath)
                .filter((e) => e.match(/.*\.json$/gi))
                .map((f) => {
                    const filepath = path.resolve(outputPath, f);
                    config
                        .plugin(`${path.parse(f).name}-DllReference`)
                        .use(webpack.DllReferencePlugin, [
                            { manifest: filepath },
                        ]);
                });
            const jsFileConfig = {
                filepath: path.resolve(outputPath, jsPath, "*.js"),
                publicPath: path.posix.join(options.publicPath, jsPath),
                outputPath: jsPath,
                typeOfAsset: "js",
            };

            const cssFileConfig = {
                filepath: path.resolve(outputPath, cssPath, "*.css"),
                publicPath: path.posix.join(options.publicPath, cssPath),
                outputPath: cssPath,
                typeOfAsset: "css",
            };

            config
                .plugin("add-asset-html")
                .use(require("add-asset-html-webpack-plugin"), [
                    [jsFileConfig, cssFileConfig],
                ]);
        } else {
            //
        }
    });
};

/**
 * @param {import("../stone-cli-service/types").PluginAPI} api
 * @param {import("../stone-cli-service/types").ProjectOptions} options
 */
function resolveDllConfig(api, options) {
    const { library, outputPath, outputJsFileName, outputCssFileName, entry } =
        getDllOutputInfo(api, options);

    const config = api.resolveChainableWebpackConfig();

    config.plugin("dll").use(webpack.DllPlugin, [
        {
            name: library,
            path: path.resolve(outputPath, "[name]_manifest.json"),
        },
    ]);

    // adjust css output name so they write to the same file
    if (config.plugins.has("extract-css")) {
        config.plugin("extract-css").tap((args) => {
            args[0].filename = outputCssFileName;
            return args;
        });
    }

    const rawConfig = api.resolveWebpackConfig(config);
    rawConfig.entry = entry;
    rawConfig.output = Object.assign(rawConfig.output, {
        filename: outputJsFileName,
        path: outputPath,
        library: library,
    });

    return rawConfig;
}

module.exports.defaultModes = {
    build: "production",
};
