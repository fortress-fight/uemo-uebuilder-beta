<!--
 * @Description: 测试背景图形控制器组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 01:21:41
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试背景图形控制器组件"
    >
        <UeElBackgroundShapeSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElBackgroundShapeSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBackgroundShapeSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { value: { name: "shape-bg-2", mirroring: false } },
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
