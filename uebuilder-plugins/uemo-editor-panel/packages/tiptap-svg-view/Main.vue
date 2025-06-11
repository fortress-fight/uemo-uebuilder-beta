<!--
 * @Description: SvgView 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-12 00:37:55
-->
<template>
    <UeElEditorPanel title="SVG">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <ContentPanel v-model:value="valueModel" />
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
import type { UeEditorPanelTiptapSvgViewBaseProps } from "./index";

import ContentPanel from "./sub-components/ContentPanel.vue";
import DesignPanel from "./sub-components/DesignPanel.vue";
import EffectPanel from "./sub-components/EffectPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapSvgView" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeEditorPanelTiptapSvgViewBaseProps>(), {});

const valueModel = defineModel<UE_TIPTAP_EXTENSION.SvgView["attrs"]>("value", { required: true });

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
.tiptap-svg-view {
    //
}
</style>
