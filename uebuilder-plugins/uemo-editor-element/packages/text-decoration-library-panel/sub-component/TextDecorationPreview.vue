<template>
    <div :class="$style['thumb-box']">
        <img :src="imageUrl" />
    </div>
</template>
<script lang="ts" setup>
import { textDecorationOptions } from "../utils/options";

const props = defineProps<{ value: string }>();

const imageUrl = computed(() => {
    const item = textDecorationOptions.find((item) => item.value === props.value);
    return item?.thumb;
});
</script>
<style lang="scss" module>
.thumb-box {
    //
}
</style>
