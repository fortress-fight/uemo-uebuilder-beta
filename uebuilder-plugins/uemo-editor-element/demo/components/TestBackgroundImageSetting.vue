<!--
 * @Description: 测试背景图片控制器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-21 02:22:28
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试背景图片控制器"
    >
        <UeElBackgroundImageSetting v-bind="testValue">
            <!--  -->
        </UeElBackgroundImageSetting>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElBackgroundImageSettingProps & { testOptionTitle?: string; value?: any })[] = [
    {
        value: {
            image: "https://static.jsmo.xin/uebuilder/public-resource/images/base-image.jpg",
        },
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
