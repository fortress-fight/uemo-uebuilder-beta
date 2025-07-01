<template>
    <div :class="$style['editor-page']">
        <h1 :class="$style['page-head']">共有 {{ testComponents.length }} 个组件</h1>
        <div :class="$style['test-group']" class="grid grid-cols-2">
            <template v-for="(component, index) in testComponents" :key="index">
                <component :is="component"></component>
            </template>
            <template v-for="(component, index) in rowTestComponents" :key="index">
                <div :class="$style['row']">
                    <component :is="component"></component>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TestConfirmPanel from "~/demo/components/TestConfirmPanel.vue";
import TestVideoPanel from "~/demo/components/TestVideoPanel.vue";
import TestCalenderPicker from "~/demo/components/TestCalenderPicker.vue";
import TestContextmenu from "~/demo/components/TestContextmenu.vue";
import TestTabCard from "~/demo/components/TestTabCard.vue";
import TestEditorPanel from "~/demo/components/TestEditorPanel.vue";
import TestColorPickerPanel from "~/demo/components/TestColorPickerPanel.vue";
import TestLibraryPanel from "~/demo/components/TestLibraryPanel.vue";
import TestEmptyPanel from "~/demo/components/TestEmptyPanel.vue";
import TestMiniEditorPanel from "~/demo/components/TestMiniEditorPanel.vue";
import TestBrowserMockupPanel from "~/demo/components/TestBrowserMockupPanel.vue";
import TestEditorPanelTiptapGridGroup from "~/demo/components/TestEditorPanelTiptapGridGroup.vue";
import TestEditorPanelTiptapGridItem from "~/demo/components/TestEditorPanelTiptapGridItem.vue";

const testComponents = [
    TestCalenderPicker,
    TestConfirmPanel,
    TestVideoPanel,
    TestContextmenu,
    TestTabCard,
    TestEditorPanel,
    TestColorPickerPanel,
    TestLibraryPanel,
    TestEmptyPanel,
    TestBrowserMockupPanel,
    TestEditorPanelTiptapGridGroup,
    TestEditorPanelTiptapGridItem,
];

const rowTestComponents = [TestMiniEditorPanel];
</script>
<style lang="scss" module>
.page-head {
    font-size: 20px;
    font-weight: bold;

    margin-bottom: 40px;
    padding: 50px 0;

    text-align: center;
}
.test-group {
    width: 100%;
    padding: 20px;

    gap: 70px 20px;
    .row {
        grid-area: auto / auto / auto / span 2;
    }
}
</style>
