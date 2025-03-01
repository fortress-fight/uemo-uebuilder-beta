import type { DateUnit, CalenderData, CalenderPanelType } from "../index";

import * as dateFns from "@stone/uemo-editor-utils/lib/date-fns";

/**
 * 生成日历数据
 *
 * @param currentValue - 当前操作的日期，用于生成月份和年份数据
 * @param selectedValue - 当前选中的日期，用于标记激活状态
 * @returns 包含日期、月份、年份信息的日历数据对象
 */
export function generateCalenderData(currentValue: Date, selectedValue: Date): CalenderData {
    const year = currentValue.getFullYear();
    const month = dateFns.getMonth(currentValue) + 1;
    const startDate = dateFns.startOfMonth(currentValue);
    const endDate = dateFns.endOfMonth(currentValue);
    const daysInMonth = dateFns.eachDayOfInterval({ start: startDate, end: endDate });
    const firstWeek = dateFns.getDay(daysInMonth[0]);

    // 辅助函数：生成 day 对象
    const createDay = (date: Date, isReady: boolean, extra: Partial<DateUnit> = {}): DateUnit => ({
        date,
        num: dateFns.getDate(date),
        isReady,
        ...extra,
    });

    const days: CalenderData["days"] = [];

    // 填充上个月的日期
    for (let i = firstWeek - 1; i >= 0; i--) {
        const prevDate = dateFns.sub(daysInMonth[0], { days: i + 1 });
        days.push(createDay(prevDate, false));
    }
    // 填充当前月份的日期
    days.push(
        ...daysInMonth.map((date) =>
            createDay(date, true, {
                isToday: dateFns.isSameDay(new Date(), date),
                active: dateFns.isSameDay(selectedValue, date),
            })
        )
    );
    // 填充下个月的日期，直到 42 个格子
    const remainingSlots = 42 - days.length;
    for (let i = 0; i < remainingSlots; i++) {
        const nextDate = dateFns.add(daysInMonth[daysInMonth.length - 1], { days: i + 1 });
        days.push(createDay(nextDate, false));
    }

    // 生成月份数据（共 16 个月）
    const months: CalenderData["months"] = [];
    for (let i = 0; i < 16; i++) {
        const itemMonth = dateFns.add(new Date(year, 0, 1), { months: i });
        months.push({
            date: itemMonth,
            num: dateFns.getMonth(itemMonth),
            isReady: dateFns.isSameYear(itemMonth, currentValue),
            isToday: dateFns.isSameMonth(new Date(), itemMonth),
            active: dateFns.isSameMonth(itemMonth, selectedValue),
        });
    }

    // 生成年份数据（共 16 个年份，从当前年份前 4 年开始）
    const years: CalenderData["years"] = [];
    for (let i = 0; i < 16; i++) {
        const itemYear = dateFns.add(new Date(year, 0, 1), { years: i - 4 });
        years.push({
            date: itemYear,
            num: dateFns.getYear(itemYear),
            isReady: true,
            isToday: dateFns.isSameYear(new Date(), itemYear),
            active: dateFns.isSameYear(itemYear, selectedValue),
        });
    }

    return {
        year: year + "",
        month: month >= 10 ? month + "" : "0" + month,
        days,
        months,
        years,
    };
}

/**
 * 增加时间
 *
 * @param type - 时间面板类型（day、month、year）
 * @param currentValue - 基准日期
 * @returns 新的日期（增加的时间后）
 */
export function addTime(type: CalenderPanelType, currentValue: Date) {
    const amountMap = {
        day: { months: 1 },
        month: { years: 1 },
        year: { years: 4 },
    };
    return dateFns.add(currentValue, amountMap[type]);
}

/**
 * 减少时间
 *
 * @param type - 时间面板类型（day、month、year）
 * @param currentValue - 基准日期
 * @returns 新的日期（减少的时间后）
 */
export function subTime(type: CalenderPanelType, currentValue: Date) {
    const amountMap = {
        day: { months: 1 },
        month: { years: 1 },
        year: { years: 4 },
    };
    return dateFns.sub(currentValue, amountMap[type]);
}
