<!--
 * @Description: 按钮
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 17:45:49
-->
<template>
    <button
        v-ue-el-label="labelParam"
        :class="$style['button']"
        :data-active="active ? '' : undefined"
        :data-disable="disable ? '' : undefined"
        :data-type="type"
        :data-theme="theme"
        :data-size="size"
        :data-loading="loading"
        @click="trigger"
    >
        <slot>
            <!-- 优先显示 loading 状态 -->
            <template v-if="loading">
                <div :class="$style['loading-box']" class="flex items-center justify-center">
                    <UeElIcon :size="18" :class="$style['loading-ic']" name="icon-app-loading" />
                </div>
            </template>
            <!-- 根据不同 theme 渲染不同结构 -->
            <template v-if="theme === 'squareIcon'">
                <div :class="$style['button-inner']" class="flex justify-center items-center">
                    <UeElIcon v-if="iconParam" :class="$style['ic']" :name="iconParam.name" :size="iconParam.size" />
                </div>
            </template>
            <template v-else-if="theme === 'strokeText'">
                <div :class="$style['button-inner']" class="flex justify-center items-center">
                    <UeElIcon v-if="iconParam" :class="$style['ic']" :name="iconParam.name" :size="iconParam.size" />
                    <span :class="$style['text']">{{ text }}</span>
                </div>
            </template>
            <template v-else-if="theme === 'hoverStrokeText'">
                <div :class="$style['button-inner']" class="flex justify-center items-center">
                    <UeElIcon v-if="iconParam" :class="$style['ic']" :name="iconParam.name" :size="iconParam.size" />
                    <span :class="$style['text']">{{ text }}</span>
                </div>
            </template>
            <template v-else-if="theme === 'hoverStrokeText2'">
                <div :class="$style['button-inner']" class="flex items-center">
                    <UeElIcon v-if="iconParam" :class="$style['ic']" :name="iconParam.name" :size="iconParam.size" />
                    <span :class="$style['text']">{{ text }}</span>
                </div>
            </template>
            <template v-else-if="theme === 'fillText'">
                <div :class="$style['button-inner']" class="flex justify-center items-center">
                    <UeElIcon v-if="iconParam" :class="$style['ic']" :name="iconParam.name" :size="iconParam.size" />
                    <span :class="$style['text']">{{ text }}</span>
                </div>
            </template>
        </slot>
    </button>
</template>
<script lang="ts" setup>
import type { UeElButtonBaseProps } from "./index";

interface Props extends UeElButtonBaseProps {}

defineOptions({ name: "UeElButton" });

const instance = getCurrentInstance();
const props = withDefaults(defineProps<Props>(), { size: "small" });
const emit = defineEmits<{ (e: "trigger", ev: MouseEvent): void }>();

const labelParam = computed<UE_EL_UTIL.LabelOption>(() => {
    return props.label ? { content: props.label, delay: [1000, null] } : undefined;
});

const iconParam = computed<UE_EL_COMPONENT.UeElIconProps | undefined>(() => {
    if (!props.icon) return undefined;
    if (typeof props.icon === "string") return { name: props.icon };
    return props.icon;
});

function trigger(ev: MouseEvent) {
    if (props.disable) {
        if (props.disableTip) {
            instance?.proxy?.$ueElToast.error(props.disableTip);
        }
        return;
    }
    emit("trigger", ev);
}
</script>
<style lang="scss" module>
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.button {
    position: relative;

    overflow: hidden;
    .loading-box {
        @include ab-cover;
    }
    .loading-ic {
        animation: rotate 2s infinite linear;
    }
}
.button[data-disable] {
    //
}
.button[data-theme="squareIcon"] {
    @include square(28px);
    font-size: var(--ue-el-btn-font-size, 16px);

    color: var(--ue-el-btn-font-color, color(var(--ue-font-color)));
    border-radius: var(--ue-border-radius--lv1);
    &:hover,
    &[data-active] {
        color: color(var(--ue-font-color--deeper));
        background: color(var(--ue-color--gray));
    }
    &[data-loading] {
        .loading-box {
            background-color: #fff;
        }
    }
}
.button[data-theme="strokeText"],
.button[data-theme="hoverStrokeText"],
.button[data-theme="hoverStrokeText2"],
.button[data-theme="fillText"] {
    font-size: 12px;
    line-height: 26px;

    width: 100%;

    border-radius: var(--ue-border-radius--lv1);
    &[data-size="small-y"] {
        padding: 0 8px;
    }
    &[data-size="normal"] {
        padding: 2px 8px;
    }
    &[data-size="large"] {
        padding: 6px 10px;
    }
    .ic {
        font-size: 16px;

        margin-right: var(--ue-control-col-space);

        color: color(var(--ue-font-color));
    }
}
.button[data-theme="strokeText"] {
    color: color(var(--ue-font-color--deeper));
    border: 1px solid color(var(--ue-border-color));
    &:hover,
    &[data-active] {
        .ic {
            color: color(var(--ue-font-color--deeper));
        }
    }
    &[data-loading] {
        .loading-box {
            background-color: #fff;
        }
    }
}
.button[data-theme="hoverStrokeText"],
.button[data-theme="hoverStrokeText2"] {
    color: color(var(--ue-font-color--deeper));
    border: 1px solid color(var(--ue-border-color), 0);
    &:hover,
    &[data-active] {
        border-color: color(var(--ue-border-color), 1);
        .ic {
            color: color(var(--ue-font-color--deeper));
        }
    }
    &[data-loading] {
        .loading-box {
            background-color: #fff;
        }
    }
}
.button[data-theme="fillText"] {
    --ue-component-button--fill-color: #{color(var(--ue-color--active))};
    color: #fff;
    border: 1px solid color(var(--ue-border-color), 0);
    background-color: var(--ue-component-button--fill-color);
    .ic {
        color: inherit;
    }
    &[data-type="warning"] {
        --ue-component-button--fill-color: #{color(var(--ue-color--yellow))};
    }
    &[data-loading] {
        .loading-box {
            background-color: color(var(--ue-color--active));
        }
    }
}
</style>
