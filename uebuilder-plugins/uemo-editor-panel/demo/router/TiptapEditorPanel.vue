<template>
    <div :class="$style['editor-page']">
        <h1 :class="$style['page-head']">共有 {{ tiptapEditorPanelComponents.length }} 个组件</h1>
        <div :class="$style['test-group']" class="grid grid-cols-2">
            <template v-for="(component, index) in tiptapEditorPanelComponents" :key="index">
                <component :is="component"></component>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TestEditorPanelTiptapButtonRow from "~/demo/components/TestEditorPanelTiptapButtonRow.vue";
import TestEditorPanelTiptapButtonItem from "~/demo/components/TestEditorPanelTiptapButtonItem.vue";
import TestEditorPanelTiptapImage from "~/demo/components/TestEditorPanelTiptapImage.vue";
import TestEditorPanelTiptapSvgIcon from "~/demo/components/TestEditorPanelTiptapSvgIcon.vue";

const tiptapEditorPanelComponents = [
    TestEditorPanelTiptapButtonRow,
    TestEditorPanelTiptapButtonItem,
    TestEditorPanelTiptapImage,
    TestEditorPanelTiptapSvgIcon,
];
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
