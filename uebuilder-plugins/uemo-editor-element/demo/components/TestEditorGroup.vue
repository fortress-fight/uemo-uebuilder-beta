<!--
 * @Description: 测试通用编辑器容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-02 19:08:57
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
            <UeElControlGroup operType="none">
                <UeElSelect v-model:value="testSelect.value" title="测试选择器" :options="testSelect.options" />
            </UeElControlGroup>
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

const testSelect = ref({
    value: "1",
    options: [
        { value: "1", text: "选项1" },
        { value: "2", text: "选项2" },
        { value: "3", text: "选项3" },
    ],
});

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
