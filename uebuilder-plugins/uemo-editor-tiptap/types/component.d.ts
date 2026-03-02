/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2026-03-02 16:05:02
 */
import UeTiptapMenuBar, { UeTiptapMenuBarBaseProps } from "../packages/menu/menu-bar";
import UeTiptapMenuButton, { UeTiptapMenuButtonBaseProps } from "../packages/menu/menu-button";
import UeTiptapBubbleMenu, { UeTiptapBubbleMenuBaseProps } from "../packages/menu/bubble-menu";
import UeTiptapFloatingMenu, { UeTiptapFloatingMenuBaseProps } from "../packages/menu/floating-menu";
import UeTiptapEditorMenu, { UeTiptapEditorMenuBaseProps } from "../packages/menu/editor-bubble-menu";
import UeTiptapMenuDivideLine, { UeTiptapMenuDivideLineBaseProps } from "../packages/menu/menu-divide-line";

import UeTiptapEditorPanel, { UeTiptapEditorPanelBaseProps } from "../packages/editor-panel";
import UeTiptapBubbleEditor, { UeTiptapBubbleEditorBaseProps } from "../packages/bubble-editor";
import UeTiptapEditorFloatMenu, { UeTiptapEditorFloatMenuBaseProps } from "../packages/menu/editor-floating-menu";

declare module "vue" {
    export interface GlobalComponents {
        UeTiptapBubbleEditor: typeof UeTiptapBubbleEditor;
        UeTiptapBubbleMenu: typeof UeTiptapBubbleMenu;
        UeTiptapEditorFloatMenu: typeof UeTiptapEditorFloatMenu;
        UeTiptapEditorMenu: typeof UeTiptapEditorMenu;
        UeTiptapEditorPanel: typeof UeTiptapEditorPanel;
        UeTiptapFloatingMenu: typeof UeTiptapFloatingMenu;
        UeTiptapMenuBar: typeof UeTiptapMenuBar;
        UeTiptapMenuButton: typeof UeTiptapMenuButton;
        UeTiptapMenuDivideLine: typeof UeTiptapMenuDivideLine;
    }
}

declare global {
    namespace UE_TIPTAP_COMPONENT {
        interface UeTiptapBubbleEditorProps extends UeTiptapBubbleEditorBaseProps {}
        interface UeTiptapBubbleMenuProps extends UeTiptapBubbleMenuBaseProps {}
        interface UeTiptapEditorFloatMenuProps extends UeTiptapEditorFloatMenuBaseProps {}
        interface UeTiptapEditorMenuProps extends UeTiptapEditorMenuBaseProps {}
        interface UeTiptapEditorPanelProps extends UeTiptapEditorPanelBaseProps {}
        interface UeTiptapFloatingMenuProps extends UeTiptapFloatingMenuBaseProps {}
        interface UeTiptapMenuBarProps extends UeTiptapMenuBarBaseProps {}
        interface UeTiptapMenuButtonProps extends UeTiptapMenuButtonBaseProps {}
        interface UeTiptapMenuDivideLineProps extends UeTiptapMenuDivideLineBaseProps {}
    }
}

export {};
