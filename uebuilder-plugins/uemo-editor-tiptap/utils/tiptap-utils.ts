import type { Editor } from "@tiptap/core";
import type { EditorView } from "@tiptap/pm/view";
import type { EditorState, Selection } from "@tiptap/pm/state";
import type { Node as ProsemirrorNode } from "@tiptap/pm/model";

import { isInTable } from "@tiptap/pm/tables";
import { isNodeSelection, posToDOMRect } from "@tiptap/core";

/**
 * 判断是否在网格组中
 */
export function isInGridGroup(state: EditorState): boolean {
    const $head = state.selection.$head;
    for (let d = $head.depth; d > 0; d--) {
        if ($head.node(d).type.name == "gridGroup") {
            return true;
        }
    }
    return false;
}

/**
 * 判断是否存在父节点
 */
export function hasParentNode(editor: Editor) {
    const selection = editor.state.selection;
    if (isNodeSelection(selection)) {
        const { from } = selection;
        const parent = editor.state.doc.resolve(from).parent;
        if (parent && parent.type.name != "doc") {
            return true;
        }
    }
    return false;
}

/**
 * 判断是否在表格中
 */
export { isInTable };

/**
 * @description 获取表格节点
 */
export function getTableNode(selection: Selection) {
    const $pos = selection.$anchor;
    let tableNode: ProsemirrorNode | undefined = undefined;
    let start;
    let end;
    for (let d = $pos.depth; d > 0; d--) {
        const node = $pos.node(d);
        if (node.type.spec.tableRole == "table") {
            start = $pos.before(d);
            end = $pos.after(d);
            tableNode = node;
            break;
        }
    }
    return {
        tableNode,
        start,
        end,
        $pos,
    };
}

/**
 * 获取选区矩形
 */
export function getSelectionRect(view: EditorView, selection: Selection) {
    const { from, to } = selection;
    if (typeof from === "undefined" || typeof to === "undefined") {
        return null;
    }

    const rect = posToDOMRect(view, from, to) as Exclude<UE_TIPTAP_UNIT.PositionRect, HTMLElement>;

    return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
    };
}

/**
 * 获取当前选中文本的 DOM 节点
 *
 * 在 ProseMirror 中，selection 表示当前编辑器的选中状态
 * 这个函数用于获取选中文本对应的 DOM 节点，以便进行后续的动画操作
 *
 * @param editor - Tiptap 编辑器实例
 * @returns 返回选中文本的父级 DOM 节点
 */
export function getNodeDom(editor: Editor) {
    // 获取当前编辑器的选中状态
    const selection = editor?.state.selection;
    // 获取选中位置对应的 DOM 节点
    const dom = editor.view.domAtPos(selection?.from || 0, 1);

    let node: Node | null = dom.node;
    // 如果节点是文本节点，则获取其父节点
    if (node.nodeType === 3) {
        node = node.parentNode;
    }

    return node;
}

/**
 * 获取扩展选项
 */
export function getExtensionOptions(editor: Editor, name: string) {
    const extension = editor.extensionManager.extensions.find((extension) => extension.name === name);
    return extension?.options || undefined;
}
