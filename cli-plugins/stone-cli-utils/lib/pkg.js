/*
 * @Description: package.json 相关操作
 * @Author: F-Stone
 * @LastEditTime: 2022-07-28 07:05:14
 */

const fs = require("fs");
const path = require("path");
const readPkg = require("read-pkg");

/**
 * 解析 package.json
 */
exports.resolvePkg = function (context) {
    if (fs.existsSync(path.join(context, "package.json"))) {
        return readPkg.sync({ cwd: context });
    }
    return {};
};
