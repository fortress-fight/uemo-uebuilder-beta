import type { Node as ProsemirrorNode } from "@tiptap/pm/model";

import { Editor, Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

import $pageStyle from "../../../src/app.module.scss";

/**
 * 占位符扩展的配置选项接口
 * @interface
 */
export interface PlaceholderOptions {
    /** 锚点元素的类名 */
    hasAnchorClass: string;

    /**
     * 空编辑器状态下的类名
     * @default 'is-editor-empty'
     */
    emptyEditorClass: string;

    /**
     * 空节点状态下的类名
     * @default 'is-empty'
     */
    emptyNodeClass: string;

    /**
     * 占位符内容
     * 可以是字符串或返回动态占位符的函数
     * @default 'Write something …'
     */
    placeholder:
        | ((PlaceholderProps: { editor: Editor; node: ProsemirrorNode; pos: number; hasAnchor: boolean }) => string)
        | string;

    /**
     * 是否将任何内容视为空
     * @deprecated 此选项不再被支持，将在下一个主要版本中移除
     */
    considerAnyAsEmpty?: boolean;

    /**
     * 是否仅在编辑器可编辑时显示占位符
     * @default true
     */
    showOnlyWhenEditable: boolean;

    /**
     * 是否仅在当前节点为空时显示占位符
     * @default true
     */
    showOnlyCurrent: boolean;

    /**
     * 是否在所有子节点中显示占位符
     * @default false
     */
    includeChildren: boolean;
}

/**
 * 占位符扩展
 * 为编辑器添加占位符功能，在空节点处显示提示文本
 * @class
 */
export const Placeholder = Extension.create<PlaceholderOptions>({
    name: "placeholder",

    /**
     * 初始化占位符扩展的默认选项
     * @returns {PlaceholderOptions} 默认配置选项
     */
    addOptions() {
        return {
            emptyEditorClass: $pageStyle["is-editor-empty"],
            emptyNodeClass: $pageStyle["is-empty"],
            hasAnchorClass: $pageStyle["has-anchor"],
            placeholder: "输入 '/' 添加更多内容",
            showOnlyWhenEditable: true,
            includeChildren: true,
            showOnlyCurrent: false,
        };
    },

    /**
     * 添加 ProseMirror 插件
     * 负责处理占位符的装饰和显示逻辑
     * @returns {Plugin[]} ProseMirror 插件数组
     */
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("placeholder"),
                props: {
                    /**
                     * 创建占位符装饰
                     * @param {Object} state - ProseMirror 状态
                     * @returns {DecorationSet | null} 装饰集合或 null
                     */
                    decorations: ({ doc, selection }) => {
                        const active = this.editor.isEditable || !this.options.showOnlyWhenEditable;
                        const { anchor } = selection;
                        const decorations: Decoration[] = [];

                        if (!active) {
                            return null;
                        }
                        const isEmptyDoc = this.editor.isEmpty;

                        // 遍历文档中的所有节点
                        doc.descendants((node, pos) => {
                            // 判断当前节点是否包含光标位置
                            const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
                            // 判断节点是否为空（非叶子节点且没有子节点）
                            const isEmpty = !node.isLeaf && !node.childCount;

                            // 如果节点满足显示占位符的条件（包含光标或允许显示所有空节点）且节点为空
                            if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                                // 初始化节点类名数组
                                const classes = [this.options.emptyNodeClass];

                                // 如果节点包含光标，添加高亮类名
                                if (hasAnchor) {
                                    classes.push(this.options.hasAnchorClass);
                                }

                                // 如果整个文档为空，添加编辑器空状态类名
                                if (isEmptyDoc) {
                                    classes.push(this.options.emptyEditorClass);
                                }

                                // 创建占位符装饰
                                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                                    // 合并所有类名
                                    class: classes.join(" "),
                                    // 设置占位符文本，支持函数或字符串形式
                                    "data-placeholder":
                                        typeof this.options.placeholder === "function"
                                            ? this.options.placeholder({
                                                  editor: this.editor,
                                                  node,
                                                  pos,
                                                  hasAnchor,
                                              })
                                            : this.options.placeholder,
                                });

                                // 将装饰添加到装饰集合中
                                decorations.push(decoration);
                            }

                            // 根据配置决定是否继续遍历子节点
                            return this.options.includeChildren;
                        });

                        return DecorationSet.create(doc, decorations);
                    },
                },
            }),
        ];
    },
});
