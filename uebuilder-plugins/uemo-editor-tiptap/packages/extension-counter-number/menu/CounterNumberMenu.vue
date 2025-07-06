<template>
    <UeTiptapEditorFloatMenu
        plugin-key="counterNumberMenu"
        :title="t('UNIT_COUNTER_NUMBER')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isCounterNumberNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapImageMenu", inheritAttrs: false });

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

    const isCounterNumber = isCounterNumberNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "counterNumber";

    return !isEditing && isCounterNumber && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
