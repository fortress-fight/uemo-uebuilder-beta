/*
 * @Description: 加载Loading
 * @Author: F-Stone
 * @LastEditTime: 2025-03-27 12:24:46
 */
import type { App } from "vue";

import UeElLoading from "./Main.vue";

UeElLoading.install = (app: App) => {
    if (!UeElLoading.name) return;
    app.component(UeElLoading.name, UeElLoading);
};

export type UeElLoadingBaseProps = {
    /** 延迟显示时间（毫秒） */
    delay?: number;
    /** 加载类型 */
    type?: "bar" | "circle";
    /** 背景颜色 */
    bg?: string;
    /** 前景颜色 */
    color?: string;
    /** 进度条配置 */
    bar?: {
        /** 是否使用模拟进度 */
        fake?: boolean;
        /** 提示信息 */
        message?: string | false;
        /** 进度值 */
        progress?: string;
        /** 动画持续时间 */
        duration?: number;
    };
    /** 圆形加载配置 */
    circle?: {
        /** 尺寸 */
        size?: string;
    };
};
export type UeElLoadingInstance = InstanceType<typeof UeElLoading>;

export default UeElLoading;
