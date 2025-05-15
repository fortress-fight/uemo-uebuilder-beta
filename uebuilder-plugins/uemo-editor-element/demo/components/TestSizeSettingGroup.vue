<!--
 * @Description: 测试尺寸调节组
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 15:27:43
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试尺寸调节组"
    >
        <UeElSizeSettingGroup v-bind="testValue" v-model:value="testValue.value" />
    </TestArea>
</template>
<script lang="ts" setup>
import type { UeElSizeSettingGroupValue } from "../../packages/size-setting-group/index";

import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElSizeSettingGroupProps & {
    testOptionTitle?: string;
    value?: UeElSizeSettingGroupValue;
})[] = [{ value: undefined }];
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
