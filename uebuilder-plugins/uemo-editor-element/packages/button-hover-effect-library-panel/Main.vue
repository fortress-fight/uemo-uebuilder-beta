<!--
 * @Description: 按钮 hover 动效库
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 02:45:11
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
                        <PreviewButton :value="item.value" />
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
import { mixOptions } from "./utils/options";

defineOptions({ name: "UeElButtonHoverEffectLibraryPanel" });

const { t } = useI18n();

const _prop = withDefaults(defineProps<UeElButtonHoverEffectLibraryPanelBaseProps>(), {});
const select = defineModel<string>("select", { required: false });

const list = mixOptions();
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
