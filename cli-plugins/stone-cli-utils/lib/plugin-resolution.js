/*
 * @Description: @stone/cli-plugin 相关
 * @Author: F-Stone
 * @LastEditTime: 2022-07-29 01:06:51
 */

/**
 * 插件的命名规范
 */
const pluginRE = /^(@stone\/)stone-cli-plugin-/;
const officialRE = /^@stone\//;

/**
 * 是否是 plugin 插件
 */
exports.isPlugin = (id) => pluginRE.test(id);

/**
 * 是否为 "@stone/" 开头的官方插件
 */
exports.isOfficialPlugin = (id) => exports.isPlugin(id) && officialRE.test(id);

const scopeRE = /^@[\w-]+(\.)?[\w-]+\//;
/**
 * 验证 input 与 full 是否是同意 Plugin
 * @param {string} input - Plugin ID
 * @param {string} full - 需要对照的 Plugin Name 或 Plugin ID
 * @return {boolean}
 */
exports.matchesPluginId = (input, full) => {
    const short = full.replace(pluginRE, "");
    return (
        // input is full
        full === input ||
        // input is short without scope
        short === input ||
        // input is short with scope
        short === input.replace(scopeRE, "")
    );
};

/**
 * 简化包名称
 */
exports.toShortPluginId = (id) => id.replace(pluginRE, "");

exports.getPluginLink = (id) => {
    if (officialRE.test(id)) {
        return `https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-${exports.toShortPluginId(
            id
        )}`;
    }
    let pkg = {};
    try {
        pkg = require(`${id}/package.json`);
    } catch (e) {}
    return (
        pkg.homepage ||
        (pkg.repository && pkg.repository.url) ||
        `https://www.npmjs.com/package/${id.replace(`/`, `%2F`)}`
    );
};
