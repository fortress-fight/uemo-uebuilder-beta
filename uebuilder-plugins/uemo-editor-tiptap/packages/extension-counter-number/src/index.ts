export type CounterNumberAttrs = {
    theme?: string;
    effect?: string;

    fontFamily?: string;
    fontSize?: string;
    textColor?: string;
    fontWeight?: boolean;
    fontStyle?: string;

    align?: UE_EL_UTIL.ALIGN_X;
    moAlign?: UE_EL_UTIL.ALIGN_X;

    dir?: string;
    moDir?: string;

    gap?: string;
    moGap?: string;

    width?: string;
    fill?: boolean;
    extStyle?: Record<string, string>;
    delay?: string;
    duration?: string;
    body: {
        id: string;
        numList: number[];
        desc?: string;
        numPad?: number;
        proxy?: { type: "text"; value: string };
    }[];
};

export * from "./counter-number";
