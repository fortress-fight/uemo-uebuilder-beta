<!--
 * @Description: 测试循环文字预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-10 10:46:28
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        layout="layout2"
        title="测试循环文字预览面板"
    >
        <UeElLoopTextPreviewPanel v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElLoopTextPreviewPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElLoopTextPreviewPanelProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.LoopText["attrs"];
})[] = [
    {
        value: {
            theme: "NO01",
            effect: "normal",
            textColor: "#333",
            fontSize: "60px",
            body: [
                { id: "i-1", title: "网页设计" },
                { id: "i-2", title: "网页制作" },
                { id: "i-3", title: "网页发布" },
            ],
        },
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
