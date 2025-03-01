<!--
 * @Description: 测试通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 23:14:44
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试通用编辑器容器"
    >
        <UeElEditorGroup v-bind="testValue">
            <!--  -->
        </UeElEditorGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElEditorGroupProps & { testOptionTitle?: string })[] = [
    { title: "测试通用编辑器容器" },
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
