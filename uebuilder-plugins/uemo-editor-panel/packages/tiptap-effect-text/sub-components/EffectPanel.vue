<template>
    <!-- 滚动效果设置 -->
    <UeElScrollEffectSettingGroup :enableType="['text-effect']" v-model:value="scrollEffect" :allow-remove="false" />
</template>
<script lang="ts" setup>
import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

const valueModel = defineModel<UE_TIPTAP_EXTENSION.EffectText["attrs"]>("value", { required: true });

const scrollEffect = useDefineObjectModel(valueModel, {
    get: (modelValue) => {
        return {
            type: "text-effect",
            options: modelValue.scrollEffect,
        } as const;
    },
    set: (value, modelValue) => {
        modelValue.scrollEffect = value.options;
        return modelValue;
    },
});
</script>
<style lang="scss" module>
.content-panel {
    // init
}
</style>
