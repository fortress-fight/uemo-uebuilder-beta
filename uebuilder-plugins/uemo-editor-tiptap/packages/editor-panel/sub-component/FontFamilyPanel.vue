<template>
    <UeElFontFamilyLibraryPanel ref="fontFamilyPanel" v-model:select="selectRef" />
</template>
<script lang="ts" setup>
import type { FontFamilyAttr } from "../../extension-font-family/src";

const valueRef = defineModel<FontFamilyAttr>("value", { required: true });

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
