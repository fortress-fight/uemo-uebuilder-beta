<!--
 * @Description: 测试比例调节组
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 14:53:03
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试比例调节组"
    >
        <UeElRatioSettingGroup v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElRatioSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElRatioSettingGroupProps & {
    testOptionTitle?: string;
    value: string | undefined;
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
