<template>
    <UeTiptapEditorFloatMenu
        plugin-key="effectTextMenu"
        :title="t('UNIT_EFFECT_TEXT')"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import { isEffectTextNode } from "../utils/helper";
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

    const isEffectText = isEffectTextNode(selection);

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "effectText";

    return !isEditing && isEffectText && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
