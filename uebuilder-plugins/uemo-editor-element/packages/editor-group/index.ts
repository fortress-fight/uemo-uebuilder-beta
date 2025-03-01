/*
 * @Description: 通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 23:09:51
 */
import type { App } from "vue";

import UeElEditorGroup from "./Main.vue";

UeElEditorGroup.install = (app: App) => {
    if (!UeElEditorGroup.name) return;
    app.component(UeElEditorGroup.name, UeElEditorGroup);
};

export interface UeElEditorGroupBaseProps {
    title?: string;
    operType?: "none" | "onOff" | "select" | "add" | "remove";
    onOffParam?: UE_EL_COMPONENT.UeElOnOffProps & { value: UE_EL_UTIL.OnOffValue };
    selectParam?: UE_EL_COMPONENT.UeElSelectProps;
}
export type UeElEditorGroupInstance = InstanceType<typeof UeElEditorGroup>;

export default UeElEditorGroup;
