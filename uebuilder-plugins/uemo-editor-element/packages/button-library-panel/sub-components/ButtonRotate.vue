<template>
    <div
        ref="button"
        :class="[$pageStyle.btn]"
        :as="data.link ? 'a' : 'div'"
        :data-link-detail="data.linkDetail"
        :data-link-type="data.linkType"
        :data-text-empty="data.text?.length == 0"
        :data-theme="data.theme"
        :href="data.link"
        :style="boxStyle"
        :target="data.linkTarget || '_blank'"
    >
        <div :class="$pageStyle['btn--inner-wrapper']">
            <div :class="$pageStyle['btn-front-3d']">
                <template v-if="data.beforeSvgIcon">
                    <ButtonIcon v-bind="beforeIconAttrs" />
                </template>
                <div :class="$pageStyle['btn-text']">{{ data.text }}</div>
                <template v-if="data.afterSvgIcon">
                    <ButtonIcon v-bind="afterIconAttrs" />
                </template>
            </div>
            <div :class="$pageStyle['btn-back-3d']">
                <template v-if="data.beforeSvgIcon">
                    <ButtonIcon v-bind="beforeIconAttrs" />
                </template>
                <div :class="$pageStyle['btn-text']">{{ data.text }}</div>
                <template v-if="data.afterSvgIcon">
                    <ButtonIcon v-bind="afterIconAttrs" />
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElButtonIconProps } from "../index";

import { _pickBy, _debounce } from "@stone/uemo-editor-utils/lib/lodash";
import $pageStyle from "../utils/ue-button/app.module.scss";
import { getBoxStyle } from "../utils/ue-button/utils/get-box-style";
import ButtonIcon from "./ButtonIcon.vue";

const props = defineProps<{ data: UE_EL_UTIL.ResourceButtonItem["attrs"] }>();

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
</script>
<style lang="scss" module>
.button {
    //
}
</style>
