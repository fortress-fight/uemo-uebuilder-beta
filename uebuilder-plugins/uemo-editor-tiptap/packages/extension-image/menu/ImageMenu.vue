<template>
    <UeTiptapEditorFloatMenu
        plugin-key="imageMenu"
        :title="t('UNIT_IMAGE')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isImageNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapImageMenu", inheritAttrs: false });

const { t } = useI18n();

const menuItems: (UE_TIPTAP_UNIT.OperItem | "|")[] = [
    "editor",
    "|",
    "replaceImage",
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

    const isImage = isImageNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "image";

    return !isEditing && isImage && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
