/*
 * @Description: 建议匹配工具函数
 * @Author: F-Stone
 * @LastEditTime: 2025-04-28 01:44:33
 */
import type { ResolvedPos } from "@tiptap/pm/model";
import type { Range } from "@tiptap/core";
import { escapeForRegEx } from "@tiptap/core";

/**
 * 触发建议的配置接口
 * @interface Trigger
 * @property {string[]} char - 触发字符数组
 * @property {boolean} allowSpaces - 是否允许空格
 * @property {string[] | null} allowedPrefixes - 允许的前缀字符数组
 * @property {boolean} startOfLine - 是否必须在行首
 * @property {ResolvedPos} $position - 当前光标位置
 */
export interface Trigger {
    char: string[];
    allowSpaces: boolean;
    allowedPrefixes: string[] | null;
    startOfLine: boolean;
    $position: ResolvedPos;
}

/**
 * 建议匹配结果类型
 * @typedef {Object} SuggestionMatch
 * @property {Range} range - 匹配的文本范围
 * @property {string} query - 查询字符串（不包含触发字符）
 * @property {string} text - 完整匹配文本（包含触发字符）
 */
export type SuggestionMatch = {
    range: Range;
    query: string;
    text: string;
} | null;

/**
 * 创建正则表达式模式
 * @private
 * @param {string} char - 触发字符
 * @param {boolean} allowSpaces - 是否允许空格
 * @param {boolean} startOfLine - 是否必须在行首
 * @returns {RegExp} 正则表达式对象
 */
function createRegexPattern(char: string, allowSpaces: boolean, startOfLine: boolean): RegExp {
    const escapedChar = escapeForRegEx(char);
    const prefix = startOfLine ? "^" : "";
    return allowSpaces
        ? new RegExp(`${prefix}${escapedChar}.*?(?=\\s${escapedChar}|$)`, "gm")
        : new RegExp(`${prefix}(?:^)?${escapedChar}[^\\s${escapedChar}]*`, "gm");
}

/**
 * 检查前缀是否允许
 * @private
 * @param {string} prefix - 前缀字符
 * @param {string[] | null} allowedPrefixes - 允许的前缀列表
 * @returns {boolean} 是否允许该前缀
 */
function isPrefixAllowed(prefix: string, allowedPrefixes: string[] | null): boolean {
    if (allowedPrefixes === null) return true;
    return new RegExp(`^[${allowedPrefixes.join("")}\0]?$`).test(prefix);
}

/**
 * 处理匹配结果
 * @private
 * @param {RegExpMatchArray} match - 正则匹配结果
 * @param {number} textFrom - 文本起始位置
 * @param {number} currentPos - 当前光标位置
 * @param {boolean} allowSpaces - 是否允许空格
 * @param {string} text - 完整文本
 * @returns {SuggestionMatch} 处理后的匹配结果
 */
function processMatch(
    match: RegExpMatchArray,
    textFrom: number,
    currentPos: number,
    allowSpaces: boolean,
    text: string
): SuggestionMatch {
    if (!match.input || match.index === undefined) return null;

    // 计算匹配项在文档中的绝对位置
    const from = textFrom + match.index;
    let to = from + match[0].length;

    // 处理特殊情况：如果允许空格且正好在两个触发字符之间
    if (allowSpaces && new RegExp(`\\s${escapeForRegEx(match[0][0])}$`).test(text.slice(to - 1, to + 1))) {
        match[0] += " ";
        to += 1;
    }

    // 如果当前光标位置在匹配范围内，返回匹配结果
    if (from < currentPos && to >= currentPos) {
        return {
            range: { from, to },
            query: match[0].slice(1),
            text: match[0],
        };
    }

    return null;
}

/**
 * 查找建议匹配
 * @function findSuggestionMatch
 * @param {Trigger} config - 触发配置
 * @returns {SuggestionMatch} 返回匹配结果，如果没有匹配则返回 null
 * @description 根据配置查找文本中的建议匹配，支持单个或多个触发字符，可以处理空格和前缀限制
 */
export function findSuggestionMatch(config: Trigger): SuggestionMatch {
    const { char, allowSpaces, allowedPrefixes, startOfLine, $position } = config;
    const text = $position.nodeBefore?.isText && $position.nodeBefore.text;

    if (!text) return null;

    const textFrom = $position.pos - text.length;
    const chars = typeof char === "string" ? [char] : char;

    for (const currentChar of chars) {
        const regexp = createRegexPattern(currentChar, allowSpaces, startOfLine);

        const matches = Array.from(text.matchAll(regexp));

        for (const match of matches) {
            if (!match.input || match.index === undefined) continue;

            const matchPrefix = match.input.slice(Math.max(0, match.index - 1), match.index);

            if (!isPrefixAllowed(matchPrefix, allowedPrefixes)) continue;

            const result = processMatch(match, textFrom, $position.pos, allowSpaces, text);
            if (result) return result;
        }
    }

    return null;
}
