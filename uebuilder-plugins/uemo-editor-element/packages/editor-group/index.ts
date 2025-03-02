/*
 * @Description: 通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 01:20:13
 */
import type { App } from "vue";

import UeElEditorGroup from "./Main.vue";

UeElEditorGroup.install = (app: App) => {
    if (!UeElEditorGroup.name) return;
    app.component(UeElEditorGroup.name, UeElEditorGroup);
};
export interface UeElEditorGroupBaseProps {
    disable?: boolean;
}
export type UeElEditorGroupInstance = InstanceType<typeof UeElEditorGroup>;

export default UeElEditorGroup;
