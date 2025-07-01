<template>
    <UeTiptapEditorFloatMenu
        plugin-key="hrRuleMenu"
        :title="t('UNIT_HR_RULE')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isHrRuleNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapHrRuleMenu", inheritAttrs: false });

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

    const isHrRule = isHrRuleNode(selection);
    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "hrRule";

    return !isEditing && isHrRule && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
