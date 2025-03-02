<!--
 * @Description: 测试边框控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 00:31:33
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试边框控制器"
    >
        <UeElBorderSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElBorderSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBorderSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: { color: "#000000", width: "1px", style: "solid" } },
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
