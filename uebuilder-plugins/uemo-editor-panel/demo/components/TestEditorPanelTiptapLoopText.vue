<!--
 * @Description: 测试Tiptap循环文字编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-09 17:59:38
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Tiptap循环文字编辑面板"
    >
        <UeEditorPanelTiptapLoopText v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapLoopText>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapLoopTextProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.LoopText["attrs"];
})[] = [
    {
        value: {
            effect: "normal",
            body: [{ id: "1", title: "1" }],
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
