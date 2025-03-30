<!--
 * @Description: 字体属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-26 01:52:18
-->
<template>
    <UeElSettingBar
        :title="t('UNIT_FONT_FAMILY')"
        :infoText="valueRef || t('FONT_LIBRARY_DEFAULT_FONT')"
        :disable="disable"
        :class="$style['font-family-setting']"
        @triggerSetting="openFontFamilySetting"
        ref="settingBarRef"
    />
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <UeElFontFamilyLibraryPanel v-model:select="valueRef" />
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import type { UeElFontFamilySettingBaseProps } from "./index";

import { usePopPanelParam } from "~/utils/pop-panel-mixin";
import UeElSettingBar from "../setting-bar";

const { t } = useI18n();
defineOptions({ name: "UeElFontFamilySetting" });

const _prop = withDefaults(defineProps<UeElFontFamilySettingBaseProps>(), {});
const settingBarRef = useTemplateRef<InstanceType<typeof UeElSettingBar>>("settingBarRef");

const valueRef = defineModel<string>("value", { required: false, default: "" });

const popPanelOpen = ref(false);
function openFontFamilySetting(): void {
    popPanelOpen.value = true;
}

/**
 * 弹窗位置配置
 */
const popPanelParams = usePopPanelParam(computed(() => settingBarRef.value?.$el));
</script>
<style lang="scss" module>
.font-family-setting {
    width: 100%;
}
</style>
