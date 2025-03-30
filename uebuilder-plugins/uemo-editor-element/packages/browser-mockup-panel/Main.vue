<!--
 * @Description: 模拟浏览器窗口样式
 * @Author: F-Stone
 * @LastEditTime: 2025-03-28 02:25:12
-->
<template>
    <div :class="$style['browser-mockup-panel']">
        <div :class="$style['user-bio']">
            <div :class="$style['user-bio-top']" class="flex justify-center">
                <div :class="$style['btn-group']" class="flex items-center">
                    <div :class="$style['circle']"></div>
                    <div :class="$style['circle']"></div>
                    <div :class="$style['circle']"></div>
                </div>
                <div :class="$style['title']" class="flex items-center justify-center">{{ title }}</div>
            </div>
            <div ref="browserMockupBody" :class="$style['user-bio-body']">
                <div ref="scroller" :class="$style['scroller']">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElBrowserMockupPanelBaseProps } from "./index";

import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

defineOptions({ name: "UeElBrowserMockupPanel" });
const _props = withDefaults(defineProps<UeElBrowserMockupPanelBaseProps>(), {});

const scroller = useTemplateRef("scroller");
const browserMockupBody = useTemplateRef("browserMockupBody");
defineExpose({
    scroller,
    browserMockupBody,
    scrollTo: (pos: "top" | "bottom", duration = 4) => {
        gsap.to(scroller.value as HTMLElement, {
            duration,
            ease: "none",
            scrollTo: { y: pos === "top" ? 0 : "max", autoKill: true },
        });
    },
});
</script>
<style lang="scss" module>
.browser-mockup-panel {
    width: 800px;
    .user-bio {
        overflow: hidden;

        background-color: #fff;
    }
    .user-bio-top {
        position: relative;

        width: 100%;
        padding: 10px 12px;

        border: 1px solid rgba(var(--ue-border-color), 1);
        border-radius: 10px 10px 0 0;
        .circle {
            @include space-between(10px);
            @include circle(13px);
            background-color: var(--bg-color);
            &:nth-child(1) {
                --bg-color: #ff5f57;
            }
            &:nth-child(2) {
                --bg-color: #ffbd2e;
            }
            &:nth-child(3) {
                --bg-color: #28ca42;
            }
        }
        .title {
            font-size: 12px;
            line-height: em(24px, 12px);

            padding: 0 20px;

            border: 1px solid rgba(var(--ue-border-color), 1);
            border-radius: 4px;
            background-color: #f8f8f8;
        }
        .btn-group {
            position: absolute;
            top: 0;
            left: 0;

            height: 100%;
            padding: 0 12px;
        }
    }
    .user-bio-body {
        --mock-vh: 5px;
        font-size: 13px;

        position: relative;

        overflow: hidden;

        width: 100%;

        border: 1px solid rgba(var(--ue-border-color), 1);
        border-top-width: 0;
        border-radius: 0 0 10px 10px;
        .scroller {
            overflow: auto;

            height: calc(var(--mock-vh) * 100);
        }
    }
}
</style>
