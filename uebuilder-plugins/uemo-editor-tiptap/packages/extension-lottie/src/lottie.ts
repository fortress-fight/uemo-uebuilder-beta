import type { LottieAttrs } from "./index";
import type { Attribute } from "@tiptap/core";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import LottieView from "../view/LottieView.vue";

import { parseLottie } from "../utils/parse";
import { lottieRender } from "../utils/render";
import { getLottieAttrs, playLottieAnimation } from "../utils/helper";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        lottie: {
            /**
             * 插入 Lottie
             */
            insertLottie: (attrs: string) => ReturnType;

            /**
             * 打开 Lottie 编辑器面板
             */
            openLottieEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;

            /**
             * 更新 Lottie 属性
             */
            updateLottieAttrs: (attrs: Partial<LottieAttrs>) => ReturnType;

            /**
             * 播放 Lottie 动画
             */
            playLottieAnimate: () => ReturnType;
        };
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LottieOptions {
    //
}

export const Lottie = Node.create<LottieOptions>({
    name: "lottie",
    group: "block",
    draggable: true,

    addOptions() {
        return {
            allowCopyAttrsType: {
                design: ["color", "ratio", "align", "width", "background", "border", "radius", "shadow", "padding"],
                effect: ["trigger", "autoplay", "delay", "speed"],
            },
        };
    },

    addAttributes() {
        return {
            url: { default: "" },
            color: { default: "" },
            ratio: { default: undefined },
            align: { default: undefined },
            width: { default: "300px" },
            trigger: { default: "hover" },
            autoplay: { default: false },
            delay: { default: undefined },
            speed: { default: undefined },

            w: { default: "" },
            h: { default: "" },
            border: { default: undefined },

            padding: { default: "" },
            shadow: { default: "" },
            radius: { default: "" },
            background: { default: "" },
        } as Record<keyof LottieAttrs, Attribute>;
    },

    addNodeView() {
        return VueNodeViewRenderer(LottieView);
    },

    parseHTML() {
        return [
            {
                tag: "div." + $pageStyle["lottie-wrapper"],
                getAttrs: (el): LottieAttrs | false => {
                    return parseLottie(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const lottieAttrs = HTMLAttributes as LottieAttrs;
        const { url } = lottieAttrs;

        if (!url) return ["p"];

        return lottieRender(lottieAttrs);
    },

    addCommands() {
        return {
            insertLottie:
                (url: string) =>
                ({ commands }) => {
                    if (!url) return false;
                    return commands.insertContent({ type: this.name, attrs: { url } });
                },

            updateLottieAttrs:
                (attrs: Partial<LottieAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            /**
             * 播放 Lottie 动画
             */
            playLottieAnimate:
                () =>
                ({ editor }) => {
                    playLottieAnimation(editor, getLottieAttrs(this.editor) || {});
                    return true;
                },

            openLottieEditorPanel:
                (rect: UE_TIPTAP_UNIT.PositionRect) =>
                ({ chain, editor }) => {
                    const currentAttr = getLottieAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("lottie", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateLottieAttrs(attr);
                            },
                            fire: (type: "preview") => {
                                if (type !== "preview") return;
                                requestAnimationFrame(() => {
                                    editor.chain().setMeta("addToHistory", false).playLottieAnimate();
                                });
                            },
                        })
                        .run();
                },
        };
    },
});
