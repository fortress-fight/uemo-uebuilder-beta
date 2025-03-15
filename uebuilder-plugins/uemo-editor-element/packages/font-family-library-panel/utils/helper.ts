export interface FontFace {
    name: string;
    link: string;
}

/**
 * 添加预览字体到页面
 * @param newFont 字体配置数组
 */
export function addPreviewFont(newFont: FontFace[]) {
    // 检查是否已存在预览字体样式
    const existingStyle = document.querySelector("#PREVIEW_FONT");
    if (existingStyle) return;

    // 创建style元素
    const styleEl = document.createElement("style");
    styleEl.id = "PREVIEW_FONT";
    document.head.appendChild(styleEl);

    // 获取样式表
    const styleSheet = styleEl.sheet;
    if (!styleSheet) return;

    // 添加字体规则
    newFont.forEach(({ name, link }) => {
        if (!link) return;
        const fontFaceRule = `@font-face {
            font-family: ${name};
            src: url(${link});
        }`;
        styleSheet.insertRule(fontFaceRule, styleSheet.cssRules.length);
    });
}
