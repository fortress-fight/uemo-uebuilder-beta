<!--
 * @Description: 按钮 hover 动效库
 * @Author: F-Stone
 * @LastEditTime: 2025-03-15 22:11:15
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #buttonHoverEffectLibList>
            <div :class="$style['library-list']" class="grid grid-cols-2 gap-2">
                <UeElSelectBox
                    v-for="item in list"
                    :key="item.value"
                    :select="select === item.value"
                    :auto-height="true"
                    @trigger="select = item.value"
                >
                    <div :class="$style['library-item']">
                        <PreviewButton v-bind="item" />
                    </div>
                </UeElSelectBox>
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElButtonHoverEffectLibraryPanelBaseProps } from "./index";

import PreviewButton from "./sub-components/PreviewButton.vue";
import UeElSelectBox from "../library-panel/sub-components/SelectBox.vue";

defineOptions({ name: "UeElButtonHoverEffectLibraryPanel" });

const { t } = useI18n();

const _prop = withDefaults(defineProps<UeElButtonHoverEffectLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: true });

const list = ref<UE_EL_UTIL.ResourceButtonHoverEffect>([
    { value: "moveUp", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_MOVE_UP") },
    { value: "shakeX", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_SHAKE_X") },
    { value: "rubberBand", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_RUBBER_BAND") },
    { value: "scale", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_SCALE") },
    { value: "moveLeft", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_MOVE_LEFT"), beforeIcon: "icon-app-play" },
    { value: "moveRight", name: t("BUTTON_HOVER_EFFECT_LIBRARY_ITEM_MOVE_RIGHT"), afterIcon: "icon-app-play" },
]);
const libraryPanelParam = computed<UE_EL_COMPONENT.UeElLibraryPanelProps>(() => ({
    cards: [
        {
            title: t("BUTTON_HOVER_EFFECT_LIBRARY_TITLE"),
            name: "buttonHoverEffectLibList",
            icon: "icon-app-animation",
            iconSize: 15,
        },
    ],
}));
</script>
<style lang="scss" module>
.button-hover-effect-library-panel {
    //
}
</style>
