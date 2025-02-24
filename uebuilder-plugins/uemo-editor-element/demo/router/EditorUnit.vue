<template>
    <div :class="$style['editor-page']">
        <div :class="$style['test-group']" class="grid grid-cols-2">
            <TestIcon />
            <TestTextInput />
            <TestSelectOption />
            <TestSelect />
            <TestTabCard />
            <TestLoading />
            <TestTipGroup />
            <TestCheckBox />
            <TestButton />
            <TestOnOff />
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
</script>
<style lang="scss" module>
.test-group {
    width: 100%;
    padding: 20px;

    gap: 70px 20px;
    .row {
        grid-area: auto / auto / auto / span 2;
    }
}
</style>
