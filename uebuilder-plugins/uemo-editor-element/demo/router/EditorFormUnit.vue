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
import TestTextInput from "~/demo/components/TestTextInput.vue";
import TestCheckBox from "~/demo/components/TestCheckBox.vue";
import TestSelect from "~/demo/components/TestSelect.vue";
import TestCalenderSetting from "~/demo/components/TestCalenderSetting.vue";
import TestNumberInput from "~/demo/components/TestNumberInput.vue";
import TestOnOff from "~/demo/components/TestOnOff.vue";
import TestTagInput from "~/demo/components/TestTagInput.vue";
import TestButton from "~/demo/components/TestButton.vue";
import TestColorInput from "~/demo/components/TestColorInput.vue";

const testComponents = [
    TestOnOff,
    TestButton,
    TestCheckBox,
    TestSelect,
    TestCalenderSetting,
    TestTextInput,
    TestNumberInput,
    TestTagInput,
    TestColorInput,
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
