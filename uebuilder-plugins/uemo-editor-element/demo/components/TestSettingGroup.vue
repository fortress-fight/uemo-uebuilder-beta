<!--
 * @Description: 测试控制器组容器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-03 01:46:06
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试控制器组容器"
    >
        <UeElSettingGroup v-bind="testValue" @trigger="handleTrigger"></UeElSettingGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElSettingGroupProps & { testOptionTitle?: string; value?: any })[] = [
    {
        title: "测试折叠式编辑组",
        oper: [
            {
                id: "testValueSelect",
                type: "addSelect",
                param: {
                    options: [
                        { value: "1", text: "选项1" },
                        { value: "2", text: "选项2" },
                        { value: "3", text: "选项3" },
                    ],
                },
            },
        ],
    },
];
const testValue = ref(testValueList[testValueSelect.value]);

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});

const handleTrigger = (id: string, value: any) => {
    console.log("id", id, value);
};
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
