<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonItemMenu"
        title="Spline"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isSplineNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapSplineMenu", inheritAttrs: false });

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "insertNewLineBefore",
    "insertNewLineAfter",
    "selectParent",
    "|",
    "deleteNode",
    "|",
    "moreOper",
];

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isSpline = isSplineNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "spline";

    return !isEditing && isSpline && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
