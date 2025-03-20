/*
 * @Description: 通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-20 14:51:30
 */
import type { App } from "vue";

import UeElEditorGroup from "./Main.vue";

UeElEditorGroup.install = (app: App) => {
    if (!UeElEditorGroup.name) return;
    app.component(UeElEditorGroup.name, UeElEditorGroup);
};
export interface UeElEditorGroupBaseProps {
    isFirst?: boolean;
    isLast?: boolean;
}
export type UeElEditorGroupInstance = InstanceType<typeof UeElEditorGroup>;

export default UeElEditorGroup;
