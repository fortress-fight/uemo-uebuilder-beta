/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-07-07 01:39:26
 */
import type { Attribute } from "@tiptap/core";
import type { CounterNumberAttrs } from "./index";

import { Node } from "@tiptap/core";

import { VueNodeViewRenderer } from "@tiptap/vue-3";

import { renderCounterNumber } from "../utils/render";
import { parseCounterNumberAttr } from "../utils/parse";
import CounterNumberView from "../view/CounterNumberView.vue";

import $pageStyle from "../../../src/app.module.scss";

export interface CounterNumberOptions {
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        counterNumber: {
            insertCounterNumber: (options?: CounterNumberAttrs) => ReturnType;

            /**
             * 更新特效文本属性
             */
            updateCounterNumberAttrs: (attrs: Partial<CounterNumberAttrs>) => ReturnType;

            /**
             * 移除相关样式
             */
            unsetCounterNumberStyle: () => ReturnType;
        };
    }
}

export const CounterNumber = Node.create<CounterNumberOptions>({
    name: "counterNumber",

    atom: true,
    group: "block",
    draggable: true,
    inclusive: false,
    selectable: true,

    addOptions() {
        return {
            HTMLAttributes: {},
            allowCopyAttrsType: {
                design: [
                    "fontStyle",
                    "fontFamily",
                    "fontSize",
                    "fontWeight",
                    "textColor",
                    "align",
                    "moAlign",
                    "dir",
                    "moDir",
                    "gap",
                    "moGap",
                    "width",
                    "fill",
                    "extStyle",
                    "theme",
                ],
                effect: ["effect", "delay", "duration"],
            },
        };
    },

    addAttributes() {
        return {
            fontStyle: { default: "" },
            fontFamily: { default: "" },
            fontSize: { default: "" },
            fontWeight: { default: false },
            textColor: { default: "#333" },
            align: { default: "left" },
            moAlign: { default: undefined },

            dir: { default: undefined },
            moDir: { default: undefined },

            gap: { default: "1em" },
            moGap: { default: undefined },

            width: { default: undefined },
            fill: { default: undefined },

            duration: { default: "2.4" },
            extStyle: { default: undefined },
            theme: { default: "NO01" },
            effect: { default: "normal" },
            delay: { default: "2.4" },
            body: { default: [] },
        } as Record<keyof CounterNumberAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: "." + $pageStyle["counter-number-block"],
                getAttrs: (el): CounterNumberAttrs => {
                    return parseCounterNumberAttr(el);
                },
            },
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(CounterNumberView);
    },

    renderHTML(param) {
        return renderCounterNumber(param.HTMLAttributes as CounterNumberAttrs);
    },

    addCommands() {
        return {
            insertCounterNumber:
                () =>
                ({ commands }) => {
                    const defaultAttrs: CounterNumberAttrs = {
                        gap: "1em",
                        theme: "NO02",
                        effect: "normal",
                        duration: "2.4",
                        align: "center",
                        fontSize: "60px",
                        textColor: "#333",
                        fill: false,
                        extStyle: {
                            "--counter-number-proxy-zoom": "0.3",
                            "--counter-number-proxy-translate": "-1em",
                            "--counter-number-proxy-pos": "flex-end",
                        },
                        body: [
                            { id: "i-1", numList: [100, 200], proxy: { type: "text", value: "个" } },
                            { id: "i-2", numList: [100, 200], proxy: { type: "text", value: "个" } },
                            { id: "i-3", numList: [100, 200], proxy: { type: "text", value: "个" } },
                        ],
                    };
                    return commands.insertContent({ type: this.name, attrs: defaultAttrs });
                },

            updateCounterNumberAttrs:
                (attrs: Partial<CounterNumberAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            unsetCounterNumberStyle:
                () =>
                ({ chain }) => {
                    return chain()
                        .updateAttributes(this.name, {
                            fontFamily: "",
                            fontSize: "",
                            fontWeight: "",
                            fontStyle: "",
                        })
                        .run();
                },
        };
    },
});
