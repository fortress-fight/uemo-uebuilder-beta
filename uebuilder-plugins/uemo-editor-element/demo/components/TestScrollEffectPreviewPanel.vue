<!--
 * @Description: 测试滚动效果预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 13:30:34
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        layout="layout2"
        title="测试滚动效果预览面板"
    >
        <UeElScrollEffectPreviewPanel v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElScrollEffectPreviewPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElScrollEffectPreviewPanelProps & {
    testOptionTitle?: string;
    value: UeElScrollEffectSettingPanelValue;
})[] = [{ value: { type: "opacity", options: {} } }];
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
