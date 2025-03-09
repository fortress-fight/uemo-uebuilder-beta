<!--
 * @Description: 按钮 hover 动效库
 * @Author: F-Stone
 * @LastEditTime: 2025-03-09 17:36:38
-->
<template>
    <UeElLibraryPanel :cards="libraryPanelParam.cards">
        <template #buttonHoverEffectLibList>
            <div :class="$style['library-list']" class="grid grid-cols-2 gap-2">
                <div
                    v-for="item in list"
                    :key="item.value"
                    :class="$style['library-item']"
                    class="cursor-pointer"
                    :data-select="item.value == select"
                    @click="select = item.value"
                >
                    <div :class="$style['thumb-box']">
                        <PreviewButton v-bind="item" />
                    </div>
                </div>
            </div>
        </template>
    </UeElLibraryPanel>
</template>
<script lang="ts" setup>
import type { UeElButtonHoverEffectLibraryPanelBaseProps } from "./index";

import PreviewButton from "./sub-components/PreviewButton.vue";

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
.library-item {
    position: relative;

    overflow: hidden;

    padding: calc(var(--ue-editor-row-space--lv1) + 0.5em) var(--ue-editor-row-space--lv1);

    border-radius: var(--ue-border-radius--lv1);
    &[data-select="true"] {
        &::before {
            box-shadow: inset 0 0 0 4px color(var(--ue-border-color--deeper)), inset 0 0 0 7px #fff;
        }
    }
    .thumb-box {
        position: relative;

        overflow: hidden;

        max-width: 100%;

        border-radius: var(--ue-border-radius--lv1);
    }
    &::before {
        @include ab-cover;
        z-index: 10;

        content: "";
        pointer-events: none;

        border-radius: var(--ue-border-radius--lv1);
        box-shadow: inset 0 0 0 1px rgba(var(--ue-border-color), 1);
    }
}
</style>
