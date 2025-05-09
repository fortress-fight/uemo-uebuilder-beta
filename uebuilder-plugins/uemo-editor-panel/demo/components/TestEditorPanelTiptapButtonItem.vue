<!--
 * @Description: 测试Tiptap 按钮编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-05-09 18:02:17
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试 Tiptap 按钮编辑面板"
    >
        <UeEditorPanelTiptapButtonItem v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapButtonItem>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapButtonItemProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.ButtonItem["attrs"];
})[] = [
    {
        value: {
            text: "按钮",

            link: "",
            linkTarget: "_blank",
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
