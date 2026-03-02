<template>
    <UeTiptapMenuButton type="copyNode" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { setLocalClipboard } from "@stone/uemo-editor-utils/lib/clipboard/local-clipboard";
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

import { getClosestGridItem } from "../../../extension-grid/utils/helper";

defineOptions({
    name: "UeTiptapPluginCopyNode",
});

const instance = getCurrentInstance();
const { editor } = useInjectTiptapEditor();

function getNodeJson() {
    if (!editor) return undefined;

    const closestGridItem = getClosestGridItem(editor);
    if (!closestGridItem) return;

    return closestGridItem.node.toJSON();
}

function trigger() {
    const nodeJson = getNodeJson();
    if (!nodeJson) return;

    setLocalClipboard({
        format: "uebuilder/tiptap-node",
        content: nodeJson,
    });
    instance?.proxy?.$ueElToast.success("复制成功");
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
