<template>
    <div :class="$style['editor-ai-panel']">
        <UeElSelectOption :list="AIOptions" theme="light" @change="triggerAction" />
    </div>
</template>
<script lang="ts" setup>
import { useInjectTiptapEditor } from "../../../utils/mixin-tiptap-editor";

const { editor } = useInjectTiptapEditor();
const instance = getCurrentInstance();

const emit = defineEmits<{ (e: "closePopPanel"): void }>();

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
    if (!editor) return;

    editor?.chain().focus().triggerAIEditing(String(type)).run();

    emit("closePopPanel");
}
</script>
<style lang="scss" module>
.editor-ai-panel {
    // init
}
</style>
