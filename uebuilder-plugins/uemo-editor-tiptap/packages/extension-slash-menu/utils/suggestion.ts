import type { Editor } from "@tiptap/core";
import type { SlashMenuOptions, SlashMenuSuggestionItem } from "../src";
import type { TYPE_SLASH_MENU } from "../data";

import { VueRenderer } from "@tiptap/vue-3";

import { slashMenuList } from "../data";
import { isInTable } from "../../../utils/tiptap-utils";
import { isInGridGroup } from "../../extension-grid/utils/helper";

import SlashMenuPanel from "../panel/SlashMenuPanel.vue";

/**
 * 过滤菜单项
 * @private
 * @param {Editor} editor - 编辑器实例
 * @param {{ title: string; name: string }} item - 菜单项
 * @returns {boolean} 是否显示该菜单项
 */
function filterMenuItem(editor: Editor, item: { title: string; name: string }): boolean {
    const { state } = editor.view;

    if (isInTable(state) && ["inertTable", "insertGridGroup"].includes(item.name)) {
        return false;
    }

    if (isInGridGroup(state) && ["insertGridGroup", "inertTable"].includes(item.name)) {
        return false;
    }

    return true;
}

/**
 * 创建菜单分组
 * @private
 * @param {string} query - 搜索关键词
 * @param {Record<string, { title: string; list: { title: string; name: string }[] }>} result - 结果对象
 * @param {{ title: string; key: string; list: { title: string; name: string }[] }} group - 菜单分组
 */
function createMenuGroup(query: string, result: Record<string, SlashMenuSuggestionItem>, group: TYPE_SLASH_MENU) {
    group.list
        .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
        .forEach((item) => {
            if (result[group.key]) {
                result[group.key].list.push(item);
            } else {
                result[group.key] = {
                    title: group.title,
                    list: [item],
                };
            }
        });
}

/**
 * 创建斜杠菜单建议配置
 * @function getSlashMenuSuggestion
 * @param {Array<{ title: string; key: string; list: { title: string; name: string }[] }>} baseMenu - 基础菜单配置
 * @returns {SlashMenuOptions["suggestion"]} 斜杠菜单建议配置
 */
export function getSlashMenuSuggestion(baseMenu: TYPE_SLASH_MENU[] = slashMenuList): SlashMenuOptions["suggestion"] {
    return {
        char: ["/", "、"],
        allowedPrefixes: ["A-Za-z0-9\\s"],

        command: ({ editor, props, range }) => {
            const chain = editor?.chain().focus();
            if (range) {
                chain.deleteRange(range);
            }

            switch (props.name) {
                case "insertText":
                    chain.insetNodePlaceholder("TextPlaceholder");
                    break;
                case "insertButton":
                    chain.insetNodePlaceholder("ButtonPlaceholder");
                    break;
                case "insertImage":
                    chain.insetNodePlaceholder("ImagePlaceholder");
                    break;
                case "insertSvgIcon":
                    chain.insetNodePlaceholder("SvgIconPlaceholder");
                    break;
                case "insertEmoji":
                    chain.insertEmoji({ text: ":" });
                    break;
                case "insertVideoFrame":
                    chain.insetNodePlaceholder("VideoPlaceholder");
                    break;
                case "insertMapFrame":
                    chain.insetNodePlaceholder("MapPlaceholder");
                    break;
                case "insertWebFrame":
                    chain.insetNodePlaceholder("WebPlaceholder");
                    break;
                case "insertSvgViewer":
                    chain.insetNodePlaceholder("SvgViewerPlaceholder");
                    break;
                case "insertSpline":
                    chain.insetNodePlaceholder("SplinePlaceholder");
                    break;
                case "insertLottie":
                    chain.insetNodePlaceholder("LottiePlaceholder");
                    break;
                case "insertGridGroup":
                    chain.insetNodePlaceholder("GridGroupPlaceholder");
                    break;

                default:
                    break;
            }

            chain.run();
        },

        items: ({ editor, query }) => {
            const result: Record<string, SlashMenuSuggestionItem> = {};

            baseMenu.forEach((group) => {
                const filteredList = group.list.filter((item) => filterMenuItem(editor, item));
                if (filteredList.length > 0) {
                    createMenuGroup(query, result, { ...group, list: filteredList });
                }
            });

            return Object.values(result);
        },

        render: () => {
            let component: VueRenderer | null = null;

            const cleanup = () => {
                if (component) {
                    component.destroy();
                }
                component = null;
            };

            return {
                onStart: (props) => {
                    cleanup();

                    if (!props.clientRect) {
                        return;
                    }

                    component = new VueRenderer(SlashMenuPanel, {
                        props: props,
                        editor: props.editor,
                    });

                    component?.ref?.openPopPanel();
                },

                onUpdate: (props) => {
                    if (!props.clientRect) {
                        return;
                    }

                    component?.updateProps(props);
                },

                onKeyDown: (props) => {
                    if (props.event.key === "Escape") {
                        component?.ref?.closePopPanel();
                        return true;
                    }

                    return component?.ref?.onKeyDown(props) ?? false;
                },

                onExit: cleanup,
            };
        },
    };
}
