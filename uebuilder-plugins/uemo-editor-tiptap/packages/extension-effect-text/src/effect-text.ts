import type { Attribute } from "@tiptap/core";
import type { EffectTextAttrs } from "./index";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import EffectTextView from "../view/EffectTextView.vue";

import { renderHTML } from "../utils/render";
import { parseEffectText } from "../utils/parse";
import $pageStyle from "../../../src/app.module.scss";

export interface EffectTextOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        effectText: {
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
        return {
            width: { default: undefined },
            fontStyle: { default: "" },
            fontFamily: { default: null },
            fontSize: { default: "" },
            fontWeight: { default: false },
            textColor: { default: "#333" },
            lineHeight: { default: "" },
            align: { default: "left" },
            moAlign: { default: undefined },

            content: { default: "" },

            // 滚动效果
            scrollEffect: { default: { type: "effect-1", options: { triggerMode: "enter" } } },
        } as Record<keyof EffectTextAttrs, Attribute>;
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
                        attrs: {
                            theme: "NO01",
                            effect: "normal",
                            textColor: "#333",
                            fontSize: "60px",
                            content: "请输入文字",
                        },
                    });
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
