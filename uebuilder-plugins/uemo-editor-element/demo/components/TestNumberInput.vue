<!--
 * @Description: 测试数字输入框
 * @Author: F-Stone
 * @LastEditTime: 2025-02-28 01:49:20
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试数字输入框"
    >
        <UeElNumberInput v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeElNumberInput>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElNumberInputProps & { testOptionTitle?: string; value?: any })[] = [
    {
        value: "",
        required: false,
        placeholder: "请输入",
        limit: { px: [-200, 200], vw: [-50, 50] },
        units: [
            { text: "px", value: "px", default: 300 },
            { text: "vw", value: "vw", default: 100 },
        ],
        show: {
            input(value) {
                if (value.num === 0 || !value.num) {
                    return "auto";
                }
            },
            output(value) {
                if (value === "auto") {
                    return "";
                }
                return undefined;
            },
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
