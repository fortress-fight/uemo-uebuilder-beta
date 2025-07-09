<!--
 * @Description: Tiptap循环文字编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 17:39:51
-->
<template>
    <UeElEditorPanel :title="t('UNIT_LOOP_TEXT')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <ContentPanel v-model:value="valueModel" />
            </template>
            <template #Effect>
                <EffectPanel v-model:value="valueModel" @fire="emit('fire', $event)" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapLoopTextBaseProps } from "./index";

import ContentPanel from "./sub-components/Content.vue";
import EffectPanel from "./sub-components/Effect.vue";

defineOptions({ name: "UeEditorPanelTiptapLoopText" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapLoopTextBaseProps>(), {});
const emit = defineEmits<{ (e: "fire", data: { type: "preview" }): void }>();

const valueModel = defineModel<UE_TIPTAP_EXTENSION.LoopText["attrs"]>("value", { required: true });

const { t } = useI18n();

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [
            { title: t("UNIT_CONTENT"), name: "Content" },
            { title: t("UNIT_EFFECT"), name: "Effect" },
        ],
    };
});
</script>
<style lang="scss" module>
.tiptap-loop-text {
    //
}
</style>
