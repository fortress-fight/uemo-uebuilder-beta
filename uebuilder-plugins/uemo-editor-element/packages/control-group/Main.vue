<!--
 * @Description: 控件组
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 03:18:41
-->
<template>
    <div :class="$style['control-group']" class="grid">
        <div :class="$style['control-oper']">
            <slot :disable="disable"></slot>
        </div>
        <div v-if="!hideOper" :class="$style['oper-box']">
            <slot name="oper">
                <UeElButton
                    v-if="operType === 'remove'"
                    theme="squareIcon"
                    :class="$style['oper-btn']"
                    data-oper-type="remove"
                    :disable="disable"
                    :icon="{ name: 'icon-shanchu', size: 16 }"
                    @trigger="trigger('remove')"
                />
                <UeElOnOff
                    v-else-if="operType === 'onOff' && onOffParam"
                    v-bind="onOffParam"
                    :class="$style['oper-btn']"
                    :disable="disable"
                    @update:value="trigger('onOffChange', $event)"
                />
                <UeElButton
                    v-else-if="operType === 'button' && buttonParam"
                    :class="$style['oper-btn']"
                    :disable="disable"
                    v-bind="buttonParam"
                    theme="squareIcon"
                    @trigger="trigger('trigger')"
                />
                <UeElSelect
                    v-else-if="operType === 'select' && selectParam"
                    v-bind="selectParam"
                    @update:value="trigger('selectChange', $event)"
                >
                    <UeElButton
                        :class="$style['oper-btn']"
                        :disable="disable"
                        v-bind="buttonParam"
                        theme="squareIcon"
                    />
                </UeElSelect>
                <template v-else>
                    <div :class="$style['placeholder']"></div>
                </template>
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UeElControlGroupBaseProps } from "./index";

const props = withDefaults(defineProps<UeElControlGroupBaseProps>(), { hideOper: false });

defineOptions({ name: "UeElControlGroup" });
const emit = defineEmits<{
    (e: "remove" | "trigger"): void;
    (e: "selectChange", value: UE_EL_UTIL.SelectValue): void;
    (e: "onOffChange", value: UE_EL_UTIL.OnOffValue): void;
}>();

function trigger(type: "remove" | "trigger"): void;
function trigger(type: "onOffChange", $event: UE_EL_UTIL.OnOffValue): void;
function trigger(type: "selectChange", $event: UE_EL_UTIL.SelectValue): void;
function trigger(
    type: "remove" | "trigger" | "onOffChange" | "selectChange",
    $event?: UE_EL_UTIL.OnOffValue | UE_EL_UTIL.SelectValue
): void {
    if (props.disable) return;

    switch (type) {
        case "remove":
        case "trigger":
            emit(type);
            break;

        case "onOffChange":
            emit(type, $event!);
            break;

        case "selectChange":
            emit(type, $event as UE_EL_UTIL.SelectValue);
            break;

        default:
            break;
    }
}
</script>

<style lang="scss" module>
.control-group {
    gap: var(--ue-control-row-space);
    grid-template-columns: 1fr auto;
    &:hover {
        .oper-btn[data-oper-type="remove"] {
            opacity: 1;
        }
    }
    .placeholder {
        @include square(28px);
    }
    .oper-btn[data-oper-type="remove"] {
        opacity: 0;
    }
    .oper-btn {
        // color: inherit;
    }
}
</style>
