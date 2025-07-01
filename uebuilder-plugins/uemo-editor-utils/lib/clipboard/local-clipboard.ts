/*
 * @Description: 本地剪贴板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-05 15:23:49
 */

type LocalClipboard = { format: string; content: any };

const LOCAL_CLIPBOARD = "localClipboard";

/**
 * 分析复制信息
 * @param info 复制信息
 * @returns 复制信息
 */
export function analyzeCopyInfo(info: string) {
    const [formatType, copyNodeName, copyInfoType, copyInfoParam] = info.split(":");
    return { formatType, copyNodeName, copyInfoType, copyInfoParam };
}

/**
 * 获取本地剪贴板
 * @returns 本地剪贴板
 */
export function getLocalClipboard(): LocalClipboard | undefined {
    const clipboardContent = localStorage.getItem(LOCAL_CLIPBOARD);

    try {
        return clipboardContent ? JSON.parse(clipboardContent) : undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

/**
 * 设置本地剪贴板
 * @param content 剪贴板内容
 */
export function setLocalClipboard(content: LocalClipboard) {
    localStorage.setItem(LOCAL_CLIPBOARD, JSON.stringify(content));
}

/**
 * 清除本地剪贴板
 */
export function clearLocalClipboard() {
    localStorage.removeItem(LOCAL_CLIPBOARD);
}
