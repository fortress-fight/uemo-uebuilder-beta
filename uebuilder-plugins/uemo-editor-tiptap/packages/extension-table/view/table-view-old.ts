import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type { NodeView, ViewMutationRecord } from "@tiptap/pm/view";
import type { Editor } from "@tiptap/core";

import { createApp, type ComponentPublicInstance } from "vue";
import $pageStyle from "../../../src/app.module.scss";

import TableViewComponent from "./TableView.vue";

export function updateColumns(
    node: ProseMirrorNode,
    colgroup: Element,
    table: HTMLTableElement,
    cellMinWidth: number,
    overrideCol?: number,
    overrideValue?: any
) {
    let totalWidth = 0;
    // let fixedWidth = true;
    let nextDOM: any = colgroup.firstChild;
    const row = node.firstChild!;

    for (let i = 0, col = 0; i < row.childCount; i += 1) {
        const { colspan, colwidth } = row.child(i).attrs;
        for (let j = 0; j < colspan; j += 1, col += 1) {
            const hasWidth = overrideCol === col ? overrideValue : colwidth?.[j];

            const cssWidth = hasWidth ? `${hasWidth}px` : "";

            totalWidth += hasWidth || cellMinWidth;

            // if (!hasWidth) {
            //     fixedWidth = false;
            // }

            if (!nextDOM) {
                colgroup.appendChild(document.createElement("col")).style.width = cssWidth;
            } else {
                if (nextDOM.style.width !== cssWidth) {
                    nextDOM.style.width = cssWidth;
                }

                nextDOM = nextDOM.nextSibling;
            }
        }
    }

    while (nextDOM) {
        const after = nextDOM.nextSibling;

        nextDOM.parentNode.removeChild(nextDOM);
        nextDOM = after;
    }

    if (node.attrs.tableBorder) {
        if (table.classList.contains($pageStyle["table-hide-border"])) {
            table.classList.remove($pageStyle["table-hide-border"]);
        }
    } else {
        if (!table.classList.contains($pageStyle["table-hide-border"])) {
            table.classList.add($pageStyle["table-hide-border"]);
        }
    }

    if (node.attrs.minWidth) {
        table.style.setProperty("--table-min-width", `${node.attrs.minWidth}`);
    }

    if (node.attrs.tableBorderColor) {
        table.style.setProperty("--table-border-color", `${node.attrs.tableBorderColor}`);
    }

    table.style.setProperty("--table-drag-min-width", `${totalWidth}px`);
    table.style.width = "";
    table.style.minWidth = "";

    // if (fixedWidth) {
    //     table.style.width = `${totalWidth}px`;
    //     table.style.minWidth = "";
    // } else {
    //     table.style.width = "";
    //     table.style.minWidth = `${totalWidth}px`;
    // }
}

export function getTableView(editor: Editor) {
    return class TableView implements NodeView {
        node: ProseMirrorNode;
        cellMinWidth: number;
        dom: Element;
        ref: ComponentPublicInstance;
        app: ReturnType<typeof createApp>;
        table: HTMLTableElement;
        selectionTip: HTMLElement;
        scrollBox: HTMLElement;
        selectionUpdate: (() => void) | null;
        colgroup: Element;
        contentDOM: HTMLTableSectionElement;

        constructor(node: ProseMirrorNode, cellMinWidth: number, view: NodeView) {
            this.node = node;
            this.cellMinWidth = cellMinWidth;
            // 创建容器
            const container = document.createElement("div");
            // 创建 app
            this.app = createApp(TableViewComponent, {
                editor,
                view,
                cellMinWidth,
            });
            // 挂载
            this.ref = this.app.mount(container);
            // 取出 DOM
            this.dom = container.firstElementChild as HTMLElement;
            // 取出暴露的属性（需在 TableView.vue 里 defineExpose）
            this.selectionTip = (this.ref as any).selectionTip;
            this.scrollBox = (this.ref as any).scrollBox;
            this.selectionUpdate = (this.ref as any).selectionUpdate;
            this.table = (this.ref as any).table;
            this.colgroup = (this.ref as any).colgroup;
            updateColumns(node, this.colgroup, this.table, cellMinWidth);
            this.contentDOM = (this.ref as any).tbody;
        }

        destroy() {
            this.selectionUpdate = null;
            this.app.unmount();
        }

        update(node: ProseMirrorNode) {
            if (node.type !== this.node.type) {
                return false;
            }
            this.node = node;
            updateColumns(node, this.colgroup, this.table, this.cellMinWidth);
            this.selectionUpdate?.();
            return true;
        }

        ignoreMutation(mutation: ViewMutationRecord) {
            return (
                mutation.type === "attributes" &&
                (mutation.target === this.scrollBox ||
                    mutation.target === this.selectionTip ||
                    this.selectionTip.contains(mutation.target) ||
                    mutation.target === this.table ||
                    this.colgroup.contains(mutation.target))
            );
        }
    };
}
