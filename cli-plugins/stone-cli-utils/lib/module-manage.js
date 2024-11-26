/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-06-20 02:37:30
 */

const path = require("path");
const Module = require("module");

/**
 * 构造 require 函数
 * @return {object} require http://nodejs.cn/api/modules.html#requireid
 */
//  如果不存在，则添加 Node 的 `Module.createRequireFromPath`
const createRequire =
    Module.createRequire ||
    Module.createRequireFromPath ||
    function (filename) {
        const mod = new Module(filename, null);
        mod.filename = filename;
        mod.paths = Module._nodeModulePaths(path.dirname(filename));

        mod._compile(`module.exports = require;`, filename);

        return mod.exports;
    };

/**
 * 解析模块 返回 将加载的确切文件名
 * @param {string} request 加载目标文件
 * @param {string} context 执行路径
 * @return {string} resolvedPath 解析模块的路径
 */
exports.resolveModule = function (request, context) {
    let resolvedPath;
    try {
        try {
            resolvedPath = createRequire(
                path.resolve(context, "package.json")
            ).resolve(request);
        } catch (e) {
            resolvedPath = require.resolve(request, { paths: [context] });
        }
    } catch (e) {
        //
    }
    return resolvedPath;
};

/**
 * 加载模块
 * @param {string} request 加载目标文件
 * @param {string} context 执行路径
 * @param {boolean} force 是否强制加载
 */
exports.loadModule = function (request, context, force = false) {
    try {
        return createRequire(path.resolve(context, "package.json"))(request);
    } catch (e) {
        const resolvedPath = exports.resolveModule(request, context);
        if (resolvedPath) {
            if (force) {
                clearRequireCache(resolvedPath);
            }
            return require(resolvedPath);
        }
    }
};

/**
 * 清空 require 缓存信息
 */
function clearRequireCache(id, map = new Map()) {
    const module = require.cache[id];
    if (module) {
        map.set(id, true);
        // Clear children modules
        module.children.forEach((child) => {
            if (!map.get(child.id)) clearRequireCache(child.id, map);
        });
        delete require.cache[id];
    }
}
