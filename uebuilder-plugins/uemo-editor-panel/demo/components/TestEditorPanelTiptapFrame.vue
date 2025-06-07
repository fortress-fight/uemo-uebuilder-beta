<!--
 * @Description: 测试Frame 编辑面板
 * @Author: F-Stone
 * @LastEditTime: 2025-06-07 18:07:59
-->
<template>
    <TestArea
        :class="$style['test-area']"
        :testValue="testValue"
        :testValueList="testValueList"
        v-model:testValueSelect="testValueSelect"
        title="测试 Frame 编辑面板"
    >
        <UeEditorPanelTiptapFrame v-bind="testValue" v-model:value="testValue.value">
            <!--  -->
        </UeEditorPanelTiptapFrame>
    </TestArea>
</template>
<script lang="ts" setup>
import TestArea from "~/demo/components/TestArea.vue";

// 测试数据
const testValueSelect = ref<number>(0);
const testValueList: (UE_EDITOR_PANEL_COMPONENT.UeEditorPanelTiptapFrameProps & {
    testOptionTitle?: string;
    value: UE_TIPTAP_EXTENSION.Frame["attrs"];
})[] = [
    {
        value: { type: "map", mapPosition: "116.25,40.25", mapTitle: "地图标题" },
    },
    {
        value: {
            type: "video",
            playMode: "pop",
            src: "https://videos.pexels.com/video-files/4779866/4779866-hd_1920_1080_30fps.mp4",
        },
    },
    {
        value: { type: "web", src: "https://www.baidu.com" },
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
