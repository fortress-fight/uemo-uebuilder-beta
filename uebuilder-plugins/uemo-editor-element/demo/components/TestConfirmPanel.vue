<!--
 * @Description: 测试确认面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 00:54:13
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试确认面板"
    >
        <UeElConfirmPanel v-bind="testValue">
            <!--  -->
        </UeElConfirmPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElConfirmPanelProps & { testOptionTitle?: string })[] = [
    { title: "是否删除当前模块", desc: "删除后将无法恢复，请谨慎操作。" },
    {
        title: "删除确认",
        desc: "删除后数据将无法恢复！",
        footerBtn: { text: "删除", theme: "red" },
    },
    {
        title: "删除确认",
        descHTML: "<p style='padding: 20px; 0'>删除后数据将无法恢复！</p>",
        footerBtn: { text: "删除", theme: "red" },
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
