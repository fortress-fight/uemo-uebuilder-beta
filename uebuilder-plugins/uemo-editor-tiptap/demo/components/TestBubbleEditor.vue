<!--
 * @Description: 测试气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-04-01 00:48:09
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试气泡模式编辑器"
    >
        <UeTiptapBubbleEditor v-bind="testValue">
            <!--  -->
        </UeTiptapBubbleEditor>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";
import { testTextContent } from "~/demo/data/test-content";
// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapBubbleEditorProps & { testOptionTitle?: string })[] = [
    {
        testOptionTitle: "默认",
        content: testTextContent.data,
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
