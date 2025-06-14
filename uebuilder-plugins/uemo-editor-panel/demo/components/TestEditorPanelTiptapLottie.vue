<!--
 * @Description: 测试Tiptap Lottie 操作面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-14 14:35:21
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Tiptap Lottie 操作面板"
    >
        <UeEditorPanelTiptapLottie v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapLottie>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapLottieProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.Lottie["attrs"];
})[] = [
    {
        value: {
            url: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles001.lottie",
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
