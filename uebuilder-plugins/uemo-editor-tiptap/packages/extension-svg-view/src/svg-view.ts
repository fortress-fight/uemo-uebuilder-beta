import type { SvgViewerAttrs, InsertSvgViewerData } from "./index";
import type { Attribute } from "@tiptap/core";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import SvgViewView from "../view/SvgView.vue";

import { parseSvgView } from "../utils/parse";
import { svgViewRender } from "../utils/render";
import { getSvgViewAttrs } from "../utils/helper";
import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        svgView: {
            /**
             * 插入 svgView
             */
            insertSvgViewer: (attrs: InsertSvgViewerData) => ReturnType;

            /**
             * 打开 svgView 编辑器面板
             */
            openSvgViewEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;

            /**
             * 替换 svgView
             */
            updateSvgViewAttrs: (attrs: Partial<SvgViewerAttrs>) => ReturnType;
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SvgIconOptions {
    //
}

export const SvgView = Node.create<SvgIconOptions>({
    name: "svgView",
    group: "block",
    draggable: true,

    addOptions() {
        return {
            allowCopyAttrsType: {
                design: ["color", "align", "width", "padding", "background", "border", "radius", "shadow"],
                effect: ["scrollEffect"],
            },
        };
    },

    addAttributes() {
        return {
            w: { default: undefined },
            h: { default: undefined },
            url: { default: "" },

            color: { default: "" },
            align: { default: undefined },
            width: { default: "100px" },
            padding: { default: "" },
            background: { default: "" },
            border: { default: undefined },
            radius: { default: "" },
            shadow: { default: "" },
            ratio: { default: "" },

            scrollEffect: { default: undefined },
            md: { default: {} },
        } as Record<keyof SvgViewerAttrs, Attribute>;
    },

    addNodeView() {
        return VueNodeViewRenderer(SvgViewView);
    },

    parseHTML() {
        return [
            {
                tag: "div." + $pageStyle["svg-viewer-wrapper"],
                getAttrs: (el): SvgViewerAttrs | false => {
                    return parseSvgView(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const svgIconAttr = HTMLAttributes as SvgViewerAttrs;
        return svgViewRender(svgIconAttr);
    },

    addCommands() {
        return {
            insertSvgViewer:
                (attrs: InsertSvgViewerData) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: {
                            w: attrs.data?.w,
                            h: attrs.data?.h,
                            url: attrs.source,
                        },
                    });
                },

            updateSvgViewAttrs:
                (attrs: Partial<SvgViewerAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            openSvgViewEditorPanel:
                (rect: UE_TIPTAP_UNIT.PositionRect) =>
                ({ chain, editor }) => {
                    const currentAttr = getSvgViewAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("svgView", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateSvgViewAttrs(attr);
                            },
                        })
                        .run();
                },
        };
    },
});
