/*
 * @Description: Frame 解析配置
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 19:48:23
 */
import type { FrameAttrs, VideoFrameAttrs, WebFrameAttrs, MapFrameAttrs } from "../src";

import $pageStyle from "../../../src/app.module.scss";
import { parseMapSrc, parseMapConfig } from "./helper";
import { parseBorderStyle } from "../../../utils/tiptap-helper";

/**
 * 解析视频配置
 * @param el 视频元素
 * @returns 视频配置
 */
export function parseVideoFrame(el: HTMLElement): VideoFrameAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const frameBoxDom = el.querySelector<HTMLElement>("." + $pageStyle["frame-box"])!;
    const videoDom = el.querySelector("video") as HTMLElement;
    const src = videoDom?.getAttribute("src");

    if (!src) return false;

    const boxStyle = frameBoxDom.style;

    function getVideoPlayMode(): "auto" | "pop" | "inline" | undefined {
        const isAutoPlay = videoDom.hasAttribute("autoplay");
        if (isAutoPlay) return "auto";

        return (frameBoxDom.getAttribute("data-play-mode") || "pop") as "pop" | "inline" | "auto";
    }

    return {
        type: "video",
        src,
        ratio: el.getAttribute("data-frame-ratio") || "",
        align: el.style.textAlign as UE_EL_UTIL.ALIGN_X,

        border: parseBorderStyle(boxStyle),
        radius: boxStyle.borderRadius,
        shadow: boxStyle.boxShadow,
        background: boxStyle.background || boxStyle.backgroundColor,
        playMode: getVideoPlayMode(),
        videoPoster: videoDom.getAttribute("poster") || "",
        width: boxStyle.width || "",
        height: boxStyle.height || "",
    };
}

/**
 * 解析网页配置
 * @param el 网页元素
 * @returns 网页配置
 */
export function parseWebFrame(el: HTMLElement): WebFrameAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const frameBox = el.querySelector<HTMLElement>("." + $pageStyle["frame-box"])!;
    const src = el.querySelector("iframe")?.getAttribute("src");

    if (!src) return false;

    const boxStyle = frameBox.style;
    return {
        type: "web",
        src,

        ratio: el.getAttribute("data-frame-ratio") || "",
        radius: boxStyle.borderRadius,
        align: el.style.textAlign as UE_EL_UTIL.ALIGN_X,
        border: parseBorderStyle(boxStyle),
        shadow: boxStyle.boxShadow,
        background: boxStyle.background || boxStyle.backgroundColor,
        width: boxStyle.width,
        height: boxStyle.height,
    };
}

/**
 * 解析地图配置
 * @param el 地图元素
 * @returns 地图配置
 */
export function parseMapFrame(el: HTMLElement): MapFrameAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const frameBoxDom = el.querySelector<HTMLElement>("." + $pageStyle["frame-box"])!;
    const src = el.querySelector("iframe")?.getAttribute("src") || "";

    if (!src) return false;

    const boxStyle = frameBoxDom.style;

    return {
        type: "map",
        src,

        ratio: el.getAttribute("data-frame-ratio") || "",
        radius: boxStyle.borderRadius,
        align: el.style.textAlign as UE_EL_UTIL.ALIGN_X,
        border: parseBorderStyle(boxStyle),
        shadow: boxStyle.boxShadow,
        background: boxStyle.background || boxStyle.backgroundColor,
        width: boxStyle.width,
        height: boxStyle.height,

        ...parseMapSrc(src),
    };
}

/**
 * 解析通用配置
 * @param el 通用元素
 * @returns 通用配置
 */
export function parseFrame(el: HTMLElement): FrameAttrs | false {
    if (!(el instanceof HTMLElement)) return false;

    const iframe = el.querySelector("iframe");
    const videoDom = el.querySelector("video");

    let src = "";
    if (iframe) {
        src = el.querySelector("iframe")?.getAttribute("src") || "";
    } else if (videoDom) {
        src = videoDom.getAttribute("src") || "";
    }

    const mapDom = el.querySelector<HTMLElement>("div[data-map-config]")!;

    if (!src) return false;

    try {
        if (mapDom) {
            return parseMapConfig(mapDom, src);
        } else if (videoDom) {
            return { src, ratio: "auto", type: "video", videoPoster: videoDom.getAttribute("poster") || "" };
        } else {
            return { src, type: "web" };
        }
    } catch (error) {
        console.error(error);
        return { src, type: "web" };
    }
}
