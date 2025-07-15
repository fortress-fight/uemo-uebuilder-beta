<template>
    <UeElColorSetting
        v-model:value="useValue"
        v-model:opacity="useOpacity"
        :independent-opacity-control="true"
        class="w-fit"
        type="mixin"
    />
</template>
<script lang="ts" setup>
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../index";

const valueRef = defineModel<UE_EL_BACKGROUND_PARAM_MAP["color"]>("value", { required: true });

const useValue = computed<any>({
    get() {
        if (typeof valueRef.value === "string") {
            return valueRef.value;
        }
        return valueRef.value.color;
    },
    set(value) {
        valueRef.value = {
            color: value,
            opacity: useOpacity.value,
        };
    },
});

const useOpacity = computed<any>({
    get() {
        if (typeof valueRef.value === "string") {
            return 1;
        }
        return valueRef.value.opacity;
    },
    set(value) {
        valueRef.value = {
            color: useValue.value,
            opacity: value,
        };
    },
});
</script>
<style lang="scss" module>
.background-color {
    // init
}
</style>
