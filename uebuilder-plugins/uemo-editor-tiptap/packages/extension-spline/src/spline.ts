import type { SplineAttrs } from "./index";
import type { Attribute } from "@tiptap/core";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import SplineView from "../view/SplineView.vue";

import { parseSpline } from "../utils/parse";
import { splineRender } from "../utils/render";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        spline: {
            /**
             * 插入 svgIcon
             */
            insertSpline: (attrs: string) => ReturnType;
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SplineOptions {
    //
}

export const Spline = Node.create<SplineOptions>({
    name: "spline",
    group: "block",
    draggable: true,

    addOptions() {
        return {
            allowCopyAttrsType: {
                design: ["ratio", "align", "width", "background", "border", "radius", "shadow"],
            },
        };
    },

    addAttributes() {
        return {
            url: { default: "" },
            ratio: { default: undefined },
            align: { default: undefined },
            width: { default: "" },
            border: { default: undefined },
            shadow: { default: "" },
            radius: { default: "" },
            background: { default: "" },
            w: { default: 300 },
            h: { default: 300 },
        } as Record<keyof SplineAttrs, Attribute>;
    },

    addNodeView() {
        return VueNodeViewRenderer(SplineView);
    },

    parseHTML() {
        return [
            {
                tag: "div." + $pageStyle["spline-wrapper"],
                getAttrs: (el): SplineAttrs | false => {
                    return parseSpline(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const splineAttrs = HTMLAttributes as SplineAttrs;
        const { url } = splineAttrs;

        if (!url) return ["p"];

        return splineRender(splineAttrs);
    },

    addCommands() {
        return {
            insertSpline:
                (url: string) =>
                ({ commands }) => {
                    if (!url) return false;
                    return commands.insertContent({ type: this.name, attrs: { url } });
                },
        };
    },
});
