<template>
    <UeTiptapEditorFloatMenu
        plugin-key="dividerBlockMenu"
        :title="t('UNIT_DIVIDER_BLOCK')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isDividerBlockNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapDividerBlockMenu", inheritAttrs: false });

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

    const isDividerBlock = isDividerBlockNode(selection);
    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "dividerBlock";

    return !isEditing && isDividerBlock && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
