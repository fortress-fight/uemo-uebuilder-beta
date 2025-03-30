<template>
    <div v-bind="$attrs" :class="$style['background-inner']" ref="rootDom">
        <div :class="$style['setting-bar']" class="flex cursor-pointer items-center" @click="handleTrigger">
            <div :class="$style['preview-box']" class="flex items-center">
                <div :class="$style['preview-inner']">
                    <slot name="preview"></slot>
                </div>
            </div>
            <div :class="$style['title']">{{ title }}</div>
        </div>
        <slot name="plugin">
            <UeElNumberInput
                v-if="useOpacity"
                v-bind="opacityParam"
                v-model:value="opacityRef"
                :class="$style['opacity-input']"
                :hide-unit="true"
            />
        </slot>
    </div>
    <UeElPopPanel v-model:open="popPanelOpen" v-bind="popPanelParams">
        <slot name="popPanel"></slot>
    </UeElPopPanel>
</template>
<script lang="ts" setup>
import { numDiv, numTimes } from "@stone/uemo-editor-utils/lib/number";

import { usePopPanelParam } from "~/utils/pop-panel-mixin";

const _props = defineProps<{ title: string; useOpacity: boolean }>();
const rootDomRef = useTemplateRef("rootDom");

const opacityRef = defineModel<number>("opacity", { required: false });

const opacityParam = ref<UE_EL_COMPONENT.UeElNumberInputProps>({
    required: true,
    step: 0.01,
    limit: [0, 1],
    show: {
        input(value) {
            return numTimes(value.num ?? 1, 100) + "%";
        },
        output(value) {
            const num = parseFloat(value);
            if (!isNaN(num)) {
                return numDiv(num, 100).toString();
            }
            return undefined;
        },
    },
});

const popPanelOpen = ref(false);
const popPanelParams = usePopPanelParam(computed(() => rootDomRef.value as HTMLElement));

function handleTrigger() {
    popPanelOpen.value = true;
}
</script>
<style lang="scss" module>
.background-inner {
    --bg-setting-border-color: transparent;
    display: grid;

    width: 217px;

    border: 1px solid var(--bg-setting-border-color);
    border-radius: var(--ue-border-radius--lv1);

    grid-template-columns: 1fr auto;
    .opacity-input {
        --text-border-color: transparent !important;
        width: 50px;

        border-width: 0;
        border-left: 1px solid transparent;
        border-radius: 0;
    }
    &:hover,
    &:focus-within {
        --bg-setting-border-color: #{color(var(--ue-border-color))};
        .opacity-input {
            border-color: color(var(--ue-border-color));
        }
    }
    .preview-box {
        padding: 0 var(--ue-editor-row-space--lv1);
    }
    .preview-inner {
        @include square(16px);
        position: relative;

        overflow: hidden;

        border: 1px solid color(var(--ue-border-color));
        border-radius: var(--ue-border-radius--lv1);
        background-color: #fff;
        .ic {
            font-size: 12px;
        }
    }
    .title {
        line-height: 26px;

        padding-right: var(--ue-editor-row-space--lv1);
    }
}
</style>
