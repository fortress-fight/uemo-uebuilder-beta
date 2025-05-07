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

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view }) => {
    return isButtonItemNode(editor?.state.selection) && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
