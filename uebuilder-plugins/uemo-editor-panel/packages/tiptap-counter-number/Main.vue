<!--
 * @Description: Tiptap计数器编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-08 02:10:38
-->
<template>
    <UeElEditorPanel :title="t('UNIT_COUNTER_NUMBER')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <ContentPanel v-model:value="valueModel" @fire="emit('fire', $event)" />
            </template>
            <template #Design>
                <DesignPanel v-model:value="valueModel" />
            </template>
            <template #Effect>
                <EffectPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapCounterNumberBaseProps } from "./index";

import ContentPanel from "./sub-components/Content.vue";
import DesignPanel from "./sub-components/Design.vue";
import EffectPanel from "./sub-components/Effect.vue";

defineOptions({ name: "UeEditorPanelTiptapCounterNumber" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapCounterNumberBaseProps>(), {});
const emit = defineEmits<{ (e: "fire", data: { type: "preview" }): void }>();

const valueModel = defineModel<UE_TIPTAP_EXTENSION.CounterNumber["attrs"]>("value", { required: true });

const { t } = useI18n();

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [
            { title: t("UNIT_CONTENT"), name: "Content" },
            { title: t("UNIT_DESIGN"), name: "Design" },
            { title: t("UNIT_EFFECT"), name: "Effect" },
        ],
    };
});
</script>
<style lang="scss" module>
.tiptap-counter-number {
    //
}
</style>
