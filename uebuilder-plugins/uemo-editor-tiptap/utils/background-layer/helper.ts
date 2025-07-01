import type { DOMOutputSpec } from "@tiptap/pm/model";

import $pageStyle from "../../src/app.module.scss";
import { attrToStyle } from "@stone/uemo-editor-utils/lib/utils";

/**
 * 渲染背景色图层
 * @param {UE_EL_UTIL.BackgroundColorValue} item - 背景色参数对象
 * @returns {DOMOutputSpec[]} 背景色图层 DOM 结构
 */
export function renderBackgroundColorLayer(item: UE_EL_UTIL.BackgroundColorValue): DOMOutputSpec[] {
    const value = item.value;
    const layer: DOMOutputSpec[] = [];
    if (typeof value !== "string") {
        layer.push([
            "div",
            {
                id: item.id,
                class: `${$pageStyle["color-bg"]} ${$pageStyle["bg-layer"]}`,
                style: `background: ${value.color}; opacity: ${value.opacity?.toString() || ""}`,
            },
        ]);
    } else {
        layer.push([
            "div",
            {
                id: item.id,
                class: `${$pageStyle["color-bg"]} ${$pageStyle["bg-layer"]}`,
                style: `background: ${value};`,
            },
        ]);
    }
    return layer;
}

/**
 * 渲染背景图片图层
 * @param {UE_EL_UTIL.BackgroundImageValue} item - 背景图片参数对象
 * @returns {DOMOutputSpec[]} 背景图片图层 DOM 结构
 */
export function renderBackgroundImageLayer(item: UE_EL_UTIL.BackgroundImageValue): DOMOutputSpec[] {
    const value = item.value;
    const layer: DOMOutputSpec[] = [];
    const imgDom: DOMOutputSpec[] = [];

    // 视差特效时插入透明 img 占位
    if (value.effect === "parallax") {
        imgDom.push(["img", { src: value.image, style: "opacity: 0", alt: "" }]);
    }

    /**
     * 获取滚动特效参数
     * @returns {string|false} JSON 字符串或 false
     */
    const getScrollEffectParam = () => {
        const scrollEffect = value.scrollEffect;
        const scrollEffectOptions = scrollEffect?.options;
        const result = {
            type: scrollEffect?.type,
            options: typeof scrollEffectOptions === "object" ? scrollEffectOptions : undefined,
        };
        if (typeof result.type === "undefined") return false;
        return JSON.stringify(result);
    };

    /**
     * 获取悬停特效参数
     * @returns {string|false} JSON 字符串或 false
     */
    const getHoverEffectParam = () => {
        const hoverEffect = value.hoverEffect;
        const hoverEffectOptions = hoverEffect?.options;
        const result = {
            type: hoverEffect?.type,
            options: typeof hoverEffectOptions === "object" ? hoverEffectOptions : undefined,
        };
        if (typeof result.type === "undefined") return false;
        return JSON.stringify(result);
    };

    /**
     * 获取背景尺寸样式
     * @param {string} size - 背景尺寸类型
     * @param {string} [width] - 宽度
     * @returns {string}
     */
    function getBackgroundSize(size: "repeat" | "cover" | "contain" | "normal" | undefined, width?: string): string {
        switch (size) {
            case "repeat":
                return width || "";
            case "cover":
                return "cover";
            case "contain":
                return width || "contain";
            case "normal":
            default:
                return "";
        }
    }

    /**
     * 获取背景定位值
     * @param {string} align - 对齐方式
     * @param {string} position - 位置偏移
     * @returns {string}
     */
    function getBgPositionValue(align = "", position = ""): string {
        const result: Record<string, string> = { x: "0", y: "0" };
        const [xAlign = "left", yAlign = "top"] = align.split(" ");
        const [xPosition = "0px", yPosition = "0px"] = position?.split(",");
        switch (xAlign) {
            case "left":
                result.x = xPosition;
                break;
            case "center":
                result.x = `calc(50% + ${xPosition})`;
                break;
            case "right":
                result.x = `calc(100% + ${xPosition})`;
                break;
            default:
                result.x = xPosition;
                break;
        }
        switch (yAlign) {
            case "top":
                result.y = yPosition;
                break;
            case "center":
                result.y = `calc(50% + ${yPosition})`;
                break;
            case "bottom":
                result.y = `calc(100% + ${yPosition})`;
                break;
            default:
                result.y = yPosition;
                break;
        }
        return `${result.x || ""} ${result.y || ""}`;
    }

    /**
     * 获取背景样式字符串
     * @returns {string}
     */
    const getBgStyle = () => {
        const { image, translate, size, align, effect, width } = value;
        const data: Record<string, any> = {
            "background-repeat": size === "repeat" ? "repeat" : "",
            "background-size": getBackgroundSize(size, width),
            "background-position": getBgPositionValue(align, translate),
            "background-attachment": effect === "fixed" ? "fixed" : "",
            "background-image": `url(${image})`,
        };
        return attrToStyle(data);
    };

    layer.push([
        "div",
        {
            id: item.id,
            class: `${$pageStyle["image-bg"]} ${$pageStyle["bg-layer"]}`,
            style: `opacity: ${value.opacity?.toString() || ""}`,
            "data-effect": value.effect || "normal",
            "data-scroll-effect-param": getScrollEffectParam(),
            "data-hover-effect-param": getHoverEffectParam(),
        },
        [
            "div",
            {
                class: `${$pageStyle["bg-layer--inner"]} ${$pageStyle["bg-layer--hover-effect"]}`,
                style: getBgStyle(),
            },
            ...imgDom,
        ],
    ]);

    return layer;
}

/**
 * 渲染 SVG 背景图层
 * @param {UE_EL_UTIL.BackgroundSvgValue} item - SVG 背景参数对象
 * @returns {DOMOutputSpec[]} SVG 背景图层 DOM 结构
 */
export function renderBackgroundSvgLayer(item: UE_EL_UTIL.BackgroundSvgValue): DOMOutputSpec[] {
    const value = item.value;
    const layer: DOMOutputSpec[] = [];
    const { align, natureWidth, width, translate } = value;

    /**
     * 获取滚动特效参数
     * @returns {string|false}
     */
    const getScrollEffectParam = () => {
        const scrollEffect = value.scrollEffect;
        const scrollEffectOptions = scrollEffect?.options;
        const result = {
            type: scrollEffect?.type,
            options: typeof scrollEffectOptions === "object" ? scrollEffectOptions : undefined,
        };
        if (typeof result.type === "undefined") return false;
        return JSON.stringify(result);
    };

    /**
     * 获取悬停特效参数
     * @returns {string|false}
     */
    const getHoverEffectParam = () => {
        const hoverEffect = value.hoverEffect;
        const hoverEffectOptions = hoverEffect?.options;
        const result = {
            type: hoverEffect?.type,
            options: typeof hoverEffectOptions === "object" ? hoverEffectOptions : undefined,
        };
        if (typeof result.type === "undefined") return false;
        return JSON.stringify(result);
    };

    /**
     * 生成 flex 对齐样式
     * @param {string} align - 对齐方式
     * @returns {string}
     */
    function getFlexAlignStyle(align?: string): string {
        if (!align) return "";
        const [xAlign, yAlign] = align.split(" ");
        const attrs: Record<string, string> = {};
        switch (xAlign) {
            case "left":
                attrs["justify-content"] = "flex-start";
                break;
            case "center":
                attrs["justify-content"] = "center";
                break;
            case "right":
                attrs["justify-content"] = "flex-end";
                break;
        }
        switch (yAlign) {
            case "top":
                attrs["align-items"] = "flex-start";
                break;
            case "center":
                attrs["align-items"] = "center";
                break;
            case "bottom":
                attrs["align-items"] = "flex-end";
                break;
        }
        return attrToStyle(attrs);
    }

    const bgOpacity = value.opacity?.toString() || "";
    layer.push([
        "div",
        {
            id: item.id,
            class: `${$pageStyle["svg-bg"]} ${$pageStyle["bg-layer"]}`,
            style: bgOpacity ? `opacity: ${bgOpacity}` : "",
            "data-effect": value.effect || "normal",
            "data-scroll-effect-param": getScrollEffectParam(),
            "data-hover-effect-param": getHoverEffectParam(),
        },
        [
            "div",
            {
                class: $pageStyle["bg-layer--inner"],
                style: `display: flex; ${getFlexAlignStyle(align)}`,
            },
            [
                "div",
                {
                    class: $pageStyle["svg-bg--box"],
                    style: `width: ${width || natureWidth + "px"}; transform: translate(${translate || "0px, 0px"})`,
                },
                [
                    "ue-svg-viewer",
                    {
                        class: $pageStyle["bg-layer--hover-effect"],
                        "stroke-color": value.strokeColor,
                        "fill-color": value.fillColor,
                        src: value.url,
                    },
                ],
            ],
        ],
    ]);
    return layer;
}

/**
 * 渲染模糊背景图层
 * @param {UE_EL_UTIL.BackgroundBlurValue} item - 模糊背景参数对象
 * @returns {DOMOutputSpec[]} 模糊背景图层 DOM 结构
 */
export function renderBackgroundBlurLayer(item: UE_EL_UTIL.BackgroundBlurValue): DOMOutputSpec[] {
    const value = item.value;
    const layer: DOMOutputSpec[] = [];
    layer.push([
        "div",
        {
            id: item.id,
            class: [$pageStyle["blur-bg"], $pageStyle["bg-layer"]],
            style: `background: ${value.color}; -webkit-backdrop-filter: blur(${value.blur}); backdrop-filter: blur(${value.blur})`,
        },
    ]);
    return layer;
}

/**
 * 渲染视频背景图层
 * @param {UE_EL_UTIL.BackgroundVideoValue} item - 视频背景参数对象
 * @returns {DOMOutputSpec[]} 视频背景图层 DOM 结构
 */
export function renderBackgroundVideoLayer(item: UE_EL_UTIL.BackgroundVideoValue): DOMOutputSpec[] {
    const value = item.value;
    const layer: DOMOutputSpec[] = [];
    layer.push([
        "div",
        {
            id: item.id,
            class: `${$pageStyle["video-bg"]} ${$pageStyle["bg-layer"]}`,
        },
        [
            "video",
            {
                src: value.video,
                preload: "auto",
                loop: "loop",
                autoplay: "autoplay",
                muted: "muted",
                playsinline: "playsinline",
            },
        ],
    ]);
    return layer;
}
