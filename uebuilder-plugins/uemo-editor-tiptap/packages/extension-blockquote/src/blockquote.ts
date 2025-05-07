import { mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";

/**
 * 引用块扩展的配置选项
 */
export interface BlockquoteOptions {
    HTMLAttributes: Record<string, any>;
}

/**
 * 扩展 Tiptap 的命令类型定义
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        blockQuote: {
            /**
             * 设置引用块节点
             * @returns 命令执行结果
             */
            setBlockquote: () => ReturnType;
            /**
             * 切换引用块节点
             * @returns 命令执行结果
             */
            toggleBlockquote: () => ReturnType;
            /**
             * 取消引用块节点
             * @returns 命令执行结果
             */
            unsetBlockquote: () => ReturnType;
        };
    }
}

/**
 * 引用块输入规则的正则表达式
 * 匹配以 > 开头的行
 */
export const inputRegex = /^\s*>\s$/;

/**
 * 引用块扩展
 *
 * 这是一个 Tiptap 的 Node 扩展，用于创建和管理引用块
 * 支持快捷键、输入规则和命令操作
 */
export const Blockquote = Node.create<BlockquoteOptions>({
    name: "blockquote",

    /**
     * 添加扩展的默认选项
     */
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    /**
     * 定义节点内容规则
     * 引用块可以包含一个或多个块级元素
     */
    content: "block+",

    /**
     * 定义节点所属的组
     */
    group: "block",

    /**
     * 定义节点是否可以被定义
     */
    defining: true,

    /**
     * 定义如何从 HTML 解析节点
     * @returns HTML 解析规则
     */
    parseHTML() {
        return [{ tag: "blockquote" }];
    },

    /**
     * 定义如何将节点渲染为 HTML
     * @param HTMLAttributes - 节点的 HTML 属性
     * @returns HTML 元素数组
     */
    renderHTML({ HTMLAttributes }) {
        return ["blockquote", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    /**
     * 添加扩展的命令
     * @returns 命令对象
     */
    addCommands() {
        return {
            /**
             * 设置引用块
             */
            setBlockquote:
                () =>
                ({ commands }) => {
                    return commands.wrapIn(this.name);
                },
            /**
             * 切换引用块
             */
            toggleBlockquote:
                () =>
                ({ commands }) => {
                    return commands.toggleWrap(this.name);
                },
            /**
             * 取消引用块
             */
            unsetBlockquote:
                () =>
                ({ commands }) => {
                    return commands.lift(this.name);
                },
        };
    },

    /**
     * 添加键盘快捷键
     * @returns 快捷键配置
     */
    addKeyboardShortcuts() {
        return {
            "Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
        };
    },

    /**
     * 添加输入规则
     * @returns 输入规则数组
     */
    addInputRules() {
        return [
            wrappingInputRule({
                find: inputRegex,
                type: this.type,
            }),
        ];
    },
});
