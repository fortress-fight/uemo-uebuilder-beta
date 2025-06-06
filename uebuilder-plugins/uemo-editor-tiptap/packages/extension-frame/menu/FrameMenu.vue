<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonItemMenu"
        :title="menuTitle"
        :menu-items="menuItems"
        :should-show="shouldShow"
    />
</template>
<script lang="ts" setup>
import type { FrameAttrs } from "../src";

import { isFrameNode } from "../utils/helper";
import { getEditorPanelExtensionStorage } from "../../extension-editor-panel/utils/helper";

defineOptions({ name: "UeTiptapButtonItemMenu", inheritAttrs: false });

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

const menuTitle = ref<string>(t("UNIT_FRAME"));

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isFrame = isFrameNode(selection);

    if (isFrame) {
        const frameAttrs = editor.getAttributes("frame") as FrameAttrs;
        switch (frameAttrs.type) {
            case "video":
                menuTitle.value = t("UNIT_VIDEO");
                break;
            case "map":
                menuTitle.value = t("UNIT_MAP");
                break;
            case "web":
                menuTitle.value = t("UNIT_WEB");
                break;
            default:
                menuTitle.value = t("UNIT_FRAME");
                break;
        }
    }

    const isEditing = getEditorPanelExtensionStorage(editor).lastEditorPanelType === "frame";

    return !isEditing && isFrame && view.hasFocus();
};
</script>
<style lang="scss" module>
//
</style>
