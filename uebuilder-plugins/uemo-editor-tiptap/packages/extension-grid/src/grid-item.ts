import type { Attribute } from "@tiptap/core";
import type { GridItemAttrs } from "./index";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Plugin, PluginKey } from "@tiptap/pm/state";

import { getGridArea } from "@stone/uemo-editor-utils/lib/css-grid";

import GridItemView from "../view/GridItemView.vue";

import { parseGridItem } from "../utils/parse";
import { gridItemRender } from "../utils/render";
import { dealDomInsetHandler, getGridItemAttrs } from "../utils/helper";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        grid: {
            /**
             * 插入网格
             */
            insertGrid: (value: string) => ReturnType;

            /**
             * 更新网格单元属性
             */
            updateGridItemAttrs: (attrs: Partial<GridItemAttrs>) => ReturnType;

            /**
             * 打开网格单元编辑器面板
             */
            openGridItemEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GridItemOptions {
    //
}

export const GridItem = Node.create<GridItemOptions>({
    name: "gridItem",

    priority: 2000,

    isolating: true,
    content: "block+",
    draggable: false,

    addOptions() {
        return {
            allowCopyAttrsType: {
                all: ["overflow", "padding", "mdPadding", "radius", "shadow", "border", "background", "mdBackground"],
                design: ["radius", "shadow", "border", "background", "mdBackground"],
            },
        };
    },

    addAttributes() {
        return {
            overflow: { default: "hidden" },
            gridArea: { default: undefined },
            mdGridArea: { default: undefined },
            padding: { default: "0px" },
            mdPadding: { default: undefined },
            radius: { default: "" },
            shadow: { default: "" },
            border: { default: undefined },
            background: { default: undefined },
            mdBackground: { default: undefined },
        } as Record<keyof GridItemAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: "." + $pageStyle["grid-item"],
                context: "gridGroup/",
                getAttrs: (el): GridItemAttrs | false => {
                    return parseGridItem(el);
                },
            },
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(GridItemView);
    },

    renderHTML({ HTMLAttributes }) {
        const gridAttrs = HTMLAttributes as GridItemAttrs;
        return gridItemRender(gridAttrs);
    },

    addProseMirrorPlugins() {
        const plugins: Plugin[] = [
            new Plugin({
                key: new PluginKey("handleGridGroupEvent"),
                props: {
                    handlePaste: (view, _event, slice) => {
                        return dealDomInsetHandler(view, slice);
                    },
                    handleDrop: (view, _event, slice) => {
                        return dealDomInsetHandler(view, slice);
                    },
                    handleDoubleClick: (_view, _pos, event) => {
                        event.preventDefault();
                    },
                    // 修复当选中 Node 时，点击 gridItem ，gridItem 无法聚焦的问题
                    // handleClick(view, pos, event) {
                    //     const dom = event.target;
                    //     if (!(dom instanceof HTMLElement)) return;
                    //     const clickInGridItemInner = dom.classList.contains($pageStyle["grid-item--inner"]);
                    //     const emptyP = dom.classList.contains($pageStyle["is-empty"]);
                    //     if (!clickInGridItemInner && !emptyP) return;

                    //     const coords = view.posAtCoords({
                    //         left: event.clientX,
                    //         top: event.clientY,
                    //     });

                    //     if (!coords) return;

                    //     const $pos = view.state.doc.resolve(coords.pos);
                    //     const $posNode = $pos.node($pos.depth);
                    //     const $targetPos = view.state.doc.resolve($posNode.lastChild?.resolve(0).pos || 0);
                    //     if (!$targetPos) return false;
                    //     const newSelection = TextSelection.create(view.state.doc, pos);
                    //     const { state } = view;
                    //     const { tr } = state;
                    //     view.dispatch(tr.setSelection(newSelection));
                    //     return true;
                    // },
                    // handleDOMEvents: {
                    // keydown: (view, event) => {
                    //     if (!(event.ctrlKey && event.key === "a")) {
                    //         return;
                    //     }
                    //     const { state } = view;
                    //     if (!isInGridItem(state)) {
                    //         return;
                    //     }
                    //     const { tr, selection } = state;
                    //     const { start, end } = getGridItemNode(selection);
                    //     if (
                    //         typeof start === "undefined" ||
                    //         typeof end === "undefined"
                    //     ) {
                    //         return;
                    //     }
                    //     event.preventDefault();
                    //     const newSelection = TextSelection.create(
                    //         view.state.doc,
                    //         start + 1,
                    //         end - 1
                    //     );
                    //     view.dispatch(tr.setSelection(newSelection));
                    // },
                    // },
                },
            }),
        ];

        return plugins;
    },

    addCommands() {
        return {
            insertGrid:
                (grid: string) =>
                ({ commands }) => {
                    if (!grid) return false;

                    const gridItemInfo = grid.split(":")[1].split(",");
                    const content = gridItemInfo.map((item) => {
                        return {
                            type: "gridItem",
                            attrs: { gridArea: item },
                            content: [{ type: "paragraph" }],
                        };
                    });

                    // NOTE 移动端网格区域, 需要添加一个默认值
                    const mdGrid = getGridArea(gridItemInfo.length, true);

                    return commands.insertContent({ type: this.name, attrs: { grid, content, mdGrid } });
                },

            updateGridItemAttrs:
                (attrs: Partial<GridItemAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            openGridItemEditorPanel:
                (rect: UE_TIPTAP_UNIT.PositionRect) =>
                ({ chain, editor }) => {
                    const currentAttr = getGridItemAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("gridItem", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateGridItemAttrs(attr);
                            },
                        })
                        .run();
                },
        };
    },
});
