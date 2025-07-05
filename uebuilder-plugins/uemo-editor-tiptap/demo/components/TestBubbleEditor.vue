<!--
 * @Description: 测试气泡模式编辑器
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 15:37:46
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="previewData"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试气泡模式编辑器"
    >
        <UeTiptapBubbleEditor
            :class="$style['bubble-editor']"
            v-bind="testValue"
            @update="handleUpdate"
            @ready="handleUpdate"
        >
            <!--  -->
        </UeTiptapBubbleEditor>
    </TestArea>
</template>
<script lang="ts" setup>
import type { Editor } from "@tiptap/vue-3";

import TestArea from "~/demo/components/TestArea.vue";
import { testTextContent } from "~/demo/data/test-content";
// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_TIPTAP_COMPONENT.UeTiptapBubbleEditorProps & { testOptionTitle?: string })[] = [
    {
        testOptionTitle: "特效文本",
        content: testTextContent.effectTextData,
    },
    {
        testOptionTitle: "表格",
        content: testTextContent.tableData,
    },
    {
        testOptionTitle: "分享",
        content: testTextContent.shareRowData,
    },
    {
        testOptionTitle: "分割线",
        content: testTextContent.hrRuleData,
    },
    {
        testOptionTitle: "分割块",
        content: testTextContent.divideBlockData,
    },
    {
        testOptionTitle: "网格",
        content: testTextContent.gridGroupData,
    },
    {
        testOptionTitle: "Lottie",
        content: testTextContent.lottieData,
    },
    {
        testOptionTitle: "Spline",
        content: testTextContent.splineData,
    },
    {
        testOptionTitle: "SVG",
        content: testTextContent.svgViewData,
    },
    {
        testOptionTitle: "视频",
        content: testTextContent.videoFrameData,
    },
    {
        testOptionTitle: "默认",
        content: testTextContent.data,
    },
    {
        testOptionTitle: "按钮",
        content: testTextContent.buttonData,
    },
    {
        testOptionTitle: "链接",
        content: testTextContent.linkData,
    },
    {
        testOptionTitle: "图片",
        content: testTextContent.imageData,
    },
    {
        testOptionTitle: "图标",
        content: testTextContent.svgIconData,
    },
];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});

const previewData = ref<{
    html: string;
    json: ReturnType<Editor["getJSON"]>;
}>({
    html: "",
    json: {},
});

function handleUpdate(editor: Editor) {
    if (!editor) return;
    previewData.value.html = editor.getHTML();
    previewData.value.json = editor.getJSON();
}
</script>
<style lang="scss" module>
.test-area {
    .bubble-editor {
        width: 500px;
    }
}
</style>
