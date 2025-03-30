<!--
 * @Description: 测试控件组
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 02:31:06
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试控件组"
    >
        <UeElControlGroup v-bind="testValue" @onOffChange="onOffChange">
            <UeElSelect v-model="selectTestData.value" title="测试选择器" :options="selectTestData.options" />
        </UeElControlGroup>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElControlGroupProps & { testOptionTitle?: string; value?: any })[] = [
    {
        operType: "onOff",
        onOffParam: {
            value: "开",
            disable: false,
            reverseStyle: false,
            label: "测试开关",
            activeValue: "开",
            inactiveValue: "关",
            icon: { name: "icon-gaodu", size: 15 },
            activeIcon: { name: "icon-gaodu", size: 15 },
        },
    },
];
const testValue = ref(testValueList[testValueSelect.value]);

const selectTestData = ref({
    value: "1",
    options: [
        { value: "1", text: "选项1" },
        { value: "2", text: "选项2" },
        { value: "3", text: "选项3" },
    ],
});

function onOffChange($event: UE_EL_UTIL.OnOffValue) {
    if (testValue.value.onOffParam) {
        testValue.value.onOffParam.value = $event;
    }
}

watch(testValueSelect, (newValue) => {
    testValue.value = testValueList[newValue];
});
</script>
<style lang="scss" module>
.test-area {
    // init
}
</style>
