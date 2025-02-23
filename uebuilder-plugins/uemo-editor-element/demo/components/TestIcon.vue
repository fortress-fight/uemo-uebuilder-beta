<!--
 * @Description: 测试字体图标
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 23:33:27
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试字体图标"
    >
        <UeElIcon v-bind="testValue">
            <!--  -->
        </UeElIcon>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: UE_EL_COMPONENT.UeElIconProps[] = [{ name: "icon-editor-copy", size: 24 }];
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
