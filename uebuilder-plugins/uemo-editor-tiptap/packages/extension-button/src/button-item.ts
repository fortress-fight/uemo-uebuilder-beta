import type { ButtonItemAttrs } from "./index";

import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Node, type Attribute } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

import ButtonItemView from "../view/ButtonItem.vue";

import $pageStyle from "../../../src/app.module.scss";

import { buttonRender } from "../utils/render";
import { parseButtonAttr, parseCkButtonAttr } from "../utils/parse";
export interface ButtonOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        button: {
            insertButton: (value: ButtonItemAttrs) => ReturnType;
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
            padding: { default: "" },
            theme: { default: "" },
            beforeSvgIcon: { default: undefined },
            afterSvgIcon: { default: undefined },
            animation: { default: undefined },

            // 仅预览时使用
            transition: { default: "1" },
            // 仅预览时使用
            previewHover: { default: "0" },

            // hover 变化的属性
            radius: { default: "" },
            hoverRadius: { default: "" },

            color: { default: "" },
            hoverColor: { default: "" },

            background: { default: "" },
            hoverBackground: { default: "" },

            borderColor: { default: "" },
            hoverBorderColor: { default: "" },

            borderWidth: { default: "" },
            hoverBorderWidth: { default: "" },

            borderStyle: { default: "" },
            hoverBorderStyle: { default: "" },

            shadow: { default: "" },
            hoverShadow: { default: "" },

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

    addProseMirrorPlugins() {
        const plugins: Plugin[] = [];

        return plugins;
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
        };
    },
});
