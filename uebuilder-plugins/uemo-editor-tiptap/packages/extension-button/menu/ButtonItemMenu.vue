<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonItemMenu"
        title="按钮"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isButtonItemNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapButtonItemMenu", inheritAttrs: false });

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "insertNewLineBefore",
    "insertNewLineAfter",
    "selectParent",
    "|",
    "add",
    "|",
    "deleteNode",
    "|",
    "moreOper",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isButtonItem = isButtonItemNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "buttonItem";

    return !isEditing && isButtonItem && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
