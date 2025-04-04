import type { EditorView } from "@tiptap/pm/view";
import type { Instance, Props } from "@stone/uemo-editor-utils/lib/tippy";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

import { Editor, posToDOMRect, getText, getTextSerializersFromSchema } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { tippy } from "@stone/uemo-editor-utils/lib/tippy";
import $ from "@stone/uemo-editor-utils/lib/jquery";

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
     * 包含菜单内容的 DOM 元素
     */
    element: HTMLElement;

    /**
     * tippy.js 的配置选项
     * @see https://atomiks.github.io/tippyjs/v6/all-props/
     */
    tippyOptions?: Partial<Props>;

    /**
     * 决定是否显示菜单的判断函数
     * @param {Object} props - 包含编辑器状态的属性对象
     * @returns {boolean} 是否显示菜单
     */
    shouldShow?:
        | ((props: { editor: Editor; view: EditorView; state: EditorState; oldState?: EditorState }) => boolean)
        | null;
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

    public element: HTMLElement;

    public view: EditorView;

    public preventHide = false;

    public tippy: Instance | undefined;

    public tippyOptions?: Partial<Props>;

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

    constructor({ editor, element, view, tippyOptions = {}, shouldShow }: FloatingMenuViewProps) {
        this.editor = editor;
        this.element = element;
        this.view = view;

        if (!this.element) return;

        // 如果传入了自定义的 shouldShow 方法,则覆盖默认的显示逻辑
        if (shouldShow) {
            this.shouldShow = shouldShow;
        }

        // 添加鼠标按下事件监听器,用于阻止菜单隐藏
        this.element.addEventListener("mousedown", this.mousedownHandler, { capture: true });

        this.editor.on("focus", this.focusHandler);
        this.editor.on("blur", this.blurHandler);
        this.tippyOptions = tippyOptions;

        // 从当前父节点中移除菜单元素
        this.element.remove();

        // 设置菜单元素可见
        this.element.style.visibility = "visible";
    }

    mousedownHandler = () => {
        this.preventHide = true;
    };

    focusHandler = () => {
        // we use `setTimeout` to make sure `selection` is already updated
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

    /**
     * 创建 tippy 工具提示实例
     * @private
     */
    createTooltip() {
        const { element: editorElement } = this.editor.options;
        const editorIsAttached = !!editorElement.parentElement;

        if (this.tippy || !editorIsAttached) {
            return;
        }

        this.tippy = tippy(editorElement, {
            duration: [200, 300],
            zIndex: 900,
            getReferenceClientRect: null,
            content: this.element,
            interactive: true,
            trigger: "manual",
            placement: "right",
            hideOnClick: "toggle",
            theme: "tip-tap",
            ...this.tippyOptions,
        });
        $(this.element).data("_tippy", this.tippy);

        // maybe we have to hide tippy on its own blur event as well
        if (this.tippy.popper.firstChild) {
            (this.tippy.popper.firstChild as HTMLElement).addEventListener("blur", this.tippyBlurHandler);
        }
    }

    /**
     * 更新浮动菜单的状态和位置
     * @param {EditorView} view - 编辑器视图
     * @param {EditorState} [oldState] - 更新前的编辑器状态
     */
    update(view: EditorView, oldState?: EditorState) {
        const { state } = view;
        const { doc, selection } = state;
        const { from, to } = selection;
        const isSame = oldState && oldState.doc.eq(doc) && oldState.selection.eq(selection);

        if (isSame) {
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

        this.createTooltip();

        if (this.editor.isFocused) {
            this.tippy?.setProps({
                getReferenceClientRect:
                    this.tippyOptions?.getReferenceClientRect || (() => posToDOMRect(view, from, to)),
            });

            this.show();
        }
    }

    show() {
        this.tippy?.show();
    }

    hide() {
        this.tippy?.hide();
    }

    destroy() {
        if (!this.element) return;
        if (this.tippy?.popper.firstChild) {
            (this.tippy.popper.firstChild as HTMLElement).removeEventListener("blur", this.tippyBlurHandler);
        }
        this.tippy?.destroy();
        this.element.removeEventListener("mousedown", this.mousedownHandler, { capture: true });
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
