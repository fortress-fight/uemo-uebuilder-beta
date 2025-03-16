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
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
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

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { _pickBy } from "@stone/uemo-editor-utils/lib/lodash";

import { getBoxStyle } from "../utils/getBoxStyle";
import $pageStyle from "../utils/app.module.scss";
import ButtonIcon from "./ButtonIcon.vue";

const props = defineProps<{ data: UE_EL_UTIL.ResourceButtonItem["attrs"] }>();

const button = useTemplateRef("button");
const beforeIcon = useTemplateRef("beforeIcon");
const afterIcon = useTemplateRef("afterIcon");

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

const backgroundColor = computed(() => {
    let result = props.data.background || "transparent";
    if (!result.includes("linear-gradient")) {
        result = `linear-gradient(90deg, ${result} 0%, ${result} 100%)`;
    }
    return result;
});

const hoverBackgroundColor = computed(() => {
    let result = props.data.hoverBackground || "";
    if (!result?.includes("linear-gradient")) {
        result = `linear-gradient(90deg, ${result} 0%, ${result} 100%)`;
    }
    return result;
});

function onPointerEnter() {
    if (button.value) {
        $(button.value).data("buttonCreatorCtrl")?.play?.();
        if (hoverBackgroundColor.value) {
            gsap.fromTo(
                button.value,
                { background: backgroundColor.value },
                {
                    background: hoverBackgroundColor.value,
                    duration: 0.3,
                }
            );
        }
    }

    beforeIcon.value?.play();
    afterIcon.value?.play();
}

function onPointerLeave() {
    if (button.value && hoverBackgroundColor.value) {
        gsap.fromTo(
            button.value,
            { background: hoverBackgroundColor.value },
            {
                background: backgroundColor.value,
                duration: 0.3,
                onComplete() {
                    if (button.value) {
                        $(button.value).css({ background: "" });
                    }
                },
            }
        );
    }
}
</script>
<style lang="scss" module>
.button-normal {
    // init
}
</style>
