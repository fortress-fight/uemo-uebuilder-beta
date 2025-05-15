<!--
 * @Description: 测试Tiptap 图片编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-15 10:45:05
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Tiptap 图片编辑面板"
    >
        <UeEditorPanelTiptapImage v-bind="testValue">
            <!--  -->
        </UeEditorPanelTiptapImage>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapImageProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.Image["attrs"];
})[] = [{ value: { src: "" } }];
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
