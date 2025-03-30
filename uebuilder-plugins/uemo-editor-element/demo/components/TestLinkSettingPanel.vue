<!--
 * @Description: 测试链接属性控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-23 17:06:23
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试链接属性控制器"
    >
        <UeElLinkSettingPanel v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElLinkSettingPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import type { UeElLinkSettingPanelValue } from "~/packages/link-setting-panel";
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElLinkSettingProps & {
    testOptionTitle?: string;
    value: UeElLinkSettingPanelValue;
})[] = [
    {
        testOptionTitle: "网址链接",
        enableTriggerArea: true,
        value: { type: "link", link: "https://www.baidu.com", target: "_blank" },
    },
    {
        testOptionTitle: "下载链接",
        value: { type: "function", detail: "download", link: "https://192.168.5.6:9008/#/editor-panel.pdf" },
    },
    { testOptionTitle: "锚点链接", value: { type: "function", detail: "anchor", link: "#asdf" } },
    { testOptionTitle: "弹窗链接", value: { type: "frame", link: "https://www.baidu.com", popLayer: {} } },
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
