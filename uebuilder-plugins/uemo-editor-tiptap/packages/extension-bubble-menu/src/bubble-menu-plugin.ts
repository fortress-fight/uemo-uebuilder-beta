import type { ReferenceElement } from "@stone/uemo-editor-utils/lib/floating-ui";

import { Editor, isNodeSelection, isTextSelection, posToDOMRect } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { CellSelection } from "@tiptap/pm/tables";
import { EditorView } from "@tiptap/pm/view";

import { getAIExtensionStorage } from "../../../utils/tiptap-helper";

/**
 * 不显示气泡菜单的节点名称
 */
const NO_MENU_NODE_NAME = [
    "hrRule",
    "divideBlock",
    "image",
    "emptyNodePlaceHolder",
    "gridGroup",
    "gridItem",
    "frame",
    "buttonItem",
    "shareItem",
    "lottie",
    "svgIcon",
    "spline",
    "svgViewer",
];

/**
 * 气泡菜单插件的配置接口
 */
export interface BubbleMenuPluginProps {
    /**
     * 插件键值
     * @type {PluginKey | string}
     * @default 'bubbleMenu'
     */
    pluginKey: PluginKey | string;

    /**
     * 编辑器实例
     */
    editor: Editor;

    /**
     * 菜单更新前的延迟时间（毫秒）
     * 可用于防止性能问题
     * @type {number}
     * @default 250
     */
    updateDelay?: number;

    /**
     * 决定菜单是否应该显示的函数
     * @param {Object} props - 函数参数对象
     * @param {Editor} props.editor - 编辑器实例
     * @param {HTMLElement} props.element - 菜单元素
     * @param {EditorView} props.view - 编辑器视图
     * @param {EditorState} props.state - 当前编辑器状态
     * @param {EditorState} [props.oldState] - 上一个编辑器状态
     * @param {number} props.from - 选择起始位置
     * @param {number} props.to - 选择结束位置
     * @returns {boolean} 是否显示菜单
     */
    shouldShow?:
        | ((props: {
              editor: Editor;
              view: EditorView;
              state: EditorState;
              oldState?: EditorState;
              from: number;
              to: number;
          }) => boolean)
        | null;

    /**
     * 控制菜单显示的函数
     */
    controller: ((type: "show" | "update" | "hide", refEl?: ReferenceElement) => void) | null;

    /**
     * 气泡菜单初始化时调用的函数
     * @param {BubbleMenuView} bubbleMenu - 气泡菜单视图实例
     */
    onInit?: (bubbleMenu: BubbleMenuView) => void;

    /**
     * 气泡菜单销毁时调用的函数
     * @param {BubbleMenuView} bubbleMenu - 气泡菜单视图实例
     */
    onDestroy?: (bubbleMenu: BubbleMenuView) => void;
}

export type BubbleMenuViewProps = BubbleMenuPluginProps & {
    view: EditorView;
};

/**
 * 气泡菜单视图类
 * 负责管理气泡菜单的显示、隐藏和更新等行为
 */
export class BubbleMenuView {
    public editor: Editor;
    public view: EditorView;
    public preventHide = false;
    public updateDelay: number;
    private updateDebounceTimer: number | undefined;
    public dragging = false;
    public controller?: BubbleMenuPluginProps["controller"];

    /**
     * 判断是否应该显示气泡菜单
     * @param {Object} props - 判断参数
     * @returns {boolean} 是否显示菜单
     */
    public shouldShow: Exclude<BubbleMenuPluginProps["shouldShow"], null> = ({ view, state, from, to, editor }) => {
        const { doc, selection } = state;
        const { empty } = selection;

        // 如果编辑器正在加载 AI 内容，则不显示气泡菜单
        if (getAIExtensionStorage(this.editor)?.loading) return false;

        // 如果正在拖动，则不显示气泡菜单
        if (this.dragging) return false;

        // 有时仅检查 `empty` 是不够的
        // 双击空段落会返回大小为 2 的节点
        // 所以我们也检查空文本大小
        const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection);

        const hasEditorFocus = view.hasFocus();
        const hasEditingMark = editor.isActive("editingMark");

        if (!hasEditorFocus || empty || isEmptyTextBlock || !this.editor.isEditable || hasEditingMark) {
            return false;
        }

        if (isNodeSelection(selection)) {
            const nodeName = selection.node.type.name;
            if (NO_MENU_NODE_NAME.includes(nodeName)) {
                return false;
            }
        }

        const selectTable = selection instanceof CellSelection;

        if (selectTable) {
            return false;
        }

        return true;
    };

    /**
     * 创建气泡菜单视图实例
     * @param {BubbleMenuViewProps} param - 视图参数
     */
    constructor(public param: BubbleMenuViewProps) {
        const { editor, view, updateDelay = 250 } = param;
        const { shouldShow, onInit } = param;

        this.editor = editor;
        this.view = view;
        this.updateDelay = updateDelay;
        this.controller = param.controller;

        if (shouldShow) {
            this.shouldShow = shouldShow;
        }

        this.view.dom.addEventListener("pointerdown", this.pointerdownHandler);
        this.view.dom.addEventListener("dragstart", this.dragstartHandler);

        this.editor.on("focus", this.focusHandler);
        this.editor.on("blur", this.blurHandler);

        onInit?.(this);
    }

    dragstartHandler = () => {
        this.hide();
    };

    focusHandler = () => {
        // 使用 `setTimeout` 确保 `selection` 已经更新
        setTimeout(() => this.update(this.editor.view));
    };

    blurHandler = ({ event }: { event: FocusEvent }) => {
        if (event?.relatedTarget === this.editor.view.dom) {
            return;
        }

        this.hide();
    };

    tippyBlurHandler = (event: FocusEvent) => {
        this.blurHandler({ event });
    };

    dragendHandler = () => {
        this.dragging = false;
        this.update(this.view);
        document.body.removeEventListener("pointerup", this.dragendHandler);
    };
    pointerdownHandler = () => {
        this.dragging = true;
        document.body.removeEventListener("pointerup", this.dragendHandler);
        document.body.addEventListener("pointerup", this.dragendHandler);
    };

    /**
     * 更新气泡菜单的位置和状态
     * @param {EditorView} view - 编辑器视图
     * @param {boolean} selectionChanged - 选择是否改变
     * @param {boolean} docChanged - 文档是否改变
     * @param {EditorState} [oldState] - 上一个编辑器状态
     */
    update(view: EditorView, oldState?: EditorState) {
        const { state } = view;
        const hasValidSelection = state.selection.from !== state.selection.to;

        if (this.updateDelay > 0 && hasValidSelection) {
            this.handleDebouncedUpdate(view, oldState);
            return;
        }

        const selectionChanged = !oldState?.selection.eq(view.state.selection);
        const docChanged = !oldState?.doc.eq(view.state.doc);

        this.updateHandler(view, selectionChanged, docChanged, oldState);
    }

    handleDebouncedUpdate = (view: EditorView, oldState?: EditorState) => {
        const selectionChanged = !oldState?.selection.eq(view.state.selection);
        const docChanged = !oldState?.doc.eq(view.state.doc);

        if (!selectionChanged && !docChanged) {
            return;
        }

        if (this.updateDebounceTimer) {
            clearTimeout(this.updateDebounceTimer);
        }

        this.updateDebounceTimer = window.setTimeout(() => {
            this.updateHandler(view, selectionChanged, docChanged, oldState);
        }, this.updateDelay);
    };

    /**
     * 更新气泡菜单的位置和状态
     * @param {EditorView} view - 编辑器视图
     * @param {boolean} selectionChanged - 选择是否改变
     * @param {boolean} docChanged - 文档是否改变
     * @param {EditorState} [oldState] - 上一个编辑器状态
     */
    updateHandler = (view: EditorView, selectionChanged: boolean, docChanged: boolean, oldState?: EditorState) => {
        const { state, composing } = view;
        const { selection } = state;

        const isSame = !selectionChanged && !docChanged;

        if (composing || isSame) {
            return;
        }

        // 支持单元格选择
        const { ranges } = selection;
        const from = Math.min(...ranges.map((range) => range.$from.pos));
        const to = Math.max(...ranges.map((range) => range.$to.pos));

        const shouldShow = this.shouldShow?.({
            editor: this.editor,
            view,
            state,
            oldState,
            from,
            to,
        });

        if (!shouldShow) {
            this.hide();

            return;
        }

        if (this.editor.isFocused) {
            this.show({
                getBoundingClientRect: () => {
                    if (isNodeSelection(state.selection)) {
                        let node = view.nodeDOM(from) as HTMLElement;

                        if (node) {
                            const nodeViewWrapper = node.dataset.nodeViewWrapper
                                ? node
                                : node.querySelector("[data-node-view-wrapper]");

                            if (nodeViewWrapper) {
                                node = nodeViewWrapper.firstChild as HTMLElement;
                            }

                            if (node) {
                                return node.getBoundingClientRect();
                            }
                        }
                    }

                    return posToDOMRect(view, from, to);
                },
            });
        }
    };

    /**
     * 显示气泡菜单
     */
    show(refEl: ReferenceElement) {
        this.controller?.("show", refEl);
    }

    /**
     * 隐藏气泡菜单
     * 根据当前状态判断是否应该隐藏菜单
     */
    hide() {
        // NOTE 调用方式
        // this.editor.setOptions({ showMenu: true });
        if (this.editor.options.showMenu) {
            return true;
        }

        this.controller?.("hide");
    }

    /**
     * 销毁气泡菜单
     * 清理所有事件监听和资源
     */
    destroy() {
        this.param.onDestroy?.(this);

        this.view.dom.removeEventListener("dragstart", this.dragstartHandler);
        this.view.dom.removeEventListener("pointerdown", this.pointerdownHandler);

        document.body.removeEventListener("pointerup", this.dragendHandler);

        this.controller?.("hide");

        this.editor.off("focus", this.focusHandler);
        this.editor.off("blur", this.blurHandler);
    }
}

/**
 * 创建气泡菜单插件
 * @param {BubbleMenuPluginProps} options - 插件配置选项
 * @returns {Plugin} Tiptap 插件实例
 */
export const BubbleMenuPlugin = (options: BubbleMenuPluginProps) => {
    return new Plugin({
        key: typeof options.pluginKey === "string" ? new PluginKey(options.pluginKey) : options.pluginKey,
        view: (view) => new BubbleMenuView({ view, ...options }),
    });
};
