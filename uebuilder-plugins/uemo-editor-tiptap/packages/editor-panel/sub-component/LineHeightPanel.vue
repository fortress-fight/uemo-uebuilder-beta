<template>
    <div :class="$style['line-height-panel']">
        <UeElSelectOption :value="lineHeight" :list="options" @change="lineHeight = String($event)" />
    </div>
</template>
<script lang="ts" setup>
const valueRef = defineModel<UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"]["lineHeight"]>("value", {
    required: true,
});

const emit = defineEmits<{ (e: "closePopPanel"): void }>();

const options: UE_EL_UTIL.SelectOption[] = [
    { value: "", text: "默认" },
    { value: "1", text: "1" },
    { value: "1.25", text: "1.25" },
    { value: "1.5", text: "1.5" },
    { value: "1.75", text: "1.75" },
    { value: "2", text: "2" },
    { value: "2.25", text: "2.25" },
    { value: "2.5", text: "2.5" },
] as const;

const lineHeight = computed({
    get() {
        return valueRef.value?.lineHeight || "";
    },
    set(value) {
        emit("closePopPanel");
        valueRef.value = { lineHeight: value };
    },
});
</script>
<style lang="scss" module>
.line-height-panel {
    // init
}
</style>
