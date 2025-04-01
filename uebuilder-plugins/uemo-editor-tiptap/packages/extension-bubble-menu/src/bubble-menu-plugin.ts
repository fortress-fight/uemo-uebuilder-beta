import type { Instance, Props } from "@stone/uemo-editor-utils/lib/tippy";

import { Editor, isNodeSelection, isTextSelection, posToDOMRect } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { CellSelection } from "@tiptap/pm/tables";
import { EditorView } from "@tiptap/pm/view";

import tippy from "@stone/uemo-editor-utils/lib/tippy";

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
     * 包含菜单的 DOM 元素
     * @type {HTMLElement}
     * @default null
     */
    element: HTMLElement;

    /**
     * tippy.js 实例的配置选项
     * @see https://atomiks.github.io/tippyjs/v6/all-props/
     */
    tippyOptions?: Partial<Props>;

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
              element: HTMLElement;
              view: EditorView;
              state: EditorState;
              oldState?: EditorState;
              from: number;
              to: number;
          }) => boolean)
        | null;

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

    /**
     * 气泡菜单更新时调用的函数
     * @param {Instance} tippy - tippy 实例
     * @param {Partial<Props>} param - 更新参数
     * @returns {Partial<Props>} 更新后的配置选项
     */
    updateTippyOptions?: (tippy: Instance | undefined, param: Partial<Props>) => Partial<Props>;
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
    public element: HTMLElement;
    public view: EditorView;
    public preventHide = false;
    public tippy: Instance | undefined;
    public tippyOptions?: Partial<Props>;
    public updateDelay: number;
    private updateDebounceTimer: number | undefined;
    public preventShow = false;
    public dragging = false;
    public updateTippyOptions = (_tippy: Instance | undefined, param: Partial<Props>) => param;

    /**
     * 判断是否应该显示气泡菜单
     * @param {Object} props - 判断参数
     * @returns {boolean} 是否显示菜单
     */
    public shouldShow: Exclude<BubbleMenuPluginProps["shouldShow"], null> = ({ view, state, from, to }) => {
        const { doc, selection } = state;
        const { empty } = selection;

        // 如果编辑器正在加载 AI 内容，则不显示气泡菜单
        if (this.editor.storage.aiLoading) return false;

        // 如果正在拖动，则不显示气泡菜单
        if (this.dragging) return false;

        // 有时仅检查 `empty` 是不够的
        // 双击空段落会返回大小为 2 的节点
        // 所以我们也检查空文本大小
        const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection);

        // 当点击气泡菜单内的元素时，编辑器的 "blur" 事件
        // 被调用，气泡菜单项获得焦点。在这种情况下，我们应该
        // 将菜单视为编辑器的一部分并保持显示
        const isChildOfMenu = this.element.contains(document.activeElement);

        // 如果点击的是菜单按钮，则不隐藏气泡菜单
        const isMenuBtn = document.activeElement?.getAttribute("data-name") === "menuBtn";

        const hasEditorFocus = view.hasFocus() || isChildOfMenu || isMenuBtn;

        if (!hasEditorFocus || empty || isEmptyTextBlock || !this.editor.isEditable) {
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
        const { editor, element, view, tippyOptions = {}, updateDelay = 250 } = param;
        const { shouldShow, updateTippyOptions, onInit } = param;

        this.editor = editor;
        this.element = element;
        this.view = view;
        this.updateDelay = updateDelay;

        if (!this.element) return;

        if (shouldShow) {
            this.shouldShow = shouldShow;
        }

        this.element.addEventListener("mousedown", this.mousedownHandler, { capture: true });

        this.view.dom.addEventListener("pointerdown", this.pointerdownHandler);
        this.view.dom.addEventListener("dragstart", this.dragstartHandler);

        this.editor.on("focus", this.focusHandler);
        this.editor.on("blur", this.blurHandler);

        this.tippyOptions = tippyOptions || { zIndex: 99999 };

        if (updateTippyOptions) {
            this.updateTippyOptions = updateTippyOptions;
        }

        // 将菜单内容从其当前父元素中分离
        this.element.remove();
        this.element.style.visibility = "visible";
        onInit?.(this);
    }

    mousedownHandler = () => {
        this.preventHide = true;
    };

    dragstartHandler = () => {
        this.hide();
    };

    focusHandler = () => {
        // 使用 `setTimeout` 确保 `selection` 已经更新
        setTimeout(() => this.update(this.editor.view));
    };

    blurHandler = ({ event }: { event: FocusEvent }) => {
        if (this.preventHide) {
            this.preventHide = false;

            return;
        }

        if (event?.relatedTarget && this.element.parentNode?.contains(event.relatedTarget as Node)) {
            return;
        }

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
     * 创建 tippy 工具提示实例
     * 负责初始化和管理气泡菜单的显示位置
     */
    createTooltip() {
        const { element: editorElement } = this.editor.options;
        const editorIsAttached = !!editorElement.parentElement;

        if (this.tippy || !editorIsAttached) {
            return;
        }

        // this.tippy = tippy(editorElement, {
        //     duration: 0,
        //     getReferenceClientRect: null,
        //     content: this.element,
        //     interactive: true,
        //     trigger: 'manual',
        //     placement: 'top',
        //     hideOnClick: 'toggle',
        //     ...this.tippyOptions,
        //   })

        this.tippy = tippy(editorElement, {
            duration: 100,
            getReferenceClientRect: null,
            content: this.element,
            interactive: true,
            trigger: "manual",
            appendTo: document.body,
            placement: "top",
            hideOnClick: "toggle",
            theme: "tip-tap",
            arrow: false,
            popperOptions: {
                strategy: "fixed",
                modifiers: [
                    {
                        name: "flip",
                        enabled: false,
                    },
                    {
                        name: "preventOverflow",
                        options: {
                            altAxis: true,
                            tether: false,
                            padding: 10,
                        },
                    },
                ],
            },
            ...this.updateTippyOptions(this.tippy, this.tippyOptions || {}),
        });

        // 可能还需要在 tippy 自己的 blur 事件上隐藏
        if (this.tippy.popper.firstChild) {
            (this.tippy.popper.firstChild as HTMLElement).addEventListener("blur", this.tippyBlurHandler);
        }
    }

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

        this.createTooltip();

        // 支持单元格选择
        const { ranges } = selection;
        const from = Math.min(...ranges.map((range) => range.$from.pos));
        const to = Math.max(...ranges.map((range) => range.$to.pos));

        const shouldShow = this.shouldShow?.({
            editor: this.editor,
            element: this.element,
            view,
            state,
            oldState,
            from,
            to,
        });

        if (this.preventShow) return;

        if (!shouldShow) {
            this.hide();

            return;
        }

        const updateTippyOptions = {
            zIndex: 99999,
            getReferenceClientRect:
                this.tippyOptions?.getReferenceClientRect ||
                (() => {
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
                }),
        };

        this.tippy?.setProps(this.updateTippyOptions(this.tippy, updateTippyOptions));

        this.show();
    };

    /**
     * 显示气泡菜单
     */
    show() {
        this.tippy?.show();
    }

    /**
     * 隐藏气泡菜单
     * 根据当前状态判断是否应该隐藏菜单
     */
    hide() {
        const isChildOfMenu = this.element.contains(document.activeElement);
        const isMenuBtn = document.activeElement?.getAttribute("data-name") === "menuBtn";
        const isPreLink = !!this.editor.getAttributes("link").preLink;
        const hasEditorFocus = isChildOfMenu || isMenuBtn || isPreLink;

        if (this.editor.options.showMenu) {
            return true;
        }

        if (hasEditorFocus) {
            return;
        }

        this.tippy?.hide();
    }

    /**
     * 销毁气泡菜单
     * 清理所有事件监听和资源
     */
    destroy() {
        if (this.tippy?.popper.firstChild) {
            (this.tippy.popper.firstChild as HTMLElement).removeEventListener("blur", this.tippyBlurHandler);
        }

        this.tippy?.destroy();
        this.param.onDestroy?.(this);

        this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: true });
        this.view.dom.removeEventListener("dragstart", this.dragstartHandler);

        this.view.dom.removeEventListener("pointerdown", this.pointerdownHandler);
        document.body.removeEventListener("pointerup", this.dragendHandler);

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
