/*
 * @Description: 分隔块的编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 01:02:59
 */
import type { App } from "vue";

import UeEditorPanelTiptapDividerBlock from "./Main.vue";

UeEditorPanelTiptapDividerBlock.install = (app: App) => {
    if (!UeEditorPanelTiptapDividerBlock.name) return;
    app.component(UeEditorPanelTiptapDividerBlock.name, UeEditorPanelTiptapDividerBlock);
};

export interface UeEditorPanelTiptapDividerBlockBaseProps {
    disabled?: boolean;
}
export type UeEditorPanelTiptapDividerBlockInstance = InstanceType<typeof UeEditorPanelTiptapDividerBlock>;

export default UeEditorPanelTiptapDividerBlock;
