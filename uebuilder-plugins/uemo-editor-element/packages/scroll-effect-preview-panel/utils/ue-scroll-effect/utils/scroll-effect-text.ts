import type { ScrollTextEffectOptions } from "../../../../scroll-effect-setting-panel";
import type { UeScrollEffectFactoryDomParams } from "./helper";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import { isLightColor } from "@stone/uemo-editor-utils/lib/utils";
import { gsap, CustomEase, SplitText } from "@stone/uemo-editor-utils/lib/gsap";

import { createScrollEffect } from "./helper";
import { ScrollEffectEventEventBus } from "./event-bus";
import { defaultScrollOptions } from "../../../../scroll-effect-setting-panel/utils/helper";

import $pageStyle from "../app.module.scss";

/**
 * 创建分隔文本
 * @param dom 目标DOM元素
 * @returns 分隔文本控制器
 */
function createSplitText(dom: HTMLElement) {
    $(dom)
        .addClass($pageStyle["js-split-text"])
        .html((_, text) => {
            const chineseRegex = /([\u4e00-\u9fa5])/g;
            // 替换匹配的中文字符，在它们前后插入 <span> 标签
            return text.replace(chineseRegex, "<span class='js-wrapper'>$1</span>");
        });

    return new SplitText(dom, {
        type: "lines,words",
        linesClass: $pageStyle["js-split-line"],
        wordsClass: $pageStyle["js-split-word"],
    });
}

/**
 * 创建文本效果动画
 * @param dom 目标DOM元素
 * @param options 文本效果选项
 * @returns 包含分隔文本控制器和动画的返回对象
 */
function createTextEffectTl(
    dom: HTMLElement,
    options: ScrollTextEffectOptions
): {
    splitTextCtrl: SplitText;
    animation: gsap.core.Timeline;
} {
    const { triggerDelay } = options;
    const splitTextCtrl = createSplitText(dom);
    $(dom).attr("data-effect-type", options.effectType);
    const lines = splitTextCtrl.lines as unknown as HTMLElement[];

    const delayValue = triggerDelay ? parseFloat(triggerDelay) : 0;

    const tl = gsap.timeline({
        delay: delayValue,
        repeatDelay: delayValue,
        defaults: { ease: "splint-text-ease" },
    });
    if (options.effectType === "effect-1") {
        lines.forEach((line, index) => {
            const lineTl = gsap.fromTo(
                $(line).find(`.${$pageStyle["js-split-word"]}`),
                { y: "130%" },
                { y: "0%", duration: 1.2, stagger: 0.02 }
            );
            tl.add(lineTl, index * 0.2);
        });
    } else if (options.effectType === "effect-2") {
        lines.forEach((line, index) => {
            const lineTl = gsap.fromTo(
                $(line).find(`.${$pageStyle["js-split-word"]}`),
                { opacity: "0" },
                { opacity: "1", duration: 1.2, stagger: 0.02 }
            );

            tl.add(lineTl, index * 0.2);
        });
    } else if (options.effectType === "effect-3") {
        lines.forEach((line, index) => {
            const lineTl = gsap.to(line, {
                opacity: 1,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                duration: 1.6,
                force3D: true,
                stagger: 0.2,
            });
            tl.add(lineTl, index * 0.2);
        });
    } else if (options.effectType === "effect-4") {
        const words = splitTextCtrl.words as unknown as HTMLElement[];
        $(words).each((_, dom) => {
            $(dom).attr("data-text", $(dom).text());
        });

        const textColor = gsap.getProperty(words[0], "color") || "rgba(0,0,0,1)";
        const color = gsap.utils.splitColor(JSON.stringify(textColor));

        $(dom).attr("data-is-lighter", isLightColor(JSON.stringify(textColor)).toString());

        tl.fromTo(
            words,
            { color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)` },
            { color: textColor, duration: 0.05, stagger: 0.05 }
        );
    }

    return {
        splitTextCtrl,
        animation: tl,
    };
}

export function initTextScrollEffect(
    dom: HTMLElement,
    params: UeScrollEffectFactoryDomParams,
    options: ScrollTextEffectOptions = {
        effectType: "effect-1",
    }
) {
    if (!CustomEase.get("splint-text-ease")) {
        CustomEase.create("splint-text-ease", "0.25,1,0.5,1");
    }

    const useOptions = Object.assign(defaultScrollOptions["text-effect"], options);

    $(dom).find(".js-wrapper").children().unwrap();

    const { splitTextCtrl, animation } = createTextEffectTl(dom, useOptions);

    createScrollEffect(dom, {
        scroller: params.scroller,
        options: useOptions,
        debugger: params.debugger,
        animation,
    });

    ScrollEffectEventEventBus.bind($(dom), "ue.scroll-effect.destroy", () => {
        animation?.kill();
        splitTextCtrl.revert();
        $(dom).find(".js-wrapper").children().unwrap();
    });
}
