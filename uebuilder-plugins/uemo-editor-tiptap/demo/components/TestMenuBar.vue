<!--
 * @Description: 测试菜单栏
 * @Author: F-Stone
 * @LastEditTime: 2025-04-03 00:02:01
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试菜单栏"
    >
        <UeTiptapMenuBar v-bind="testValue">
            <UeTiptapMenuButton type="bold" />
        </UeTiptapMenuBar>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapMenuBarProps & { testOptionTitle?: string; value?: any })[] = [
    { title: "测试标题" },
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
