/*
 * @Description: 拖拽组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-25 00:05:23
 */
import type { App } from "vue";

import UeElDraggable from "./Main.vue";

UeElDraggable.install = (app: App) => {
    if (!UeElDraggable.name) return;
    app.component(UeElDraggable.name, UeElDraggable);
};

export interface UeElDraggableBaseProps {
    target?: string;
}
export type UeElDraggableInstance = InstanceType<typeof UeElDraggable>;

export default UeElDraggable;
