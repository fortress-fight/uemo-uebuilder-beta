<template>
    <UeTiptapMenuButton type="add" @trigger="trigger" />
</template>
<script lang="ts" setup>
import type { NodeSelection } from "@tiptap/pm/state";

import { isShareItemNode, isShareRowNode } from "../../../extension-share/utils/helper";
import { isButtonItemNode } from "../../../extension-button/utils/helper";
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function addButtonNode(selection: NodeSelection) {
    const { to } = selection;
    const currentNode = selection.node;

    if (!currentNode) return;

    editor
        ?.chain()
        .focus()
        .insertContentAt(to, { type: "buttonItem", attrs: { ...currentNode.attrs } })
        .run();
}

function addShareItemNode(selection: NodeSelection) {
    const { to } = selection;
    const currentNode = selection.node;
    const isShareRow = currentNode.type.name === "shareRow";
    const shareItemNode = isShareRow ? currentNode.content.lastChild : currentNode;

    if (!shareItemNode) return;

    return editor
        ?.chain()
        .focus()
        .insertContentAt(isShareRow ? to - 1 : to, { type: "shareItem", attrs: { ...shareItemNode.attrs } })
        .run();
}

function trigger() {
    const selection = editor?.state.selection;

    if (isButtonItemNode(selection)) {
        addButtonNode(selection);
    }
    if (isShareRowNode(selection) || isShareItemNode(selection)) {
        addShareItemNode(selection);
    }
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
