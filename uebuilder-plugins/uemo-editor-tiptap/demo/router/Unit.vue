<template>
    <div :class="$style['editor-page']">
        <h1 :class="$style['page-head']">共有 {{ testComponents.length }} 个组件</h1>
        <div :class="$style['test-group']" class="grid grid-cols-2">
            <template v-for="(component, index) in testComponents" :key="index">
                <component :is="component"></component>
            </template>
            <template v-for="(component, index) in testRowComponents" :key="index">
                <div :class="$style['row']">
                    <component :is="component"></component>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TestBubbleMenu from "~/demo/components/TestBubbleMenu.vue";
import TestMenuButton from "~/demo/components/TestMenuButton.vue";
import TestMenuBar from "~/demo/components/TestMenuBar.vue";
import TestEditorMenu from "~/demo/components/TestEditorMenu.vue";

const unitTestComponents = [TestBubbleMenu, TestMenuButton, TestMenuBar];

const testComponents = [...unitTestComponents];

const menuTestComponents = [TestEditorMenu];
const testRowComponents = [...menuTestComponents];
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
