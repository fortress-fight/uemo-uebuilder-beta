<template>
    <div :class="$style['image-preview']" class="flex justify-center items-center">
        <img :class="$style['preview-img']" :src="src" />
    </div>
</template>
<script lang="ts" setup>
defineOptions({ name: "UeElImagePreview" });

const _props = defineProps<{ src: string }>();
</script>
<style lang="scss" module>
.image-preview {
    .preview-img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
