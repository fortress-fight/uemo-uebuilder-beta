<template>
    <UeElTableSizePicker :selection="selection" :min-size="minSize" @submit="onSubmit" />
</template>
<script lang="ts" setup>
const emit = defineEmits<{ (e: "closePopPanel"): void }>();
const valueRef = defineModel<{ rows: number; cols: number }>("value", { required: false });

const selection = computed<[number, number]>(() => {
    return [valueRef.value?.rows || 0, valueRef.value?.cols || 0];
});

const minSize = ref<[number, number]>([0, 0]);

function onSubmit(value: { rows: number; cols: number; withHeaderRow: boolean }) {
    valueRef.value = value;
    emit("closePopPanel");
}

onBeforeMount(() => {
    minSize.value = [valueRef.value?.rows || 0, valueRef.value?.cols || 0];
});
</script>
<style lang="scss" module>
.table-scale {
    // init
}
</style>
