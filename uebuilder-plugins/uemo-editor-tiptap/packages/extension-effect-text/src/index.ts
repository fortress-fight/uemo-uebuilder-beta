/*
 * @Description: 特效文本
 * @Author: F-Stone
 * @LastEditTime: 2025-07-06 17:36:47
 */
export type EffectTextAttrs = {
    width: string | undefined;
    fontStyle: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: boolean;
    textColor: string;
    lineHeight: string;
    align: string;
    moAlign: string | undefined;
    content: string;

    scrollEffect: {
        effectType: string;

        triggerMode?: string;
        triggerDelay?: string;
        triggerEase?: string;
        triggerDuration?: string;

        startPos?: string;
        endPos?: string;
        startPosDis?: string;
        endPosDis?: string;
    };
};
export * from "./effect-text";
