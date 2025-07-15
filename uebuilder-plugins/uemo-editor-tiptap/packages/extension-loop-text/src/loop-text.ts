/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 16:16:46
 */
import type { Attribute } from "@tiptap/core";
import type { LoopTextAttrs } from "./index";

import { Node } from "@tiptap/core";

import { VueNodeViewRenderer } from "@tiptap/vue-3";

import { renderLoopText } from "../utils/render";
import { parseLoopTextAttr } from "../utils/parse";
import { getLoopTextAttrs, playLoopTextAnimation, stopLoopTextAnimation } from "../utils/helper";

import LoopTextView from "../view/LoopTextView.vue";

import $pageStyle from "../../../src/app.module.scss";

export interface LoopTextOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        loopText: {
            /**
             * 打开跑马灯文本编辑器面板
             */
            openLoopTextEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;

            /**
             * 插入跑马灯文本
             */
            insertLoopText: (options?: LoopTextAttrs) => ReturnType;

            /**
             * 更新跑马灯文本属性
             */
            updateLoopTextAttrs: (attrs: Partial<LoopTextAttrs>) => ReturnType;

            /**
             * 移除相关样式
             */
            unsetLoopTextStyle: () => ReturnType;

            /**
             * 播放跑马灯文本动画
             */
            playLoopTextAnimate: (play: boolean) => ReturnType;
        };
    }
}

export const LoopText = Node.create<LoopTextOptions>({
    name: "loopText",

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
                    "align",
                    "moAlign",
                    "theme",
                ],
                effect: ["effect", "delay"],
            },
        };
    },

    addAttributes() {
        return {
            width: { default: undefined },
            fontStyle: { default: "" },
            fontFamily: { default: "" },
            fontSize: { default: "" },
            fontWeight: { default: false },
            textColor: { default: "#333" },
            lineHeight: { default: "" },
            align: { default: "left" },
            moAlign: { default: undefined },

            theme: { default: "NO01" },
            effect: { default: "normal" },
            delay: { default: "2.4" },
            prefix: { default: undefined },
            suffix: { default: undefined },
            body: { default: [] },
        } as Record<keyof LoopTextAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: "." + $pageStyle["loop-text-block"],
                getAttrs: (el): LoopTextAttrs => {
                    return parseLoopTextAttr(el);
                },
            },
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(LoopTextView);
    },

    renderHTML(param) {
        return renderLoopText(param.HTMLAttributes as LoopTextAttrs);
    },

    addCommands() {
        return {
            openLoopTextEditorPanel:
                (rect) =>
                ({ chain, editor }) => {
                    const currentAttr = getLoopTextAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("loopText", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateLoopTextAttrs(attr);
                            },
                            fire: (type: "preview" | "stop") => {
                                switch (type) {
                                    case "preview":
                                        requestAnimationFrame(() => {
                                            editor.chain().setMeta("addToHistory", false).playLoopTextAnimate(true);
                                        });
                                        break;
                                    case "stop":
                                        requestAnimationFrame(() => {
                                            editor.chain().setMeta("addToHistory", false).playLoopTextAnimate(false);
                                        });
                                        break;
                                    default:
                                        break;
                                }
                            },
                        })
                        .run();
                },

            playLoopTextAnimate:
                (play: boolean) =>
                ({ editor }) => {
                    void (play ? playLoopTextAnimation(editor) : stopLoopTextAnimation(editor));
                    return true;
                },

            insertLoopText:
                () =>
                ({ commands }) => {
                    const defaultAttrs: LoopTextAttrs = {
                        theme: "NO01",
                        effect: "normal",
                        textColor: "#333",
                        fontSize: "60px",
                        body: [
                            { id: "i-1", title: "网页设计" },
                            { id: "i-2", title: "网页制作" },
                            { id: "i-3", title: "网页发布" },
                        ],
                    };
                    return commands.insertContent({ type: this.name, attrs: defaultAttrs });
                },

            updateLoopTextAttrs:
                (attrs: Partial<LoopTextAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            unsetLoopTextStyle:
                () =>
                ({ chain }) => {
                    return chain()
                        .updateAttributes(this.name, {
                            fontFamily: "",
                            fontSize: "",
                            fontWeight: "",
                            fontStyle: "",
                        })
                        .run();
                },
        };
    },
});
