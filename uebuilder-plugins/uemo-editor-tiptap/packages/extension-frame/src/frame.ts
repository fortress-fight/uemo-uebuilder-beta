import type { FrameAttrs, VideoFrameAttrs, WebFrameAttrs, MapFrameAttrs } from "./index";
import type { Attribute } from "@tiptap/core";

import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";

import FrameView from "../view/Frame.vue";

import { frameRender } from "../utils/render";
import { parseFrame, parseVideoFrame, parseWebFrame, parseMapFrame } from "../utils/parse";

import $pageStyle from "../../../src/app.module.scss";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        frame: {
            /**
             * 插入 Video
             */
            insertVideoFrame: (src: string) => ReturnType;
            /**
             * 插入 Web
             */
            insertWebFrame: (src: string) => ReturnType;
            /**
             * 插入 Map
             */
            insertMapFrame: (src: string) => ReturnType;
        };
    }
}

export interface FrameOptions {
    mapUrl: string;
}

export const Frame = Node.create<FrameOptions>({
    name: "frame",
    group: "block",
    draggable: true,

    addOptions() {
        return {
            mapUrl: "",
            allowCopyAttrsType: {
                design: ["ratio", "align", "width", "height", "border", "shadow", "radius", "background"],
                effect: ["playMode"],
            },
        };
    },

    addAttributes() {
        return {
            type: { default: undefined },
            src: { default: undefined },
            ratio: { default: undefined },
            align: { default: undefined },
            width: { default: undefined },
            height: { default: undefined },
            border: { default: undefined },
            shadow: { default: undefined },
            radius: { default: undefined },
            background: { default: undefined },

            mapTitle: { default: "请输入标题" },
            mapDescription: { default: undefined },
            pointerTheme: { default: undefined },
            mapPosition: { default: undefined },
            mapTheme: { default: undefined },
            mapScale: { default: false },
            mapDrag: { default: undefined },
            mapLang: { default: undefined },
            mapBtns: { default: undefined },

            playMode: { default: "pop" },
            videoPoster: { default: undefined },
        } as Record<keyof FrameAttrs, Attribute>;
    },

    addNodeView() {
        return VueNodeViewRenderer(FrameView);
    },

    parseHTML() {
        return [
            {
                tag: "div." + $pageStyle.frame + "[data-type='video']",
                getAttrs: (el): VideoFrameAttrs | false => {
                    return parseVideoFrame(el);
                },
            },
            {
                tag: "div." + $pageStyle.frame + "[data-type='web']",
                getAttrs: (el): WebFrameAttrs | false => {
                    return parseWebFrame(el);
                },
            },
            {
                tag: "div." + $pageStyle.frame + "[data-type='map']",
                getAttrs: (el): MapFrameAttrs | false => {
                    return parseMapFrame(el);
                },
            },
            {
                tag: "figure.media",
                getAttrs: (el): FrameAttrs | false => {
                    return parseFrame(el);
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const frameAttr = HTMLAttributes as FrameAttrs;
        return frameRender(frameAttr, this.options);
    },

    addCommands() {
        return {
            insertVideoFrame:
                (src: string) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { type: "video", src, ratio: "auto" },
                    });
                },
            insertWebFrame:
                (src: string) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { type: "web", src, ratio: "1-1" },
                    });
                },
            insertMapFrame:
                (mapPosition: string) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { type: "map", mapPosition, ratio: "1-1" },
                    });
                },
        };
    },
});
