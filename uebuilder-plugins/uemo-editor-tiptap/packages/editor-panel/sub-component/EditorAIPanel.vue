<template>
    <div :class="$style['editor-ai-panel']">
        <UeElSelectOption :list="AIOptions" theme="light" @change="triggerAction" />
    </div>
</template>
<script lang="ts" setup>
const instance = getCurrentInstance();

const emit = defineEmits<{ (e: "closePopPanel"): void }>();
const valueRef = defineModel<UE_TIPTAP_EXTENSION.EditorPanel["panelAttrsMap"]["editorAI"]>("value", {
    required: true,
});

const AIOptions = computed<UE_EL_UTIL.SelectOption[]>(() => {
    const AI_CONFIG = instance?.proxy?.$ueElAI;

    if (!AI_CONFIG) return [];

    const usePlugin = AI_CONFIG.plugin.filter((plugin) => {
        if (!AI_CONFIG.tiptapTextUse) return false;
        return AI_CONFIG.tiptapTextUse?.includes(plugin.type);
    });

    return usePlugin.map((item) => ({
        icon: item.icon || "",
        text: item.name || "",
        value: item.type,
    }));
});

function triggerAction(type: string | number) {
    valueRef.value = { type: String(type) };
    emit("closePopPanel");
}
</script>
<style lang="scss" module>
.editor-ai-panel {
    // init
}
</style>
