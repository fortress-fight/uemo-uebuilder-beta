<!--
 * @Description: 列表模块
 * @Author: F-Stone
 * @LastEditTime: 2025-07-30 11:32:28
-->
<template>
    <div :class="$style['unit-list-module']" :data-type="type">
        <div :class="$style['m-inner-wrapper']">
            <div :class="$style['m-head']" class="flex justify-between items-center">
                <div class="state--pos-left">
                    <div :class="$style['m-title']">
                        {{ title }}
                    </div>
                </div>
                <div class="state--pos-right">
                    <div v-if="operList" :class="$style['oper-list']" class="flex gap-6">
                        <div
                            v-for="(item, index) in operList"
                            :key="index"
                            :class="$style['oper-item']"
                            class="flex items-center"
                            @click="emit('operTrigger', item.type)"
                        >
                            <span class="text">{{ item.label }}</span>
                            <UeElIcon :class="$style['ic']" v-if="item.arrow" name="icon-youjiantou" class="ml-1" />
                        </div>
                    </div>
                </div>
            </div>
            <div :class="$style['m-body']" class="relative">
                <div v-if="sortCondition" :class="$style['m-sort-wrapper']" class="flex">
                    <button
                        :class="$style['m-sort-item']"
                        v-for="(item, index) in sortCondition.list"
                        :key="index"
                        :data-active="sortCondition.value === item.type"
                        @click="emit('sortTrigger', item.type)"
                    >
                        <span class="text">{{ item.label }}</span>
                    </button>
                </div>
                <div v-if="list" :class="$style['m-list']">
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
    </div>
</template>
<script lang="ts" setup>
import type { UnitListModuleBaseProps } from "./index";

defineOptions({ name: "UnitListModule" });

const _props = withDefaults(defineProps<UnitListModuleBaseProps>(), {});
const emit = defineEmits<{ (e: "operTrigger" | "sortTrigger", type: string): void }>();

const { t } = useI18n();
</script>
<style lang="scss" module>
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
    }
    .m-title {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;

        color: var(--editor-color-text);
    }
    .m-placeholder {
        width: 100%;
        height: 100%;
        padding: 70px 0;

        border: 1px dashed #ccc;
        border-radius: 10px;

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

        transition: color 0.26s ease;

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

        gap: 40px 20px;
        .list-item {
            &:hover {
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
    }
}
.unit-list-module[data-type="user-recent"] {
    .m-inner-wrapper {
        display: grid;
    }
    .m-body {
        overflow: hidden;

        min-height: 236px;

        border-radius: 10px;
    }
    .m-list {
        grid-template-columns: repeat(5, 1fr);
        .list-item:nth-of-type(5) ~ .list-item {
            display: none !important;
        }
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
</style>
