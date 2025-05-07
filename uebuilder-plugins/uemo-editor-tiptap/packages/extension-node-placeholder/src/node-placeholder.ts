import type { TYPE_NODE_PLACEHOLDER } from "../data";

import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Node } from "@tiptap/core";

import $pageStyle from "../../../src/app.module.scss";

import NodePlaceholderView from "../view/NodePlaceholder.vue";

export interface NodePlaceholderOptions {
    /**
     * 节点名称
     */
    name: string;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        NodePlaceHolder: {
            insetNodePlaceholder: (nodeName: TYPE_NODE_PLACEHOLDER) => ReturnType;
        };
    }
}

export const NodePlaceholder = Node.create<NodePlaceholderOptions>({
    name: "nodePlaceholder",

    addOptions() {
        return { name: "" };
    },

    group() {
        return "block";
    },

    parseHTML() {
        return [
            {
                tag: "div." + $pageStyle["empty-node"],
                getAttrs: (el) => {
                    if (el instanceof HTMLElement) {
                        return {
                            nodeName: el.getAttribute("data-node-name"),
                        };
                    }
                    return {};
                },
            },
        ];
    },

    addAttributes() {
        return { nodeName: { default: null } };
    },

    renderHTML() {
        return ["p"];
    },

    addNodeView() {
        return VueNodeViewRenderer(NodePlaceholderView);
    },

    addCommands() {
        return {
            insetNodePlaceholder:
                (nodeName) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { nodeName: nodeName },
                    });
                },
        };
    },
});
