/**
 * 图标字体构建配置
 */
export default {
    // 源文件目录
    srcDir: "src",

    // 输出目录
    distDir: "dist",

    // 临时目录
    tempDir: ".tmp",

    // 图标包配置
    packages: {
        custom: { name: "custom", fontName: "ue-custom", description: "自定义图标", startUnicode: 0xec01 },
        // 图标包示例
        untitled: { name: "untitled", fontName: "untitled", description: "字体库图标", startUnicode: 0xea01 },
        // 品牌图标
        brand: { name: "brand", fontName: "ue-brand", description: "品牌图标", startUnicode: 0xec01 },
    },

    // SVG 优化配置
    svgoConfig: {
        plugins: [
            {
                name: "preset-default",
                params: {
                    overrides: {
                        inlineStyles: {
                            onlyMatchedOnce: false,
                        },
                        removeDoctype: false,
                    },
                },
            },
            {
                name: "removeAttrs",
                params: { attrs: "fill" },
            },
        ],
    },

    // 字体生成配置
    fontConfig: {
        fontHeight: 1000,
        normalize: true,
        css: true,
        useCSSVars: false,
    },

    // 增量构建配置
    incremental: {
        enabled: true,
        cacheFile: ".cache/build-cache.json",
    },
};
