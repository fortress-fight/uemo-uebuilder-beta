<template>
    <UeTiptapMenuButton type="selectParent" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { selectNode } from "../../../../utils/tiptap-utils";
import { getClosestGridGroup } from "../../../extension-grid/utils/helper";
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const props = defineProps<{ nodeName?: string }>();

function trigger() {
    if (!editor) return false;
    switch (props.nodeName) {
        case "gridItem":
            const gridGroupInfo = getClosestGridGroup(editor);
            if (!gridGroupInfo) return;

            const { pos } = gridGroupInfo;
            selectNode(editor, pos);

            editor.chain().focus().run();
            break;

        default:
            editor.chain().selectParentNode().focus().run();
            break;
    }
}
</script>
<style lang="scss" module>
.editor-button {
    // init
}
</style>
