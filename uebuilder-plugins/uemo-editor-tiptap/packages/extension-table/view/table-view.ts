import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import type { NodeView, ViewMutationRecord } from "@tiptap/pm/view";
import type { Editor } from "@tiptap/core";

import { createApp, type ComponentPublicInstance } from "vue";
import $pageStyle from "../../../src/app.module.scss";

import TableViewComponent from "./TableView.vue";

/**
 * 更新表格列宽和样式
 * @param node ProseMirror 表格节点
 * @param colgroup 表格 colgroup 元素
 * @param table 表格元素
 * @param cellMinWidth 单元格最小宽度
 * @param overrideCol 可选，指定覆盖的列索引
 * @param overrideValue 可选，覆盖的宽度值
 */
export function updateColumns(
    node: ProseMirrorNode,
    colgroup: Element,
    table: HTMLTableElement,
    cellMinWidth: number,
    overrideCol?: number,
    overrideValue?: any
) {
    let totalWidth = 0;
    let nextDOM: any = colgroup.firstChild;
    const row = node.firstChild!;

    for (let i = 0, col = 0; i < row.childCount; i += 1) {
        const { colspan, colwidth } = row.child(i).attrs;
        for (let j = 0; j < colspan; j += 1, col += 1) {
            const hasWidth = overrideCol === col ? overrideValue : colwidth?.[j];
            const cssWidth = hasWidth ? `${hasWidth}px` : "";
            totalWidth += hasWidth || cellMinWidth;
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
    // 移除多余的 col 元素，防止内存泄漏
    while (nextDOM) {
        const after = nextDOM.nextSibling;
        nextDOM.parentNode.removeChild(nextDOM);
        nextDOM = after;
    }
    // 边框样式处理
    if (node.attrs.tableBorder) {
        table.classList.remove($pageStyle["table-hide-border"]);
    } else {
        if (!table.classList.contains($pageStyle["table-hide-border"])) {
            table.classList.add($pageStyle["table-hide-border"]);
        }
    }
    // 设置表格最小宽度
    if (node.attrs.minWidth) {
        table.style.setProperty("--table-min-width", `${node.attrs.minWidth}`);
    }
    // 设置表格边框颜色
    if (node.attrs.tableBorderColor) {
        table.style.setProperty("--table-border-color", `${node.attrs.tableBorderColor}`);
    }
    // 设置拖拽最小宽度
    table.style.setProperty("--table-drag-min-width", `${totalWidth}px`);
    table.style.width = "";
    table.style.minWidth = "";
}

/**
 * TableView 节点视图工厂
 * @param editor Tiptap 编辑器实例
 * @returns TableView 构造器
 */
export function getTableView(editor: Editor) {
    return class TableView implements NodeView {
        node: ProseMirrorNode;
        cellMinWidth: number;
        dom: Element;
        ref: ComponentPublicInstance<typeof TableViewComponent>;
        app: ReturnType<typeof createApp>;
        table: HTMLTableElement;
        selectionTip: HTMLElement;
        scrollBox: HTMLElement;
        selectionUpdate: (() => void) | null;
        colgroup: Element;
        contentDOM: HTMLTableSectionElement;

        /**
         * 构造函数，初始化 TableView
         * @param node ProseMirror 节点
         * @param cellMinWidth 单元格最小宽度
         * @param view NodeView 实例
         */
        constructor(node: ProseMirrorNode, cellMinWidth: number, view: NodeView) {
            this.node = node;
            this.cellMinWidth = cellMinWidth;
            // 创建容器
            const container = document.createElement("div");
            // 创建 Vue app
            this.app = createApp(TableViewComponent, {
                editor,
                view,
                cellMinWidth,
            });
            // 挂载 Vue 组件
            this.ref = this.app.mount(container);
            // 获取 DOM 元素
            this.dom = container.firstElementChild as HTMLElement;
            // 获取暴露的属性（需在 TableView.vue 里 defineExpose）
            this.selectionTip = this.ref.selectionTip;
            this.scrollBox = this.ref.scrollBox;
            this.selectionUpdate = this.ref.selectionUpdate;
            this.table = this.ref.table;
            this.colgroup = this.ref.colgroup;
            if (this.colgroup) {
                updateColumns(node, this.colgroup, this.table, cellMinWidth);
            }
            this.contentDOM = this.ref.tbody;
        }

        /**
         * 销毁 TableView，释放资源，防止内存泄漏
         */
        destroy() {
            this.selectionUpdate = null;
            this.app.unmount();
        }

        /**
         * 更新节点视图
         * @param node 新的 ProseMirror 节点
         * @returns 是否更新成功
         */
        update(node: ProseMirrorNode) {
            if (node.type !== this.node.type) {
                return false;
            }
            this.node = node;
            updateColumns(node, this.colgroup, this.table, this.cellMinWidth);
            this.selectionUpdate?.();
            return true;
        }

        /**
         * 判断是否忽略 DOM 变更，提升性能
         * @param mutation 变更记录
         * @returns 是否忽略
         */
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
