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
import TestEditorPanelTiptapSvgView from "~/demo/components/TestEditorPanelTiptapSvgView.vue";
import TestEditorPanelTiptapSpline from "~/demo/components/TestEditorPanelTiptapSpline.vue";
import TestEditorPanelTiptapLottie from "~/demo/components/TestEditorPanelTiptapLottie.vue";
import TestEditorPanelTiptapFrame from "~/demo/components/TestEditorPanelTiptapFrame.vue";
import TestEditorPanelTiptapGridGroup from "~/demo/components/TestEditorPanelTiptapGridGroup.vue";
import TestEditorPanelTiptapGridItem from "~/demo/components/TestEditorPanelTiptapGridItem.vue";
import TestEditorPanelTiptapDividerBlock from "~/demo/components/TestEditorPanelTiptapDividerBlock.vue";
import TestEditorPanelTiptapHrRule from "~/demo/components/TestEditorPanelTiptapHrRule.vue";
import TestEditorPanelTiptapShareItem from "~/demo/components/TestEditorPanelTiptapShareItem.vue";
import TestEditorPanelTiptapTable from "~/demo/components/TestEditorPanelTiptapTable.vue";

const tiptapEditorPanelComponents = [
    TestEditorPanelTiptapButtonRow,
    TestEditorPanelTiptapButtonItem,
    TestEditorPanelTiptapImage,
    TestEditorPanelTiptapSvgIcon,
    TestEditorPanelTiptapSvgView,
    TestEditorPanelTiptapSpline,
    TestEditorPanelTiptapLottie,
    TestEditorPanelTiptapFrame,
    TestEditorPanelTiptapGridGroup,
    TestEditorPanelTiptapGridItem,
    TestEditorPanelTiptapDividerBlock,
    TestEditorPanelTiptapHrRule,
    TestEditorPanelTiptapShareItem,
    TestEditorPanelTiptapTable,
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
