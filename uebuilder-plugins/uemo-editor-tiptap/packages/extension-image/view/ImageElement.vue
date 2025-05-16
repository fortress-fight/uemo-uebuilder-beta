<template>
    <img
        :alt="attrs.alt || ''"
        :height="attrs.imgH"
        :src="attrs.src"
        :title="attrs.title || ''"
        :width="attrs.imgW"
        @load="imageLoad"
    />
</template>
<script lang="ts" setup>
import type { ImageAttrs } from "../src/index";

const _props = defineProps<{ attrs: ImageAttrs }>();
const emit = defineEmits<{
    (e: "load", ev: Event): void;
}>();

const imageLoad = (ev: Event) => {
    emit("load", ev);
};
</script>
<style lang="scss" module>
//
</style>
