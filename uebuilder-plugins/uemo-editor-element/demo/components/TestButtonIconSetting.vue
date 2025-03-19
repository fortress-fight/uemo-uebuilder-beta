<!--
 * @Description: 测试按钮图标属性控制
 * @Author: F-Stone
 * @LastEditTime: 2025-03-19 12:11:31
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试按钮图标属性控制"
    >
        <UeElButtonIconSetting v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElButtonIconSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElButtonIconSettingProps & { testOptionTitle?: string; value?: any })[] = [
    {
        testOptionTitle: "空值",
        value: undefined,
    },
    {
        testOptionTitle: "静态图标",
        value: {
            source: "https://static.jsmo.xin/uebuilder/public-resource/svg-icon/icon-park/base/base.js",
            name: "loading",
        },
    },
    {
        testOptionTitle: "动态图标",
        value: {
            source: "https://static.jsmo.xin/uebuilder/public-resource/lottie/lottiefiles003.lottie",
        },
    },
    {
        testOptionTitle: "SVG图标",
        value: {
            source: "http://127.0.0.1:9005/uploads/1742357457624.svg",
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
