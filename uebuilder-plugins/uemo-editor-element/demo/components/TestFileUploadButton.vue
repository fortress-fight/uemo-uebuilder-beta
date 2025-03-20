<!--
 * @Description: 测试图片上传按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 02:45:25
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试文件上传按钮"
    >
        <UeElFileUploadButton v-bind="testValue" @submit="handleSubmit">
            <!--  -->
        </UeElFileUploadButton>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElFileUploadButtonProps & { testOptionTitle?: string; value: any })[] = [
    { testOptionTitle: "图片上传", type: "image", value: "" },
    { testOptionTitle: "SVG 上传", type: "svg", value: "" },
];
const testValue = ref(testValueList[testValueSelect.value]);

function handleSubmit(value: UE_EL_UTIL.FileUploadInfo) {
    testValue.value.value = value.url;
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
