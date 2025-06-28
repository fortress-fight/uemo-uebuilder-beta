<template>
    <UeTiptapMenuButton type="replaceNode" :disable="!isEnable" @trigger="replace" />
</template>
<script lang="ts" setup>
import { NodeSelection } from "@tiptap/pm/state";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { getLocalClipboard } from "@stone/uemo-editor-utils/lib/clipboard/local-clipboard";

import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";
import { getClosestGridItem } from "../../extension-grid/utils/helper";

const { editor } = useInjectTiptapEditor();
const instance = getCurrentInstance();
const { t } = useI18n();

const nodeName = computed(() => {
    if (!editor) return "";

    const closestGridItem = getClosestGridItem(editor);
    if (closestGridItem) {
        return "gridItem";
    }

    return "";
});

const isEnable = computed(() => {
    if (!editor || !nodeName.value) return false;

    const localClipboard = getLocalClipboard();
    if (!localClipboard) return false;

    const { format, content } = localClipboard;

    if (format !== "uebuilder/tiptap-node" || !content) {
        return false;
    }

    if (content.type !== nodeName.value) {
        return false;
    }

    return true;
});

function replace() {
    if (!isEnable.value || !editor) return;

    const localClipboard = getLocalClipboard();
    if (!localClipboard) return;

    const { content } = localClipboard;
    const nodeInfo = content;
    const { view } = editor;
    const { state } = view;

    try {
        if (nodeName.value === "gridItem") {
            const gridItem = getClosestGridItem(editor);
            if (!gridItem) return;

            const { node, start, pos } = gridItem;
            if (!node || !start || !pos) return;

            nodeInfo.attrs.gridArea = node.attrs.gridArea;
            nodeInfo.attrs.mdGridArea = node.attrs.mdGridArea;

            const newSelection = NodeSelection.create(state.doc, pos);
            const newNode = ProseMirrorNode.fromJSON(editor.schema, {
                type: nodeInfo.type,
                attrs: nodeInfo.attrs,
                content: nodeInfo.content,
            });
            const tr = view.state.tr.setSelection(newSelection).replaceWith(pos, pos + node.nodeSize, newNode);

            view.dispatch(tr);
            editor.chain().focus().run();
        }

        instance?.proxy?.$ueElToast.success(t("UNIT_REPLACE_SUCCESS"));
    } catch (error) {
        console.error(error);
        instance?.proxy?.$ueElToast.error(t("UNIT_REPLACE_FAILED"));
    }
}
</script>
<style lang="scss" module>
//
</style>
