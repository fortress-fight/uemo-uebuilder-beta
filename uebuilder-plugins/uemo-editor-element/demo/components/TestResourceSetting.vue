<!--
 * @Description: 测试资源设置组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-18 11:08:16
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试资源设置组件"
    >
        <UeElResourceSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElResourceSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElResourceSettingProps & { testOptionTitle?: string; value?: any })[] = [
    {
        testOptionTitle: "SVG",
        type: "svg",
        // value: {
        //     data: { w: 48, h: 48 },
        //     source: "http://127.0.0.1:9005/uploads/1742267184181.svg",
        // },
    },
    { testOptionTitle: "社交分享", type: "shareIcon" },
    { testOptionTitle: "文字装饰", type: "textDecoration" },
    { testOptionTitle: "Lottie", type: "lottie" },
    { testOptionTitle: "图标", type: "icon" },
    { testOptionTitle: "按钮 hover 动效", type: "buttonHoverEffect" },
    { testOptionTitle: "图片", type: "image" },
    { testOptionTitle: "Spline", type: "spline" },
    { testOptionTitle: "视频", type: "video" },
    { testOptionTitle: "按钮", type: "button" },
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
