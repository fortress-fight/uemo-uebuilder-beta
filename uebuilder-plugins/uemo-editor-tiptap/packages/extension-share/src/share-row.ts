/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 11:28:27
 */
import type { Attribute } from "@tiptap/core";
import type { ShareRowAttrs } from "./index";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import ShareRowView from "../view/ShareRowView.vue";
import { shareRowDefaultAttrs } from "./index";
import { renderShareRowAttrs } from "../utils/render";
import { parseShareRowAttrs } from "../utils/parse";

import $pageStyle from "../../../src/app.module.scss";

export interface ShareRowOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        shareRow: {
            /**
             * 更新分享行属性
             */
            updateShareRowAttrs: (attrs: ShareRowAttrs) => ReturnType;

            /**
             * 移除相关样式
             */
            unsetShareRowStyle: () => ReturnType;
        };
    }
}

export const ShareRow = Node.create<ShareRowOptions>({
    name: "shareRow",

    draggable: true,
    // defining: true,
    selectable: true,
    atom: true,
    group: "block",
    content: `shareItem+`,

    addOptions() {
        return {
            itemTypeName: "listItem",
            HTMLAttributes: { class: $pageStyle["share-row"] },
        };
    },

    addAttributes() {
        return {
            fontSize: { default: shareRowDefaultAttrs.fontSize },
            align: { default: shareRowDefaultAttrs.align },
            moAlign: { default: shareRowDefaultAttrs.moAlign },
        } as Record<keyof ShareRowAttrs, Attribute>;
    },

    parseHTML() {
        return [{ tag: "div." + $pageStyle["share-row"], getAttrs: (el) => parseShareRowAttrs(el) }];
    },

    renderHTML({ HTMLAttributes }) {
        return renderShareRowAttrs(HTMLAttributes as ShareRowAttrs);
    },

    addNodeView() {
        return VueNodeViewRenderer(ShareRowView);
    },

    addCommands() {
        return {
            updateShareRowAttrs:
                (param) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, param).run();
                },

            unsetShareRowStyle:
                () =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, shareRowDefaultAttrs).run();
                },
        };
    },
});
