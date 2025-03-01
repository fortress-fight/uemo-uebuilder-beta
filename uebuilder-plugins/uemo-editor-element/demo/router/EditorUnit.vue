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
import TestSelectOption from "~/demo/components/TestSelectOption.vue";
import TestLoading from "~/demo/components/TestLoading.vue";
import TestTipGroup from "~/demo/components/TestTipGroup.vue";
import TestControlGroup from "~/demo/components/TestControlGroup.vue";
import TestSettingBar from "~/demo/components/TestSettingBar.vue";

const containerComponents = [TestSettingBar, TestControlGroup];
const unitTestComponents = [TestIcon, TestSelectOption];
const helperTestComponents = [TestLoading, TestTipGroup];

const testComponents = [...containerComponents, ...unitTestComponents, ...helperTestComponents];
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
