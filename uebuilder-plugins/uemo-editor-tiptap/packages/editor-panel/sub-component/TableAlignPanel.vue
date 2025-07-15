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
    { value: "left", type: "tableRowAlign", icon: "icon-editor-align-left" },
    { value: "center", type: "tableRowAlign", icon: "icon-editor-align-center" },
    { value: "right", type: "tableRowAlign", icon: "icon-editor-align-right" },
] as const;

const colAlignOptions = [
    { value: "top", type: "tableColAlign", icon: "icon-editor-valign-top" },
    { value: "middle", type: "tableColAlign", icon: "icon-editor-valign-middle" },
    { value: "bottom", type: "tableColAlign", icon: "icon-editor-valign-bottom" },
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
