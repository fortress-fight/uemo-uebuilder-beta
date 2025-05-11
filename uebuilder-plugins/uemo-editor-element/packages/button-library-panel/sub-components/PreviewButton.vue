<template>
    <div
        class="flex items-center justify-center"
        ref="rootDom"
        :class="[$style['preview-button'], $pageStyle['page-editor']]"
    >
        <ButtonDom ref="button" :class="$style['button']" :data="data" />
    </div>
</template>
<script lang="ts" setup>
import $pageStyle from "../utils/ue-button/app.module.scss";
import ButtonDom from "./ButtonDom.vue";

defineOptions({ name: "UeElPreviewButton" });

const _props = defineProps<{ data: UE_EL_UTIL.ResourceButtonItem["attrs"] }>();
</script>
<style lang="scss" module>
.preview-button {
    @include ab-cover;
}
</style>
