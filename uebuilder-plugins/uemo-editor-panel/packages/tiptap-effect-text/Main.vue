<!--
 * @Description: 特效文字的编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 18:02:05
-->
<template>
    <UeElEditorPanel :title="t('UNIT_EFFECT_TEXT')">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <ContentPanel v-model:value="valueModel" />
            </template>
            <template #Effect>
                <EffectPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapEffectTextBaseProps } from "./index";

import ContentPanel from "./sub-components/ContentPanel.vue";
import EffectPanel from "./sub-components/EffectPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapEffectText" });
const _props = withDefaults(defineProps<UeEditorPanelTiptapEffectTextBaseProps>(), {});
const valueModel = defineModel<UE_TIPTAP_EXTENSION.EffectText["attrs"]>("value", { required: true });

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
.tiptap-effect-text {
    //
}
</style>
