<template>
    <BackgroundItemInner
        v-model:value="valueRef"
        :class="$style['background-inner']"
        :title="t('UNIT_BLUR')"
        :use-opacity="false"
    >
        <template #preview>
            <div
                :class="$style['preview']"
                class="flex items-center justify-center"
                :style="{ '--background-color': color }"
            ></div>
        </template>
        <template #plugin>
            <UeElNumberInput
                v-bind="blurDistanceParam"
                v-model:value="blur"
                :class="$style['blur-input']"
                :hide-unit="true"
            />
        </template>
        <template #popPanel>
            <UeElColorPickerPanel v-model:value="color" />
        </template>
    </BackgroundItemInner>
</template>
<script lang="ts" setup>
import type { UE_EL_BACKGROUND_PARAM_MAP } from "../index";

import BackgroundItemInner from "./BackgroundItemInner.vue";

const { t } = useI18n();

const valueRef = defineModel<UE_EL_BACKGROUND_PARAM_MAP["blur"]>("value", { required: true });

const color = computed({
    get: () => {
        return valueRef.value.color;
    },
    set: (value) => {
        valueRef.value = { ...valueRef.value, color: value };
    },
});

const blur = computed({
    get: () => {
        return valueRef.value.blur;
    },
    set: (value) => {
        valueRef.value = { ...valueRef.value, blur: value };
    },
});

const blurDistanceParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    required: true,
    placeholder: "请输入",
    step: 1,
    limit: [10, 100],
    show: {
        input(value) {
            return (value.num ?? 10) + "px";
        },
    },
});
</script>
<style lang="scss" module>
.background-inner {
    .preview {
        @include ab-cover;

        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTUyOUU2MTAwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTUyOUU2MTEwNjczMTFFOEE1MEQ5RTI4RUQzQzJBNTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFNTI5RTYwRTA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFNTI5RTYwRjA2NzMxMUU4QTUwRDlFMjhFRDNDMkE1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuLRCmkAAAAqSURBVHjaYvz//z8DNnD27Fms4kwMJIJRDcQAFlzhbWxsPBpK9NMAEGAA+cQIhpHCLJEAAAAASUVORK5CYII=");
        background-size: 6px 6px;
        &::after {
            @include ab-cover;
            content: "";

            background-color: var(--background-color);
        }
    }
    .blur-input {
        --text-border-color: transparent !important;
        width: 50px;

        border-width: 0;
        border-left: 1px solid transparent;
        border-radius: 0;
    }
    &:hover,
    &:focus-within {
        --bg-setting-border-color: #{color(var(--ue-border-color))};
        .blur-input {
            border-color: color(var(--ue-border-color));
        }
    }
}
</style>
