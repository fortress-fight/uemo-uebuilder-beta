<!--
 * @Description: 测试间隔设置
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 02:35:29
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试间隔设置"
    >
        <UeElGapSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElGapSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElGapSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: "10px 20px", dir: "xy" },
    { value: "10px", dir: "x" },
    { value: "20px", dir: "y" },
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
