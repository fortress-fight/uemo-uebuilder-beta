<!--
 * @Description: 测试按钮样式属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-22 01:40:27
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试按钮样式属性控制器"
    >
        <UeElButtonStyleSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElButtonStyleSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElButtonStyleSettingProps & { testOptionTitle?: string; value?: any })[] = [
    { testOptionTitle: "默认", value: {} },
    { testOptionTitle: "hover", mode: "hover", value: {} },
    { testOptionTitle: "outline", theme: "outline-1", value: {} },
    { testOptionTitle: "rotate", theme: "rotate-1", mode: "hover", value: {} },
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
