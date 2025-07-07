import { Odometer } from "odometer_countup";

/**
 * 扩展 Window 接口以支持全局滚动函数数组
 */
declare global {
    interface Window {
        onScrollFns?: (() => void)[];
    }
}

/**
 * CountUp 配置选项接口
 */
export interface CountUpOptions {
    // (default)
    startVal?: number; // number to start at (0)
    decimalPlaces?: number; // number of decimal places (0)
    duration?: number; // animation duration in seconds (2)
    useGrouping?: boolean; // example: 1,000 vs 1000 (true)
    useIndianSeparators?: boolean; // example: 1,00,000 vs 100,000 (false)
    useEasing?: boolean; // ease animation (true)
    smartEasingThreshold?: number; // smooth easing for large numbers above this if useEasing (999)
    smartEasingAmount?: number; // amount to be eased for numbers above threshold (333)
    separator?: string; // grouping separator (,)
    decimal?: string; // decimal (.)
    // easingFn: easing function for animation (easeOutExpo)
    easingFn?: (t: number, b: number, c: number, d: number) => number;
    formattingFn?: (n: number) => string; // this function formats result
    prefix?: string; // text prepended to result
    suffix?: string; // text appended to result
    numerals?: string[]; // numeral glyph substitution
    enableScrollSpy?: boolean; // start animation when target is in view
    scrollSpyDelay?: number; // delay (ms) after target comes into view
    scrollSpyOnce?: boolean; // run only once
    onCompleteCallback?: () => any; // gets called when animation completes
    onStartCallback?: () => any; // gets called when animation starts
    plugin?: CountUpPlugin; // for alternate animations
    scroller?: Window | HTMLElement;
}

export declare interface CountUpPlugin {
    render(elem: HTMLElement, formatted: string): void;
}

/**
 * 数字动画计数器类
 * 用于创建平滑的数字计数动画效果
 */
class CountUp {
    version = "2.8.0";

    private defaults: CountUpOptions = {
        startVal: 0,
        decimalPlaces: 0,
        duration: 2,
        useEasing: true,
        useGrouping: true,
        useIndianSeparators: false,
        smartEasingThreshold: 999,
        smartEasingAmount: 333,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
        enableScrollSpy: false,
        scrollSpyDelay: 200,
        scrollSpyOnce: false,
        scroller: window,
    };

    private rAF: number | null = null;
    private startTime: number | null = null;
    private remaining = 0;
    private finalEndVal: number | null = null; // for smart easing
    private useEasing = true;
    private countDown = false;
    private scrollHandler: (() => void) | null = null;
    private scrollSpyTimeout: number | null = null;
    private isDestroyed = false;
    private options: CountUpOptions;

    el: HTMLElement | HTMLInputElement | null = null;
    formattingFn: (num: number) => string;
    easingFn: (t: number, b: number, c: number, d: number) => number;
    error = "";
    startVal = 0;
    duration = 0;
    paused = true;
    frameVal = 0;
    once = false;

    constructor(target: string | HTMLElement | HTMLInputElement, private endVal: number, options?: CountUpOptions) {
        // 合并默认选项和用户选项
        this.options = {
            ...this.defaults,
            ...options,
        };

        this.formattingFn = this.options.formattingFn || this.formatNumber;
        this.easingFn = this.options.easingFn || this.easeOutExpo;

        this.startVal = this.validateValue(this.options.startVal ?? 0);
        this.frameVal = this.startVal;
        this.endVal = this.validateValue(endVal);
        this.options.decimalPlaces = Math.max(0, this.options.decimalPlaces ?? 0);
        this.resetDuration();
        this.options.separator = String(this.options.separator ?? ",");
        this.useEasing = this.options.useEasing ?? true;

        if (this.options.separator === "") {
            this.options.useGrouping = false;
        }

        this.el = typeof target === "string" ? document.getElementById(target) : target;
        if (this.el) {
            this.printValue(this.startVal);
        } else {
            this.error = "[CountUp] target is null or undefined";
        }

        // 初始化滚动监听
        this.initScrollSpy();
    }

    /**
     * 初始化滚动监听功能
     */
    private initScrollSpy(): void {
        if (typeof window === "undefined" || !this.options.enableScrollSpy || this.error) {
            if (this.error) {
                console.error(this.error);
            }
            return;
        }

        // 创建滚动处理函数
        this.scrollHandler = () => this.handleScroll();

        // 添加到全局滚动函数数组
        if (!window.onScrollFns) {
            window.onScrollFns = [];
        }
        window.onScrollFns.push(this.scrollHandler);

        // 添加滚动事件监听器
        if (this.options.scroller) {
            this.options.scroller.addEventListener("scroll", this.scrollHandler);
        }

        // 初始检查
        this.handleScroll();
    }

    /**
     * 处理滚动事件，检查元素是否在视口中
     */
    private handleScroll(): void {
        if (!this.el || this.once || this.isDestroyed) return;

        const scroller = this.options.scroller;
        if (!scroller) return;

        const isInView = this.checkElementInView(scroller);

        if (isInView && this.paused) {
            // 元素进入视口
            this.paused = false;
            this.scrollSpyTimeout = window.setTimeout(() => {
                if (!this.isDestroyed) {
                    this.start();
                }
            }, this.options.scrollSpyDelay);

            if (this.options.scrollSpyOnce) {
                this.once = true;
            }
        } else if (!isInView && !this.paused) {
            // 元素离开视口
            this.reset();
        }
    }

    /**
     * 检查元素是否在滚动容器的视口中
     */
    private checkElementInView(scroller: Window | HTMLElement): boolean {
        if (!this.el) return false;

        if (scroller === window) {
            const bottomOfScroll = scroller.innerHeight + scroller.scrollY;
            const rect = this.el.getBoundingClientRect();
            const bottomOfEl = rect.top + rect.height + scroller.pageYOffset;

            return bottomOfEl < bottomOfScroll && bottomOfEl > scroller.scrollY;
        } else {
            const rect = this.el.getBoundingClientRect();
            const scrollerRect = (scroller as HTMLElement).getBoundingClientRect();
            const scrollerTop = (scroller as HTMLElement).scrollTop;
            const scrollerBottom = scrollerTop + (scroller as HTMLElement).clientHeight;
            const topOfEl = rect.top - scrollerRect.top + scrollerTop;
            const bottomOfEl = topOfEl + rect.height;

            return bottomOfEl < scrollerBottom && bottomOfEl > scrollerTop;
        }
    }

    /**
     * 智能缓动算法：将动画分为两部分，第二部分使用缓动效果
     * 当动画数值超过阈值时，第一部分不使用缓动，第二部分使用缓动
     */
    private determineDirectionAndSmartEasing(): void {
        const end = this.finalEndVal ?? this.endVal;
        this.countDown = this.startVal > end;
        const animateAmount = end - this.startVal;

        if (Math.abs(animateAmount) > (this.options.smartEasingThreshold ?? 999) && (this.options.useEasing ?? true)) {
            this.finalEndVal = end;
            const up = this.countDown ? 1 : -1;
            this.endVal = end + up * (this.options.smartEasingAmount ?? 333);
            this.duration = this.duration / 2;
        } else {
            this.endVal = end;
            this.finalEndVal = null;
        }

        this.useEasing = this.finalEndVal === null ? this.options.useEasing ?? true : false;
    }

    /**
     * 开始动画
     * @param callback 动画完成时的回调函数
     */
    start(callback?: (args?: any) => any): void {
        if (this.error || this.isDestroyed) {
            return;
        }

        if (this.options.onStartCallback) {
            this.options.onStartCallback();
        }

        if (callback) {
            this.options.onCompleteCallback = callback;
        }

        if (this.duration > 0) {
            this.determineDirectionAndSmartEasing();
            this.paused = false;
            this.rAF = requestAnimationFrame(this.count);
        } else {
            this.printValue(this.endVal);
        }
    }

    /**
     * 暂停/恢复动画
     */
    pauseResume(): void {
        if (this.isDestroyed) return;

        if (!this.paused) {
            this.cancelAnimation();
        } else {
            this.startTime = null;
            this.duration = this.remaining;
            this.startVal = this.frameVal;
            this.determineDirectionAndSmartEasing();
            this.rAF = requestAnimationFrame(this.count);
        }
        this.paused = !this.paused;
    }

    /**
     * 重置动画到初始状态
     */
    reset(): void {
        this.cancelAnimation();
        this.paused = true;
        this.resetDuration();
        this.startVal = this.validateValue(this.options.startVal ?? 0);
        this.frameVal = this.startVal;
        this.printValue(this.startVal);
    }

    /**
     * 更新目标值并开始动画
     * @param newEndVal 新的目标值
     */
    update(newEndVal: string | number): void {
        if (this.isDestroyed) return;

        this.cancelAnimation();
        this.startTime = null;
        this.endVal = this.validateValue(newEndVal);

        if (this.endVal === this.frameVal) {
            return;
        }

        this.startVal = this.frameVal;
        if (this.finalEndVal == null) {
            this.resetDuration();
        }
        this.finalEndVal = null;
        this.determineDirectionAndSmartEasing();
        this.rAF = requestAnimationFrame(this.count);
    }

    /**
     * 动画帧更新函数
     */
    private count = (timestamp: number): void => {
        if (this.isDestroyed) return;

        if (!this.startTime) {
            this.startTime = timestamp;
        }

        const progress = timestamp - this.startTime;
        this.remaining = this.duration - progress;

        // 计算当前帧值
        if (this.useEasing) {
            if (this.countDown) {
                this.frameVal = this.startVal - this.easingFn(progress, 0, this.startVal - this.endVal, this.duration);
            } else {
                this.frameVal = this.easingFn(progress, this.startVal, this.endVal - this.startVal, this.duration);
            }
        } else {
            this.frameVal = this.startVal + (this.endVal - this.startVal) * (progress / this.duration);
        }

        // 确保不超过目标值
        const wentPast = this.countDown ? this.frameVal < this.endVal : this.frameVal > this.endVal;
        this.frameVal = wentPast ? this.endVal : this.frameVal;

        // 格式化小数位
        this.frameVal = Number(this.frameVal.toFixed(this.options.decimalPlaces));

        // 更新显示
        this.printValue(this.frameVal);

        // 决定是否继续动画
        if (progress < this.duration) {
            this.rAF = requestAnimationFrame(this.count);
        } else if (this.finalEndVal !== null) {
            // 智能缓动的第二部分
            this.update(this.finalEndVal);
        } else {
            if (this.options.onCompleteCallback) {
                this.options.onCompleteCallback();
            }
        }
    };

    /**
     * 取消当前动画
     */
    private cancelAnimation(): void {
        if (this.rAF !== null) {
            cancelAnimationFrame(this.rAF);
            this.rAF = null;
        }
    }

    /**
     * 打印数值到目标元素
     */
    private printValue(val: number): void {
        if (!this.el || this.isDestroyed) return;

        const result = this.formattingFn(val);

        if (this.options.plugin?.render) {
            this.options.plugin.render(this.el, result);
            return;
        }

        if (this.el.tagName === "INPUT") {
            const input = this.el as HTMLInputElement;
            input.value = result;
        } else if (this.el.tagName === "text" || this.el.tagName === "tspan") {
            this.el.textContent = result;
        } else {
            this.el.innerHTML = result;
        }
    }

    /**
     * 验证数值是否为有效数字
     */
    private ensureNumber(n: any): boolean {
        return typeof n === "number" && !isNaN(n);
    }

    /**
     * 验证并转换输入值为数字
     */
    private validateValue(value: string | number): number {
        const newValue = Number(value);
        if (!this.ensureNumber(newValue)) {
            this.error = `[CountUp] invalid start or end value: ${value}`;
            return 0;
        }
        return newValue;
    }

    /**
     * 重置动画持续时间
     */
    private resetDuration(): void {
        this.startTime = null;
        this.duration = Number(this.options.duration) * 1000;
        this.remaining = this.duration;
    }

    /**
     * 销毁 CountUp 实例，清理所有资源
     * 防止内存泄漏
     */
    destroy(): void {
        if (this.isDestroyed) return;

        this.isDestroyed = true;

        // 取消动画
        this.cancelAnimation();

        // 清理滚动监听
        this.cleanupScrollSpy();

        // 清理定时器
        if (this.scrollSpyTimeout !== null) {
            clearTimeout(this.scrollSpyTimeout);
            this.scrollSpyTimeout = null;
        }

        // 清理引用
        this.el = null;
        this.formattingFn = () => "";
        this.easingFn = () => 0;
    }

    /**
     * 清理滚动监听相关资源
     */
    private cleanupScrollSpy(): void {
        if (this.scrollHandler && window.onScrollFns) {
            const index = window.onScrollFns.indexOf(this.scrollHandler);
            if (index > -1) {
                window.onScrollFns.splice(index, 1);
            }
        }

        if (this.scrollHandler && this.options.scroller) {
            this.options.scroller.removeEventListener("scroll", this.scrollHandler);
        }

        this.scrollHandler = null;
    }

    /**
     * 默认数字格式化函数
     */
    private formatNumber = (num: number): string => {
        const neg = num < 0 ? "-" : "";
        let result: string, x1: string, x2: string, x3: string;

        result = Math.abs(num).toFixed(this.options.decimalPlaces);
        result += "";
        const x = result.split(".");
        x1 = x[0];
        x2 = x.length > 1 ? this.options.decimal + x[1] : "";

        if (this.options.useGrouping) {
            x3 = "";
            let factor = 3,
                j = 0;

            for (let i = 0, len = x1.length; i < len; ++i) {
                if (this.options.useIndianSeparators && i === 4) {
                    factor = 2;
                    j = 1;
                }
                if (i !== 0 && j % factor === 0) {
                    x3 = this.options.separator + x3;
                }
                j++;
                x3 = x1[len - i - 1] + x3;
            }
            x1 = x3;
        }

        // 可选的数字替换
        if (this.options.numerals?.length) {
            x1 = x1.replace(/[0-9]/g, (w) => this.options.numerals![+w]);
            x2 = x2.replace(/[0-9]/g, (w) => this.options.numerals![+w]);
        }

        return neg + this.options.prefix + x1 + x2 + this.options.suffix;
    };

    /**
     * 默认缓动函数：指数缓出
     * @param t 当前时间
     * @param b 起始值
     * @param c 变化量
     * @param d 持续时间
     */
    private easeOutExpo = (t: number, b: number, c: number, d: number): number =>
        (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
}

export { CountUp, Odometer };
