<!--
 * @Description: 滚动效果控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-30 01:33:41
-->
<template>
    <UeElEditorPanel :class="$style['scroll-effect-setting-panel']" :title="scrollEffectName">
        <component :is="controlComponent" v-model:value="optionsRef" :is-image="isImage" />
        <!-- 提示信息 -->
        <UeElSettingGroup :title="t('SCROLL_PANEL_TIP_TITLE')" v-if="tipMessage.length > 0">
            <template #body>
                <UeElTipGroup :tips="tipMessage" />
            </template>
        </UeElSettingGroup>
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelBaseProps, UeElScrollEffectSettingPanelValue } from "./index";

import { useDefineObjectModel } from "@stone/uemo-editor-element/utils/model-mixin";

import { getEffectName } from "./utils/helper";
import ScrollRotateSetting from "./sub-components/ScrollRotateSetting.vue";
import ScrollTranslateSetting from "./sub-components/ScrollTranslateSetting.vue";
import ScrollScaleSetting from "./sub-components/ScrollScaleSetting.vue";
import ScrollStickySetting from "./sub-components/ScrollStickySetting.vue";
import ScrollFixedSetting from "./sub-components/ScrollFixedSetting.vue";
import ScrollParallaxSetting from "./sub-components/ScrollParallaxSetting.vue";
import ScrollOpacitySetting from "./sub-components/ScrollOpacitySetting.vue";
import ScrollImageParallaxSetting from "./sub-components/ScrollImageParallaxSetting.vue";

defineOptions({
    name: "UeElScrollEffectSettingPanel",
    components: {
        ScrollRotateSetting,
        ScrollTranslateSetting,
        ScrollScaleSetting,
        ScrollStickySetting,
        ScrollFixedSetting,
        ScrollParallaxSetting,
        ScrollOpacitySetting,
        ScrollImageParallaxSetting,
    },
});

const { t } = useI18n();
const props = withDefaults(defineProps<UeElScrollEffectSettingPanelBaseProps>(), {
    mode: "editor",
    isImage: false,
});
const valueRef = defineModel<UeElScrollEffectSettingPanelValue>("value", { required: true });

const optionsRef = useDefineObjectModel(valueRef, {
    get(modelValue) {
        return modelValue.options;
    },
    set(value, modelValue) {
        modelValue.options = value;
        return modelValue;
    },
});

const scrollEffectName = computed(() => {
    return getEffectName(valueRef.value.type) || t("SCROLL_EFFECT_SETTING_TITLE");
});

const controlComponent = computed(() => {
    const type = valueRef.value.type || "";

    if (type === "image-parallax") {
        return "ScrollImageParallaxSetting";
    }
    if (type === "parallax") {
        return "ScrollParallaxSetting";
    }
    if (type === "rotate") {
        return "ScrollRotateSetting";
    }
    if (type === "opacity") {
        return "ScrollOpacitySetting";
    }
    if (type === "fixed") {
        return "ScrollFixedSetting";
    }
    if (type === "sticky") {
        return "ScrollStickySetting";
    }
    if (type === "scale") {
        return "ScrollScaleSetting";
    }
    if (type === "translate") {
        return "ScrollTranslateSetting";
    }
    return "";
});

const tipMessage = computed<UE_EL_COMPONENT.UeElTipGroupProps["tips"]>(() => {
    const tips: string[] = [];
    if (props.mode !== "preview") return tips;

    tips.push(t("SCROLL_SETTING_TIP_1"));
    if (["rotate", "opacity", "scale", "translate"].includes(valueRef.value.type || "")) {
        tips.push(t("SCROLL_SETTING_TIP_2"));
    }
    return tips;
});
</script>
<style lang="scss" module>
.scroll-effect-setting-panel {
    //
}
</style>
