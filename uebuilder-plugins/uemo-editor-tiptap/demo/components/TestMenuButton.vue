<!--
 * @Description: 测试菜单按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-04-02 21:40:00
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试菜单按钮"
    >
        <UeTiptapMenuButton v-bind="testValue">
            <!--  -->
        </UeTiptapMenuButton>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapMenuButtonProps & { testOptionTitle?: string; value?: any })[] = [
    { type: "bold", currentValue: "测试按钮" },
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
