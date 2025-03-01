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
import TestConfirmPanel from "~/demo/components/TestConfirmPanel.vue";
import TestVideoPanel from "~/demo/components/TestVideoPanel.vue";
import TestCalenderPicker from "~/demo/components/TestCalenderPicker.vue";
import TestContextmenu from "~/demo/components/TestContextmenu.vue";
import TestTabCard from "~/demo/components/TestTabCard.vue";
import TestEditorPanel from "~/demo/components/TestEditorPanel.vue";
import TestColorPickerPanel from "~/demo/components/TestColorPickerPanel.vue";

const testComponents = [
    TestCalenderPicker,
    TestConfirmPanel,
    TestVideoPanel,
    TestContextmenu,
    TestTabCard,
    TestEditorPanel,
    TestColorPickerPanel,
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
