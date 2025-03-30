<!--
 * @Description: 测试拖拽组件
 * @Author: F-Stone
 * @LastEditTime: 2025-03-25 00:08:27
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试拖拽组件"
    >
        <UeElDraggable v-bind="testValue" v-model:value="testValue.value">
            <div v-for="item in testValue.value" :class="$style['draggable-item']" :key="item.id">
                {{ item.name }}
            </div>
        </UeElDraggable>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElDraggableProps & { testOptionTitle?: string; value?: any })[] = [
    {
        value: [
            { name: "Joao", id: 1 },
            { name: "Jean", id: 2 },
            { name: "Johanna", id: 3 },
            { name: "Juan", id: 4 },
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
    .draggable-item {
        line-height: 30px;

        width: 300px;
    }
}
</style>
