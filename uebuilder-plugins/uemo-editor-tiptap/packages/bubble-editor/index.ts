/*
 * @Description: 气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-18 02:11:38
 */
import type { App } from "vue";

import UeTiptapBubbleEditor from "./Main.vue";

UeTiptapBubbleEditor.install = (app: App) => {
    if (!UeTiptapBubbleEditor.name) return;
    app.component(UeTiptapBubbleEditor.name, UeTiptapBubbleEditor);
};

export interface UeTiptapBubbleEditorBaseProps {
    device?: UE_TIPTAP_UNIT.Device;
    content: string;
}
export type UeTiptapBubbleEditorInstance = InstanceType<typeof UeTiptapBubbleEditor>;

export default UeTiptapBubbleEditor;
