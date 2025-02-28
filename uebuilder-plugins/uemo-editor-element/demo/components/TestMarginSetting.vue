<!--
 * @Description: 测试外间距控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:43:07
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试外间距控制器"
    >
        <UeElMarginSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElMarginSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElMarginSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "10px", type: "xy" },
    { value: "10px 20px 30px 40px", type: "xy" },
    { value: "10px 0", type: "y" },
    { value: "0 10px", type: "x" },
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
