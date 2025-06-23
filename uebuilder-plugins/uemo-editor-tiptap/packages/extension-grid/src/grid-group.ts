import type { Attribute } from "@tiptap/core";
import type { GridGroupAttrs } from "./index";

import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Node } from "@tiptap/core";

import { getGridArea } from "@stone/uemo-editor-utils/lib/css-grid";

import GridGroupView from "../view/GridGroupView.vue";

import { parseGridGroup } from "../utils/parse";
import { gridGroupRender } from "../utils/render";
import { getClosestGridItem } from "../utils/helper";
import { selectNodeInner } from "../../../utils/tiptap-utils";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        gridGroup: {
            /**
             * 插入网格
             */
            insertGridGroup: (value: string) => ReturnType;
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GridGroupOptions {
    //
}

export const GridGroup = Node.create<GridGroupOptions>({
    name: "gridGroup",
    group: "block",
    content: "gridItem+",

    // defining: true,
    inclusive: false,
    draggable: true,
    selectable: true,
    isolating: true,
    atom: true,

    addOptions() {
        return {
            allowCopyAttrsType: {
                design: [
                    "overflow",
                    "width",
                    "gap",
                    "padding",
                    "radius",
                    "background",
                    "shadow",
                    "border",
                    "alignX",
                    "alignY",
                    "mdGrid",
                    "mdGap",
                    "mdBackground",
                ],
            },
        };
    },

    addAttributes() {
        return {
            grid: { default: undefined },
            width: { default: "100%" },
            gap: { default: "10px" },
            padding: { default: "0px" },
            radius: { default: undefined },
            background: { default: undefined },
            shadow: { default: undefined },
            border: { default: undefined },
            alignX: { default: undefined },
            alignY: { default: undefined },
            overflow: { default: undefined },

            mdGap: { default: "10px" },
            mdGrid: { default: undefined },
            mdBackground: { default: undefined },
        } as Record<keyof GridGroupAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: `div.${$pageStyle["grid-layer"]} div.${$pageStyle["grid-layer"]}`,
                skip: true,
            },
            {
                tag: "div." + $pageStyle["grid-layer"],
                getAttrs: (el): GridGroupAttrs | false => {
                    return parseGridGroup(el);
                },
            },
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(GridGroupView);
    },

    renderHTML({ HTMLAttributes }) {
        const gridAttrs = HTMLAttributes as GridGroupAttrs;
        const { grid } = gridAttrs;

        if (!grid) return ["p"];

        return gridGroupRender(gridAttrs);
    },

    addCommands() {
        return {
            insertGridGroup:
                (grid: string) =>
                ({ commands }) => {
                    if (!grid) return false;

                    const gridItemInfo = grid.split(":")[1].split(",");
                    const content = gridItemInfo.map((item) => {
                        return {
                            type: "gridItem",
                            attrs: { gridArea: item },
                            content: [{ type: "paragraph", content: [{ type: "text", text: "Placeholder" }] }],
                        };
                    });

                    // NOTE 移动端网格区域, 需要添加一个默认值
                    const mdGrid = getGridArea(gridItemInfo.length, true);

                    return commands.insertContent({ type: this.name, attrs: { grid, mdGrid }, content });
                },
        };
    },

    addKeyboardShortcuts() {
        return {
            "Mod-a": () => {
                const editor = this.editor;

                // NOTE 选中光标位置的单元格
                const gridItemInfo = getClosestGridItem(editor);
                if (!gridItemInfo) return false;

                const { pos, node } = gridItemInfo;
                return selectNodeInner(editor, pos, node);
            },
        };
    },
});
