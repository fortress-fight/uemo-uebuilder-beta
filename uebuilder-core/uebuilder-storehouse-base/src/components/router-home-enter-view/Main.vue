<!--
 * @Description: 入口路由页面
 * @Author: F-Stone
 * @LastEditTime: 2025-09-18 10:39:45
-->
<template>
    <div :class="$style['router-entry-view']" class="min-h-0">
        <div :class="$style['v-body']">
            <div v-if="banner" :class="[$style['banner'], $style['row']]">
                <a :class="$style['banner--inner']" target="_blank" :href="banner.link">
                    <img :src="banner.image" alt="" />
                </a>
            </div>
            <UnitStartEntry
                @triggerAppStart="triggerAppStart"
                @createEmptyPage="createEmptyPage"
                @editorPageData="editorPageData"
            />
            <slot></slot>
        </div>
        <div :class="$style['v-footer']">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { RouterEnterViewBaseProps } from "./index";

import { UeBuilderStorehouseBaseKey } from "../../plugin/injection-key";
import UnitStartEntry from "../unit-start-entry";

const UeBuilderStorehouse = inject(UeBuilderStorehouseBaseKey);

defineOptions({ name: "RouterEnterView" });
const _props = withDefaults(defineProps<RouterEnterViewBaseProps>(), {});

function triggerAppStart() {
    void UeBuilderStorehouse?.changeWorkbenchState("composer");
}

function createEmptyPage() {
    void UeBuilderStorehouse?.changeWorkbenchState("editing", { data: "测试用空白数据" });
}

function editorPageData(data: string) {
    void UeBuilderStorehouse?.changeWorkbenchState("editing", { data });
}
</script>
<style lang="scss" module>
.router-entry-view {
    display: grid;
    overflow: auto;

    height: 100%;

    grid-template-rows: 1fr auto;
    .row {
        padding: 20px 50px;
    }
    .banner--inner {
        display: block;
        overflow: hidden;

        border-radius: 10px;
    }
}
</style>
