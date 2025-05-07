import type { Editor, Range } from "@tiptap/core";

import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

import { findSuggestionMatch } from "./find-suggestion-match";

/**
 * 建议插件的配置选项接口
 * @interface SuggestionOptions
 * @template I 建议项类型
 * @template TSelected 选中项类型
 */
export interface SuggestionOptions<I = any, TSelected = any> {
    /**
     * 建议插件的键名
     * @default 'suggestion'
     * @example 'mention'
     */
    pluginKey?: PluginKey;

    /**
     * 编辑器实例
     * @default null
     */
    editor: Editor;

    /**
     * 触发建议的字符
     * @default '@'
     * @example '#'
     */
    char?: string[];

    /**
     * 是否允许在建议查询中使用空格
     * @default false
     * @example true
     */
    allowSpaces?: boolean;

    /**
     * 允许的前缀字符
     * @default [' ']
     * @example [' ', '@']
     */
    allowedPrefixes?: string[] | null;

    /**
     * 是否只在行首匹配建议
     * @default false
     * @example true
     */
    startOfLine?: boolean;

    /**
     * 装饰节点的标签名
     * @default 'span'
     * @example 'div'
     */
    decorationTag?: string;

    /**
     * 装饰节点的类名
     * @default 'suggestion'
     * @example 'mention'
     */
    decorationClass?: string;

    /**
     * 选中建议项时的回调函数
     * @param props 回调参数对象
     * @param props.editor 编辑器实例
     * @param props.range 建议范围
     * @param props.props 选中的建议项属性
     * @returns void
     * @example ({ editor, range, props }) => { props.command(props.props) }
     */
    command?: (props: { editor: Editor; range: Range; props: TSelected }) => void;

    /**
     * 获取建议项列表的函数
     * @param props 参数对象
     * @param props.editor 编辑器实例
     * @param props.query 当前查询字符串
     * @returns 建议项数组
     * @example ({ editor, query }) => [{ id: 1, label: 'John Doe' }]
     */
    items?: (props: { query: string; editor: Editor }) => I[] | Promise<I[]>;

    /**
     * 渲染建议的配置函数
     * @returns 包含各种渲染回调函数的对象
     */
    render?: () => {
        onBeforeStart?: (props: SuggestionProps<I, TSelected>) => void;
        onStart?: (props: SuggestionProps<I, TSelected>) => void;
        onBeforeUpdate?: (props: SuggestionProps<I, TSelected>) => void;
        onUpdate?: (props: SuggestionProps<I, TSelected>) => void;
        onExit?: (props: SuggestionProps<I, TSelected>) => void;
        onKeyDown?: (props: SuggestionKeyDownProps) => boolean;
    };

    /**
     * 判断建议是否应该激活的函数
     * @param props 参数对象
     * @returns 是否激活建议
     */
    allow?: (props: { editor: Editor; state: EditorState; range: Range; isActive?: boolean }) => boolean;
}

/**
 * 建议组件的属性接口
 * @interface SuggestionProps
 * @template I 建议项类型
 * @template TSelected 选中项类型
 */
export interface SuggestionProps<I = any, TSelected = any> {
    /**
     * The editor instance.
     */
    editor: Editor;

    /**
     * The range of the suggestion.
     */
    range: Range;

    /**
     * The current suggestion query.
     */
    query: string;

    /**
     * The current suggestion text.
     */
    text: string;

    /**
     * The suggestion items array.
     */
    items: I[];

    /**
     * A function that is called when a suggestion is selected.
     * @param props The props object.
     * @returns void
     */
    command: (props: TSelected) => void;

    /**
     * The decoration node HTML element
     * @default null
     */
    decorationNode: Element | null;

    /**
     * The function that returns the client rect
     * @default null
     * @example () => new DOMRect(0, 0, 0, 0)
     */
    clientRect?: (() => DOMRect | null) | null;
}

/**
 * 建议键盘事件属性接口
 * @interface SuggestionKeyDownProps
 */
export interface SuggestionKeyDownProps {
    view: EditorView;
    event: KeyboardEvent;
    range: Range;
}

export const SuggestionPluginKey = new PluginKey("suggestion");

/**
 * 创建建议插件
 * @function Suggestion
 * @template I 建议项类型
 * @template TSelected 选中项类型
 * @param {SuggestionOptions<I, TSelected>} options 建议插件配置
 * @returns {Plugin} 建议插件实例
 */
export function Suggestion<I = any, TSelected = any>({
    pluginKey = SuggestionPluginKey,
    editor,
    char = ["@"],
    allowSpaces = false,
    allowedPrefixes = [" "],
    startOfLine = false,
    decorationTag = "span",
    decorationClass = "suggestion",
    command = (_param?: any) => null,
    items = () => [],
    render = () => ({}),
    allow = () => true,
}: SuggestionOptions<I, TSelected>) {
    let props: SuggestionProps<I, TSelected> | undefined;
    const renderer = render?.();

    const plugin: any = new Plugin<any>({
        key: pluginKey,

        view() {
            return {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                update: async (view, prevState) => {
                    const prev = this.key?.getState(prevState);
                    const next = this.key?.getState(view.state);

                    // 判断状态变化类型
                    const moved = prev.active && next.active && prev.range.from !== next.range.from;
                    const started = !prev.active && next.active;
                    const stopped = prev.active && !next.active;
                    const changed = !started && !stopped && prev.query !== next.query;

                    const handleStart = started || (moved && changed);
                    const handleChange = changed || moved;
                    const handleExit = stopped || (moved && changed);

                    // 如果建议不活跃，直接返回
                    if (!handleStart && !handleChange && !handleExit) {
                        return;
                    }

                    const state = handleExit && !handleStart ? prev : next;
                    const decorationNode = view.dom.querySelector(`[data-decoration-id="${state.decorationId}"]`);

                    // 构建建议属性对象
                    props = {
                        editor,
                        range: state.range,
                        query: state.query,
                        text: state.text,
                        items: [],
                        command: (commandProps) => {
                            return command({
                                editor,
                                range: state.range,
                                props: commandProps,
                            });
                        },
                        decorationNode,
                        // 为 popper.js 或 tippy.js 提供虚拟节点
                        // 可用于构建无 DOM 节点的弹出框
                        clientRect: decorationNode
                            ? () => {
                                  // because of `items` can be asynchrounous we’ll search for the current decoration node
                                  const { decorationId } = this.key?.getState(editor.state) || {};
                                  const currentDecorationNode = view.dom.querySelector(
                                      `[data-decoration-id="${decorationId}"]`
                                  );

                                  return currentDecorationNode?.getBoundingClientRect() || null;
                              }
                            : null,
                    };

                    // 处理建议开始
                    if (handleStart) {
                        renderer?.onBeforeStart?.(props);
                    }

                    // 处理建议更新
                    if (handleChange) {
                        renderer?.onBeforeUpdate?.(props);
                    }

                    // 获取建议项列表
                    if (handleChange || handleStart) {
                        props.items = await items({
                            editor,
                            query: state.query,
                        });
                    }

                    // 处理建议退出
                    if (handleExit) {
                        renderer?.onExit?.(props);
                    }

                    // 处理建议更新
                    if (handleChange) {
                        renderer?.onUpdate?.(props);
                    }

                    // 处理建议开始
                    if (handleStart) {
                        renderer?.onStart?.(props);
                    }
                },

                destroy: () => {
                    if (!props) {
                        return;
                    }

                    renderer?.onExit?.(props);
                },
            };
        },

        state: {
            // Initialize the plugin's internal state.
            init() {
                const state: {
                    active: boolean;
                    range: Range;
                    query: null | string;
                    text: null | string;
                    composing: boolean;
                    decorationId?: string | null;
                } = {
                    active: false,
                    range: {
                        from: 0,
                        to: 0,
                    },
                    query: null,
                    text: null,
                    composing: false,
                };

                return state;
            },

            // Apply changes to the plugin state from a view transaction.
            apply(transaction, prev, _oldState, state) {
                const { isEditable } = editor;
                const { composing } = editor.view;
                const { selection } = transaction;
                const { empty, from } = selection;
                const next = { ...prev };

                next.composing = composing;

                // 只有在编辑器可编辑且满足以下条件时才激活建议：
                // 1. 没有选中文本，或
                // 2. 正在输入中
                if (isEditable && (empty || editor.view.composing)) {
                    // 如果光标离开了建议范围，重置激活状态
                    if ((from < prev.range.from || from > prev.range.to) && !composing && !prev.composing) {
                        next.active = false;
                    }

                    // 尝试匹配当前光标位置
                    const match = findSuggestionMatch({
                        char,
                        allowSpaces,
                        allowedPrefixes,
                        startOfLine,
                        $position: selection.$from,
                    });

                    const decorationId = `id_${Math.floor(Math.random() * 0xffffffff)}`;

                    // 如果找到匹配且允许激活，更新状态
                    if (match && allow({ editor, state, range: match.range, isActive: prev.active })) {
                        next.active = true;
                        next.decorationId = prev.decorationId ? prev.decorationId : decorationId;
                        next.range = match.range;
                        next.query = match.query;
                        next.text = match.text;
                    } else {
                        next.active = false;
                    }
                } else {
                    next.active = false;
                }

                // 如果建议不活跃，清空相关状态
                if (!next.active) {
                    next.decorationId = null;
                    next.range = { from: 0, to: 0 };
                    next.query = null;
                    next.text = null;
                }

                return next;
            },
        },

        props: {
            // Call the keydown hook if suggestion is active.
            handleKeyDown(view, event) {
                const { active, range } = plugin.getState(view.state);

                if (!active) {
                    return false;
                }

                // 当返回为 true 时，拦截键盘事件
                return renderer?.onKeyDown?.({ view, event, range }) || false;
            },

            // Setup decorator on the currently active suggestion.
            decorations(state) {
                const { active, range, decorationId } = plugin.getState(state);

                if (!active) {
                    return null;
                }

                // 创建装饰节点
                return DecorationSet.create(state.doc, [
                    Decoration.inline(range.from, range.to, {
                        nodeName: decorationTag,
                        class: decorationClass,
                        "data-decoration-id": decorationId,
                    }),
                ]);
            },
        },
    });

    return plugin;
}
