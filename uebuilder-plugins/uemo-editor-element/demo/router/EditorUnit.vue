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
import TestIcon from "~/demo/components/TestIcon.vue";
import TestTextInput from "~/demo/components/TestTextInput.vue";
import TestSelectOption from "~/demo/components/TestSelectOption.vue";
import TestSelect from "~/demo/components/TestSelect.vue";
import TestTabCard from "~/demo/components/TestTabCard.vue";
import TestLoading from "~/demo/components/TestLoading.vue";
import TestTipGroup from "~/demo/components/TestTipGroup.vue";
import TestCheckBox from "~/demo/components/TestCheckBox.vue";
import TestButton from "~/demo/components/TestButton.vue";
import TestOnOff from "~/demo/components/TestOnOff.vue";
import TestConfirmPanel from "~/demo/components/TestConfirmPanel.vue";
import TestVideoPanel from "~/demo/components/TestVideoPanel.vue";
import TestControlGroup from "~/demo/components/TestControlGroup.vue";
import TestAlignSetting from "~/demo/components/TestAlignSetting.vue";
import TestTagInput from "~/demo/components/TestTagInput.vue";
import TestContextmenu from "~/demo/components/TestContextmenu.vue";

const helperTestComponents = [TestLoading, TestTipGroup, TestButton];
const unitTestComponents = [TestIcon, TestOnOff];
const formTestComponents = [TestTextInput, TestCheckBox, TestSelectOption, TestSelect];
const panelTestComponents = [TestTabCard, TestConfirmPanel, TestVideoPanel, TestContextmenu];
const mixinTestComponents = [TestControlGroup, TestAlignSetting, TestTagInput];
const testComponents = [
    ...unitTestComponents,
    ...helperTestComponents,
    ...formTestComponents,
    ...panelTestComponents,
    ...mixinTestComponents,
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
