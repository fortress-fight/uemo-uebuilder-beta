/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 11:00:03
 */
import type { Attribute } from "@tiptap/core";
import type { ShareItemAttrs } from "./index";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import ShareItemView from "../view/ShareItemView.vue";
import { getShareItemAttrs } from "../utils/helper";
import { renderShareItemAttrs } from "../utils/render";
import { parseCkShareItemAttr, parseShareItemAttr } from "../utils/parse";

import $pageStyle from "../../../src/app.module.scss";

export interface ShareItemOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        shareItem: {
            /**
             * 打开分享项编辑器面板
             */
            openShareItemEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;
            /**
             * Add an image
             */
            insertShareItem: (options?: { href?: string }) => ReturnType;
        };
    }
}

export const ShareItem = Node.create<ShareItemOptions>({
    name: "shareItem",

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
            text: { default: "" },
            // 图标属性
            icon: { default: "" },
            color: { default: "" },
            radius: { default: "" },
            background: { default: "" },
            border: { default: undefined },

            /**
             * 链接相关
             */
            link: { default: "" },
            linkType: { default: undefined },
            linkTarget: { default: "_target" },
            linkDetail: { default: undefined },
            linkPopLayer: { default: undefined },
            triggerMethod: { default: undefined },

            /**
             * 弹窗相关
             */
            popLayer: { default: undefined },
        } as Record<keyof ShareItemAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: "figure.media",
                getAttrs(dom) {
                    if (dom instanceof HTMLElement && dom.querySelector("a.ck-share-item")) {
                        return null;
                    }
                    return false;
                },
                skip: true,
            },
            {
                tag: "figure.media a.ck-share-item",
                priority: 1000,
                getAttrs: (el): ShareItemAttrs => {
                    return parseCkShareItemAttr(el);
                },
            },
            {
                tag: "." + $pageStyle.share,
                priority: 1000,
                getAttrs: (el): ShareItemAttrs => {
                    return parseShareItemAttr(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return renderShareItemAttrs(HTMLAttributes as ShareItemAttrs);
    },

    addNodeView() {
        return VueNodeViewRenderer(ShareItemView);
    },

    addCommands() {
        return {
            insertShareItem:
                () =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { icon: "ue-share-weixin" },
                    });
                },

            openShareItemEditorPanel:
                (rect) =>
                ({ chain, editor }) => {
                    const currentAttr = getShareItemAttrs(this.editor);

                    // eslint-disable-next-line
                    console.log(currentAttr, "currentAttr", rect, chain, editor);

                    return true;

                    // return chain()
                    //     .focus()
                    //     .openAttrEditorPanel("hrRule", currentAttr, {
                    //         rect,
                    //         updateAttrs: (attr) => {
                    //             editor.commands.updateHrRuleAttrs(attr);
                    //         },
                    //     })
                    //     .run();
                },
        };
    },
});
