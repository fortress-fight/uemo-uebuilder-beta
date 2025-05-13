import type { TYPE_NODE_PLACEHOLDER } from "../data";
import type { NodePlaceholderAttrs } from "../src";

import { Node, type Attribute } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

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
                            nodeId: el.getAttribute("data-node-id"),
                            nodeName: el.getAttribute("data-node-name"),
                            nodeLoading: el.getAttribute("data-node-loading"),
                        };
                    }
                    return {};
                },
            },
        ];
    },

    addAttributes() {
        return {
            nodeId: { default: null },
            nodeName: { default: null },
            nodeLoading: { default: false },
        } as Record<keyof NodePlaceholderAttrs, Attribute>;
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
