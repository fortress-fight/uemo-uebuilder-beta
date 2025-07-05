<!--
 * @Description: 测试选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 16:37:44
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试选择器"
    >
        <UeElSelect v-model:value="testValue.value" title="测试选择器" :options="testValue.options" />
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElSelectProps & { value?: string })[] = [
    {
        value: "20",
        options: [
            { value: "1", text: "选项1" },
            { value: "2", text: "选项2" },
            { value: "3", text: "选项3" },
            { value: "4", text: "选项4" },
            { value: "5", text: "选项5" },
            { value: "6", text: "选项6" },
            { value: "7", text: "选项7" },
            { value: "8", text: "选项8" },
            { value: "9", text: "选项9" },
            { value: "10", text: "选项10" },
            { value: "11", text: "选项11" },
            { value: "12", text: "选项12" },
            { value: "13", text: "选项13" },
            { value: "14", text: "选项14" },
            { value: "15", text: "选项15" },
            { value: "16", text: "选项16" },
            { value: "17", text: "选项17" },
            { value: "18", text: "选项18" },
            { value: "19", text: "选项19" },
            { value: "20", text: "选项20" },
            { value: "21", text: "选项21" },
            { value: "22", text: "选项22" },
            { value: "23", text: "选项23" },
            { value: "24", text: "选项24" },
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
