<!--
 * @Description: 测试选项面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 00:41:29
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试选项面板"
    >
        <UeElSelectOption v-bind="testValue">
            <!--  -->
        </UeElSelectOption>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElSelectOptionProps & { value?: string })[] = [
    {
        value: "1",
        hideIcon: true,
        list: [
            { value: "1", text: "选项1" },
            { value: "2", text: "选项2" },
            { value: "3", text: "选项3" },
        ],
    },
    {
        value: "1",
        list: [
            { value: "1", text: "选项1" },
            { value: "2", text: "选项2" },
            { value: "3", text: "选项3" },
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
