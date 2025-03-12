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

/** spline类型 */
export const isSplineReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(splinecode))$/;

/** lottie类型 */
export const isLottieReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(lottie))$/;

/** video类型 */
export const isVideoReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(mp4))$/;

/** image类型 */
export const isImageReg = /^(http(s?):\/\/)?([^\s]+\/)([^\s]+\.(jpg|jpeg|png|gif|webp))/;

/**
 * 延迟 Promise
 * @param ms 延迟时间 (单位: 毫秒)
 * @returns 延迟后的 Promise
 */
export async function delayPromise(ms = 2000, res?: Promise<any>): Promise<any> {
    return await new Promise((resolve) => setTimeout(() => resolve(res), ms));
}
