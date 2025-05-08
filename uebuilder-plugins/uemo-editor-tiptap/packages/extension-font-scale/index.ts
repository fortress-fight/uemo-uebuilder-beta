import { Extension } from "@tiptap/core";

export interface fontScaleStorage {
    fontScaleHandle: UE_TIPTAP_UNIT.FontScaleHandle;
}

/**
 * 字体缩放处理函数
 * @param {("get" | "set")} type - 操作类型
 * @param {string} [_fontSize] - 字体大小
 * @param {number} [_scale] - 缩放比例
 * @returns {number | undefined} 获取时返回缩放比例，设置时返回 undefined
 */
const fontScaleHandle: UE_TIPTAP_UNIT.FontScaleHandle = (
    type: "get" | "set",
    _fontSize?: string,
    _scale?: number
): number | undefined => {
    switch (type) {
        case "get":
            // console.log("get", fontSize);
            return 1;
        case "set":
            // console.log("set", fontSize, scale);
            break;

        default:
            break;
    }
};

/**
 * 设备设置扩展
 * 用于管理编辑器的设备类型和字体缩放
 */
export const FontScaleExtension = Extension.create<{
    /** 字体缩放处理函数 */
    fontScaleHandle: UE_TIPTAP_UNIT.FontScaleHandle;
}>({
    name: "fontScaleExtension",

    /**
     * 添加扩展选项
     * @returns {Object} 扩展选项
     */
    addOptions() {
        return {
            fontScaleHandle,
        };
    },

    /**
     * 添加存储
     * @returns {Object} 存储对象
     */
    addStorage() {
        return {
            fontScaleHandle: this.options.fontScaleHandle,
        };
    },
});
