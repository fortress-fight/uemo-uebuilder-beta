<template>
    <div ref="referenceRef" :class="$style['floating-container']" @pointerenter="openPopupPanel">
        <slot />
        <UeElPopPanel :open="subPopupPanelExists && showPopPanelStatus" v-bind="popPanelParams">
            <div
                ref="floatingRef"
                :class="[$style['floating-pop-panel'], $style['floating-pop-panel--open']]"
                :style="popPanelStyle"
                @pointerleave="closePopupPanel($event)"
            >
                <slot name="popPanel" :level="prop.level" />
            </div>
        </UeElPopPanel>
    </div>
</template>
<script lang="ts" setup>
import $ from "@stone/uemo-editor-utils/lib/jquery";

import { eventBus } from "./event-bus";

const prop = withDefaults(defineProps<{ disable?: boolean; level?: number; pathId: string; openId?: string }>(), {
    level: 0,
    disable: false,
});
const emit = defineEmits<{ (ev: "setOpenMap", cid: string): void }>();

const slots = defineSlots<{ default(): any; popPanel(props: { level: number }): any }>();

const popPanelStyle = ref<Record<string, string>>();
const floatingRef = useTemplateRef("floatingRef");
const referenceRef = useTemplateRef("referenceRef");

const subPopupPanelExists = computed(() => !!slots.popPanel);
const showPopPanelStatus = computed(() => {
    if (prop.disable || !subPopupPanelExists.value) return false;
    return prop.openId?.startsWith(prop.pathId);
});

function openPopupPanel() {
    emit("setOpenMap", prop.pathId);
}

const $c = useCssModule();
function closePopupPanel(ev: MouseEvent) {
    const currentTarget = ev.relatedTarget as HTMLElement;

    if ($(currentTarget).closest(`.${$c["floating-pop-panel--open"]}`).length > 0) return;

    eventBus.emit("closeAll");
}

/**
 * 弹窗参数
 */
const popPanelParams = computed<UE_EL_COMPONENT.UeElPopPanelProps>(() => {
    return {
        draggable: false,
        panel: {
            position: {
                refEl: referenceRef.value as Element,
                autoUpdate: true,
                options: {
                    placement: "right-start",
                    middleware: [
                        ["shift", { crossAxis: true, padding: 17 }],
                        ["offset", { crossAxis: -10, mainAxis: 0 }],
                    ],
                },
            },
        },
    };
});

defineExpose({
    floatingRef,
});
</script>
<style lang="scss" module>
.floating-container {
    // init
}
.floating-pop-panel {
    display: none;

    border: 6px solid transparent;
    border-top-width: 0;
    border-bottom-width: 0;
    &.floating-pop-panel--open {
        position: relative;
        z-index: 100001;

        display: block;
    }
}
</style>
