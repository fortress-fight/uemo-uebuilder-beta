<!--
 * @Description: 测试Emoji 库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-10 10:38:16
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试Emoji 库面板"
    >
        <UeElEmojiLibraryPanel v-bind="testValue" v-model:select="testValue.select">
            <!--  -->
        </UeElEmojiLibraryPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElEmojiLibraryPanelProps & { testOptionTitle?: string; select?: string })[] = [
    { testOptionTitle: "默认", select: "", query: "" },
    { testOptionTitle: "测试搜索", select: "", query: "dog" },
    { testOptionTitle: "测试空面板", select: "", query: "asdfasasdfasdfasdfdfasdfasdasdf" },
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
