<template>
    <div :class="$style['editor-page']">
        <h1 :class="$style['page-head']">共有 {{ testComponents.length }} 个组件</h1>
        <div :class="$style['test-group']" class="grid grid-cols-2">
            <template v-for="(component, index) in testComponents" :key="index">
                <component :is="component"></component>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TestAlignItem from "~/demo/components/TestAlignItemSetting.vue";
import TestAlignSetting from "~/demo/components/TestAlignSetting.vue";
import TestJustifyContentSetting from "~/demo/components/TestJustifyContentSetting.vue";
import TestGapSetting from "~/demo/components/TestGapSetting.vue";
import TestMarginSetting from "~/demo/components/TestMarginSetting.vue";
import TestPaddingSetting from "~/demo/components/TestPaddingSetting.vue";
import TestRadiusSetting from "~/demo/components/TestRadiusSetting.vue";
import TestEnterAnimateSetting from "~/demo/components/TestEnterAnimateSetting.vue";
import TestBoxShadowSetting from "~/demo/components/TestBoxShadowSetting.vue";
import TestBorderSetting from "~/demo/components/TestBorderSetting.vue";
import TestColorSettingGroup from "~/demo/components/TestColorSettingGroup.vue";
import TestBorderSettingGroup from "~/demo/components/TestBorderSettingGroup.vue";
import TestRadiusSettingGroup from "~/demo/components/TestRadiusSettingGroup.vue";
import TestBoxShadowSettingGroup from "~/demo/components/TestBoxShadowSettingGroup.vue";
import TestCalenderSettingGroup from "~/demo/components/TestCalenderSettingGroup.vue";
import TestResourceSetting from "~/demo/components/TestResourceSetting.vue";
import TestFontFamilySetting from "~/demo/components/TestFontFamilySetting.vue";
import TestButtonIconSetting from "~/demo/components/TestButtonIconSetting.vue";
import TestButtonIconSettingGroup from "~/demo/components/TestButtonIconSettingGroup.vue";
import TestGridLayoutSetting from "~/demo/components/TestGridLayoutSetting.vue";
import TestBackgroundSplineSetting from "~/demo/components/TestBackgroundSplineSetting.vue";
import TestTranslateSetting from "~/demo/components/TestTranslateSetting.vue";
import TestBackgroundImageSetting from "~/demo/components/TestBackgroundImageSetting.vue";
import TestBackgroundShapeSetting from "~/demo/components/TestBackgroundShapeSetting.vue";
import TestTextDecorationSetting from "~/demo/components/TestTextDecorationSetting.vue";
import TestButtonStyleSetting from "~/demo/components/TestButtonStyleSetting.vue";
import TestLinkSetting from "~/demo/components/TestLinkSetting.vue";
import TestScrollEffectSetting from "~/demo/components/TestScrollEffectSetting.vue";

const testComponents = [
    TestAlignSetting,
    TestEnterAnimateSetting,
    TestAlignItem,
    TestJustifyContentSetting,
    TestGapSetting,
    TestMarginSetting,
    TestPaddingSetting,
    TestRadiusSetting,
    TestBoxShadowSetting,
    TestBorderSetting,
    TestColorSettingGroup,
    TestBorderSettingGroup,
    TestRadiusSettingGroup,
    TestBoxShadowSettingGroup,
    TestCalenderSettingGroup,
    TestButtonIconSettingGroup,
    TestFontFamilySetting,
    TestTranslateSetting,
    TestGridLayoutSetting,
    TestResourceSetting,
    TestButtonIconSetting,
    TestBackgroundSplineSetting,
    TestTextDecorationSetting,
    TestBackgroundShapeSetting,
    TestButtonStyleSetting,
    TestScrollEffectSetting,
    TestLinkSetting,
    TestBackgroundImageSetting,
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
