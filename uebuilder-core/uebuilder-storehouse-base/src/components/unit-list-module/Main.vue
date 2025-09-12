<!--
 * @Description: 列表模块
 * @Author: F-Stone
 * @LastEditTime: 2025-09-12 16:15:23
-->
<template>
    <div :class="$style['unit-list-module']" :data-type="type">
        <div :class="$style['m-inner-wrapper']">
            <div :class="$style['m-head']" class="flex justify-between items-center">
                <div class="state--pos-left flex items-center">
                    <div :class="$style['m-title']">
                        {{ title }}
                    </div>
                    <div v-if="pages" :class="$style['m-total']" class="flex items-center">
                        <p
                            :class="$style['text']"
                            v-html="
                                t('UEBUILDER_USER_STOREHOUSE_TOTAL_PAGE', {
                                    total: !pages?.itemTotal || loading ? '--' : pages.itemTotal,
                                })
                            "
                        ></p>
                    </div>
                    <button v-if="allowRefresh" :class="$style['btn--refresh']" @click="emit('refresh')">
                        <UeElIcon name="icon-app-reload" :size="15" />
                    </button>
                </div>
                <div class="state--pos-right">
                    <div v-if="operList" :class="$style['oper-list']" class="flex gap-6">
                        <component
                            v-for="(item, index) in operList"
                            :key="index"
                            :class="$style['oper-item']"
                            class="flex items-center"
                            @click="emit('operTrigger', item.type)"
                            :is="item.link ? 'a' : 'button'"
                            :href="item.link"
                            target="_blank"
                        >
                            <span class="text">{{ item.label }}</span>
                            <UeElIcon :class="$style['ic']" v-if="item.arrow" name="icon-youjiantou" class="ml-1" />
                        </component>
                    </div>
                </div>
            </div>
            <div :class="$style['m-body']" class="relative">
                <div v-if="sortCondition" :class="$style['m-sort-wrapper']" class="flex">
                    <button
                        :class="$style['m-sort-item']"
                        v-for="(item, index) in sortCondition.list"
                        :key="index"
                        :data-active="sortType === item.type"
                        @click="emit('sortTrigger', item.type)"
                    >
                        <span class="text">{{ item.label }}</span>
                    </button>
                </div>
                <div :class="$style['m-body--inner']" class="relative">
                    <div v-if="list && !loading" :class="$style['m-list']">
                        <div v-for="(item, index) in list" :key="index" :class="$style['list-item']">
                            <div :class="$style['item-thumb--wrapper']">
                                <div :class="$style['item-thumb']">
                                    <img :src="item.thumb" alt="" />
                                    <div :class="$style['item-mask']" class="flex items-center justify-center">
                                        <button v-if="type?.startsWith('user')" :class="$style['item-btn--use']">
                                            <span class="text">{{ t("UNIT_USE_NOW") }}</span>
                                        </button>
                                        <button v-else :class="$style['item-btn--preview']">
                                            <span class="text">{{ t("UNIT_PREVIEW_NOW") }}</span>
                                        </button>
                                    </div>
                                </div>
                                <div :class="$style['oper-list']">
                                    <template v-if="type === 'user-default' || type === 'user-recent'">
                                        <button
                                            :class="$style['oper-item']"
                                            data-type="edit"
                                            @click.stop="editItem(item)"
                                        >
                                            <UeElIcon name="icon-bianji" :size="15" />
                                        </button>
                                        <button
                                            :class="$style['oper-item']"
                                            data-type="remove"
                                            @click.stop="removeItem(item)"
                                        >
                                            <UeElIcon name="icon-shanchu" />
                                        </button>
                                    </template>
                                    <template v-else-if="type === 'user-collect'">
                                        <button
                                            :class="$style['oper-item']"
                                            class="flex justify-center items-center"
                                            data-type="collect"
                                            @click.stop="toggleCollect(item)"
                                        >
                                            <UeElIcon v-if="item.collectedId === '-1'" name="icon-app-start" />
                                            <UeElIcon v-else name="icon-app-start-fill" />
                                        </button>
                                    </template>
                                </div>
                            </div>
                            <div :class="$style['item-info']">
                                <div :class="$style['item-title']">
                                    {{ item.title }}
                                </div>
                                <div v-if="item.lastEditTime" :class="$style['item-time']">
                                    <span class="text">编辑于 {{ item.lastEditTime }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else :class="$style['m-placeholder']" class="flex flex-col items-center justify-center">
                        <div :class="$style['placeholder-title']">
                            {{ placeholder.title }}
                        </div>
                        <div :class="$style['placeholder-desc']">
                            {{ placeholder.desc }}
                        </div>
                    </div>
                    <UeElLoading v-if="loading" type="circle" bg="rgb(245 246 251)" />
                </div>
            </div>
            <div class="m-footer">
                <div
                    v-if="pages && pages.current < pages.total && !loading"
                    ref="loadMoreBar"
                    class="flex items-center"
                    :class="$style['load-more-bar']"
                >
                    <UeElIcon :class="$style['ic']" :size="30" name="icon-app-loading" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UnitListModuleBaseProps, UnitListModuleItem } from "./index";

defineOptions({ name: "UnitListModule" });

const _props = withDefaults(defineProps<UnitListModuleBaseProps>(), {});
const emit = defineEmits<{
    (e: "operTrigger" | "sortTrigger", type: string): void;
    (e: "loadMore" | "refresh"): void;
    (e: "itemOperTrigger", param: { type: "editor" | "delete" | "toggleCollect"; data: { id: string } }): void;
}>();

const { t } = useI18n();

const loadMoreBar = useTemplateRef("loadMoreBar");

let observer: IntersectionObserver | null = null;
function createFooterObserver() {
    return new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio < 0.5) return;
                emit("loadMore");
            });
        },
        { threshold: [0.5] }
    );
}

watch(
    loadMoreBar,
    (newVal) => {
        requestAnimationFrame(() => {
            // 监控滚动到底部的行为
            if (newVal) {
                observer = createFooterObserver();
                observer.observe(newVal);
            } else {
                observer?.disconnect();
            }
        });
    },
    { immediate: true }
);

function removeItem(item: UnitListModuleItem) {
    emit("itemOperTrigger", { type: "delete", data: { id: item.id } });
}

function editItem(item: UnitListModuleItem) {
    emit("itemOperTrigger", { type: "editor", data: { id: item.id } });
}

function toggleCollect(item: UnitListModuleItem) {
    emit("itemOperTrigger", { type: "toggleCollect", data: { id: item.id } });
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
.unit-list-module {
    .m-head {
        line-height: 24px;

        margin-bottom: 20px;
        .oper-item {
            font-size: 14px;
            line-height: 18px;

            cursor: pointer;

            color: var(--theme-layout-row);
            .ic {
                display: block;

                margin-top: -2px;
                margin-left: 7px;

                transition: 0.26s;
            }
            &:hover {
                .ic {
                    transform: translateX(6px);
                }
            }
        }
        .btn--refresh {
            @include square(24px);
            display: flex;

            margin-top: -1px;
            margin-left: 10px;

            cursor: pointer;
            transition: 0.26s ease;

            color: var(--editor-c-gray);

            align-items: center;
            justify-content: center;
            &:hover {
                color: var(--editor-color-text);
            }
        }
    }
    .m-title {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;

        color: var(--editor-color-text);
    }
    .m-total {
        font-size: 12px;
        font-weight: 400;
        line-height: 24px;

        margin-left: 20px;

        color: var(--editor-c-gray);
        strong {
            font-weight: 700;

            margin: 0 0.2em;

            color: var(--editor-color-text);
        }
    }
    .m-placeholder {
        position: relative;

        width: 100%;
        height: 100%;
        min-height: 245px;
        padding: 70px 0;

        border: 1px dashed #ccc;
        border-radius: inherit;

        grid-area: 1 / 1 / 2 / 6;
        .placeholder-title {
            font-size: 24px;
            font-weight: 700;

            margin-bottom: 4px;
        }
        .placeholder-desc {
            font-size: 13px;
            line-height: 20px;

            color: var(--editor-c-gray);
        }
    }
    .m-sort-wrapper {
        margin-bottom: 20px;

        color: var(--editor-c-gray);

        gap: 20px;
    }
    .m-sort-item {
        font-size: 12px;

        padding: 4px 10px;

        transition: 0.26s ease;

        border-radius: 4px;
        &:hover {
            color: var(--editor-color-text);
        }
        &[data-active="true"] {
            color: #fff;
            background-color: var(--theme-layout-row);
        }
    }
    .m-list {
        display: grid;

        gap: 20px;
        .list-item {
            &:hover {
                .oper-list {
                    opacity: 1;
                }
                .item-mask {
                    opacity: 1;
                }
            }
            .item-thumb {
                @include image-placeholder(1200, 710);
                position: relative;

                border-radius: 10px;
            }
            .item-mask {
                @include ab-cover;
                transition: 0.26s ease;

                opacity: 0;
                background-color: rgb(0 0 0 / 15%);
            }
            .item-btn--use,
            .item-btn--preview {
                font-size: 13px;

                padding: em(8px, 14px) em(18px, 14px);

                color: #fff;
                border-radius: 4px;
            }
            .item-btn--preview {
                background-color: var(--theme-layout-col);
            }
            .item-btn--use {
                background-color: var(--theme-layout-row);
            }
            .item-info {
                @include ellipse();

                margin-top: 14px;
                padding: 0 10px;

                transition: 0.26s ease;

                color: var(---editor-color-text);
            }
            .item-time {
                font-size: 12px;
                line-height: 17px;

                margin-top: 2px;

                transition: 0.26s ease;

                color: var(--c-gray-60);
            }
        }
        .oper-list {
            position: absolute;
            top: min(7%, 15px);
            right: min(4%, 15px);

            transition: 0.26s ease;

            opacity: 0;
            .oper-item {
                font-size: 16px;

                display: block;
                display: flex;

                width: 34px;
                height: 34px;
                margin-bottom: 10px;

                color: #333;
                border-radius: 3px;
                background-color: #fff;
                box-shadow: 0 0 10px rgb(0 0 0 / 0.1);

                align-items: center;
                justify-content: center;
                &:last-child {
                    margin-bottom: 0;
                }
                &[data-type="collect"] {
                    color: #ff7a00;
                }
            }
        }
    }
    .m-body--inner {
        overflow: hidden;

        border-radius: 10px;
    }
}
.unit-list-module[data-type="user-default"],
.unit-list-module[data-type="user-collect"] {
    .m-body--inner {
        min-height: 236px;
    }
}
.unit-list-module[data-type="user-default"],
.unit-list-module[data-type="user-recent"] {
    .m-list {
        grid-template-columns: repeat(5, 1fr);
        .list-item {
            .item-thumb--wrapper {
                position: relative;

                overflow: hidden;

                width: 100%;
                padding: 10px;

                border: 1px solid #c3dafa;
                border-radius: 14px;
                background: #e6f0ff;
            }
        }
    }
}
.unit-list-module[data-type="user-default"] {
    //
}
.unit-list-module[data-type="user-recent"] {
    .m-inner-wrapper {
        display: grid;
    }
    .m-list {
        grid-template-columns: repeat(5, 1fr);
        .list-item:nth-of-type(5) ~ .list-item {
            display: none !important;
        }
        @media screen and (max-width: 1680px) {
            .list-item:nth-of-type(4) ~ .list-item {
                display: none !important;
            }
        }
        @media screen and (max-width: 1440px) {
            .list-item:nth-of-type(3) ~ .list-item {
                display: none !important;
            }
        }
    }
}
.unit-list-module[data-type="user-collect"] {
    .m-list {
        grid-template-columns: repeat(5, 1fr);
        .list-item {
            .item-thumb--wrapper {
                position: relative;
            }
        }
    }
}
.unit-list-module[data-type="newest"] {
    .m-inner-wrapper {
        display: grid;

        min-height: 254px;
        padding: 20px;

        border-radius: 14px;
        background: rgb(245 246 251);

        grid-template-rows: auto 1fr;
    }
    .m-list {
        display: grid;

        gap: 40px 20px;

        grid-template-columns: repeat(6, 1fr);
        .list-item:nth-child(6) ~ .list-item {
            display: none;
        }
        @media screen and (max-width: 1680px) {
            gap: 25px 15px;
            grid-template-columns: repeat(5, 1fr);
            .list-item:nth-child(5) ~ .list-item {
                display: none;
            }
        }
        @media screen and (max-width: 1440px) {
            grid-template-columns: repeat(4, 1fr);
            .list-item:nth-child(4) ~ .list-item {
                display: none;
            }
        }
    }
}
.load-more-bar {
    display: flex;

    width: 100%;
    height: 30px;
    padding: 100px 0 50px;

    color: var(--editor-color-text);

    align-items: center;
    justify-content: center;
    .ic {
        font-size: 30px;

        animation: rotate 2s infinite linear;
    }
}
</style>
