import type { CountUpOptions } from "@stone/uemo-editor-utils/lib/count-up";
import type { UeCounterNumberFactoryParams } from "../index";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import pageStyle from "@stone/uemo-editor-tiptap/src/app.module.scss";

import { CounterNumberEventEventBus } from "./event-bus";

/**
 * 初始化单个计数器元素
 * @param item 计数器 DOM 元素
 * @param dom 父级容器 DOM
 * @param params 计数器参数
 * @param CountUp CountUp 构造器
 * @param Odometer Odometer 构造器
 */
function setupCounterItem(
    item: HTMLElement,
    dom: HTMLElement,
    params: UeCounterNumberFactoryParams,
    CountUp: any,
    Odometer: any
) {
    const textDom = item.querySelector<HTMLElement>("." + pageStyle["counter-number-item-text"]);
    if (!textDom) return;

    // 解析数据属性
    const numList = JSON.parse($(item).attr("data-nums") || "[]");
    if (!Array.isArray(numList) || numList.length < 2) return;
    const useOdometer = $(dom).attr("data-effect") === "odometer";
    const numPad = Math.max(
        Number($(item).attr("data-num-pad") || "0"),
        numList[0]?.length || 0,
        numList[1]?.length || 0
    );
    const duration = Number($(dom).attr("data-duration") || 2.4);

    /**
     * CountUp 配置项
     * @type {CountUpOptions}
     */
    const options: CountUpOptions = {
        startVal: numList[0],
        duration,
        enableScrollSpy: true,
        scrollSpyDelay: 0,
        scrollSpyOnce: true,
        scroller:
            typeof params.scroller === "string"
                ? document.querySelector<HTMLElement>(params.scroller) || window
                : params.scroller || window,
        plugin: useOdometer ? new Odometer({ duration, lastDigitDelay: 0 }) : undefined,
        /**
         * 自定义缓动函数（三次贝塞尔）
         */
        easingFn: function (t, b, c, d) {
            const ts = (t /= d) * t;
            const tc = ts * t;
            return b + c * (tc + -3 * ts + 3 * t);
        },
        /**
         * 格式化数字，补零
         */
        formattingFn(num: number) {
            return num.toString().padStart(Number(numPad || "0"), "0");
        },
    };

    let countUpCtrl: any = new CountUp(textDom, numList[1], options);

    if (countUpCtrl.error) {
        // 控制台输出错误，避免后续事件绑定
        console.error(countUpCtrl.error);
        countUpCtrl = null;
        return;
    }

    /**
     * 启动计数动画
     */
    function updateCounterNumber() {
        countUpCtrl.reset();
        countUpCtrl.start();
    }
    /**
     * 销毁计数器，释放内存
     */
    function destroyCounterNumber() {
        countUpCtrl = null;
    }

    // 事件绑定，确保解绑，防止内存泄漏
    CounterNumberEventEventBus.bind($(dom), "ue.counter-number.update", updateCounterNumber);
    CounterNumberEventEventBus.bind($(dom), "ue.counter-number.destroy", () => {
        destroyCounterNumber();
        CounterNumberEventEventBus.unbind($(dom), "ue.counter-number.update", updateCounterNumber);
    });
}

/**
 * 初始化计数器组件
 * @param dom 容器 DOM
 * @param params 计数器参数
 */
export async function initCounterNumber(dom: HTMLElement, params: UeCounterNumberFactoryParams) {
    const { CountUp, Odometer } = await import("@stone/uemo-editor-utils/lib/count-up");
    const counterList = dom.querySelectorAll<HTMLElement>("." + pageStyle["counter-number-item"]);
    counterList.forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        setupCounterItem(item, dom, params, CountUp, Odometer);
    });
}
