import type { ImageAttrs } from "./index";

import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Node, type Attribute, nodeInputRule, nodePasteRule } from "@tiptap/core";

import { isImageReg } from "@stone/uemo-editor-utils/lib/utils";

import ImageView from "../view/Image.vue";

import { imageRender } from "../utils/render";
import { getImageAttrs } from "../utils/helper";
import { parseCkImage, parseImage } from "../utils/parse";

import $pageStyle from "../../../src/app.module.scss";
export interface ImageOptions {
    inline: boolean;
    allowBase64: boolean;
    HTMLAttributes: Record<string, any>;
}

export const markdownImageReg = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        image: {
            /**
             * 插入图片
             */
            insertImage: (src: string) => ReturnType;

            /**
             * 打开图片编辑器面板
             */
            openImageEditorPanel: (rect: UE_TIPTAP_UNIT.PositionRect) => ReturnType;

            /**
             * 替换图片
             */
            updateImageAttrs: (attrs: Partial<ImageAttrs>) => ReturnType;
        };
    }
}

export const Image = Node.create<ImageOptions>({
    name: "image",
    draggable: true,

    addOptions() {
        return {
            inline: false,
            allowBase64: false,
            HTMLAttributes: {},
            allowCopyAttrsType: {
                design: ["background", "border", "radius", "shadow"],
                effect: ["imageEffect", "forbidImageGallery", "animate"],
            },
        };
    },

    inline() {
        return this.options.inline;
    },

    group() {
        return this.options.inline ? "inline" : "block";
    },

    addAttributes() {
        return {
            /**
             * 属性相关
             */
            src: { default: "" },
            alt: { default: undefined },
            title: { default: undefined },
            animate: { default: undefined },
            imageEffect: { default: undefined },
            imgW: { default: undefined },
            imgH: { default: undefined },
            forbidImageGallery: { default: undefined },

            /**
             * 样式相关
             */
            ratio: { default: undefined },
            style: { default: "" },
            imageMask: { default: "" },
            align: { default: "left" },
            pos: { default: "" },
            width: { default: "" },
            height: { default: "" },
            sizeMode: { default: undefined },

            border: { default: undefined },
            shadow: { default: "" },
            radius: { default: "" },
            background: { default: "" },

            /**
             * 链接相关
             */
            imageLink: { default: undefined },

            /**
             * 移动端相关
             */
            md: { default: {} },
        } as Record<keyof ImageAttrs, Attribute>;
    },

    parseHTML() {
        return [
            {
                tag: "div." + $pageStyle.img_wrapper,
                getAttrs: (el): ImageAttrs => {
                    return parseImage(el);
                },
            },
            {
                // 这里转换的是有 CK-Editor 带来的属性
                tag: "figure.ue-image",
                getAttrs: (el): ImageAttrs => {
                    return parseCkImage(el);
                },
            },
            {
                tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])',
                getAttrs: (el): ImageAttrs => {
                    return {
                        src: (el as HTMLImageElement).src || "",
                        alt: (el as HTMLImageElement).alt || "",
                    };
                },
            },
        ];
    },

    addNodeView() {
        return VueNodeViewRenderer(ImageView);
    },

    renderHTML({ HTMLAttributes }) {
        const imageAttr = HTMLAttributes as ImageAttrs;
        const { src: src } = imageAttr;

        if (!src) return ["p"];

        return imageRender(imageAttr);
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: markdownImageReg,
                type: this.type,
                getAttributes: (match) => {
                    const [, , alt, src, title] = match;

                    return { src, alt, title };
                },
            }),
        ];
    },
    addPasteRules() {
        return [
            nodePasteRule({
                find: (text: string) => {
                    if (isImageReg.test(text)) {
                        const match = isImageReg.exec(text);
                        if (!match) return null;
                        return [
                            {
                                index: 0,
                                text: match.input,
                                data: { src: match.input },
                            },
                        ];
                    }
                    return null;
                },
                type: this.type,
                getAttributes: (match) => {
                    return { src: match.input };
                },
            }),
        ];
    },

    addCommands() {
        return {
            insertImage:
                (src) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { src },
                    });
                },

            updateImageAttrs:
                (attrs: Partial<ImageAttrs>) =>
                ({ chain }) => {
                    return chain().updateAttributes(this.name, attrs).run();
                },

            openImageEditorPanel:
                (rect: UE_TIPTAP_UNIT.PositionRect) =>
                ({ chain, editor }) => {
                    const currentAttr = getImageAttrs(this.editor);

                    return chain()
                        .focus()
                        .openAttrEditorPanel("image", currentAttr, {
                            rect,
                            updateAttrs: (attr) => {
                                editor.commands.updateImageAttrs(attr);
                            },
                        })
                        .run();
                },
        };
    },
});
