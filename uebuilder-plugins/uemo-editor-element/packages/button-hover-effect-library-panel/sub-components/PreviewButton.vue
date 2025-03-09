<template>
    <div :class="$style['preview-box']">
        <div :class="$style['button-box']" class="flex justify-center items-center">
            <button :class="$style['button-preview']" class="flex justify-center items-center" :data-animation="value">
                <UeElIcon v-if="beforeIcon" :class="[$style['before-ic'], $style['btn-icon']]" :name="beforeIcon" />
                <span :class="$style['btn-text']">{{ name }}</span>
                <UeElIcon v-if="afterIcon" :class="[$style['after-ic'], $style['btn-icon']]" :name="afterIcon" />
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { ResourceButtonHoverEffectItem as ResourceButtonHoverEffectItemType } from "@stone/uemo-editor-assets/resource/button-hover-effect";

defineProps<ResourceButtonHoverEffectItemType>();
</script>
<style lang="scss" module>
@keyframes rubberBand {
    from {
        transform: scale3d(1, 1, 1);
    }
    30% {
        transform: scale3d(1.25, 0.75, 1);
    }
    40% {
        transform: scale3d(0.75, 1.25, 1);
    }
    50% {
        transform: scale3d(1.15, 0.85, 1);
    }
    65% {
        transform: scale3d(0.95, 1.05, 1);
    }
    75% {
        transform: scale3d(1.05, 0.95, 1);
    }
    to {
        transform: scale3d(1, 1, 1);
    }
}
@keyframes shakeX {
    from,
    to {
        transform: translate3d(0, 0, 0);
    }
    25% {
        transform: translate3d(-0.5em, 0, 0);
    }
    75% {
        transform: translate3d(0.5em, 0, 0);
    }
}
.preview-box {
    font-size: 12px;
    line-height: 2em;

    position: relative;

    background-color: color(var(--ue-background-color));
    .button-box {
        @include ab-cover;
    }
    .button-preview {
        min-width: 90%;
        padding: 10px 20px;

        color: #fff;
        border-radius: 4px;
        background-color: color(var(--ue-color--active));
        &[data-animation="moveUp"] {
            transition: 0.26s ease;
            &:hover {
                transform: translateY(-0.4em);
            }
        }
        &[data-animation="rubberBand"] {
            animation-duration: 0.6s;

            animation-fill-mode: forwards;
            &:hover {
                animation-name: rubberBand;
            }
        }
        &[data-animation="shakeX"] {
            animation-duration: 0.3s;

            animation-fill-mode: forwards;
            &:hover {
                animation-name: shakeX;
            }
        }
        &[data-animation="moveRight"],
        &[data-animation="moveLeft"] {
            --move-x: 0.75em;
            .btn-icon {
                transition: 0.26s ease;
                transform: translateX(calc(var(--move-x) * -1));

                opacity: 0;
            }
            .btn-text {
                transition: 0.26s ease;
                transform: translateX(calc(var(--move-x)));
            }
            &:hover {
                .btn-text {
                    transform: translateX(0);
                }
                .btn-icon {
                    transform: translateX(-0);

                    opacity: 1;
                }
            }
        }
        &[data-animation="moveLeft"] {
            --move-x: -0.75em;
        }
        &[data-animation="scale"] {
            transition: 0.26s ease;
            &:hover {
                transform: scale3d(1.05, 1.05, 1.05);
            }
        }
    }
    &::after {
        display: block;

        padding-top: 100px;

        content: "";
        pointer-events: none;
    }
    .btn-text {
        transition: 0.26s ease;
    }
    .before-ic {
        width: 1em;
        margin-right: 0.5em;

        transition: 0.26s ease;
    }
    .after-ic {
        width: 1em;
        margin-left: 0.5em;

        transition: 0.26s ease;
    }
}
</style>
