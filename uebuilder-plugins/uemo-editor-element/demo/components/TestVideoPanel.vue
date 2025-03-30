<!--
 * @Description: 测试视频面板
 * @Author: F-Stone
 * @LastEditTime: 2025-02-25 02:01:54
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试视频面板"
    >
        <UeElVideoPanel v-bind="testValue">
            <!--  -->
        </UeElVideoPanel>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EL_COMPONENT.UeElVideoPanelProps & { testOptionTitle?: string })[] = [
    {
        poster: process.env.PUBLIC_PATH + "media/video-poster.jpg",
        src: process.env.PUBLIC_PATH + "media/video.mp4",
        autoplay: false,
        loop: false,
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
