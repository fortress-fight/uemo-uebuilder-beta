<!--
 * @Description: Tab 卡片
 * @Author: F-Stone
 * @LastEditTime: 2025-02-24 18:22:25
-->
<template>
    <div
        ref="rootDomRef"
        :class="$style['tab-panel']"
        class="relative overflow-hidden"
        :data-theme="theme"
        :style="{ '--ue-el-tab-panel-min-height': minHeight, '--ue-el-tab-panel-max-height': maxHeight }"
    >
        <div v-if="!hideHead && cards.length > 1" :class="$style['panel-head']">
            <div :class="$style['nav-list']" class="relative flex overflow-hidden">
                <div
                    v-for="(item, index) in cards"
                    :key="index"
                    ref="navItemsRef"
                    :class="$style['nav-item']"
                    :data-name="item.name"
                    :data-active="item.name === activeCardName"
                    @click="tabTo(item.name)"
                >
                    <slot :name="'BeforeNav' + item.name"></slot>
                    <span>{{ item.title }}</span>
                </div>
            </div>
            <div ref="bar" :class="$style['nav-state-bar']" class="relative">
                <div ref="barInnerRef" :class="$style['bar--inner']" class="relative"></div>
            </div>
        </div>
        <div :class="$style['panel-body']">
            <div ref="cardListRef" :class="$style['card-list']" class="relative overflow-hidden">
                <div
                    v-for="(item, index) in cards"
                    :key="index"
                    ref="cardItemsRef"
                    :data-name="item.name"
                    :data-index="index"
                    :class="$style['card-item']"
                    class="overflow-auto"
                >
                    <slot :name="item.name"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElTabCardBaseProps } from "./index";
import mitt from "@stone/uemo-editor-utils/lib/mitt";
import { gsap } from "@stone/uemo-editor-utils/lib/gsap";

const mittManage = mitt<{ resize: undefined }>();

defineOptions({ name: "UeElTabCard" });

const rootDomRef = useTemplateRef("rootDomRef");
const barInnerRef = useTemplateRef("barInnerRef");
const navItemsRef = useTemplateRef<HTMLElement[]>("navItemsRef");
const cardListRef = useTemplateRef("cardListRef");
const cardItemsRef = useTemplateRef<HTMLElement[]>("cardItemsRef");

const prop = withDefaults(defineProps<UeElTabCardBaseProps>(), { theme: "theme-1" });
const emit = defineEmits<{
    (ev: "changeStart" | "changeEnd", card: string): void;
    (ev: "changing"): void;
}>();

const defaultCardName = computed(() => prop.defaultCard || prop.cards[0].name);
const lastCardName = ref<string>("");
const activeCardName = ref<string>("");

// 辅助函数：使用原生语法获取所有前一个兄弟节点
function getPreviousSiblings(el: Element): Element[] {
    const siblings: Element[] = [];
    let cur = el.previousElementSibling;
    while (cur) {
        siblings.push(cur);
        cur = cur.previousElementSibling;
    }
    return siblings;
}

/**
 * 切换 Nav
 * @param name panel 名称
 * @param duration 动画时长
 */
function tabNav(name: string, duration = 0.26) {
    const activeNav = navItemsRef.value?.find((item) => item.dataset.name === name);
    if (!activeNav || !barInnerRef.value) return;
    gsap.to(barInnerRef.value, {
        width: activeNav.offsetWidth,
        left: activeNav.offsetLeft,
        duration,
        ease: "easeOutQuart",
    });
}

/**
 * 切换到指定的 card
 * @param name panel 名称
 * @param duration 动画时长
 */
function tabCard(name: string, duration = 0.36) {
    const cardItems = cardItemsRef.value;
    const activeCardDom = cardItems?.find((item) => item.dataset.name === name);
    const lastCardDom = cardItems?.find((item) => item.dataset.name === lastCardName.value);
    const cardListDom = cardListRef.value;
    if (!activeCardDom || !cardListDom) return;

    const tl = gsap.timeline({
        onStart() {
            gsap.set(cardItems, { position: "absolute" });
            emit("changeStart", name);
        },
        onUpdate: () => emit("changing"),
        onComplete() {
            gsap.set(activeCardDom, { position: "relative" });
            gsap.set(cardListDom, { height: undefined });
            emit("changeEnd", name);
        },
        defaults: { duration, ease: "easeOutQuart" },
    });
    tl.to(activeCardDom, { left: "0" });

    const prevDoms = getPreviousSiblings(activeCardDom);
    cardItems
        ?.filter((card) => card !== activeCardDom)
        .forEach((card) => {
            const distance = prevDoms.includes(card) ? "-100%" : "100%";
            if (card === lastCardDom) tl.to(card, { left: distance }, 0);
            else tl.set(card, { left: distance }, 0);
        });
    tl.to(cardListDom, { height: () => activeCardDom.offsetHeight }, 0);
}

/**
 * 切换
 * @param name panel 名称
 * @param duration 动画时长
 */
function tabTo(name: string, duration = 0.26) {
    if (activeCardName.value === name) return;
    if (!prop.cards.some((item) => item.name === name)) return;
    lastCardName.value = activeCardName.value;
    activeCardName.value = name;
    tabNav(name, duration);
    tabCard(name, duration);
}

function updateSize() {
    mittManage.emit("resize");
}

const rootDomWidth = ref<number>();
const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
        if (entry.target !== rootDomRef.value) continue;
        rootDomWidth.value = entry.contentRect.width;
    }
});

watch(rootDomWidth, updateSize);

onMounted(() => {
    tabTo(defaultCardName.value, 0);
    mittManage.on("resize", () => tabNav(activeCardName.value, 0));
    if (rootDomRef.value) resizeObserver.observe(rootDomRef.value);
});

onBeforeUnmount(() => {
    resizeObserver.disconnect();
});

defineExpose({ tabTo, updateSize, activeCardName });
</script>
<style lang="scss" module>
.tab-panel {
    width: 100%;
}
.tab-panel[data-theme="theme-1"] {
    .nav-list {
        font-size: 13px;
        font-weight: 400;
        line-height: 26px;

        color: color(var(--ue-font-color));
    }
    .nav-item {
        flex: 1 0 auto;

        width: 1px;
        padding: 7px 0;

        cursor: pointer;
        transition: color 0.36s ease;
        text-align: center;
        &[data-active] {
            color: color(var(--ue-font-color--deeper));
        }
    }
    .nav-state-bar {
        width: 100%;
        height: 1px;

        background: color(var(--ue-border-color));
        .bar--inner {
            top: 0;

            width: 0;
            height: 100%;

            background: color(var(--ue-font-color--deeper));
        }
    }
}
.card-item {
    position: absolute;
    top: 0;
    left: 100%;

    width: 100%;
    min-height: var(--ue-el-tab-panel-min-height);
    max-height: var(--ue-el-tab-panel-max-height);

    transform: translate3d(0, 0, 0);

    will-change: left;
    &[data-active] {
        position: relative;
        left: 0;
    }
}
</style>
