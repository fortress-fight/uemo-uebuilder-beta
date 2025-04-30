<template>
    <UeElFontFamilyLibraryPanel ref="fontFamilyPanel" v-model:select="selectRef" />
</template>
<script lang="ts" setup>
const valueRef = defineModel<UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"]["fontFamily"]>("value", {
    required: true,
});

const selectRef = computed({
    get() {
        return valueRef.value?.fontFamily || "";
    },
    set(value) {
        valueRef.value = { fontFamily: value };
    },
});
</script>
<style lang="scss" module>
//
</style>
