export type GridGroupAttrs = {
    alignX?: string;
    alignY?: string;
    width?: string;
    grid?: string;
    gap?: string;
    background?: UE_EL_UTIL.BackgroundValue[];
    radius?: string;
    shadow?: string;
    border?: UE_EL_UTIL.BorderValue;
    padding?: string;
    mdGrid?: string;
    mdGap?: string;
    overflow?: string;
    mdBackground?: UE_EL_UTIL.BackgroundValue[];
};

/**
 * @description: 用于提供给富文本组件模块中网格单元的数据
 */
export type GridItemAttrs = {
    gridArea?: string;
    mdGridArea?: string;
    radius?: string;
    shadow?: string;
    border?: UE_EL_UTIL.BorderValue;
    padding?: string;
    mdPadding?: string;
    background?: UE_EL_UTIL.BackgroundValue[];
    overflow?: string;
    mdBackground?: UE_EL_UTIL.BackgroundValue[];
};

export * from "./grid-group";
export * from "./grid-item";
