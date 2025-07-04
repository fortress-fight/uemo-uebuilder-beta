<template>
    <UeTiptapMenuButton ref="rootDom" type="tableColAlign" :icon="icon" @trigger="trigger" />
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();

const currentValue = computed<"left" | "center" | "right">(() => {
    return editor?.getAttributes("tableCell").align || "left";
});

const icon = computed(() => {
    return {
        left: "icon-editor-align-left",
        center: "icon-editor-align-center",
        right: "icon-editor-align-right",
    }[currentValue.value];
});

const _rootDomRef = useTemplateRef("rootDom");

function trigger() {
    //
}
</script>
<style lang="scss" module>
//
</style>
