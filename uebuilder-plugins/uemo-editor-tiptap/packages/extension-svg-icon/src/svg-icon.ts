import type { SvgIconAttrs } from "./index";
import type { Attribute } from "@tiptap/core";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import SvgIconView from "../view/SvgIcon.vue";

import { parseSvgIcon } from "../utils/parse";
import { svgIconRender } from "../utils/render";
import { getSvgIconAttrs } from "../utils/helper";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        svgIcon: {
            /**
             * 插入 svgIcon
             */
            insertSvgIcon: (attrs: { name: string; source: string }) => ReturnType;

            /**
             * 打开 svgIcon 编辑器面板
             */
            openSvgIconEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;

            /**
             * 替换图片
             */
            updateSvgIconAttrs: (attrs: Partial<SvgIconAttrs>) => ReturnType;
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SvgIconOptions {
    //
}

export const SvgIcon = Node.create<SvgIconOptions>({
    name: "svgIcon",
    group: "block",
    draggable: true,

    addOptions() {
        return {
            allowCopyAttrsType: {
                design: ["color", "align", "width", "padding", "background", "border", "radius", "shadow"],
            },
        };
    },

    addAttributes() {
        return {
            name: { default: "" },
            color: { default: "" },
            source: { default: "" },

            align: { default: undefined },
            width: { default: "100px" },
            padding: { default: "" },

            border: { default: undefined },
            shadow: { default: "" },
            radius: { default: "" },
            background: { default: "" },
        } as Record<keyof SvgIconAttrs, Attribute>;
    },

    addNodeView() {
        return VueNodeViewRenderer(SvgIconView);
    },

    parseHTML() {
        return [
            {
                tag: "div." + $pageStyle["svg-icon-wrapper"],
                getAttrs: (el): SvgIconAttrs | false => {
                    return parseSvgIcon(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const svgIconAttr = HTMLAttributes as SvgIconAttrs;
        const { source } = svgIconAttr;

        if (!source) return ["p"];

        return svgIconRender(svgIconAttr);
    },

    addCommands() {
        return {
            insertSvgIcon:
                (attrs: { name: string; source: string }) =>
                ({ commands }) => {
                    return commands.insertContent({ type: this.name, attrs });
                },

            updateSvgIconAttrs:
                (attrs: Partial<SvgIconAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            openSvgIconEditorPanel:
                (rect: UE_TIPTAP_UNIT.PositionRect) =>
                ({ chain, editor }) => {
                    const currentAttr = getSvgIconAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("svgIcon", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateSvgIconAttrs(attr);
                            },
                        })
                        .run();
                },
        };
    },
});
