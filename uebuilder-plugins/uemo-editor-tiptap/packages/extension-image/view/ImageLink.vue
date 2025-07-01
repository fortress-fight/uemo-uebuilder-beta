<template>
    <component :is="elementAttrs ? 'a' : 'div'" v-bind="elementAttrs">
        <slot></slot>
    </component>
</template>
<script lang="ts" setup>
import { transformLinkData } from "../../../utils/tiptap-helper";

const props = defineProps<{
    attrs?: UE_EL_UTIL.LinkValue;
}>();

const linkData = computed(() => {
    return transformLinkData(props.attrs);
});

const elementAttrs = computed(() => {
    if (!linkData.value.link) {
        return undefined;
    }

    return {
        rel: "noopener noreferrer nofollow",
        "data-link-detail": linkData.value.detail,
        "data-link-type": linkData.value.type,
        href: linkData.value.link,
        target: linkData.value.target || "_blank",
    };
});
</script>
<style lang="scss" module>
//
</style>
