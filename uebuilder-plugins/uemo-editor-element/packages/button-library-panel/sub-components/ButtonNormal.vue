<template>
    <div
        ref="button"
        :class="$pageStyle.btn"
        :as="data.link ? 'a' : 'div'"
        :data-animation="data.animation"
        :data-hover-active="data.previewHover === '1'"
        :data-link-detail="data.linkDetail"
        :data-link-type="data.linkType"
        :data-remove-transition="data.transition === '0'"
        :data-text-empty="data.text?.length == 0 ? true : undefined"
        :data-theme="data.theme"
        :href="data.link"
        :style="boxStyle"
        :target="data.linkTarget || '_blank'"
    >
        <template v-if="data.beforeSvgIcon">
            <ButtonIcon ref="beforeIcon" v-bind="beforeIconAttrs" />
        </template>
        <div :class="$pageStyle['btn-text']">{{ data.text }}</div>
        <template v-if="data.afterSvgIcon">
            <ButtonIcon ref="afterIcon" v-bind="afterIconAttrs" />
        </template>
    </div>
</template>
<script lang="ts" setup>
import type { UeElButtonIconProps } from "../index";

import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";

import { getBoxStyle } from "../utils/getBoxStyle";
import $pageStyle from "../utils/app.module.scss";
import ButtonIcon from "./ButtonIcon.vue";

const props = defineProps<{ data: UE_EL_UTIL.ResourceButtonItem["attrs"] }>();

const beforeIconAttrs = computed<UeElButtonIconProps>(() => {
    const beforeSvgIcon = props.data.beforeSvgIcon;
    return {
        pos: "before",
        color: beforeSvgIcon?.color,
        name: beforeSvgIcon?.name || "",
        size: beforeSvgIcon?.size,
        source: beforeSvgIcon?.source || "",
        space: beforeSvgIcon?.space,
    };
});

const afterIconAttrs = computed<UeElButtonIconProps>(() => {
    const afterSvgIcon = props.data.afterSvgIcon;
    return {
        pos: "after",
        color: afterSvgIcon?.color,
        name: afterSvgIcon?.name || "",
        size: afterSvgIcon?.size,
        source: afterSvgIcon?.source || "",
        space: afterSvgIcon?.space,
    };
});

const boxStyle = computed(() => {
    return getBoxStyle(props.data);
});
</script>
<style lang="scss" module>
.button-normal {
    // init
}
</style>
