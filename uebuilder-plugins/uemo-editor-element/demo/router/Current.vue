<template>
    <div :class="$style['current-page']">
        <div :class="$style['test-group']" class="flex justify-center"></div>
    </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" module>
.test-group {
    width: 100%;
    padding: 20px;

    gap: 20px;
}
</style>
