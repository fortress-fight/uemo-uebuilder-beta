<!--
 * @Description: 测试计数器预览面板
 * @Author: F-Stone
 * @LastEditTime: 2025-07-07 01:48:53
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        layout="layout2"
        title="测试计数器预览面板"
    >
        <UeElCounterNumberPreviewPanel v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElCounterNumberPreviewPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElCounterNumberPreviewPanelProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.CounterNumber["attrs"];
})[] = [
    {
        value: {
            gap: "1em",
            theme: "NO02",
            effect: "normal",
            duration: "2.4",
            align: "center",
            fontSize: "60px",
            textColor: "#333",
            fill: false,
            extStyle: {
                "--counter-number-proxy-zoom": "0.3",
                "--counter-number-proxy-translate": "-1em",
                "--counter-number-proxy-pos": "flex-end",
            },
            body: [
                { id: "i-1", numList: [100, 200], proxy: { type: "text", value: "个" } },
                { id: "i-2", numList: [100, 200], proxy: { type: "text", value: "个" } },
                { id: "i-3", numList: [100, 200], proxy: { type: "text", value: "个" } },
            ],
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
