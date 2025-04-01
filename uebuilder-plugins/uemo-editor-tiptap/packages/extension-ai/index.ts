import { Extension } from "@tiptap/core";

/**
 * 设备设置扩展的命令类型声明
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        AIExtension: {
            updateLoadingState: (loading: boolean) => ReturnType;
        };
    }
}

/**
 * 设备存储接口
 */
export interface AIStorage {
    /** 当前AI加载状态 */
    loading: boolean;
}

/**
 * 设备设置扩展
 * 用于管理编辑器的设备类型和字体缩放
 */
export const AIExtension = Extension.create<{ config: any }, AIStorage>({
    name: "AIExtension",

    /**
     * 添加扩展选项
     * @returns {Object} 扩展选项
     */
    addOptions() {
        return {
            config: {},
        };
    },

    /**
     * 添加存储
     * @returns {AIStorage} 设备存储对象
     */
    addStorage() {
        return {
            loading: false,
        };
    },

    /**
     * 添加命令
     * @returns {Object} 命令对象
     */
    addCommands() {
        return {
            updateLoadingState: (loading) => () => {
                this.storage.loading = loading;
                return true;
            },
        };
    },
});
