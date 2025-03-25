<template>
    <div :class="[$style['background-item'], $style['sort-item']]" class="flex justify-between" oper-type="remove">
        <div class="w-fit">
            <div :class="$style['dragger-btn']" class="flex items-center">
                <UeElIcon name="icon-tuozhuai" :size="15" />
            </div>
            <slot></slot>
        </div>
        <div :class="$style['oper-box']">
            <UeElButton
                theme="squareIcon"
                :class="$style['oper-btn']"
                data-oper-type="remove"
                :icon="{ name: 'icon-shanchu', size: 16 }"
                @trigger="trigger('remove')"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
const emit = defineEmits<{ (e: "remove"): void }>();

function trigger(type: "remove"): void {
    emit(type);
}
</script>
<style lang="scss" module>
.background-item {
    //
}
.sort-item {
    position: relative;
    &:hover {
        .dragger-btn {
            opacity: 1;
        }
        .oper-box {
            opacity: 1;
        }
    }
    .dragger-btn {
        position: absolute;
        z-index: var(--ue-z-index--mini);
        top: -0;
        left: -7px;

        height: 100%;

        cursor: grab;
        transform: scale(0.7);

        opacity: 0;
        color: color(var(--ue-font-color));
        background-color: #fff;
        &:hover {
            color: color(var(--ue-font-color--deeper));
        }
    }
    .oper-box {
        opacity: 0;
    }
}
</style>
