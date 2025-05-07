<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonRowMenu"
        title="按钮组"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isNodeSelection } from "@tiptap/core";

defineOptions({ name: "UeTiptapButtonItemMenu", inheritAttrs: false });

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "insertNewLineBefore",
    "insertNewLineAfter",
    "selectParent",
    "|",
    "deleteNode",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isButtonRow = isNodeSelection(selection) && selection.node.type.name === "buttonRow";

    const isEditing = editor?.getAttributes("buttonRow").isEditing;

    return !isEditing && isButtonRow && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
