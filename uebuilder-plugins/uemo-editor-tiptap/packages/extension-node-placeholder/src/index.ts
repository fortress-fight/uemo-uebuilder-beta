import type { TYPE_NODE_PLACEHOLDER } from "../data";

export * from "./node-placeholder";

export type NodePlaceholderAttrs = {
    nodeId: string;
    nodeName: TYPE_NODE_PLACEHOLDER;
    nodeLoading: boolean;
};
