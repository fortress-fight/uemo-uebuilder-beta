<template>
    <div ref="referenceRef" :class="$style['floating-container']" @pointerenter="openPopupPanel">
        <slot />
        <Teleport to="body">
            <Transition :css="false" @enter="onEnter">
                <div
                    v-if="subPopupPanelExists && showPopPanelStatus"
                    ref="floatingRef"
                    :class="[$style['floating-pop-panel'], $style['floating-pop-panel--open']]"
                    :style="popPanelStyle"
                    @pointerleave="closePopupPanel($event)"
                >
                    <slot name="popPanel" :level="prop.level" />
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
<script lang="ts" setup>
import { computeFloatingPosition } from "@stone/uemo-editor-utils/lib/floating-ui";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";
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

function onEnter(_el: Element, done: () => void) {
    const floatingDom = floatingRef.value;
    const referenceDom = referenceRef.value;

    if (!referenceDom || !floatingDom) return;

    computeFloatingPosition(referenceDom, floatingDom, {
        placement: "right-start",
        middleware: [
            ["flip", { crossAxis: false }],
            ["shift", { crossAxis: true, padding: 17 }],
            ["offset", { crossAxis: -3 }],
        ],
    })
        .then((param) => {
            gsap.set(floatingDom, { top: `${param.y}px`, left: `${param.x}px` });
            done();
        })
        .catch((err) => console.error(err));
}

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

    border: 3px solid transparent;
    &.floating-pop-panel--open {
        position: absolute;
        z-index: 100001;
        top: 0;
        left: 0;

        display: block;
    }
}
</style>
