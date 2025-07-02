import { guid } from "./guid";
import { _isEqual } from "./lodash";

/**
 * 获取文件大小描述
 * @param limitSize 文件大小 (单位: KB)
 * @returns 文件大小描述
 */
export function getSizeDesc(limitSize: number): string {
    if (limitSize === 0) return "0Bytes";

    const units = ["KB", "MB", "GB", "TB"];
    const base = 1024;

    // 计算指数
    const exponent = Math.floor(Math.log(limitSize) / Math.log(base));

    // 计算大小
    const sizeNum = limitSize / Math.pow(base, exponent);

    // 格式化大小
    const fixedSize = sizeNum.toFixed(2);

    return fixedSize.endsWith(".00") ? `${parseInt(fixedSize)}${units[exponent]}` : `${fixedSize}${units[exponent]}`;
}

/** 视频类型 */
export const VIDEO_TYPES = ["video/mp4"];

/** svg类型 */
export const SVG_TYPES = ["image/svg+xml"];

/**
 * 是否为视频类型
 * @param type 类型
 * @returns 是否为视频类型
 */
export function isVideoType(type: string) {
    return VIDEO_TYPES.includes(type);
}

/** 图片类型 */
export const IMAGE_TYPES = ["image/webp", "image/jpg", "image/jpeg", "image/png", "image/gif"];

/** lottie类型 */
export const LOTTIE_TYPES = [".lottie"];

/** 文件类型 */
export const FILE_TYPES_MAP = {
    image: IMAGE_TYPES,
    video: VIDEO_TYPES,
    svg: SVG_TYPES,
    lottie: LOTTIE_TYPES,
};

/**
 * 是否为图片类型
 * @param type 类型
 * @returns 是否为图片类型
 */
export function isImageType(type: string) {
    return IMAGE_TYPES.includes(type);
}

/** 是否为网页链接 */
export const isWebReg = /^(https?:)?(\/\/)?([\da-z.-]+)\.([\da-z.-]+)(\/[^\s]*)?$/i;

/** 是否为地图坐标 */
export const isMapPosReg = /^[+-]?\d{1,3}.\d+,\s*[+-]?\d{1,3}.\d+$/;

/** spline类型 */
export const isSplineReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(splinecode))$/;

/** lottie类型 */
export const isLottieReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(lottie))$/;

/** video类型 */
export const isVideoReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(mp4))$/;

/** image类型 */
export const isImageReg =
    /^(https?:\/\/(?:images\.unsplash\.com|[^\s"'()]+?\.(?:jpg|jpeg|png|gif|webp))(?:\?[^\s"'()]*)?)/;

/** 下载文件类型 */
export const isDownloadFileReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(pdf|doc|docx|xls|xlsx|ppt|pptx|gif|png|jpg))/g;

/** 邮箱类型 */
export const isEmailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 电话号码类型 */
export const isTelNumberReg = /^(?:(0\d{2,3}-)?\d{7,8}|1[3-9]\d{9})$/;

/**
 * 检查链接是否为网站链接
 * @param link 链接
 * @returns 是否为网站链接
 */
export function checkSiteLink(link: string): boolean {
    // return isWebReg.test(link) || /^(.+)?\/[^\s]+$/.test(link);
    return /^[^\s]+$/.test(link);
}

/**
 * 延迟 Promise
 * @param ms 延迟时间 (单位: 毫秒)
 * @returns 延迟后的 Promise
 */
export async function delayPromise(ms = 2000, res?: Promise<any>): Promise<any> {
    return await new Promise((resolve) => setTimeout(() => resolve(res), ms));
}

/**
 * 加载脚本
 * @param dom 元素
 * @param param 参数
 * @returns 加载后的 Promise
 */
export function loadScript(dom: HTMLElement, param: { title: string; source: string }) {
    const { title, source } = param;
    const useId = title + guid();
    return new Promise<{ id: string; source: string }>((res, rej) => {
        if (!source || !dom) return rej(new Error("load script error: source or dom is null"));

        if (document.querySelector(`[src="${source}"]`)) {
            return res({ id: useId, source: param.source });
        }

        const script = document.createElement("script");
        script.src = source;
        script.id = useId;
        script.onload = () => {
            return res({ id: useId, source: param.source });
        };
        script.onerror = () => {
            return rej(new Error("load script error：" + param.source));
        };
        dom.appendChild(script);
    });
}
/**
 * 将属性对象转换为CSS样式字符串, 如果属性值与默认属性值相同, 则不添加到样式字符串中
 *
 * @export
 * @param {Record<string, string | undefined>} attr - 样式属性对象
 * @param {Record<string, string>} defaultAttr - 默认样式属性对象
 * @returns {string} 转换后的CSS样式字符串
 */
export function attrToStyle(attr: Record<string, string | undefined>, defaultAttr?: Record<string, any>): string {
    // 使用reduce代替forEach,减少中间变量
    return Object.entries(attr).reduce((styles, [key, value]) => {
        // 使用单个条件判断无效值
        if (value && value !== "0" && !_isEqual(defaultAttr?.[key], value)) {
            return `${styles}${key}:${value};`;
        }
        return styles;
    }, "");
}

/**
 * 忽略默认值
 * @param obj 对象
 * @param defaultObj 默认对象
 * @returns 忽略默认值后的对象
 */
export function omitDefaultKey(obj: Record<string, any>, defaultObj: Record<string, any>) {
    return Object.fromEntries(Object.entries(obj).filter(([key, value]) => !_isEqual(value, defaultObj[key])));
}
