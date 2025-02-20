<template>
    <div :class="$style['editor-page']">
        <div :class="$style['test-group']" class="grid grid-cols-2">
            <TestComponent />
        </div>
    </div>
</template>
<script lang="ts" setup>
import TestComponent from "~/demo/components/TestIcon.vue";
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
