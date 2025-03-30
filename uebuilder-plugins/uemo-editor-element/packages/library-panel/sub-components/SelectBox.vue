<template>
    <div :class="$style['select-box-wrapper']" :data-auto-height="autoHeight">
        <div
            :class="$style['select-box']"
            :data-select="select"
            :style="{ '--u-width': width, '--u-height': height }"
            @click="selectItem"
        >
            <div :class="$style['select-box-inner']">
                <slot></slot>
            </div>
        </div>
        <slot name="footer"></slot>
    </div>
</template>
<script lang="ts" setup>
defineOptions({ name: "UeElSelectBox" });

const _prop = withDefaults(defineProps<{ select?: boolean; width?: number; height?: number; autoHeight?: boolean }>(), {
    width: 300,
    height: 300,
    autoHeight: false,
});
const emit = defineEmits<{ (e: "trigger", ev: MouseEvent): void }>();

function selectItem(ev: MouseEvent) {
    emit("trigger", ev);
}
</script>
<style lang="scss" module>
.select-box-wrapper {
    &[data-auto-height="true"] {
        .select-box::after {
            display: none;
        }
        .select-box-inner {
            position: static;
        }
    }
}
.select-box {
    --select-shadow: inset 0 0 0 1px #{color(var(--ue-border-color))};

    position: relative;

    overflow: hidden;

    cursor: pointer;

    border-radius: var(--ue-border-radius--lv1);
    &[data-select="true"] {
        --select-shadow: inset 0 0 0 4px #{color(var(--ue-border-color--deeper))}, inset 0 0 0 7px #fff;
    }
    &::before {
        @include ab-cover;
        z-index: 10;

        content: "";
        pointer-events: none;

        border-radius: var(--ue-border-radius--lv1);
        box-shadow: var(--select-shadow);
    }
    &::after {
        display: block;

        width: 100%;
        padding-top: calc(var(--u-height) / var(--u-width) * 100%);

        content: "";
    }
}
.select-box-inner {
    position: absolute;

    inset: 0;
}
</style>
