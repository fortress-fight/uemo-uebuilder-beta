import type { Attribute } from "@tiptap/core";
import type { HrRuleAttrs } from "./index";

import { Node } from "@tiptap/core";

import { customInputRule, getHrRuleAttrs } from "../utils/helper";
import { parseHrRule, parseNormalHrRule } from "../utils/parse";
import { renderHrRule } from "../utils/render";

import $pageStyle from "../../../src/app.module.scss";

export interface HrRuleOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        hrRule: {
            /**
             * 更新分隔块属性
             */
            updateHrRuleAttrs: (param: HrRuleAttrs) => ReturnType;

            /**
             * 插入分隔块
             */
            insertHrRule: (options: Partial<HrRuleAttrs>) => ReturnType;

            /**
             * 打开分隔块编辑器面板
             */
            openHrRuleEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;
        };
    }
}

export const HrRule = Node.create<HrRuleOptions>({
    name: "hrRule",
    group: "block",

    addOptions() {
        return {
            HTMLAttributes: {},
            allowCopyAttrsType: {
                all: ["type", "height", "mdHeight", "color", "lineType"],
            },
        };
    },

    addAttributes() {
        return {
            type: { default: "line" },
            height: { default: "40px" },
            mdHeight: { default: "40px" },
            isEditing: { default: false },
            color: { default: "rgba(211, 211, 211, 0.4)" },
            lineType: { default: "solid" },
        } as Record<keyof HrRuleAttrs, Attribute>;
    },
    parseHTML() {
        return [
            {
                tag: "hr",
                priority: 10,
                getAttrs: (el): HrRuleAttrs => {
                    return parseNormalHrRule(el);
                },
            },
            {
                tag: "." + $pageStyle["editor-hr"],
                priority: 50,
                getAttrs: (el): HrRuleAttrs => {
                    return parseHrRule(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return renderHrRule(HTMLAttributes as HrRuleAttrs);
    },

    addInputRules() {
        return [
            customInputRule({
                find: /^(?:---|—-|___\s|\*\*\*\s)$/,
                type: this.type,
                handle: (editor, { start, end, attributes }) => {
                    const { tr } = editor.state;
                    tr.replaceWith(start - 1, end, this.type.create(attributes));
                    editor
                        .chain()
                        .command(({ tr, dispatch }) => {
                            if (dispatch) {
                                tr.scrollIntoView();
                            }

                            return true;
                        })
                        .run();
                },
            }),
        ];
    },

    addCommands() {
        return {
            openHrRuleEditorPanel:
                (rect) =>
                ({ chain, editor }) => {
                    const currentAttr = getHrRuleAttrs(this.editor);

                    // eslint-disable-next-line
                    console.log("currentAttr", currentAttr, rect, chain, editor);

                    // return chain()
                    //     .focus()
                    //     .openAttrEditorPanel("hrRule", currentAttr, {
                    //         rect,
                    //         updateAttrs: (attr) => {
                    //             editor.commands.updateHrRuleAttrs(attr);
                    //         },
                    //     })
                    //     .run();

                    return true;
                },

            insertHrRule:
                (options) =>
                ({ commands }) => {
                    return commands.insertContent({ type: this.name, attrs: options });

                    // return (
                    //     chain()
                    //         .insertContent({ type: this.name })
                    //         // set cursor after hr rule
                    //         .command(({ tr, dispatch }) => {
                    //             if (dispatch) {
                    //                 const { $to } = tr.selection;
                    //                 const posAfter = $to.end();
                    //                 if ($to.nodeAfter) {
                    //                     tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                    //                 } else {
                    //                     // add node after hr rule if it’s the end of the document
                    //                     const node = $to.parent.type.contentMatch.defaultType?.create();
                    //                     if (node) {
                    //                         tr.insert(posAfter, node);
                    //                         tr.setSelection(TextSelection.create(tr.doc, posAfter));
                    //                     }
                    //                 }

                    //                 tr.scrollIntoView();
                    //             }

                    //             return true;
                    //         })
                    //         .run()
                    // );
                },
        };
    },
});
