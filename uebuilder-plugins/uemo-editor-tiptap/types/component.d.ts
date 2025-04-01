/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeTiptapBubbleEditor, { UeTiptapBubbleEditorBaseProps } from "../packages/bubble-editor";
import UeTiptapBubbleMenu, { UeTiptapBubbleMenuBaseProps } from "../packages/bubble-menu";

declare module "vue" {
    export interface GlobalComponents {
        UeTiptapBubbleEditor: typeof UeTiptapBubbleEditor;
        UeTiptapBubbleMenu: typeof UeTiptapBubbleMenu;
    }
}

declare global {
    namespace UE_TIPTAP_COMPONENT {
        interface UeTiptapBubbleEditorProps extends UeTiptapBubbleEditorBaseProps {}
        interface UeTiptapBubbleMenuProps extends UeTiptapBubbleMenuBaseProps {}
    }
}

export {};
