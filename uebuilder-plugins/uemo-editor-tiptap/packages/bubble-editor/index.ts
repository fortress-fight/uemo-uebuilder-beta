/*
 * @Description: 气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-01 00:47:52
 */
import type { App } from "vue";

import UeTiptapBubbleEditor from "./Main.vue";

UeTiptapBubbleEditor.install = (app: App) => {
    if (!UeTiptapBubbleEditor.name) return;
    app.component(UeTiptapBubbleEditor.name, UeTiptapBubbleEditor);
};

export interface UeTiptapBubbleEditorBaseProps {
    content: string;
}
export type UeTiptapBubbleEditorInstance = InstanceType<typeof UeTiptapBubbleEditor>;

export default UeTiptapBubbleEditor;
