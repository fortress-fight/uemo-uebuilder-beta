<!--
 * @Description: 测试Mini 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-27 03:00:14
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        layout="layout2"
        title="测试Mini 编辑面板"
    >
        <UeElMiniEditorPanel v-bind="testValue" v-model:value="testValue.value">
            <template #preview></template>
            <template #editor="{ className, value, updateCloneValue }">
                <UeElScrollEffectSettingPanel
                    v-if="value"
                    :value="value"
                    :class="className"
                    @update:value="updateCloneValue"
                />
            </template>
        </UeElMiniEditorPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import type { UeElScrollEffectSettingPanelValue } from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

import TestArea from "~/demo/components/TestArea.vue";
import UeElScrollEffectSettingPanel from "@stone/uemo-editor-element/packages/scroll-effect-setting-panel";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElMiniEditorPanelProps & {
    testOptionTitle?: string;
    value?: UeElScrollEffectSettingPanelValue;
})[] = [{ value: { type: "image-parallax", options: {} } }];
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
