<!--
 * @Description: 测试按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 17:39:14
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试按钮"
    >
        <UeElButton v-bind="testValue">
            <!--  -->
        </UeElButton>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: UE_EL_COMPONENT.UeElButtonProps[] = [
    { theme: "squareIcon", icon: "icon-tianjia" },
    { theme: "fillText", size: "large", text: "测试按钮" },
    { theme: "hoverStrokeText", size: "large", text: "测试按钮" },
    { theme: "strokeText", size: "large", text: "测试按钮" },
    { theme: "strokeText", size: "large", text: "测试按钮", loading: true },
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
