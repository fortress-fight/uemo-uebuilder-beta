<template>
    <UeTiptapMenuBar :class="$style['editor-menu']">
        <template v-for="item in alignOptions" :key="item">
            <UeTiptapMenuButton
                ref="rootDom"
                :type="item.type"
                @trigger="currentValue = item.value"
                :active="currentValue === item.value"
            />
        </template>
    </UeTiptapMenuBar>
</template>
<script lang="ts" setup>
const valueRef = defineModel<{ textAlign: string }>("value", { required: true });

const emit = defineEmits<{ (e: "closePopPanel"): void }>();

const alignOptions = [
    { value: "left", type: "textAlignLeft" },
    { value: "center", type: "textAlignCenter" },
    { value: "right", type: "textAlignRight" },
] as const;

const currentValue = computed({
    get() {
        return valueRef.value?.textAlign || "";
    },
    set(value) {
        valueRef.value = { textAlign: value };
    },
});

watch(currentValue, () => {
    emit("closePopPanel");
});
</script>
<style lang="scss" module>
.text-align-panel {
    // init
}
</style>
