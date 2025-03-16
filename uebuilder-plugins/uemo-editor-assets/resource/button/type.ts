type BUTTON_ICON_PARAM = { source: string; name: string; color?: string; size?: string; space?: string };

// 弹窗设置属性
type POP_LAYER_VALUE = {
    width?: string;
};
/**
 * @description: 用于提供给富文本组件模块中按钮的数据
 */
export type BUTTON_ITEM_PARAM = Partial<{
    beforeSvgIcon: BUTTON_ICON_PARAM;
    afterSvgIcon: BUTTON_ICON_PARAM;
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
    linkPopLayer: POP_LAYER_VALUE;
    triggerMethod: string;
}>;
