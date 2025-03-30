<!--
 * @Description: 测试按钮样式设置控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 18:26:58
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试按钮样式设置控制器"
    >
        <UeElButtonStyleSetting
            v-bind="testValue"
            v-model:value="testValue.value"
            v-model:hoverState="testValue.hoverState"
        >
            <!--  -->
        </UeElButtonStyleSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElButtonStyleSettingProps & {
    testOptionTitle?: string;
    value?: any;
    hoverState?: boolean;
})[] = [{ value: { normal: {}, hover: {} }, hoverState: false }];
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
