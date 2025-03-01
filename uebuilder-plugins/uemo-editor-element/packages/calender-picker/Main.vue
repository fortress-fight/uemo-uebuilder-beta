<!--
 * @Description: 日历选择器
 * @Author: F-Stone
 * @LastEditTime: 2025-03-01 18:48:23
-->
<template>
    <div :class="$style['calender-picker']" :data-type="currentPanel">
        <div :class="$style['panel-head']" class="grid justify-between items-center">
            <div :class="$style['btn--tab-month']" class="flex justify-center items-center" @click="tabTime('sub')">
                <UeElIcon :class="$style['ic']" name="icon-zuojiantou" />
            </div>
            <div :class="$style['year-month']" class="flex justify-center">
                <button :class="$style['btn--tab-panel']" class="flex items-center" @click="tabCurrentPanel()">
                    {{ calenderTitle }}
                </button>
            </div>
            <div :class="$style['btn--tab-month']" class="flex justify-center items-center" @click="tabTime('add')">
                <UeElIcon :class="$style['ic']" name="icon-youjiantou" />
            </div>
        </div>
        <div :class="$style['panel-body']" :data-type="currentPanel">
            <template v-if="currentPanel == 'day'">
                <div :class="$style['head']" class="grid grid-cols-7">
                    <div v-for="(item, index) in WEEK" :key="index" :class="$style['cell']">
                        {{ item }}
                    </div>
                </div>
                <div :class="$style['body']" class="grid grid-cols-7 gap-1">
                    <div
                        v-for="(item, index) in calendarData.days"
                        :key="index"
                        :class="$style['cell']"
                        :data-ready="!!item.isReady"
                        :data-active="!!item.active"
                        :data-is-today="!!item.isToday"
                        @click="updateDate('day', item.date)"
                    >
                        {{ item.num }}
                    </div>
                </div>
            </template>
            <template v-if="currentPanel == 'month'">
                <div
                    :class="$style['body']"
                    class="grid grid-cols-4 grid-rows-4 gap-1 h-full justify-center items-center"
                >
                    <div
                        v-for="(item, index) in calendarData.months"
                        :key="index"
                        :class="$style['cell']"
                        class="justify-self-center"
                        :data-ready="!!item.isReady"
                        :data-active="!!item.active"
                        :data-is-today="!!item.isToday"
                        @click="updateDate('month', item.date)"
                    >
                        {{ MONTH[item.num] }}
                    </div>
                </div>
            </template>
            <template v-if="currentPanel == 'year'">
                <div
                    :class="$style['body']"
                    class="grid grid-cols-4 grid-rows-4 gap-1 h-full justify-center items-center"
                >
                    <div
                        v-for="(item, index) in calendarData.years"
                        :key="index"
                        :class="$style['cell']"
                        class="justify-self-center"
                        :data-ready="!!item.isReady"
                        :data-active="!!item.active"
                        :data-is-today="!!item.isToday"
                        @click="updateDate('year', item.date)"
                    >
                        {{ item.num }}
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { UeElCalenderPickerBaseProps, CalenderData, CalenderPanelType } from "./index";

import { generateCalenderData, addTime, subTime } from "./utils/helper";

defineOptions({ name: "UeElCalenderPicker" });

const { t } = useI18n();

const _prop = withDefaults(defineProps<UeElCalenderPickerBaseProps>(), {});
const valueRef = defineModel<Date>("value", { required: false, default: new Date() });

const currentDate = ref<Date>(new Date());
const currentPanel = ref<CalenderPanelType>("day");
const calendarData = ref<CalenderData>({ year: "", month: "", days: [], months: [], years: [] });

const WEEK = computed(() => [
    t("WEEK_DAY"),
    t("WEEK_MONDAY"),
    t("WEEK_TUESDAY"),
    t("WEEK_WEDNESDAY"),
    t("WEEK_THURSDAY"),
    t("WEEK_FRIDAY"),
    t("WEEK_SATURDAY"),
]);
const MONTH = computed(() => [
    t("MONTH_JANUARY"),
    t("MONTH_FEBRUARY"),
    t("MONTH_MARCH"),
    t("MONTH_APRIL"),
    t("MONTH_MAY"),
    t("MONTH_JUNE"),
    t("MONTH_JULY"),
    t("MONTH_AUGUST"),
    t("MONTH_SEPTEMBER"),
    t("MONTH_OCTOBER"),
    t("MONTH_NOVEMBER"),
    t("MONTH_DECEMBER"),
]);

const calenderTitle = computed(() => {
    const { years, month, year } = calendarData.value;

    if (currentPanel.value === "year") {
        return `${years[0].num} - ${years[years.length - 1].num}`;
    }
    if (currentPanel.value === "month") {
        return `${year}`;
    }
    if (currentPanel.value === "day") {
        return `${year} - ${month}`;
    }
    return "";
});

/**
 * 更新日历数据
 */
function updateCalender(data: Date) {
    calendarData.value = generateCalenderData(data, valueRef.value);
}

function tabCurrentPanel(type?: CalenderPanelType) {
    if (type) {
        currentPanel.value = type;
        return;
    }

    if (currentPanel.value === "month") {
        currentPanel.value = "year";
    } else if (currentPanel.value === "day") {
        currentPanel.value = "month";
    }
}

function updateDate(type: CalenderPanelType, date: Date) {
    if (type === "day") {
        valueRef.value = date;
    } else if (type === "month") {
        currentDate.value = date;
        tabCurrentPanel("day");
    } else if (type === "year") {
        currentDate.value = date;
        tabCurrentPanel("month");
    }
}

function tabTime(type: "add" | "sub") {
    let resultDate: Date | undefined;
    if (type === "add") {
        resultDate = addTime(currentPanel.value, currentDate.value);
    } else {
        resultDate = subTime(currentPanel.value, currentDate.value);
    }
    if (resultDate) {
        currentDate.value = resultDate;
    }
}

watch(valueRef, (newDate) => updateCalender(newDate));
watch(currentDate, (newDate) => updateCalender(newDate), { immediate: true });

onBeforeMount(() => {
    currentDate.value = valueRef.value || new Date();
});
</script>
<style lang="scss" module>
.calender-picker {
    position: relative;
    z-index: 30;

    min-width: 300px;
    padding: 20px;

    border-radius: var(--ue-border-radius--panel);
    background-color: #fff;
    box-shadow: var(--ue-shadow--lv2);
    &[data-type="day"] {
        .panel-body {
            .cell {
                --dot-bottom: 4px;
                width: unset;
                &[data-active] {
                    --dot-bottom: 5px;
                }
            }
        }
    }
    &[data-type="year"] {
        .panel-head {
            .btn--tab-panel {
                cursor: unset;
                &:hover {
                    background-color: rgba(#000, 0);
                }
            }
        }
    }
    .panel-head {
        margin-bottom: 10px;

        grid-template-columns: auto 1fr auto;
        .year-month {
            font-size: 15px;
            line-height: 1;

            position: relative;
            z-index: 10;

            text-align: center;
        }
        .btn--tab-panel {
            height: 30px;
            padding: 0 6px;

            border-radius: 3px;
            &:hover {
                color: color(var(--ue-font-color--deeper));
                background-color: rgba(#000, 0.05);
            }
        }
        .btn--tab-month {
            @include square(30px);
            font-size: 18px;

            cursor: pointer;

            color: color(var(--ue-font-color));
            border-radius: 3px;
            &:hover {
                color: color(var(--ue-font-color--deeper));
                background-color: rgba(#000, 0.05);
            }
        }
    }
    .panel-body {
        height: 260px;
        .head {
            .cell {
                font-size: 13px;

                color: color(var(--ue-font-color--deeper));
                &:hover {
                    background-color: rgba(#000, 0);
                }
            }
        }
        .cell {
            --dot-bottom: 7px;
            font-size: 12px;

            display: flex;

            width: 50px;
            max-width: 100%;

            cursor: pointer;

            color: color(var(--ue-font-color));
            border-radius: 4px;

            align-items: center;
            aspect-ratio: 1 / 1;
            justify-content: center;
            &[data-ready="true"] {
                color: color(var(--ue-font-color--deeper));
            }
            &:hover {
                background-color: rgba(#000, 0.1);
            }
            &[data-is-today="true"],
            &[data-active="true"] {
                position: relative;
                &::after {
                    @include square(4px);

                    position: absolute;
                    bottom: var(--dot-bottom);
                    left: 50%;

                    margin: auto;

                    content: "";
                    transform: translateX(-50%);

                    border-radius: 50%;
                    background-color: var(--dot-color);
                }
            }
            &[data-is-today="true"] {
                --dot-color: #{color(var(--ue-color--yellow))};
            }
            &[data-active="true"] {
                --dot-color: #fff;
                color: #fff;
                background-color: color(var(--ue-color--active));
            }
            &[data-disable="true"] {
                color: color(var(--ue-font-color), 0.5);
                background-color: rgba(#000, 0);
            }
        }
    }
}
</style>
