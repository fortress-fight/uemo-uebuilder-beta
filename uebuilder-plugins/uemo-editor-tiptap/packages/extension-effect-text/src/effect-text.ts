import type { EffectTextAttrs } from "./index";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import EffectTextView from "../view/EffectTextView.vue";

import { renderHTML } from "../utils/render";
import { parseEffectText } from "../utils/parse";
import { getEffectTextAttrs } from "../utils/helper";
import { getAttributesConfig } from "../../../utils/tiptap-helper";

import $pageStyle from "../../../src/app.module.scss";

export const defaultEffectTextAttrs: EffectTextAttrs = {
    width: undefined,
    fontStyle: "",
    fontFamily: "",
    fontSize: "60px",
    fontWeight: false,
    textColor: "#333",
    lineHeight: "",
    align: "left",
    moAlign: undefined,

    content: "请输入文字",

    // 滚动效果
    scrollEffect: { effectType: "effect-1", triggerMode: "enter-leaver" },
};

export interface EffectTextOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        effectText: {
            /**
             * 打开特效文本编辑器面板
             */
            openEffectTextEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;

            /**
             * 插入特效文本
             */
            insertEffectText: (options?: EffectTextAttrs) => ReturnType;

            /**
             * 更新特效文本属性
             */
            updateEffectTextAttrs: (attrs: Partial<EffectTextAttrs>) => ReturnType;

            /**
             * 移除相关样式
             */
            unsetEffectTextStyle: () => ReturnType;
        };
    }
}

export const EffectText = Node.create<EffectTextOptions>({
    name: "effectText",

    atom: true,
    group: "block",
    draggable: true,
    inclusive: false,
    selectable: true,
    // defining: true,

    addOptions() {
        return {
            HTMLAttributes: {},
            allowCopyAttrsType: {
                design: [
                    "width",
                    "fontStyle",
                    "fontFamily",
                    "fontSize",
                    "fontWeight",
                    "textColor",
                    "lineHeight",
                    "align",
                    "moAlign",
                ],
                effect: ["scrollEffect"],
            },
        };
    },

    addAttributes() {
        return getAttributesConfig<EffectTextAttrs>(defaultEffectTextAttrs);
    },

    parseHTML() {
        return [
            {
                tag: "." + $pageStyle["effect-text-block"],
                getAttrs: (el): EffectTextAttrs => {
                    return parseEffectText(el);
                },
            },
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(EffectTextView);
    },

    renderHTML(param) {
        return renderHTML(param.HTMLAttributes as EffectTextAttrs);
    },

    addCommands() {
        return {
            insertEffectText:
                () =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: defaultEffectTextAttrs,
                    });
                },

            openEffectTextEditorPanel:
                (rect) =>
                ({ chain, editor }) => {
                    const currentAttr = getEffectTextAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("effectText", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateEffectTextAttrs(attr);
                            },
                        })
                        .run();
                },

            updateEffectTextAttrs:
                (attrs: Partial<EffectTextAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            unsetEffectTextStyle:
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
