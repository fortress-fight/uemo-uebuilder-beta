/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2023-07-06 19:33:22
 */

const FileManagerPlugin = require("filemanager-webpack-plugin");

/** @type {import('../stone-cli-service/types').ServicePlugin} */
module.exports = (api, options) => {
    const filemanagerOptions = options.pluginOptions?.filemanager || false;

    api.chainWebpack((chainWebpack) => {
        if (filemanagerOptions === false) return;
        chainWebpack
            .plugin("FileManagerPlugin")
            .use(FileManagerPlugin, [filemanagerOptions]);
    });
};
