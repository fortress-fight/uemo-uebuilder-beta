import type { Attribute } from "@tiptap/core";
import type { TextDecorationAttrs } from "./index";

import "@tiptap/extension-text-style";
import { Mark, getMarkAttributes } from "@tiptap/core";

import $pageStyle from "../../../src/app.module.scss";
import decorationSvgData from "../utils/decoration-svg-data";
import { playSvgAnimation } from "../utils/helper";

/**
 * 文本装饰扩展的配置选项
 */
export type TextDecorationOptions = {
    HTMLAttributes: TextDecorationAttrs;
};

/**
 * 扩展 Tiptap 的命令类型定义
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        textDecoration: {
            openTextDecorationEditorPanel: (param: { rect: UE_TIPTAP_UNIT.PositionRect }) => ReturnType;
            setTextDecoration: (param: Partial<TextDecorationAttrs>) => ReturnType;
            unsetTextDecoration: () => ReturnType;
            playTextDecorationAnimate: () => ReturnType;
        };
    }
}

/**
 * 文本装饰扩展
 *
 * 这是一个 Tiptap 的 Mark 扩展，用于为文本添加装饰效果
 * 支持 SVG 动画、颜色、宽度等属性
 */
export const TextDecoration = Mark.create<TextDecorationOptions>({
    name: "textDecoration",

    keepOnSplit: false,
    group: "inline",
    priority: 10,

    addOptions() {
        return {
            types: ["textDecoration"],
            HTMLAttributes: {},
        };
    },

    parseHTML() {
        return [{ tag: "font-decoration", consuming: false }];
    },

    /**
     * 定义标记的属性
     */
    addAttributes(): Record<keyof TextDecorationAttrs, Attribute> {
        return {
            delay: {
                default: "0s",
                parseHTML: (el) => el.getAttribute("data-delay") || "0s",
            },
            duration: {
                default: "1s",
                parseHTML: (el) => el.getAttribute("data-duration") || "1s",
            },
            svgName: {
                default: "line-1",
                parseHTML: (el) => el.getAttribute("data-svg-name") || "line-1",
            },
            ease: {
                default: "",
                parseHTML: (el) => el.getAttribute("data-ease") || "",
            },
            animate: {
                default: false,
                parseHTML: (el) => el.getAttribute("data-animate") || false,
            },
            color: {
                default: "#000000",
                parseHTML: (el) => el.style.getPropertyValue("--text-decoration-color"),
            },
            width: {
                default: "0.1em",
                parseHTML: (el) => el.style.getPropertyValue("--text-decoration-width") || null,
            },
            pointer: {
                default: "",
                parseHTML: (el) => {
                    const currentPointer = el.style.getPropertyValue("--stroke-linecap");
                    const pathPointer = el.querySelector("path")?.getAttribute("stroke-linecap");
                    return currentPointer || pathPointer || null;
                },
            },
        };
    },

    /**
     * 渲染 HTML
     *
     * @param HTMLAttributes - 文本装饰属性
     * @returns HTML 元素数组
     */
    renderHTML({ HTMLAttributes }) {
        const { svgName, animate, width, color, pointer, duration, delay, ease } =
            HTMLAttributes as TextDecorationAttrs;

        let style = "";
        if (width) {
            style += `--text-decoration-width: ${width};`;
        }
        if (color && color !== "#000") {
            style += `--text-decoration-color: ${color};`;
        }
        if (pointer) {
            style += `--stroke-linecap: ${pointer};`;
        }

        if (!svgName) return ["p"];

        return [
            "font-decoration",
            {
                style,
                class: $pageStyle["text-decoration-svg"],
                "data-svg-name": svgName,
                "data-duration": duration,
                "data-delay": delay,
                "data-ease": ease,
                "data-animate": animate ? true : null,
            },
            ["u", 0],
            decorationSvgData[svgName].dom,
        ];
    },

    /**
     * 添加扩展的命令
     */
    addCommands() {
        return {
            /**
             * 打开文本装饰编辑器面板
             */
            openTextDecorationEditorPanel:
                ({ rect }) =>
                ({ editor, state, commands }) => {
                    const textDecorationAttr = getMarkAttributes(state, this.name) || {};
                    const selection = editor.state.selection;

                    commands.openAttrEditorPanel("textDecoration", textDecorationAttr, {
                        rect,
                        setData: (attr) => {
                            editor.chain().setTextSelection(selection).run();

                            if (!attr.svgName) {
                                editor.chain().unsetTextDecoration().run();
                            } else {
                                editor.chain().setTextDecoration(attr).run();
                            }
                        },
                        preview: () => {
                            requestAnimationFrame(() => {
                                editor.chain().setMeta("addToHistory", false).playTextDecorationAnimate();
                            });
                        },
                        focus: () => {
                            commands.focus();
                        },
                    });
                    return true;
                },

            /**
             * 播放文本装饰动画
             */
            playTextDecorationAnimate:
                () =>
                ({ editor, state }) => {
                    playSvgAnimation(editor, getMarkAttributes(state, this.name) || {});
                    return true;
                },

            /**
             * 设置文本装饰属性
             */
            setTextDecoration:
                (attr) =>
                ({ commands }) => {
                    return commands.setMark(this.name, attr);
                },

            /**
             * 取消文本装饰
             */
            unsetTextDecoration:
                () =>
                ({ commands }) => {
                    return commands.unsetMark(this.name);
                },
        };
    },
});
