/*
 * @Description: 文本输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 18:56:55
 */
import type { App } from "vue";

import UeElTextInput from "./Main.vue";

/**
 * 安装函数：将文本输入组件注册到 Vue3 应用中。
 * 此方法会以组件名称为 key，通过 app.component 进行全局注册。
 */
UeElTextInput.install = (app: App) => {
    if (!UeElTextInput.name) return;
    app.component(UeElTextInput.name, UeElTextInput);
};

// 保留类型定义
export interface UeElTextInputBaseProps {
    value: string;
    label?: string;
    required?: boolean;
    type?: "password" | "text" | "textarea";
    theme?: "enterText";
    paddingSize?: "level1" | "level2" | "level3" | "level4";
    autocomplete?: string;
    disable?: boolean;
    placeholder?: string;
    autoTrim?: boolean;
    singleLine?: boolean;
    rules?: UE_EL_UTIL.InputRule[];
}
export type UeElTextInputInstance = InstanceType<typeof UeElTextInput>;

// 默认导出组件
export default UeElTextInput;
