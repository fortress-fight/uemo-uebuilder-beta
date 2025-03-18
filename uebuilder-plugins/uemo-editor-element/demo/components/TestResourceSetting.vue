<!--
 * @Description: 测试资源设置组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 01:52:12
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试资源设置组件"
    >
        <UeElResourceSetting v-bind="testValue" v-model:value="testValue.value" @trigger="handleTrigger">
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
        testOptionTitle: "图片",
        type: "image",
        enhance: { focus: { enable: true, pos: "0% 0%" } },
        value: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixid=M3wxNzk2NDF8MHwxfHNlYXJjaHwxfHxXYWxscGFwZXJ8emgtSGFuc3wxfHx8fDE3NDIxODQzMzN8MA&ixlib=rb-4.0.3&w=1200",
    },
    { testOptionTitle: "图片", type: "image" },
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
    { testOptionTitle: "Spline", type: "spline" },
    { testOptionTitle: "视频", type: "video" },
    { testOptionTitle: "按钮", type: "button" },
];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});

function handleTrigger(params: { type: "focus"; data: { pos: string } }): void {
    if (testValue.value.enhance?.focus.enable) {
        testValue.value.enhance.focus.pos = params.data.pos;
    }
}
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
