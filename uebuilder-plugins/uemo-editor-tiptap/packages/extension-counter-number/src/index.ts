export type CounterNumberAttrs = {
    theme?: string;
    effect?: string;

    fontFamily?: string;
    fontSize?: string;
    textColor?: string;
    fontWeight?: boolean;
    fontStyle?: string;

    align?: string;
    moAlign?: string;

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
        numPad?: string;
        proxy?: { type: "text"; value: string };
    }[];
};

export * from "./counter-number";
