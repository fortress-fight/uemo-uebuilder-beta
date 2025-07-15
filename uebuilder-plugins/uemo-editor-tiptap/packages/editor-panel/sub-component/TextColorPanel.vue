<template>
    <UeElColorPickerPanel v-model:value="colorRef" :type="type" />
</template>
<script lang="ts" setup>
const valueRef = defineModel<UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"]["textColor"]>("value", {
    required: true,
});

const _props = withDefaults(defineProps<{ type: UE_EL_UTIL.ColorType | "mixin" }>(), { type: "mixin" });

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
