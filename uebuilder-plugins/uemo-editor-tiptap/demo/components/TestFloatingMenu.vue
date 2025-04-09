<!--
 * @Description: 测试浮动工具栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-09 10:59:43
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试浮动工具栏"
    >
        <UeTiptapFloatingMenu v-bind="testValue">
            <!--  -->
        </UeTiptapFloatingMenu>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapFloatingMenuProps & { testOptionTitle?: string; value?: any })[] = [
    { type: "floatingMenu", pluginKey: "testFloatingMenu" },
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
