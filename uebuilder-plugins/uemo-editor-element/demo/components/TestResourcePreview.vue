<!--
 * @Description: 测试资源文件预览组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 12:03:52
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试资源文件预览组件"
    >
        <UeElResourcePreview v-bind="testValue">
            <!--  -->
        </UeElResourcePreview>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElResourcePreviewProps & { testOptionTitle?: string })[] = [
    {
        testOptionTitle: "SVG",
        type: "svg",
        attrs: {
            source: "http://127.0.0.1:9005/uploads/1742234474622.svg",
            data: { w: 100, h: 100 },
        },
    },
    {
        testOptionTitle: "文字装饰",
        type: "textDecoration",
        attrs: "line-1",
    },
    {
        testOptionTitle: "按钮动效",
        type: "buttonHoverEffect",
        attrs: "shakeX",
    },
    {
        testOptionTitle: "分享图标",
        type: "shareIcon",
        attrs: "ue-share-call",
    },
    {
        testOptionTitle: "Lottie",
        type: "lottie",
        attrs: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles002.lottie",
    },
    {
        testOptionTitle: "图标",
        type: "icon",
        attrs: {
            name: "aiming",
            source: "https://static.jsmo.xin/uebuilder/public-resource/svg-icon/icon-park/base/base.js",
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
