<!--
 * @Description: 测试特效文字的编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 18:03:39
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试特效文字的编辑面板"
    >
        <UeEditorPanelTiptapEffectText v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapEffectText>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapEffectTextProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.EffectText["attrs"];
})[] = [
    {
        value: {
            content: "特效文字",

            width: "",
            fontStyle: "",
            fontFamily: "",
            fontSize: "",
            fontWeight: false,
            textColor: "",
            lineHeight: "",
            align: "",
            moAlign: "",

            scrollEffect: null,
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
