<template>
    <UeTiptapEditorFloatMenu
        plugin-key="loopTextMenu"
        :title="t('UNIT_LOOP_TEXT')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isLoopTextNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapGridGroupMenu", inheritAttrs: false });

const { t } = useI18n();

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

    const isLoopText = isLoopTextNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "loopText";

    return !isEditing && isLoopText && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
