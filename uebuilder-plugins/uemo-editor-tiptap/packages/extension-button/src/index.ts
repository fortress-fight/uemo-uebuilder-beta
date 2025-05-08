export type ButtonRowAttrs = {
    dir: string;
    gap: string;
    width: string;
    fill?: boolean;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: boolean;
    lineHeight?: string;
    fontStyle?: string;
    align?: "left" | "center" | "right";
    moAlign?: "left" | "center" | "right";
};

export type ButtonItemIconAttrs = { source: string; name: string; color?: string; size?: string; space?: string };

export type ButtonItemAttrs = {
    beforeSvgIcon?: ButtonItemIconAttrs;
    afterSvgIcon?: ButtonItemIconAttrs;
    animation: string;

    theme: string;
    text: string;
    transition: string;
    previewHover: string;

    padding: string;
    radius: string;
    hoverRadius: string;

    color: string;
    hoverColor: string;

    background: string;
    hoverBackground: string;

    borderColor: string;
    hoverBorderColor: string;
    borderWidth: string;
    hoverBorderWidth: string;
    borderStyle: string;
    hoverBorderStyle: string;

    shadow: string;
    hoverShadow: string;

    link: string;
    linkTarget: string;
    linkType: string;
    linkDetail: string;
    linkPopLayer?: { width?: string };
    triggerMethod?: string;
};

export * from "./button-item";
export * from "./button-row";
