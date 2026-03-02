<template>
    <UeTiptapMenuBar :class="$style['editor-menu']">
        <template v-for="item in alignOptions" :key="item">
            <UeTiptapMenuButton
                ref="rootDom"
                :type="item.type"
                :icon="item.icon"
                @trigger="currentValue = item.value"
                :active="currentValue === item.value"
            />
        </template>
    </UeTiptapMenuBar>
</template>
<script lang="ts" setup>
const valueRef = defineModel<UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"]["tableAlign"]>("value", {
    required: true,
});

const emit = defineEmits<{ (e: "closePopPanel"): void }>();

const rowAlignOptions = [
    { value: "left", type: "tableRowAlign", icon: "ue-tiptap-align-left" },
    { value: "center", type: "tableRowAlign", icon: "ue-tiptap-align-center" },
    { value: "right", type: "tableRowAlign", icon: "ue-tiptap-align-right" },
] as const;

const colAlignOptions = [
    { value: "top", type: "tableColAlign", icon: "ue-tiptap-valign-top" },
    { value: "middle", type: "tableColAlign", icon: "ue-tiptap-valign-middle" },
    { value: "bottom", type: "tableColAlign", icon: "ue-tiptap-valign-bottom" },
] as const;

const alignOptions = computed(() => {
    if (["left", "center", "right"].includes(currentValue.value)) {
        return rowAlignOptions;
    }

    return colAlignOptions;
});

const currentValue = computed({
    get() {
        return valueRef.value as any;
    },
    set(value) {
        emit("closePopPanel");
        valueRef.value = value;
    },
});
</script>
<style lang="scss" module>
.table-align-panel {
    // init
}
</style>
