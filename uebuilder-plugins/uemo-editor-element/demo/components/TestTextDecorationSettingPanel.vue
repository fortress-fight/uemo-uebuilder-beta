<!--
 * @Description: 测试文字装饰效果控制组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 17:11:05
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试文字装饰效果控制组件"
    >
        <UeElTextDecorationSettingPanel v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElTextDecorationSettingPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElTextDecorationSettingPanelProps & {
    testOptionTitle?: string;
    value?: any;
})[] = [{ value: {} }];
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
