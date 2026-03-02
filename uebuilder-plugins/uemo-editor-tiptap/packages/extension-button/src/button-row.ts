/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 12:09:46
 */
import type { Attribute } from "@tiptap/core";
import type { ButtonRowAttrs } from "./index";

import { mergeAttributes, Node } from "@tiptap/core";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        buttonRow: {
            /**
             * 打开按钮行编辑器面板
             */
            openButtonRowEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;
            /**
             * 更新按钮行属性
             */
            updateButtonRowAttrs: (attrs: Partial<ButtonRowAttrs>) => ReturnType;
            /**
             * 移除相关样式
             */
            unsetButtonRowStyle: () => ReturnType;
        };
    }
}

export interface ButtonRowOptions {
    HTMLAttributes: Record<string, any>;
}

export const ButtonRow = Node.create<ButtonRowOptions>({
    name: "buttonRow",

    atom: true,
    draggable: true,
    selectable: true,

    addOptions() {
        return {
            itemTypeName: "listItem",
            HTMLAttributes: { class: $pageStyle["btn-row"] },
        };
    },

    group: "block",

    content: `buttonItem+`,

    parseHTML() {
        return [
            {
                tag: "p",
                priority: 2200,
                getAttrs(dom) {
                    if (dom instanceof HTMLElement && dom.querySelector("a[data-layout]:not([data-layout='0'])")) {
                        return null;
                    }
                    return false;
                },
            },
            { tag: "." + $pageStyle["btn-row"] },
        ];
    },

    addAttributes() {
        return {
            dir: {
                default: undefined,
                parseHTML: (element) => {
                    return element.getAttribute("data-dir") || undefined;
                },
                renderHTML: (attributes) => {
                    if (!attributes.gap && Number(attributes.gap) != 0) {
                        return {};
                    }

                    return {
                        "data-dir": attributes.dir,
                    };
                },
            },
            width: {
                default: undefined,
                parseHTML: (element) => {
                    const dir = element.getAttribute("data-dir");
                    const fill = element.getAttribute("data-fill");
                    const style = element.style;
                    const widthValue = style.getPropertyValue("--btn-row-width");
                    if (!widthValue) return undefined;

                    if (dir === "col" || fill) {
                        return widthValue;
                    }

                    return undefined;
                },
                renderHTML: (attributes) => {
                    if (!attributes.width) return {};
                    if (attributes.dir === "col" || attributes.fill) {
                        return {
                            style: `--btn-row-width: ${attributes.width}`,
                        };
                    }
                    return {};
                },
            },
            gap: {
                default: "1em",
                parseHTML: (element) => {
                    const style = element.style;
                    return style.getPropertyValue("--btn-row-gap") || "1em";
                },
                renderHTML: (attributes) => {
                    if (!attributes.gap && Number(attributes.gap) != 0) {
                        return {};
                    }

                    return {
                        style: `--btn-row-gap: ${attributes.gap}`,
                    };
                },
            },
            fontStyle: {
                default: "",
                parseHTML: (element) => element.style.fontStyle?.replace(/['"]+/g, ""),
                renderHTML: (attributes) => {
                    if (!attributes.fontStyle) {
                        return {};
                    }

                    return {
                        style: `font-style: ${attributes.fontStyle}`,
                    };
                },
            },
            fontFamily: {
                default: "",
                parseHTML: (element) => {
                    const result = element.style.fontFamily?.replace(/['"]+/g, "");
                    return result === "inherit" ? undefined : result;
                },
                renderHTML: (attributes) => {
                    if (!attributes.fontFamily) {
                        return {};
                    }

                    return {
                        style: `font-family: ${attributes.fontFamily}`,
                    };
                },
            },
            fontSize: {
                default: undefined,
                parseHTML: (el) => {
                    return el.style.fontSize;
                },
                renderHTML: (attr) => {
                    const fontSize = attr.fontSize;
                    if (!fontSize) {
                        return {};
                    }
                    if (attr.fontSize?.endsWith("px")) {
                        return {
                            // @ts-expect-error
                            class: $pageStyle["text-" + parseInt(attr.fontSize)],
                            style: `font-size: ${attr.fontSize}`,
                        };
                    } else {
                        return {
                            "data-font-size": attr.fontSize,
                            style: `font-size: ${attr.fontSize}`,
                        };
                    }
                },
            },
            fontWeight: {
                default: undefined,
                parseHTML: (element) => {
                    const value = element.style.fontWeight?.replace(/['"]+/g, "");
                    return /^(bold(er)?|[5-9]\d{2,})$/.test(value) || undefined;
                },
                renderHTML: (attributes) => {
                    if (!attributes.fontWeight) {
                        return {};
                    }

                    return {
                        style: `font-weight: ${attributes.fontWeight ? "bold" : ""}`,
                    };
                },
            },
            lineHeight: {
                default: undefined,
                parseHTML: (element) => element.style.lineHeight?.replace(/['"]+/g, ""),
                renderHTML: (attributes) => {
                    if (!attributes.lineHeight) {
                        return {};
                    }

                    return {
                        style: `line-height: ${attributes.lineHeight}`,
                    };
                },
            },
            align: {
                default: "left",
                parseHTML: (element) => {
                    return element.style.textAlign || "left";
                },
                renderHTML: (attributes) => {
                    if (attributes.align === "left") {
                        return {};
                    }

                    return { style: `text-align: ${attributes.align}` };
                },
            },
            fill: {
                default: undefined,
                parseHTML: (element) => {
                    return !!element.getAttribute("data-fill");
                },
                renderHTML: (attributes) => {
                    if (!attributes.fill) {
                        return {};
                    }

                    return {
                        "data-fill": !!attributes.fill,
                    };
                },
            },
            moAlign: {
                default: undefined,
                parseHTML: (element) => {
                    return element.getAttribute("data-mo-align") || undefined;
                },
                renderHTML: (attributes) => {
                    if (!attributes.moAlign || attributes.moAlign === attributes.align) {
                        return {};
                    }

                    return {
                        "data-mo-align": `${attributes.moAlign}`,
                    };
                },
            },
        } as Record<keyof ButtonRowAttrs, Attribute>;
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            ["div", { class: $pageStyle["btn-list"] }, 0],
        ];
    },

    addCommands() {
        return {
            // openButtonRowEditorPanel:
            //     (rect: UE_TIPTAP_UNIT.PositionRect) =>
            //     ({ editor, chain }) => {
            //         const currentAttr = getButtonRowAttrs(this.editor);

            //         return chain()
            //             .focus()
            //             .openAttrEditorPanel("buttonRow", currentAttr, {
            //                 rect,
            //                 updateAttrs: (attr) => {
            //                     editor.commands.updateButtonRowAttrs(attr);
            //                 },
            //             })
            //             .run();
            //     },

            updateButtonRowAttrs:
                (attrs: Partial<ButtonRowAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            unsetButtonRowStyle:
                () =>
                ({ chain }) => {
                    return chain()
                        .updateAttributes(this.name, {
                            fontFamily: "",
                            fontSize: "",
                            lineHeight: "",
                            fontWeight: "",
                            fontStyle: "",
                        })
                        .run();
                },
        };
    },
});
