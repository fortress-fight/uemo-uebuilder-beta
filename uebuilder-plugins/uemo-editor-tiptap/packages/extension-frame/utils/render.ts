import type { DOMOutputSpec } from "@tiptap/pm/model";

import type { FrameAttrs, MapFrameAttrs, FrameOptions } from "../src";

import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";
import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

import $pageStyle from "../../../src/app.module.scss";
import { resolveBorderStyle } from "../../../utils/tiptap-helper";

/**
 * 解析框架节点的样式属性为 style 字符串
 * @param attrs 框架属性
 * @returns style 字符串
 */
export function parseFrameStyle(attrs: FrameAttrs): string {
    const { borderWidth, borderColor, borderStyle } = resolveBorderStyle(attrs.border);
    const ratioMap: Record<string, string> = {
        "1-1": "100%",
        "3-4": "133.3333%",
        "4-3": "75%",
        "16-9": "56.25%",
        "9-16": "177.7777%",
    };
    const ratio: string = ratioMap[attrs.ratio! || "auto"] || "";
    const calcBorder = borderWidth
        ? {
              "border-style": borderStyle,
              "border-color": borderColor,
              "border-width": borderWidth,
          }
        : {};

    return attrToStyle({
        background: attrs.background || "",
        width: attrs.width || "",
        height: ratio && ratio !== "auto" ? "" : attrs.height,
        "border-radius": attrs.radius || "",
        "box-shadow": attrs.shadow || "",
        "--frame-ratio": ratio,
        ...calcBorder,
    });
}

/**
 * 生成地图 iframe 的 URL
 * @param attrs 地图属性
 * @param options 框架配置
 * @returns 完整的地图 iframe URL
 */
function getMapUrl(attrs: MapFrameAttrs, options: FrameOptions): string {
    const baseUrl = options.mapUrl;
    const { mapTitle, mapDescription, mapPosition, mapTheme, mapScale, mapDrag, mapBtns, mapLang, pointerTheme } =
        attrs;
    if (!mapPosition) return "";

    // 注意：每次生成唯一 time，防止缓存
    return `${baseUrl}?time=${Date.now()}#${encodeURIComponent(
        JSON.stringify({
            title: mapTitle,
            description: mapDescription,
            position: mapPosition,
            theme: mapTheme,
            scale: mapScale,
            drag: mapDrag,
            pointer: pointerTheme,
            btns: mapBtns,
            lang: mapLang,
        })
    )}`;
}

/**
 * 渲染 frame 节点为 DOMOutputSpec
 * @param attrs 框架属性
 * @param options 框架配置
 * @returns DOMOutputSpec
 */
export function frameRender(attrs: FrameAttrs, options: FrameOptions): DOMOutputSpec {
    const { type, align, src, ratio } = attrs;
    // 地图类型
    if (type === "map") {
        const frameSrc = getMapUrl(attrs, options);
        if (!frameSrc) return ["p"];

        return [
            "div",
            {
                class: $pageStyle.frame,
                "data-type": type,
                "data-frame-ratio": ratio || null,
                style: align ? `text-align:${align}` : null,
            },
            [
                "div",
                { class: $pageStyle["frame-box"], style: parseFrameStyle(attrs) },
                ["iframe", { class: $pageStyle["frame-body"], src: frameSrc }],
            ],
        ];
    }
    // 网页类型
    if (type === "web") {
        if (!src) return ["p"];
        return [
            "div",
            {
                class: $pageStyle.frame,
                "data-type": type,
                "data-frame-ratio": ratio || null,
                style: align ? `text-align:${align}` : null,
            },
            [
                "div",
                { class: $pageStyle["frame-box"], style: parseFrameStyle(attrs) },
                ["iframe", { class: $pageStyle["frame-body"], src }],
            ],
        ];
    }
    // 视频类型
    if (type === "video") {
        if (!src) return ["p"];
        // 类型收窄，确保访问 videoPoster/playMode 不报错
        const { playMode, videoPoster } = attrs;
        // 视频播放模式属性
        const specialAttr: Record<string, Record<string, boolean>> = {
            auto: { autoplay: true, muted: true, loop: true, playsinline: true },
            inline: { loop: false, playsinline: false },
            pop: {},
        };
        return [
            "div",
            {
                class: $pageStyle.frame,
                "data-type": type,
                "data-frame-ratio": ratio || null,
                style: align ? `text-align:${align}` : null,
            },
            [
                "div",
                {
                    class: $pageStyle["frame-box"],
                    style: parseFrameStyle(attrs),
                    "data-play-mode": playMode || null,
                },
                [
                    "video",
                    {
                        class: $pageStyle["frame-body"],
                        src,
                        poster: videoPoster,
                        ...specialAttr[playMode || "pop"],
                    },
                ],
            ],
        ];
    }
    // 兜底
    return ["p"];
}
