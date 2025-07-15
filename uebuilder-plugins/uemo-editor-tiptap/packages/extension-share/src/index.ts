/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-07-02 10:49:49
 */
export type ShareRowAttrs = {
    fontSize?: string;
    align?: string;
    moAlign?: string;
};
export type ShareItemAttrs = {
    icon: string;
    text?: string;
    color?: string;
    background?: string;
    radius?: string;
    border?: UE_EL_UTIL.BorderValue;
    popLayer?: { width?: string };

    link?: string;
    linkType?: string;
    linkTarget?: string;
    linkDetail?: string;
    linkPopLayer?: { width?: string };
    triggerMethod?: string;
};

export const shareRowDefaultAttrs: ShareRowAttrs = {
    fontSize: undefined,
    align: "left",
    moAlign: undefined,
};

export * from "./share-row";
export * from "./share-item";
