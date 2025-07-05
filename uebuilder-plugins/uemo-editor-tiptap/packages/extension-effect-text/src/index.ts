/*
 * @Description: 特效文本
 * @Author: F-Stone
 * @LastEditTime: 2025-07-05 15:35:43
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

    scrollEffect: Record<string, { type: string; options: { triggerMode: string } }> | null;
};
export * from "./effect-text";
