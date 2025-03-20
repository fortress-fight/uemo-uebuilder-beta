<!--
 * @Description: 测试spline背景设置控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 00:51:06
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试spline背景设置控制组件"
    >
        <UeElBackgroundSplineSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElBackgroundSplineSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBackgroundSplineSettingProps & { testOptionTitle?: string; value?: any })[] =
    [{}];
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
