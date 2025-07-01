<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonItemMenu"
        title="Spline"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isSvgIconNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapSvgIconMenu", inheritAttrs: false });

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

    const isSvgIcon = isSvgIconNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "svgIcon";

    return !isEditing && isSvgIcon && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
