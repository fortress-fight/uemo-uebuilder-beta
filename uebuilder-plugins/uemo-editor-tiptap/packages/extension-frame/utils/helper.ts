/*
 * @Description: 辅助函数
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 23:03:37
 */

import type { MapFrameAttrs, FrameBaseAttrs, FrameAttrs } from "../src";
import type { Editor } from "@tiptap/core";
import type { Selection, NodeSelection } from "@tiptap/pm/state";
import { isNodeSelection, findParentNode } from "@tiptap/core";

/**
 * 解析地图配置
 * @param src 地图配置
 * @param scale 是否缩放
 * @returns 地图配置
 */
export function parseMapSrc(src: string, scale?: boolean): Omit<MapFrameAttrs, keyof FrameBaseAttrs> {
    try {
        const uri = decodeURIComponent(src);
        const infoConfig = JSON.parse(uri.slice(uri.indexOf("#") + 1));
        const enableScale = infoConfig.scale || scale || false;
        return {
            mapTitle: infoConfig.title || "",
            mapDescription: infoConfig.description || "",
            mapPosition: infoConfig.position || "116.404269,39.912943",
            mapScale: enableScale,
            mapTheme: infoConfig.theme || "",
            mapDrag: typeof infoConfig.drag === "undefined" ? enableScale : infoConfig.drag,
            mapLang: infoConfig.mapLang || "zh_cn",
            mapBtns: infoConfig.btns || undefined,
            pointerTheme: infoConfig.pointer || "",
        } as const;
    } catch (error) {
        console.error(error);
        return {};
    }
}

/**
 * 解析地图配置
 * @param mapDom 地图配置
 * @param src 地图配置
 * @returns 地图配置
 */
export function parseMapConfig(mapDom: HTMLElement, src: string): MapFrameAttrs {
    const mapConfigStr = mapDom.getAttribute("data-map-config");

    const mapConfig = JSON.parse(mapConfigStr || "") as {
        drag: "off" | "on";
        pos: string;
        ratio: string;
        width: { value: string; unit: string };
    };

    const width = mapConfig.width.value + mapConfig.width.unit;

    return {
        src,
        type: "map",
        ratio: mapConfig.ratio,
        width: width || undefined,
        ...parseMapSrc(src),
    };
}

/**
 * 判断是否是 frame
 */
export function isFrameNode(selection?: Selection): selection is NodeSelection {
    if (!selection) return false;

    return isNodeSelection(selection) && selection.node.type.name === "frame";
}

/**
 * 获取 frame
 */
export function getFrame(editor?: Editor) {
    const selection = editor?.state.selection;

    if (!selection) return null;

    return findParentNode((node) => node.type.name === "frame")(selection);
}

export function getFrameAttrs(editor?: Editor) {
    return editor?.getAttributes("frame") as FrameAttrs;
}
