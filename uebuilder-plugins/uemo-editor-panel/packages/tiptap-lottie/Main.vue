<!--
 * @Description: Lottie 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-04 14:11:52
-->
<template>
    <UeElEditorPanel title="Lottie">
        <UeElTabCard v-bind="tabCardProps">
            <template #Content>
                <ContentPanel v-model:value="valueModel" />
            </template>
            <template #Design>
                <DesignPanel v-model:value="valueModel" />
            </template>
        </UeElTabCard>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeEditorPanelTiptapLottieBaseProps } from "./index";

import ContentPanel from "./sub-components/ContentPanel.vue";
import DesignPanel from "./sub-components/DesignPanel.vue";

defineOptions({ name: "UeEditorPanelTiptapLottie" });

const { t } = useI18n();
const _props = withDefaults(defineProps<UeEditorPanelTiptapLottieBaseProps>(), {});
const valueModel = defineModel<UE_TIPTAP_EXTENSION.Lottie["attrs"]>("value", { required: true });

const tabCardProps = computed<UE_EL_COMPONENT.UeElTabCardProps>(() => {
    return {
        defaultCard: "Content",
        cards: [
            { title: t("UNIT_CONTENT"), name: "Content" },
            { title: t("UNIT_DESIGN"), name: "Design" },
        ],
    };
});
</script>
<style lang="scss" module>
.tiptap-lottie {
    //
}
</style>
