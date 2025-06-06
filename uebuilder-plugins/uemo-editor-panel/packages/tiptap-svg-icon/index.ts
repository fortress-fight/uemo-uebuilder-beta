/*
 * @Description: Tiptap SvgIcon 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-06 15:18:37
 */
import type { App } from "vue";

import UeEditorPanelTiptapSvgIcon from "./Main.vue";

UeEditorPanelTiptapSvgIcon.install = (app: App) => {
    if (!UeEditorPanelTiptapSvgIcon.name) return;
    app.component(UeEditorPanelTiptapSvgIcon.name, UeEditorPanelTiptapSvgIcon);
};

export interface UeEditorPanelTiptapSvgIconBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapSvgIconInstance = InstanceType<typeof UeEditorPanelTiptapSvgIcon>;

export default UeEditorPanelTiptapSvgIcon;
