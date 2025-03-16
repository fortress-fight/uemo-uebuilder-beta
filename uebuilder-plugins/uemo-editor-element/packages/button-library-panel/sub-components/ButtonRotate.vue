<template>
    <div
        ref="button"
        :class="[$pageStyle.btn]"
        :as="data.link ? 'a' : 'div'"
        :data-hover-active="data.previewHover === '1'"
        :data-link-detail="data.linkDetail"
        :data-link-type="data.linkType"
        :data-remove-transition="data.transition === '0'"
        :data-text-empty="data.text?.length == 0"
        :data-theme="data.theme"
        :href="data.link"
        :style="boxStyle"
        :target="data.linkTarget || '_blank'"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
    >
        <div :class="$pageStyle['btn--inner-wrapper']">
            <div :class="$pageStyle['btn-front-3d']">
                <template v-if="data.beforeSvgIcon">
                    <ButtonIcon ref="frontBeforeIcon" v-bind="beforeIconAttrs" />
                </template>
                <div :class="$pageStyle['btn-text']">{{ data.text }}</div>
                <template v-if="data.afterSvgIcon">
                    <ButtonIcon ref="frontAfterIcon" v-bind="afterIconAttrs" />
                </template>
            </div>
            <div :class="$pageStyle['btn-back-3d']">
                <template v-if="data.beforeSvgIcon">
                    <ButtonIcon ref="backBeforeIcon" v-bind="beforeIconAttrs" />
                </template>
                <div :class="$pageStyle['btn-text']">{{ data.text }}</div>
                <template v-if="data.afterSvgIcon">
                    <ButtonIcon ref="backAfterIcon" v-bind="afterIconAttrs" />
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElButtonIconProps } from "../index";

import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
import { _pickBy, _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import $pageStyle from "../utils/app.module.scss";
import { getBoxStyle } from "../utils/getBoxStyle";
import ButtonIcon from "./ButtonIcon.vue";

const props = defineProps<{ data: UE_EL_UTIL.ResourceButtonItem["attrs"] }>();

const frontBeforeIcon = ref<InstanceType<typeof ButtonIcon>>();
const frontAfterIcon = ref<InstanceType<typeof ButtonIcon>>();
const backBeforeIcon = ref<InstanceType<typeof ButtonIcon>>();
const backAfterIcon = ref<InstanceType<typeof ButtonIcon>>();
const button = ref<HTMLElement>();

const boxStyle = computed(() => {
    return getBoxStyle(props.data);
});

const beforeIconAttrs = computed<UeElButtonIconProps>(() => {
    const beforeIcon = props.data.beforeSvgIcon;
    return {
        pos: "before",
        name: beforeIcon?.name || "",
        source: beforeIcon?.source || "",
        size: beforeIcon?.size,
        space: beforeIcon?.space,
    };
});

const afterIconAttrs = computed<UeElButtonIconProps>(() => {
    const afterIcon = props.data.afterSvgIcon;
    return {
        pos: "after",
        name: afterIcon?.name || "",
        source: afterIcon?.source || "",
        size: afterIcon?.size,
        space: afterIcon?.space,
    };
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
    if (!result.includes("linear-gradient") && result) {
        result = `linear-gradient(90deg, ${result} 0%, ${result} 100%)`;
    }
    return result;
});

function onPointerEnter() {
    if (button.value && hoverBackgroundColor.value) {
        gsap.fromTo(
            button.value,
            { background: backgroundColor.value },
            {
                background: hoverBackgroundColor.value,
                duration: 0.3,
            }
        );
    }

    frontBeforeIcon.value?.play();
    frontAfterIcon.value?.play();
    backBeforeIcon.value?.play();
    backAfterIcon.value?.play();
}

function onPointerLeave() {
    if (button.value && hoverBackgroundColor.value) {
        gsap.fromTo(
            button.value,
            { background: hoverBackgroundColor.value },
            { background: backgroundColor.value, duration: 0.3 }
        );
    }
}

function updateOriginX() {
    if (!button.value) return;
    const height = button.value?.offsetHeight || 0;
    button.value.style.setProperty("--origin-z", `${-height / 2}px`);
}

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    resizeObserver = new ResizeObserver(_debounce(() => updateOriginX(), 200));
    if (button.value) {
        resizeObserver.observe(button.value);
        updateOriginX();
    }
});

onBeforeUnmount(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
});
</script>
<style lang="scss" module>
.button {
    //
}
</style>
