import type { Editor } from "@tiptap/core";
import type { TextDecorationAttrs } from "../src/index";

import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

/**
 * 获取当前选中文本的 DOM 节点
 *
 * 在 ProseMirror 中，selection 表示当前编辑器的选中状态
 * 这个函数用于获取选中文本对应的 DOM 节点，以便进行后续的动画操作
 *
 * @param editor - Tiptap 编辑器实例
 * @returns 返回选中文本的父级 DOM 节点
 */
function getNodeDom(editor: Editor) {
    // 获取当前编辑器的选中状态
    const selection = editor?.state.selection;
    // 获取选中位置对应的 DOM 节点
    const dom = editor.view.domAtPos(selection?.from || 0, 1);

    let node: Node | null = dom.node;
    // 如果节点是文本节点，则获取其父节点
    if (node.nodeType === 3) {
        node = node.parentNode;
    }

    return node;
}

/**
 * 播放 SVG 动画效果
 *
 * 使用 GSAP 动画库为文本装饰添加动画效果
 * 该函数会在选中的文本上应用 SVG 路径动画
 *
 * @param editor - Tiptap 编辑器实例
 * @param attr - 文本装饰属性，包含动画相关的配置
 * @param attr.duration - 动画持续时间
 * @param attr.delay - 动画延迟时间
 * @param attr.ease - 动画缓动函数
 */
export function playSvgAnimation(editor: Editor, attr: TextDecorationAttrs) {
    // 获取选中文本的 DOM 节点
    const dom = getNodeDom(editor);
    if (!(dom instanceof HTMLElement)) return;

    // 获取父级元素，用于定位 SVG 路径
    const parentDom = dom.parentElement;
    if (!parentDom) return;

    // 解构动画配置参数
    const { duration, delay, ease } = attr;

    // 使用 GSAP 创建 SVG 路径动画
    gsap.fromTo(
        parentDom.querySelector("path"),
        { drawSVG: "0%" }, // 动画起始状态：路径未绘制
        {
            drawSVG: "100%", // 动画结束状态：路径完全绘制
            delay: parseFloat(delay || "0s"), // 动画延迟时间
            duration: parseFloat(duration || "1s"), // 动画持续时间
            ease: ease || "power4.out", // 动画缓动函数
        }
    );
}
