<template>
    <div :class="$style['form-field']">
        <slot></slot>
        <span v-if="errorMsg" :class="$style['error-tip']">{{ errorMsg }}</span>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    errorMsg?: string;
}>();
</script>

<style lang="scss" module>
.form-field {
    position: relative;

    width: 100%;
}
.error-tip {
    font-size: 12px;

    position: absolute;
    top: 100%;

    display: block;

    margin-top: 4px;

    color: var(--c-red-40);
}
</style>
