<template>
    <UeTiptapEditorFloatMenu
        plugin-key="buttonItemMenu"
        title="按钮"
        :menu-items="menuItems"
        :should-show="shouldShow"
        :disable-menu-items="disableMenu"
    />
</template>
<script lang="ts" setup>
import { isNodeSelection } from "@tiptap/core";

import { hasParentNode } from "../../../utils/tiptap-utils";
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

defineOptions({ name: "UeTiptapButtonItemMenu", inheritAttrs: false });

const { editor } = useInjectTiptapEditor();

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

const shouldShow: UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps["shouldShow"] = ({ editor, view, state }) => {
    if (!editor) return false;

    const { selection } = state;

    const isButtonItem = isNodeSelection(selection) && selection.node.type.name === "buttonItem";

    return isButtonItem && view.hasFocus();
};

const disableMenu = computed(() => {
    if (!editor) return [];

    const result: UE_TIPTAP_UNIT.OperItem[] = [];

    if (!hasParentNode(editor)) {
        result.push("selectParent");
    }

    return result;
});
</script>
<style lang="scss" module>
//
</style>
