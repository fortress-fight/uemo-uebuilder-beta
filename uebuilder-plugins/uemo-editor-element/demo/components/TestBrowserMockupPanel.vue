<!--
 * @Description: 测试模拟浏览器窗口样式
 * @Author: F-Stone
 * @LastEditTime: 2025-03-27 11:39:48
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试模拟浏览器窗口样式"
    >
        <UeElBrowserMockupPanel v-bind="testValue">
            <!--  -->
        </UeElBrowserMockupPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBrowserMockupPanelProps & { testOptionTitle?: string; value?: any })[] = [
    { title: "效果模拟" },
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
