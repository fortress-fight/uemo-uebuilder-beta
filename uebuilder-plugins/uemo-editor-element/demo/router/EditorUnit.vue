<template>
    <div :class="$style['editor-page']">
        <div :class="$style['test-group']" class="grid grid-cols-2">
            <TestIcon />
            <TestTextInput />
        </div>
    </div>
</template>
<script lang="ts" setup>
import TestIcon from "~/demo/components/TestIcon.vue";
import TestTextInput from "~/demo/components/TestTextInput.vue";
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
