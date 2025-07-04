<template>
    <UeTiptapMenuButton ref="rootDom" type="tableColAlign" :icon="icon" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const current = computed<"top" | "middle" | "bottom">(() => {
    return editor?.getAttributes("tableCell").valign || "top";
});

const icon = computed(() => {
    return {
        top: "icon-editor-valign-top",
        middle: "icon-editor-valign-middle",
        bottom: "icon-editor-valign-bottom",
    }[current.value];
});

const _rootDomRef = useTemplateRef("rootDom");

function trigger() {
    //
}
</script>
<style lang="scss" module>
//
</style>
