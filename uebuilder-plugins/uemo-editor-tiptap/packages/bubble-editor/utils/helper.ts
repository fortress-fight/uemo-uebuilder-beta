/*
 * @Description: tiptap 气泡模式编辑器辅助函数
 * @Author: F-Stone
 * @LastEditTime: 2025-04-01 23:14:06
 */

/**
 * 匹配气泡模式编辑器中的链接
 *
 * @param {string} content - 需要匹配的内容
 * @returns {RegExpMatchArray | null} 匹配结果
 */
export const linkRegex = /<\/a>(\s|&nbsp;)*?(?=<a\s+[^>]*data-layout[^>]*>)/gm;
