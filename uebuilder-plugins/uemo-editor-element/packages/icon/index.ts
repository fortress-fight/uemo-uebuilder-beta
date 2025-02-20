/*
 * @Description: 字体图标
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:21:31
 */
import type { App } from "vue";

import "@stone/uemo-icon-font/src/index";
import UeElIcon from "./Main.vue";

UeElIcon.install = (app: App) => {
    app.component(UeElIcon.name, UeElIcon);
};

// 保留类型定义
export interface UeElIconBaseProps {
    name: string;
    size?: number;
}
export type UeElIconInstance = InstanceType<typeof UeElIcon>;

export default UeElIcon;
