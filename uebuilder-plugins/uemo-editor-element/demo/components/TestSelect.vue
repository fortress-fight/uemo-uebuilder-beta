<!--
 * @Description: 测试选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 23:33:22
-->
<template>
    <TestArea
        :class="$style['test-area']"
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
        value: "1",
        options: [
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
