<!--
 * @Description: 日期控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 19:07:36
-->
<template>
    <UeElSettingBar
        ref="rootDom"
        :title="t('CALENDER_SETTING_TITLE')"
        :class="$style['calender-setting']"
        :placeholder="t('CALENDER_SETTING_PLACEHOLDER')"
        class="w-full"
        :infoText="infoText"
        @triggerSetting="pickerPanelOpen = true"
    >
        <UeElPopPanel v-model:open="pickerPanelOpen" :panel="popPanelParams">
            <UeElCalenderPicker v-model:value="useDate" />
        </UeElPopPanel>
    </UeElSettingBar>
</template>
<script lang="ts" setup>
import type { UeElCalenderSettingBaseProps } from "./index";
import type { UeElSettingBarInstance } from "../setting-bar";

import * as dateFns from "@stone/uemo-editor-utils/lib/date-fns";

const { t } = useI18n();

defineOptions({ name: "UeElCalenderSetting" });

const _prop = withDefaults(defineProps<UeElCalenderSettingBaseProps>(), {});
const valueRef = defineModel<number | undefined>("value", { required: false, default: undefined });

const rootDomRef = useTemplateRef<UeElSettingBarInstance>("rootDom");

const date = computed({
    get: () => valueRef.value,
    set: (value) => (valueRef.value = value),
});

const infoText = computed(() => {
    if (!date.value) return undefined;
    return dateFns.format(new Date(date.value), "yyyy-MM-dd");
});

const pickerPanelOpen = ref(false);

/**
 * 计算弹出面板的参数
 * @returns {UE_EL_COMPONENT.UeElPopPanelProps["panel"]} 弹出面板参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps["panel"]>(() => {
    const domRef = rootDomRef.value;

    if (!domRef) return;

    return {
        position: {
            refEl: domRef.$el as HTMLElement,
            options: {
                placement: "left-start",
                middleware: [
                    ["flip", { crossAxis: false }],
                    ["offset", { mainAxis: 20 }],
                    ["shift", { crossAxis: true, padding: 17 }],
                ],
            },
        },
    };
});

const useDate = computed({
    get: () => (date.value ? new Date(date.value) : new Date()),
    set: (value) => (date.value = value.getTime()),
});
</script>
<style lang="scss" module>
.calender-setting {
    //
}
</style>
