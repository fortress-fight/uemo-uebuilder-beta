<!--
 * @Description: 测试气泡工具栏控件
 * @Author: F-Stone
 * @LastEditTime: 2025-04-05 02:38:26
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
                <UeTiptapBubbleMenu>
                    <UeTiptapEditorMenu />
                </UeTiptapBubbleMenu>
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
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapBubbleMenuProps & {
    testOptionTitle?: string;
})[] = [{ testOptionTitle: "测试基础工具栏" }];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});
</script>
<style lang="scss" module>
.tippy-box {
    font-size: 12px;
    line-height: 1.4;

    white-space: nowrap;

    border-radius: 5px;
    background: #{var-color(#f2f2f2)};
    box-shadow: 0 5px 10px rgb(0 0 0 / 0.1);
    .tippy-content {
        padding: 3px 7px 2px;
    }
}
</style>
