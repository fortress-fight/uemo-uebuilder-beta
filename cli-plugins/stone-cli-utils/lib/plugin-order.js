const { warn } = require("./logger");

/** @typedef {{after?: string|Array<string>}} Apply */
/** @typedef {{id: string, apply: Apply}} Plugin */
/** @typedef {{after: Set<string>}} OrderParams */

/** @type {Map<string, OrderParams>} */
const orderParamsCache = new Map();

/**
 *
 * @param {Plugin} plugin
 * @returns {OrderParams}
 */
function getOrderParams(plugin) {
    if (orderParamsCache.has(plugin.id)) {
        return orderParamsCache.get(plugin.id);
    }
    const apply = plugin.apply;

    let after = new Set();
    if (typeof apply.after === "string") {
        after = new Set([apply.after]);
    } else if (Array.isArray(apply.after)) {
        after = new Set(apply.after);
    }
    orderParamsCache.set(plugin.id, { after });

    return { after };
}

/**
 * See leetcode 210
 * @param {Array<Plugin>} plugins
 * @returns {Array<Plugin>}
 */
function topologicalSorting(plugins) {
    /** @type {Map<string, Plugin>} */
    const pluginsMap = new Map(plugins.map((p) => [p.id, p]));

    /**
     * 记录 Plugin After 的个数
     * @type {Map<Plugin, number>}
     * */
    const indegrees = new Map();

    /**
     * 记录需要跟随在 Plugin 后面的内容
     * @type {Map<Plugin, Array<Plugin>>}
     * */
    const graph = new Map();

    plugins.forEach((p) => {
        const after = getOrderParams(p).after;
        indegrees.set(p, after.size);
        if (after.size === 0) return;
        for (const id of after) {
            const prerequisite = pluginsMap.get(id);
            // remove invalid data
            // 移除无效Plugin的计数
            if (!prerequisite) {
                indegrees.set(p, indegrees.get(p) - 1);
                continue;
            }

            if (!graph.has(prerequisite)) {
                graph.set(prerequisite, []);
            }
            graph.get(prerequisite).push(p);
        }
    });

    /**
     * 排序后的结果
     */
    const res = [];
    /**
     * 临时的一个队列，用于存放初步筛选的Plugin
     */
    const queue = [];
    indegrees.forEach((d, p) => {
        // after 为 0，传入队列，等待确认其后续的 Plugin
        if (d === 0) queue.push(p);
    });
    while (queue.length) {
        const cur = queue.shift();
        res.push(cur);

        /**
         * Plugin 的后续模块
         */
        const neighbors = graph.get(cur);
        if (!neighbors) continue;

        neighbors.forEach((n) => {
            // 更新 Plugin N 之前 Plugin 的长度
            const degree = indegrees.get(n) - 1;
            indegrees.set(n, degree);

            // 当在 N 之前的 Plugin 个数为 0时，将 Plugin 存入之前临时队列
            if (degree === 0) {
                queue.push(n);
            }
        });
    }
    const valid = res.length === plugins.length;

    // 给定的 Order 不正确，例如，当给定的 Order 中出现，首尾相连的情况
    if (!valid) {
        warn(`No proper plugin execution order found.`);
        return plugins;
    }
    return res;
}

/**
 * Arrange plugins by 'after' property.
 * @param {Array<Plugin>} plugins
 * @returns {Array<Plugin>}
 */

function sortPlugins(plugins) {
    if (plugins.length < 2) return plugins;

    return topologicalSorting(plugins);
}

module.exports = {
    topologicalSorting,
    sortPlugins,
};
