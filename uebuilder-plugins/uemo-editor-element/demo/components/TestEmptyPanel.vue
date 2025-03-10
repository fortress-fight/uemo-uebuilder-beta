<!--
 * @Description: 测试空内容面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 11:03:28
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试空内容面板"
    >
        <UeElEmptyPanel v-bind="testValue">
            <!--  -->
        </UeElEmptyPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElEmptyPanelProps & { testOptionTitle?: string; value?: any })[] = [
    {
        description: "测试空内容面板",
    },
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
