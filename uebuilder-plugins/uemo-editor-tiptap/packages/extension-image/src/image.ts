import type { ImageAttrs } from "./index";

import { VueNodeViewRenderer } from "@tiptap/vue-3";
import { Node, type Attribute } from "@tiptap/core";

import ImageView from "../view/Image.vue";

export interface ImageOptions {
    inline: boolean;
    allowBase64: boolean;
    HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        image: {
            insertImage: (src: string) => ReturnType;
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
            background: { default: "" },
            width: { default: "" },
            height: { default: "" },
            sizeMode: { default: undefined },
            radius: { default: "" },
            shadow: { default: "" },
            border: { default: undefined },

            /**
             * 链接相关
             */
            imageLink: { default: undefined },

            /**
             * 上传相关
             */
            uploadProgress: { default: "" },
            md: { default: {} },
        } as Record<keyof ImageAttrs, Attribute>;
    },

    parseHTML() {
        return [
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
        const { src } = imageAttr;

        if (!src) return ["p"];

        return ["div"];
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
        };
    },
});
