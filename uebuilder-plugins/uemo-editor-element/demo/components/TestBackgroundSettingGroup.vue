<!--
 * @Description: 测试背景属性控制组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-26 02:19:03
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试背景属性控制组"
    >
        <UeElBackgroundSettingGroup v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElBackgroundSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBackgroundSettingGroupProps & { testOptionTitle?: string; value?: any })[] = [
    {
        value: [
            {
                id: "rbsgl",
                type: "color",
                value: {
                    color: "rgb(195, 56, 56)",
                    opacity: 1,
                },
            },
            {
                id: "mvprh",
                type: "image",
                value: {
                    image: "https://static.jsmo.xin/uebuilder/public-resource/images/base-image.jpg",
                    size: "cover",
                    align: "right top",
                },
            },
            {
                id: "xwvhq",
                type: "shape",
                value: {
                    name: "shape-bg-4",
                    color: "rgb(199, 66, 66)",
                },
            },
            {
                id: "hnkjz",
                type: "video",
                value: {
                    video: "https://static.jsmo.xin/static/video/background001.mp4",
                },
            },
            {
                id: "zafpv",
                type: "spline",
                value: {
                    url: "https://static.jsmo.xin/uebuilder/public-resource/spline/beijing/spline001.splinecode",
                },
            },
            {
                id: "dwbkg",
                type: "blur",
                value: {
                    color: "rgba(255,255,255,0.1)",
                    blur: "50px",
                },
            },
            {
                id: "xndge",
                type: "svg",
                value: {
                    url: "https://static.jsmo.xin/uebuilder/public-resource/svg-bg/svg-bg-default.svg",
                    natureWidth: 580,
                    natureHeight: 580,
                },
            },
        ],
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
