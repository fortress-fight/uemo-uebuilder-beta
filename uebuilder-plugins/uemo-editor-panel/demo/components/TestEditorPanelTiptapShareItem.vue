<!--
 * @Description: 测试社交分享项编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-03 02:41:21
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试社交分享项编辑面板"
    >
        <UeEditorPanelTiptapShareItem v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapShareItem>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapShareItemProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.ShareItem["attrs"];
})[] = [
    {
        value: {
            icon: "",
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
