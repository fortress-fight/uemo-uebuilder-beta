<!--
 * @Description: 测试滚动效果控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 10:47:18
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试滚动效果控制器"
    >
        <UeElScrollEffectSettingPanel v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElScrollEffectSettingPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElScrollEffectSettingPanelProps & {
    testOptionTitle?: string;
    value: UeElScrollEffectSettingPanelValue;
})[] = [
    { testOptionTitle: "image-parallax", value: { type: "image-parallax", options: {} } },
    { testOptionTitle: "opacity", value: { type: "opacity", options: {} } },
    { testOptionTitle: "parallax", value: { type: "parallax", options: {} } },
    { testOptionTitle: "fixed", value: { type: "fixed", options: {} } },
    { testOptionTitle: "sticky", value: { type: "sticky", options: {} } },
    { testOptionTitle: "scale", value: { type: "scale", options: {} } },
    { testOptionTitle: "translate", value: { type: "translate", options: {} } },
    { testOptionTitle: "rotate", value: { type: "rotate", options: {} } },
];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
