import type { Attribute } from "@tiptap/core";
import type { DividerBlockAttrs } from "./index";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import DividerBlockView from "../view/DividerBlockView.vue";

import $pageStyle from "../../../src/app.module.scss";

export interface DivideBlockOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        divideBlock: {
            updateDivideBlockAttrs: (param: DividerBlockAttrs) => ReturnType;
            insertDivideBlock: (options: Partial<DividerBlockAttrs>) => ReturnType;
        };
    }
}

export const DividerBlock = Node.create<DivideBlockOptions>({
    name: "dividerBlock",
    group: "block",

    addOptions() {
        return {
            HTMLAttributes: {},
            allowCopyAttrsType: {
                all: ["size", "mdSize"],
            },
        };
    },

    addAttributes() {
        return {
            size: { default: "10px" },
            mdSize: { default: "50px" },
        } as Record<keyof DividerBlockAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: "section.blank_block",
                getAttrs: (element) => {
                    if (!(element instanceof HTMLElement)) {
                        return {};
                    }

                    if (element.classList.contains("small_blank")) {
                        return {
                            size: "20px",
                            mdSize: "10px",
                        };
                    }

                    if (element.classList.contains("normal_blank")) {
                        return {
                            size: "50px",
                            mdSize: "25px",
                        };
                    }

                    if (element.classList.contains("big_blank")) {
                        return {
                            size: "100px",
                            mdSize: "50px",
                        };
                    }

                    return {
                        size: "10px",
                        mdSize: "50px",
                    };
                },
            },
            {
                tag: "." + $pageStyle["editor-divide-block"],
                getAttrs: (element) => {
                    if (!(element instanceof HTMLElement)) {
                        return {};
                    }
                    const style = element.style;
                    return {
                        size: style.getPropertyValue("--divide-block-size") || "10px",
                        mdSize: style.getPropertyValue("--divide-block-md-size") || "50px",
                    };
                },
            },
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(DividerBlockView);
    },

    renderHTML({ HTMLAttributes }) {
        const dividerAttrs = HTMLAttributes as DividerBlockAttrs;

        return [
            "div",
            {
                class: $pageStyle["editor-divide-block"],
                style: `--divide-block-size: ${dividerAttrs.size}; --divide-block-md-size: ${dividerAttrs.mdSize}`,
            },
        ];
    },

    addCommands() {
        return {
            insertDivideBlock:
                (options) =>
                ({ commands }) => {
                    return commands.insertContent({ type: this.name, attrs: options });
                },

            updateDivideBlockAttrs:
                (param) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, param).run();
                },
        };
    },
});
