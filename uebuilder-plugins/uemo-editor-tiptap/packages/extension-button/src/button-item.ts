import type { ButtonItemAttrs } from "./index";

import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Node, type Attribute } from "@tiptap/core";

import $ from "@stone/uemo-editor-utils/lib/jquery";

import ButtonItemView from "../view/ButtonItem.vue";

import $pageStyle from "../../../src/app.module.scss";

import { buttonRender } from "../utils/render";
import { getButtonItemAttrs } from "../utils/helper";
import { parseButtonAttr, parseCkButtonAttr } from "../utils/parse";

export interface ButtonOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        buttonItem: {
            /**
             * 插入按钮
             */
            insertButton: (value: ButtonItemAttrs) => ReturnType;

            /**
             * 打开按钮行编辑器面板
             */
            openButtonItemEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;

            /**
             * 更新按钮属性
             */
            updateButtonItemAttrs: (attrs: Partial<ButtonItemAttrs>) => ReturnType;

            /**
             * 预览按钮悬停效果
             */
            previewButtonEffect: (state: "hover" | "leave") => ReturnType;
        };
    }
}

export const ButtonItem = Node.create<ButtonOptions>({
    name: "buttonItem",

    priority: 2000,

    isolating: true,
    inclusive: false,
    draggable: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            text: { default: "BUTTON" },
            padding: { default: undefined },
            theme: { default: undefined },
            beforeSvgIcon: { default: undefined },
            afterSvgIcon: { default: undefined },
            animation: { default: undefined },

            // hover 变化的属性
            radius: { default: undefined },
            hoverRadius: { default: undefined },

            color: { default: undefined },
            hoverColor: { default: undefined },

            background: { default: undefined },
            hoverBackground: { default: undefined },

            borderColor: { default: undefined },
            hoverBorderColor: { default: undefined },

            borderWidth: { default: undefined },
            hoverBorderWidth: { default: undefined },

            borderStyle: { default: undefined },
            hoverBorderStyle: { default: undefined },

            shadow: { default: undefined },
            hoverShadow: { default: undefined },

            /**
             * 链接相关
             */
            link: { default: "" },
            linkTarget: { default: "_target" },
            linkType: { default: undefined },
            linkDetail: { default: undefined },
            linkPopLayer: { default: undefined },
            triggerMethod: { default: undefined },
        } as Record<keyof ButtonItemAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: "a[data-layout]:not([data-layout='0'])~span",
                priority: 1000,
                ignore: true,
            },
            {
                tag: "." + $pageStyle.btn,
                getAttrs: (el): Partial<ButtonItemAttrs> => {
                    if (el instanceof HTMLElement) {
                        return parseButtonAttr(el);
                    }
                    return {};
                },
            },
            {
                tag: "a[data-layout]:not([data-layout='0'])",
                getAttrs: (el): Partial<ButtonItemAttrs> => {
                    if (el instanceof HTMLElement) {
                        return parseCkButtonAttr(el);
                    }
                    return {};
                },
            },
        ];
    },

    renderHTML(param) {
        const render = buttonRender(param.HTMLAttributes as ButtonItemAttrs);
        return render ? render : ["div"];
    },

    addNodeView() {
        return VueNodeViewRenderer(ButtonItemView);
    },

    addCommands() {
        return {
            insertButton:
                (attrs: ButtonItemAttrs) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs,
                    });
                },

            openButtonItemEditorPanel:
                (rect: UE_TIPTAP_UNIT.PositionRect) =>
                ({ editor, chain }) => {
                    const currentAttr = getButtonItemAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("buttonItem", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateButtonItemAttrs(attr);
                            },
                            fire: (type: "preview", state: "hover" | "leave") => {
                                if (type !== "preview") return;
                                requestAnimationFrame(() => {
                                    editor.commands.previewButtonEffect(state);
                                });
                            },
                            close: () => {
                                requestAnimationFrame(() => {
                                    editor.commands.previewButtonEffect("leave");
                                });
                            },
                        })
                        .run();
                },

            updateButtonItemAttrs:
                (attrs: Partial<ButtonItemAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            previewButtonEffect:
                (state: "hover" | "leave") =>
                ({ editor }) => {
                    // 获取选中文本的 DOM 节点
                    const selection = editor.state.selection;
                    const dom = editor.view.nodeDOM(selection.from || 0);

                    if (!(dom instanceof HTMLElement)) return false;

                    const buttonDom = dom.children[0];
                    if (state === "hover") {
                        $(buttonDom).trigger("ue.button.pointerenter");
                    } else {
                        $(buttonDom).trigger("ue.button.pointerleave");
                    }

                    return true;
                },
        };
    },
});
