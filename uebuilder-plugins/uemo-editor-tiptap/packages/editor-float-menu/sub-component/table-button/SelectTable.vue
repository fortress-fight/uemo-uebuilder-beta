<template>
    <UeTiptapMenuButton type="selectTable" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { NodeSelection } from "@tiptap/pm/state";

import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

function trigger() {
    if (!editor) return false;
    const { view } = editor;
    const { state } = view;
    const $pos = state.selection.$anchor;
    for (let d = $pos.depth; d > 0; d--) {
        const node = $pos.node(d);
        if (node.type.spec.tableRole == "table") {
            view.dispatch(view.state.tr.setSelection(NodeSelection.create(state.doc, $pos.before(d))));
            editor.chain().focus().run();
            return true;
        }
    }
    return false;
}
</script>
<style lang="scss" module>
//
</style>
