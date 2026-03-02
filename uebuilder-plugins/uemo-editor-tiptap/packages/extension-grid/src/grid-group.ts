import type { Attribute } from "@tiptap/core";
import type { GridGroupAttrs } from "./index";

import { Node } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";

import { getGridInfo, getGridArea, convertGridRatio } from "@stone/uemo-editor-utils/lib/css-grid";

import GridGroupView from "../view/GridGroupView.vue";

import { parseGridGroup } from "../utils/parse";
import { gridGroupRender } from "../utils/render";
import { selectNodeInner } from "../../../utils/tiptap-utils";
import { getClosestGridGroup, getClosestGridItem, getGridGroupAttrs } from "../utils/helper";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        gridGroup: {
            /**
             * 插入网格
             */
            insertGridGroup: (value: string) => ReturnType;

            /**
             * 更新网格组属性
             */
            updateGridGroupAttrs: (attrs: Partial<GridGroupAttrs>) => ReturnType;

            /**
             * 打开网格组编辑器面板
             */
            openGridGroupEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;
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

    addCommands() {
        return {
            insertGridGroup:
                (grid: string) =>
                ({ commands }) => {
                    if (!grid) return false;

                    const gridItemInfo = grid.split(":")[1].split(",");
                    const content = gridItemInfo.map((item) => {
                        return { type: "gridItem", attrs: { gridArea: item }, content: [{ type: "paragraph" }] };
                    });

                    // NOTE 移动端网格区域, 需要添加一个默认值
                    const mdGrid = getGridArea(gridItemInfo.length, true);

                    return commands.insertContent({ type: this.name, attrs: { grid, mdGrid }, content });
                },

            updateGridGroupAttrs:
                (attrs: Partial<GridGroupAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            openGridGroupEditorPanel:
                (rect: UE_TIPTAP_UNIT.PositionRect) =>
                ({ chain, editor }) => {
                    /**
                     * 网格组编辑器面板事件处理
                     */
                    function fireHandler(type: "remove", param: { grid: string; mdGrid: string; list: number[] }) {
                        if (type !== "remove") return;

                        const view = editor.view;
                        const tr = view.state.tr;
                        const { doc } = tr;

                        const gridGroupInfo = getClosestGridGroup(editor);
                        if (!gridGroupInfo) return;

                        const { node, start } = gridGroupInfo;

                        const currentNodeJSON = node.toJSON();
                        const { subColInfo: newSubColInfo } = getGridInfo(param.grid);
                        const { subColInfo: newMdSubColInfo } = getGridInfo(param.mdGrid);

                        const newContent = currentNodeJSON.content
                            .filter((_item: any, index: number) => {
                                return !param.list.includes(index);
                            })
                            .map((item: any, index: number) => {
                                return {
                                    type: item.type,
                                    attrs: {
                                        ...item.attrs,
                                        gridArea: newSubColInfo[index],
                                        mdGridArea: newMdSubColInfo[index],
                                    },
                                    content: item.content,
                                };
                            });

                        const newNode = ProseMirrorNode.fromJSON(editor.schema, {
                            type: currentNodeJSON.type,
                            attrs: {
                                ...currentNodeJSON.attrs,
                                grid: param.grid,
                                mdGrid: param.mdGrid,
                            },
                            content: newContent,
                        });

                        tr.setSelection(NodeSelection.create(doc, start)).replaceSelectionWith(newNode);
                        view.dispatch(tr);
                        view.focus();
                    }

                    /**
                     * 更新网格布局
                     */
                    function updateGridLayout(currentAttr: GridGroupAttrs, attr: GridGroupAttrs) {
                        const { state, view } = editor;

                        const gridGroupInfo = getClosestGridGroup(editor);
                        if (!gridGroupInfo) return;

                        if (attr.grid) {
                            const info = attr.grid;
                            const [rc, sub] = info.split(":");
                            const [row, col] = rc.split(",");
                            attr.grid = `${row},${convertGridRatio(col)}:${sub}`;
                        }

                        const { doc, tr } = state;
                        const { node, start, pos } = gridGroupInfo;

                        const { subColInfo: currentGrid } = getGridInfo(currentAttr.grid);

                        const { subColInfo: newGrid } = getGridInfo(attr.grid);
                        const { subColInfo: newMdGrid } = getGridInfo(attr.mdGrid);

                        if (currentGrid.length !== newGrid.length) {
                            const currentNodeJSON = node.toJSON();

                            const newContent = newGrid.map((item, index) => {
                                const currentGridItem = currentNodeJSON.content[index];
                                if (currentGridItem) {
                                    return {
                                        type: currentGridItem.type,
                                        attrs: {
                                            ...currentGridItem.attrs,
                                            gridArea: item,
                                            mdGridArea: newMdGrid[index],
                                        },
                                        content: currentGridItem.content,
                                    };
                                }
                                return {
                                    type: "gridItem",
                                    attrs: { gridArea: item, mdGridArea: newMdGrid[index] },
                                    content: [{ type: "paragraph" }],
                                };
                            });

                            const newNode = ProseMirrorNode.fromJSON(editor.schema, {
                                type: currentNodeJSON.type,
                                attrs: {
                                    ...currentNodeJSON.attrs,
                                    grid: attr.grid,
                                    mdGrid: attr.mdGrid,
                                },
                                content: newContent,
                            });

                            tr.setSelection(NodeSelection.create(doc, start)).replaceSelectionWith(newNode);
                        } else {
                            tr.setNodeMarkup(pos, undefined, { ...node.attrs, ...attr });

                            doc.nodesBetween(start, start + node.nodeSize, (innerNode, pos) => {
                                if (innerNode.type.name !== "gridItem") return;

                                node.content.forEach((contentNode, _offset, index) => {
                                    if (contentNode !== innerNode) return;

                                    const gridArea = newGrid?.[index];
                                    const mdGridArea = newMdGrid?.[index];

                                    void (gridArea && tr.setNodeAttribute(pos, "gridArea", gridArea));
                                    void (mdGridArea && tr.setNodeAttribute(pos, "mdGridArea", mdGridArea));
                                });
                            });
                        }

                        view.dispatch(tr);
                        view.focus();
                    }

                    return chain()
                        .focus()
                        .openAttrEditorPanel("gridGroup", getGridGroupAttrs(this.editor), {
                            rect,
                            updateAttrs: (attr) => {
                                const currentAttr = getGridGroupAttrs(this.editor);

                                // NOTE 如果网格组属性没有变化，则使用常规更新
                                if (attr.grid === currentAttr.grid && attr.mdGrid === currentAttr.mdGrid) {
                                    editor.commands.updateGridGroupAttrs(attr);
                                } else {
                                    updateGridLayout(currentAttr, attr);
                                }
                            },
                            fire: fireHandler,
                        })
                        .run();
                },
        };
    },
});
