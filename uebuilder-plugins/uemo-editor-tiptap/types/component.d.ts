/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
import UeTiptapBubbleEditor, { UeTiptapBubbleEditorBaseProps } from "../packages/bubble-editor";
import UeTiptapBubbleMenu, { UeTiptapBubbleMenuBaseProps } from "../packages/bubble-menu";
import UeTiptapEditorMenu, { UeTiptapEditorMenuBaseProps } from "../packages/editor-menu";
import UeTiptapMenuBar, { UeTiptapMenuBarBaseProps } from "../packages/menu-bar";
import UeTiptapMenuButton, { UeTiptapMenuButtonBaseProps } from "../packages/menu-button";
import UeTiptapMenuDivideLine, { UeTiptapMenuDivideLineBaseProps } from "../packages/menu-divide-line";

declare module "vue" {
    export interface GlobalComponents {
        UeTiptapBubbleEditor: typeof UeTiptapBubbleEditor;
        UeTiptapBubbleMenu: typeof UeTiptapBubbleMenu;
        UeTiptapEditorMenu: typeof UeTiptapEditorMenu;
        UeTiptapMenuBar: typeof UeTiptapMenuBar;
        UeTiptapMenuButton: typeof UeTiptapMenuButton;
        UeTiptapMenuDivideLine: typeof UeTiptapMenuDivideLine;
    }
}

declare global {
    namespace UE_TIPTAP_COMPONENT {
        interface UeTiptapBubbleEditorProps extends UeTiptapBubbleEditorBaseProps {}
        interface UeTiptapBubbleMenuProps extends UeTiptapBubbleMenuBaseProps {}
        interface UeTiptapEditorMenuProps extends UeTiptapEditorMenuBaseProps {}
        interface UeTiptapMenuBarProps extends UeTiptapMenuBarBaseProps {}
        interface UeTiptapMenuButtonProps extends UeTiptapMenuButtonBaseProps {}
        interface UeTiptapMenuDivideLineProps extends UeTiptapMenuDivideLineBaseProps {}
    }
}

export {};
