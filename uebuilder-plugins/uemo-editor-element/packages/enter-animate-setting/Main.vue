<!--
 * @Description: 入场效果控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 15:55:45
-->
<template>
    <UeElSelect
        v-model:value="enterValue"
        :title="t('ENTER_ANIMATION_TITLE')"
        :options="ENTER_ANIMATION_OPTIONS"
        :data-disable="disable"
        :class="$style['enter-animate-setting']"
    />
</template>
<script lang="ts" setup>
import type { UeElEnterAnimateSettingBaseProps } from "./index";

defineOptions({ name: "UeElEnterAnimateSetting" });
const prop = withDefaults(defineProps<UeElEnterAnimateSettingBaseProps>(), {
    disable: false,
});

const valueRef = defineModel<string>("value", { required: true, default: "" });

const { t } = useI18n();

const ENTER_ANIMATION_OPTIONS = computed(() => {
    return [
        { text: t("ENTER_ANIMATION_NONE"), value: "" },
        { text: t("ENTER_ANIMATION_FADE_IN_UP"), value: "fadeInUp" },
        { text: t("ENTER_ANIMATION_FADE_IN_LEFT"), value: "fadeInLeft" },
        { text: t("ENTER_ANIMATION_FADE_IN_RIGHT"), value: "fadeInRight" },
        { text: t("ENTER_ANIMATION_ZOOM_IN"), value: "zoomIn" },
        { text: t("ENTER_ANIMATION_FADE_IN"), value: "fadeIn" },
        { text: t("ENTER_ANIMATION_ROTATE_IN_UP_RIGHT"), value: "rotateInUpRight" },
        { text: t("ENTER_ANIMATION_ROTATE_IN_UP_LEFT"), value: "rotateInUpLeft" },
        { text: t("ENTER_ANIMATION_ZOOM_IN_UP"), value: "zoomInUp" },
        { text: t("ENTER_ANIMATION_ZOOM_IN_DOWN"), value: "zoomInDown" },
    ];
});

const enterValue = computed({
    get() {
        return valueRef.value;
    },
    set(v) {
        if (prop.disable) return;
        valueRef.value = v;
    },
});
</script>
<style lang="scss" module>
.enter-animate-setting {
    width: 100%;
    &[data-disable="true"] {
        pointer-events: none;

        opacity: 0.5;
    }
}
</style>
