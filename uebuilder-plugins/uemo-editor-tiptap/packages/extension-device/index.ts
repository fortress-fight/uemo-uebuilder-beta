import { Extension } from "@tiptap/core";

/**
 * 设备设置扩展的命令类型声明
 */
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        deviceExtension: {
            /**
             * 更新设备类型
             * @param {UE_TIPTAP_UNIT.Device} device - 设备类型
             * @returns {ReturnType} 命令执行结果
             */
            updateDevice: (device: UE_TIPTAP_UNIT.Device) => ReturnType;
        };
    }
}

/**
 * 设备存储接口
 */
export interface DeviceStorage {
    /** 当前设备类型 */
    device: UE_TIPTAP_UNIT.Device;
}

/**
 * 设备设置扩展
 * 用于管理编辑器的设备类型和字体缩放
 */
export const DeviceExtension = Extension.create<
    {
        /** 默认设备类型 */
        defaultDevice: UE_TIPTAP_UNIT.Device;
    },
    DeviceStorage
>({
    name: "deviceExtension",

    /**
     * 添加扩展选项
     * @returns {Object} 扩展选项
     */
    addOptions() {
        return {
            defaultDevice: "pc",
        };
    },

    /**
     * 添加存储
     * @returns {DeviceStorage} 设备存储对象
     */
    addStorage() {
        return {
            device: this.options.defaultDevice,
        };
    },

    /**
     * 添加命令
     * @returns {Object} 命令对象
     */
    addCommands() {
        return {
            /**
             * 更新设备类型命令
             * @param {UE_TIPTAP_UNIT.Device} device - 新的设备类型
             * @returns {() => boolean} 命令执行函数
             */
            updateDevice: (device) => () => {
                this.storage.device = device;
                return true;
            },
        };
    },
});
