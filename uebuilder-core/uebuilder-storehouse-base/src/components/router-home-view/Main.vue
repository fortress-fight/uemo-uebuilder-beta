<!--
 * @Description: Home 页面路由
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 00:54:30
-->
<template>
    <div :class="$style['router-home-view']">
        <div :class="$style['m-body']">
            <div class="state--pos-left h-full min-h-0">
                <div :class="$style['storehouse-nav-area']" class="h-full">
                    <div :class="$style['nav-list']">
                        <UnitRouterLink
                            v-for="(item, index) in navList"
                            :key="index"
                            :class="$style['nav-item']"
                            :to="item.link"
                            :target="item.target"
                            :ease-active-class="$style['active']"
                        >
                            <UeElIcon :class="$style['icon']" :name="item.linkIcon.name" :size="15" />
                            <span :class="$style['text']">{{ item.title }}</span>
                            <UeElIcon
                                v-if="item.linkIcon.arrow === true"
                                :class="$style['arrow-icon']"
                                name="icon-app-youjiantou"
                                :size="15"
                            />
                        </UnitRouterLink>
                    </div>
                </div>
            </div>
            <div class="state--pos-right h-full min-h-0">
                <div :class="$style['storehouse-panel-area']" class="w-full h-full">
                    <RouterView />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { RouterHomeViewBaseProps } from "./index";

import UnitRouterLink from "../unit-router-link";

defineOptions({ name: "RouterHomeView" });
const _props = withDefaults(defineProps<RouterHomeViewBaseProps>(), {});
</script>
<style lang="scss" module>
.router-home-view {
    .m-body {
        display: grid;

        height: 100vh;

        grid-template-columns: 200px 1fr;
    }
    .storehouse-nav-area {
        padding: 22px 10px;

        border-right: 1px solid var(--editor-c-border--lighter);
    }
    .nav-list {
        display: grid;
        overflow: auto;

        gap: 10px;
    }
    .nav-item {
        font-size: 13px;
        line-height: em(24px, 13px);

        display: block;

        width: 100%;
        padding: 10px 19px;

        transition: 0.26s ease;
        text-align: left;

        color: var(--editor-c-gray--deeper);
        border-radius: 5px;
        &.active {
            color: var(--c-blue-60);
            background: #eceeff;
        }
        .icon,
        .arrow-icon {
            display: inline-block;

            margin-right: 10px;

            vertical-align: middle;
        }
        .arrow-icon {
            transition: 0.26s ease;
            transform: translateX(40px);

            color: var(--editor-color-text);
        }
        &:hover {
            .arrow-icon {
                transform: translateX(50px);
            }
        }
        .text {
            display: inline-block;

            vertical-align: middle;
        }
    }
}
</style>
