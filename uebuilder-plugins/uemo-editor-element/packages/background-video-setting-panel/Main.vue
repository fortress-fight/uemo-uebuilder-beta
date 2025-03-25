<!--
 * @Description: 背景视频控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-26 03:13:07
-->
<template>
    <UeElEditorPanel
        :class="$style['background-video-setting-panel']"
        :title="t('BACKGROUND_SPLINE_SETTING_TITLE', { type: t('UNIT_VIDEO') })"
    >
        <!-- 视频资源设置 -->
        <UeElSettingGroup is-first>
            <template #body>
                <UeElResourceSetting type="video" :removable="false" v-model:value="videoSource" />
            </template>
        </UeElSettingGroup>

        <!-- 滚动效果设置 -->
        <UeElScrollEffectSettingGroup v-model:value="scrollEffect" />
    </UeElEditorPanel>
</template>
<script lang="ts" setup>
import type { UeElBackgroundVideoSettingPanelBaseProps, UeElBackgroundVideoSettingPanelValue } from "./index";

const { t } = useI18n();

defineOptions({ name: "UeElBackgroundVideoSettingPanel" });
const _props = withDefaults(defineProps<UeElBackgroundVideoSettingPanelBaseProps>(), {});

const valueRef = defineModel<UeElBackgroundVideoSettingPanelValue>("value", { required: true });

const videoSource = computed({
    get() {
        return valueRef.value.video;
    },
    set(value) {
        valueRef.value = { ...valueRef.value, video: value };
    },
});

const scrollEffect = computed({
    get() {
        return valueRef.value.scrollEffect;
    },
    set(value) {
        valueRef.value = { ...valueRef.value, scrollEffect: value };
    },
});
</script>
<style lang="scss" module>
.background-video-setting-panel {
    //
}
</style>
