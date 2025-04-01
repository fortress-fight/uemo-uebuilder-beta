<!--
 * @Description: 测试气泡工具栏控件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-02 03:35:22
-->
<template>
    <TestArea
        useEditor
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试气泡工具栏控件"
    >
        <template #default="{ editor }">
            <template v-if="editor">
                <UeTiptapBubbleMenu v-bind="testValue"> 工具栏 </UeTiptapBubbleMenu>
                <EditorContent :editor="editor" />
            </template>
        </template>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";
import { EditorContent } from "@tiptap/vue-3";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapBubbleMenuProps & { testOptionTitle?: string; value?: any })[] = [{}];
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
