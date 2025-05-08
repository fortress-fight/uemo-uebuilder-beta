import type { ReferenceElement } from "@stone/uemo-editor-utils/lib/floating-ui";
import type { EditorView } from "@tiptap/pm/view";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

import { Editor, posToDOMRect, getText, getTextSerializersFromSchema } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";

/**
 * 浮动菜单插件的配置属性接口
 * @interface FloatingMenuPluginProps
 */
export interface FloatingMenuPluginProps {
    /**
     * 浮动菜单的插件键，用于唯一标识该插件实例
     */
    pluginKey: PluginKey | string;

    /**
     * Tiptap 编辑器实例
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
     * 决定是否显示菜单的判断函数
     * @param {Object} props - 包含编辑器状态的属性对象
     * @returns {boolean} 是否显示菜单
     */
    shouldShow?:
        | ((props: { editor: Editor; view: EditorView; state: EditorState; oldState?: EditorState }) => boolean)
        | null;

    /**
     * 控制菜单显示的函数
     */
    controller?: ((type: "show" | "update" | "hide", refEl?: ReferenceElement) => void) | null;

    /**
     * 气泡菜单初始化时调用的函数
     * @param {FloatingMenuView} floatingMenu - 浮动菜单视图实例
     */
    onInit?: (floatingMenu: FloatingMenuView) => void;

    /**
     * 浮动菜单销毁时调用的函数
     * @param {FloatingMenuView} floatingMenu - 浮动菜单视图实例
     */
    onDestroy?: (floatingMenu: FloatingMenuView) => void;
}

export type FloatingMenuViewProps = FloatingMenuPluginProps & {
    /**
     * The editor view.
     */
    view: EditorView;
};

/**
 * 浮动菜单视图类，负责管理菜单的显示、隐藏和交互行为
 * @class FloatingMenuView
 */
export class FloatingMenuView {
    public editor: Editor;
    public view: EditorView;
    public preventHide = false;
    public updateDelay: number;
    private updateDebounceTimer: number | undefined;
    public dragging = false;

    public controller?: FloatingMenuPluginProps["controller"];

    /**
     * 获取节点的文本内容
     * @private
     * @param {ProseMirrorNode} node - ProseMirror 节点
     * @returns {string} 节点的文本内容
     */
    private getTextContent(node: ProseMirrorNode) {
        return getText(node, {
            textSerializers: getTextSerializersFromSchema(this.editor.schema),
        });
    }

    /**
     * 判断是否应该显示浮动菜单
     * @param {Object} params - 包含编辑器状态的参数对象
     * @returns {boolean} 是否显示菜单
     */
    public shouldShow: Exclude<FloatingMenuPluginProps["shouldShow"], null> = ({ view, state }) => {
        const { selection } = state;
        const { $anchor, empty } = selection;
        const isRootDepth = $anchor.depth === 1;

        // 如果正在拖动，则不显示气泡菜单
        if (this.dragging) return false;

        const isEmptyTextBlock =
            $anchor.parent.isTextblock &&
            !$anchor.parent.type.spec.code &&
            !$anchor.parent.textContent &&
            $anchor.parent.childCount === 0 &&
            !this.getTextContent($anchor.parent);

        if (!view.hasFocus() || !empty || !isRootDepth || !isEmptyTextBlock || !this.editor.isEditable) {
            return false;
        }

        return true;
    };

    constructor(public param: FloatingMenuViewProps) {
        const { editor, view, updateDelay = 250, shouldShow, controller, onInit } = param;

        this.editor = editor;
        this.view = view;
        this.updateDelay = updateDelay;
        this.controller = controller;

        // 如果传入了自定义的 shouldShow 方法,则覆盖默认的显示逻辑
        if (shouldShow) {
            this.shouldShow = (...props) => {
                if (this.dragging) return false;
                return shouldShow(...props);
            };
        }

        this.view.dom.addEventListener("pointerdown", this.pointerdownHandler);
        this.view.dom.addEventListener("dragstart", this.dragstartHandler);

        // 添加鼠标按下事件监听器,用于阻止菜单隐藏
        this.editor.on("focus", this.focusHandler);
        this.editor.on("blur", this.blurHandler);

        onInit?.(this);
    }

    dragstartHandler = () => {
        this.hide();
    };

    focusHandler = () => {
        // we use `setTimeout` to make sure `selection` is already updated
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

        if (this.updateDelay === 1) {
            if (this.updateDebounceTimer) {
                cancelAnimationFrame(this.updateDebounceTimer);
            }

            this.updateDebounceTimer = requestAnimationFrame(() => {
                this.updateHandler(view, selectionChanged, docChanged, oldState);
            });
        } else {
            if (this.updateDebounceTimer) {
                clearTimeout(this.updateDebounceTimer);
            }

            this.updateDebounceTimer = window.setTimeout(() => {
                this.updateHandler(view, selectionChanged, docChanged, oldState);
            }, this.updateDelay);
        }
    };

    /**
     * 更新浮动菜单的位置和状态
     * @param {EditorView} view - 编辑器视图
     * @param {boolean} selectionChanged - 选择是否改变
     * @param {boolean} docChanged - 文档是否改变
     * @param {EditorState} [oldState] - 上一个编辑器状态
     */
    updateHandler = (view: EditorView, selectionChanged: boolean, docChanged: boolean, oldState?: EditorState) => {
        const { state, composing } = view;
        const { selection } = state;
        const { from, to } = selection;
        const isSame = !selectionChanged && !docChanged;

        if (composing || isSame) {
            return;
        }

        const shouldShow = this.shouldShow?.({
            editor: this.editor,
            view,
            state,
            oldState,
        });

        if (!shouldShow) {
            this.hide();

            return;
        }

        if (this.editor.isFocused) {
            this.show({
                getBoundingClientRect: () => posToDOMRect(view, from, to),
            });
        }
    };

    show(refEl: ReferenceElement) {
        this.controller?.("show", refEl);
    }

    hide() {
        this.controller?.("hide");
    }

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
 * 创建浮动菜单插件
 * @param {FloatingMenuPluginProps} options - 插件配置选项
 * @returns {Plugin} ProseMirror 插件实例
 */
export const FloatingMenuPlugin = (options: FloatingMenuPluginProps) => {
    return new Plugin({
        key: typeof options.pluginKey === "string" ? new PluginKey(options.pluginKey) : options.pluginKey,
        view: (view) => new FloatingMenuView({ view, ...options }),
    });
};
