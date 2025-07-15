<!--
 * @Description: TableView 组件，支持表格选区、拖拽、可视化高亮等功能
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 15:40:54
-->
<template>
    <div ref="dom" :class="$style['table-wrapper']">
        <div ref="selectionTip" :class="$style['selection-tip']" :data-dragging="dragging">
            <div :class="$style['dragger-pointer']" data-pos="tl">
                <div :class="$style['pointer']" @mousedown="handleMouseDown('tl', editor.view, $event)"></div>
            </div>
            <div :class="$style['dragger-pointer']" data-pos="br">
                <div :class="$style['pointer']" @mousedown="handleMouseDown('br', editor.view, $event)"></div>
            </div>
        </div>
        <div
            ref="scrollBox"
            :class="[pageStyle['table-scroll-box'], $style['table-scroll-box']]"
            @scroll="tableScroll"
            :data-editing="isEditing"
            :data-focus-in="isFocusIn"
        >
            <table ref="table">
                <colgroup ref="colgroup" />
                <tbody ref="tbody"></tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { NodeView, EditorView } from "@tiptap/pm/view";
import type { Editor } from "@tiptap/core";
import type { Selection } from "@tiptap/pm/state";
import type { ResolvedPos } from "@tiptap/pm/model";

import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { isInTable, cellAround, inSameTable, tableEditingKey, CellSelection } from "@tiptap/pm/tables";

import { getClosestTableCellNode, getClosestTable } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

import pageStyle from "../../../src/app.module.scss";

const table = ref<HTMLTableElement>();
const tbody = ref<HTMLTableElement>();
const dom = ref<HTMLElement>();
const colgroup = ref<HTMLElement>();
const selectionTip = ref<HTMLElement>();
const scrollBox = ref<HTMLElement>();

const prop = defineProps<{ editor: Editor; cellMinWidth: number; view: NodeView }>();

let oldSelection: Selection | null = null;
let tipHasShow = false;
let timer: ReturnType<typeof setTimeout>;

/**
 * 移除选区高亮提示
 */
function removeTip() {
    clearTimeout(timer);
    oldSelection = null;
    if (tipHasShow) {
        selectionTip.value?.removeAttribute("style");
        tipHasShow = false;
    }
}

/**
 * 设置选区高亮提示位置
 * @param rect 选区的位置信息
 */
function setTip(rect: { left: number; top: number; width: number; height: number }) {
    clearTimeout(timer);
    if (!tipHasShow) {
        timer = setTimeout(() => {
            tipHasShow = true;
            gsap.set(selectionTip.value!, {
                ...rect,
                display: "block",
            });
        }, 100);
    } else {
        tipHasShow = true;
        gsap.set(selectionTip.value!, {
            ...rect,
            display: "block",
        });
    }
}

const isSelectionSelf = ref(false);
const isFocusIn = ref(false);

/**
 * 选区更新时的处理逻辑，负责高亮、状态同步
 * @returns void
 */
function selectionUpdate() {
    const editor = prop.editor;
    const { view, state } = editor;
    const { selection } = state;
    oldSelection = selection;
    const inTable = isInTable(state);
    if (!view.hasFocus()) {
        isFocusIn.value = false;
        removeTip();
        return;
    }
    isSelectionSelf.value = false;
    if (!inTable) {
        removeTip();
        return;
    }
    isFocusIn.value = true;
    const tableNodeInfo = getClosestTable(state.selection);
    if (!tableNodeInfo) return;
    const { pos: tablePos, node: tableNode } = tableNodeInfo;
    if (!tableNode || dom.value != editor.view.nodeDOM(tablePos)) {
        removeTip();
        return;
    }
    isSelectionSelf.value = true;
    try {
        const tableRect = (editor.view.nodeDOM(tablePos) as HTMLElement).getBoundingClientRect();
        if (selection instanceof CellSelection) {
            const { $anchorCell, $headCell } = selection;
            const from = $headCell.pos > $anchorCell.pos ? $anchorCell.pos : $headCell.pos;
            const to = $headCell.pos > $anchorCell.pos ? $headCell.pos : $anchorCell.pos;
            const fromRect = (editor.view.nodeDOM(from) as HTMLElement).getBoundingClientRect();
            const toRect = (editor.view.nodeDOM(to) as HTMLElement).getBoundingClientRect();
            setTip({
                left: Math.min(fromRect.left, toRect.left) - tableRect.left - 1,
                top: Math.min(fromRect.top, toRect.top) - tableRect.top - 1,
                width:
                    Math.max(
                        Math.abs(toRect.right - fromRect.left),
                        Math.abs(fromRect.right - toRect.left),
                        fromRect.width,
                        toRect.width
                    ) + 2,
                height:
                    Math.max(
                        Math.abs(toRect.bottom - fromRect.top),
                        Math.abs(fromRect.bottom - toRect.top),
                        fromRect.height,
                        toRect.height
                    ) + 2,
            });
        } else {
            const tableCellNodeInfo = getClosestTableCellNode(state.selection);
            if (!tableCellNodeInfo) return;
            const { pos: tableCellPos } = tableCellNodeInfo;
            if (typeof tableCellPos === "undefined") {
                removeTip();
                return;
            }
            const cellRect = (editor.view.nodeDOM(tableCellPos) as HTMLElement)?.getBoundingClientRect();
            setTip({
                left: cellRect.left - tableRect.left - 1,
                top: cellRect.top - tableRect.top - 1,
                width: cellRect.width + 2,
                height: cellRect.height + 2,
            });
        }
    } catch (error) {
        console.error(error);
        removeTip();
    }
}

/**
 * 判断 dom 是否在单元格内
 * @param view 编辑器视图
 * @param dom 节点
 * @returns Node | null
 */
function domInCell(view: EditorView, dom: Node | null): Node | null {
    for (; dom && dom != view.dom; dom = dom.parentNode) {
        if (dom.nodeName == "TD" || dom.nodeName == "TH") {
            return dom;
        }
    }
    return null;
}

/**
 * 获取鼠标下的单元格位置
 * @param view 编辑器视图
 * @param event 鼠标事件
 * @returns ResolvedPos | null
 */
function cellUnderMouse(view: EditorView, event: MouseEvent): ResolvedPos | null {
    const mousePos = view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
    });
    if (!mousePos) return null;
    return mousePos ? cellAround(view.state.doc.resolve(mousePos.pos)) : null;
}

const dragging = ref<boolean>();

/**
 * 处理表格选区拖拽事件
 * @param dir 拖拽方向（br/tl）
 * @param view 编辑器视图
 * @param startEvent 鼠标事件
 */
function handleMouseDown(dir: "br" | "tl", view: EditorView, startEvent: MouseEvent): void {
    if (startEvent.ctrlKey || startEvent.metaKey) return;
    dragging.value = true;

    if (!oldSelection) return;
    let startDOMCell: HTMLElement;
    let $cell: ResolvedPos | null = null;
    if (oldSelection instanceof CellSelection) {
        const { $anchorCell, $headCell } = oldSelection;
        view.dispatch(view.state.tr.setSelection(new CellSelection($anchorCell, $headCell)));
        if (dir === "tl") {
            $cell = $headCell.parentOffset > $anchorCell.parentOffset ? $headCell : $anchorCell;
        } else {
            $cell = $headCell.parentOffset > $anchorCell.parentOffset ? $anchorCell : $headCell;
        }
        if (!$cell) return;
    } else {
        const from = oldSelection.from;
        const tableCellNodeInfo = getClosestTableCellNode(oldSelection);
        if (!tableCellNodeInfo) return;
        const { start } = tableCellNodeInfo;
        if (typeof start === "undefined") return;
        startDOMCell = prop.editor.view.nodeDOM(start) as HTMLElement;
        const { state } = view;
        const doc = state.doc;
        $cell = cellAround(doc.resolve(from));
        if (!$cell || !startDOMCell) return;
        view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));
    }
    startEvent.preventDefault();
    /**
     * 创建并派发单元格选区
     * @param $anchor 锚点单元格
     * @param event 鼠标事件
     */
    function setCellSelection($anchor: ResolvedPos, event: MouseEvent): void {
        let $head = cellUnderMouse(view, event);
        const starting = tableEditingKey.getState(view.state) == null;
        if (!$head || !inSameTable($anchor, $head)) {
            if (starting) $head = $anchor;
            else return;
        }
        const selection = new CellSelection($anchor, $head);
        if (starting || !view.state.selection.eq(selection)) {
            const tr = view.state.tr.setSelection(selection);
            if (starting) tr.setMeta(tableEditingKey, $anchor.pos);
            view.dispatch(tr);
        }
    }
    /**
     * 停止拖拽监听，释放事件，防止内存泄漏
     */
    function stop(): void {
        dragging.value = false;
        view.root.removeEventListener("mouseup", stop);
        view.root.removeEventListener("dragstart", stop);
        view.root.removeEventListener("mousemove", move);
        if (tableEditingKey.getState(view.state) != null) {
            view.dispatch(view.state.tr.setMeta(tableEditingKey, -1));
        }
    }
    function move(_event: Event): void {
        const event = _event as MouseEvent;
        const anchor = tableEditingKey.getState(view.state);
        let $anchor;
        if (anchor != null) {
            $anchor = view.state.doc.resolve(anchor);
        } else if (domInCell(view, event.target as Node) != startDOMCell) {
            $anchor = $cell;
            if (!$anchor) return stop();
        }
        if ($anchor) setCellSelection($anchor, event);
    }
    view.root.addEventListener("mouseup", stop);
    view.root.addEventListener("dragstart", stop);
    view.root.addEventListener("mousemove", move);
}
defineExpose({
    table,
    tbody,
    colgroup,
    selectionTip,
    selectionUpdate,
    scrollBox,
});

/**
 * 滚动时同步选区高亮
 */
function tableScroll() {
    requestAnimationFrame(() => {
        selectionUpdate();
    });
}

const isEditing = computed(() => {
    return isSelectionSelf.value && getEditorPanelExtensionStorage(prop.editor).lastEditorPanelType === "table";
});

let resizeObserver: ResizeObserver | null;

/**
 * 组件挂载时，监听表格尺寸变化，自动同步选区高亮
 */
onMounted(() => {
    requestAnimationFrame(() => {
        resizeObserver = new ResizeObserver((_entries) => {
            requestAnimationFrame(() => {
                selectionUpdate();
            });
        });
        dom.value?.querySelectorAll("td,th,table").forEach((dom) => {
            resizeObserver?.observe(dom);
        });
    });
});

/**
 * 组件卸载时，断开 observer，防止内存泄漏
 */
onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
});
</script>

<style lang="scss" module>
.table-wrapper {
    position: relative;
    :global(.column-resize-handle) {
        position: absolute;
        z-index: 10;
        top: 0;
        right: -2px;
        bottom: -2px;

        width: 3px;

        pointer-events: none;

        background-color: var(--theme-layout-component);
    }
    .selection-tip {
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;

        display: none;

        width: 0;
        height: 0;

        pointer-events: none;

        border: 2px solid var(--theme-layout-component);
        border-radius: 2px;
        &[data-dragging="true"] {
            & ~ .table-scroll-box {
                :global(.column-resize-handle) {
                    visibility: hidden !important;

                    opacity: 0 !important;
                }
            }
        }
    }
    .dragger-pointer {
        .pointer {
            width: 9px;
            height: 9px;

            border: 2px solid var(--theme-layout-component);
            border-radius: 50%;
            background: #fff;
        }
        &[data-pos="br"],
        &[data-pos="tl"] {
            position: absolute;
            z-index: 10;

            display: flex;

            width: 9px;
            height: 9px;

            cursor: nwse-resize;
            pointer-events: auto;

            border-radius: 50%;
            background: transparent;

            align-items: center;
            justify-content: center;
        }
        &[data-pos="br"] {
            right: -4.5px;
            bottom: -4.5px;
        }
        &[data-pos="tl"] {
            top: -4.5px;
            left: -4.5px;
        }
    }
}
:global(.resize-cursor) {
    .selection-tip {
        opacity: 0 !important;
    }
}
</style>
