<!--
 * @Description: 资源库面板
 * @Author: F-Stone
 * @LastEditTime: 2025-03-12 13:26:53
-->
<template>
    <div :class="$style['library-panel']" :data-size="panelSize">
        <UeElLoading v-if="loading" />
        <div :class="$style['panel-head']" :data-dragger-target="draggable">
            <div :class="$style['nav-list']" class="relative flex overflow-hidden">
                <div
                    v-for="(item, index) in cards"
                    :key="index"
                    ref="navItems"
                    :class="$style['nav-item']"
                    class="flex justify-center items-center"
                    :data-name="item.name"
                    :data-active="item.name === activeCardName"
                    :data-dragger-disable="draggable"
                    @click="tabTo(item.name)"
                >
                    <slot :name="'BeforeNav' + item.name"></slot>
                    <UeElIcon v-if="item.icon" :name="item.icon" :class="$style['ic']" :size="item.iconSize" />
                    <span :class="$style['text']">{{ item.title }}</span>
                </div>
            </div>
            <div :class="$style['nav-state-bar']" class="relative">
                <div ref="barInner" :class="$style['bar--inner']" class="absolute"></div>
            </div>
        </div>
        <div :class="$style['panel-body']">
            <div ref="cardList" :class="$style['card-list']" class="relative overflow-hidden">
                <template v-for="(item, index) in cards" :key="index">
                    <SubPanel
                        v-if="item.name === activeCardName"
                        ref="cardItems"
                        :max-height="maxHeight"
                        :min-height="minHeight"
                        :category="item.category"
                    >
                        <template #default="{ activeCategory }">
                            <slot :name="item.name" :active-category="activeCategory"></slot>
                        </template>
                    </SubPanel>
                </template>
            </div>
        </div>
        <div v-if="hasPanelFooter" :class="$style['panel-footer']">
            <slot name="panelFooter"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElLibraryPanelBaseProps } from "./index";

import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

import SubPanel from "./sub-components/SubPanel.vue";

defineOptions({ name: "UeElLibraryPanel" });
const prop = withDefaults(defineProps<UeElLibraryPanelBaseProps>(), {
    loading: false,
    theme: "theme-1",
    draggable: true,
    minHeight: "50px",
    maxHeight: "500px",
});

const barInner = useTemplateRef("barInner");
const navItems = useTemplateRef("navItems");
const cardItems = useTemplateRef<InstanceType<typeof SubPanel>[]>("cardItems");
const slotManage = useSlots();

const hasPanelFooter = computed(() => {
    return slotManage.panelFooter?.().length;
});

/**
 * 当前激活的卡片名称
 */
const activeCardName = ref<string>("");
watch(activeCardName, (newVal) => {
    cardItems.value?.forEach((item) => item.scrollToTop());
    tabNav(newVal);
});
watch(
    () => prop.defaultCard,
    (newVal) => {
        activeCardName.value = newVal || prop.cards[0]?.name;
    }
);
onBeforeMount(() => {
    const defaultCardName = prop.defaultCard;
    if (defaultCardName && prop.cards.find((item) => item.name === defaultCardName)) {
        activeCardName.value = defaultCardName;
    } else {
        activeCardName.value = prop.cards[0]?.name;
    }
});

/**
 * 切换 Nav
 * @param name panel 名称
 */
function tabNav(name: string) {
    const activeNav = navItems.value?.find((item) => {
        return item.dataset.name === name;
    });

    if (!activeNav || !barInner.value) return;

    const { offsetLeft: left, offsetWidth: width } = activeNav;
    gsap.set(barInner.value, { width, left });
}

/**
 * 切换卡片
 * @param name 卡片名称
 */
function tabTo(name = "") {
    activeCardName.value = name;
}

onMounted(() => {
    requestAnimationFrame(() => {
        tabNav(activeCardName.value);
    });
});

defineExpose({ tabTo });
</script>
<style lang="scss" module>
.library-panel {
    position: relative;

    overflow: hidden;

    width: var(--ue-library-panel-width);
    min-width: var(--ue-library-panel-width);

    border-radius: var(--ue-border-radius--panel);
    background-color: #fff;
    box-shadow: var(--ue-shadow--lv2);
    &[data-size="large"] {
        width: var(--ue-library-panel-width--large);
    }
}
.panel-head {
    padding-top: 26px;
    .nav-list {
        padding: 0 26px;
    }
    .nav-item {
        font-size: 14px;
        line-height: 18px;

        position: relative;

        margin-right: 20px;
        padding: 0 6px;
        padding-bottom: 18px;

        cursor: pointer;

        color: color(var(--ue-font-color));
        .ic {
            margin-right: 6px;
            & + .text {
                padding-right: 4px;
            }
        }
        &[data-active="true"] {
            color: color(var(--ue-font-color--deeper));
        }
        &:last-child {
            margin-right: 0;
        }
    }
    .nav-state-bar {
        width: 100%;
        height: 1px;

        background: color(var(--ue-border-color));
        .bar--inner {
            bottom: 0;

            width: 0;
            height: 2px;

            background: color(var(--ue-font-color--deeper));
        }
    }
}
.panel-footer {
    padding: 20px;
    padding-top: 0;
}
</style>
