<template>
    <UeElContextmenu :class="$style['more-oper-panel']" :list="list" :trigger="triggerCommand" />
</template>
<script lang="ts" setup>
const _props = defineProps<{ list: UE_EL_COMPONENT.UeElContextmenuProps["list"] }>();
const emit = defineEmits<{
    (e: "fire", data: { type: string; param?: any }): void;
}>();

const triggerCommand: UE_EL_COMPONENT.UeElContextmenuProps["trigger"] = function (type, param) {
    emit("fire", { type, param });
};
</script>
<style lang="scss" module>
.more-oper-panel {
    // init
}
</style>
