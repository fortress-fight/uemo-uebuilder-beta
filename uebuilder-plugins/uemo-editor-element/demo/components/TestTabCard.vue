<!--
 * @Description: 测试Tab 卡片
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 01:21:09
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Tab 卡片"
    >
        <UeElTabCard v-bind="testValue">
            <template v-slot:Tab1>
                <div :class="$style['card-1']">Tab1</div>
            </template>
            <template v-slot:Tab2>
                <div :class="$style['card-2']">Tab2</div>
            </template>
            <template v-slot:Tab3>
                <div :class="$style['card-3']">Tab3</div>
            </template>
        </UeElTabCard>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElTabCardProps & { value?: any })[] = [
    {
        defaultCard: "Tab2",
        cards: [
            { title: "Tab 1", name: "Tab1" },
            { title: "Tab 2", name: "Tab2" },
            { title: "Tab 3", name: "Tab3" },
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
    .card-1 {
        height: 200px;

        background-color: #f5f5f5;
    }
    .card-2 {
        height: 100px;

        background-color: #ff7676;
    }
    .card-3 {
        height: 300px;

        background-color: #d5d5d5;
    }
}
</style>
