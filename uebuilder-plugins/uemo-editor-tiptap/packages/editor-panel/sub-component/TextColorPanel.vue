<template>
    <UeElColorPickerPanel v-model:value="colorRef" type="mixin" />
</template>
<script lang="ts" setup>
const valueRef = defineModel<UE_TIPTAP_EXTENSION.AttrEditorPanelMap["textColor"]>("value", { required: true });

const colorRef = computed({
    get() {
        return valueRef.value?.color || "";
    },
    set(value) {
        valueRef.value = { color: value };
    },
});
</script>
<style lang="scss" module>
//
</style>
