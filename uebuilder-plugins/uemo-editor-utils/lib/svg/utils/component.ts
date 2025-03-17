/**
 * SVG 查看器自定义元素
 * 用于加载和显示 SVG 文件，支持动态修改填充色和描边色
 * @class UeSvgView
 * @extends {HTMLElement}
 */
class UeSvgView extends HTMLElement {
    private static readonly STYLE_TEMPLATE = `
        :host {
            display: block;
        }
        #svg-box {
            width: 100%;
            display: flex;
            max-height: 100%;
        }
        #svg-box svg {
            width: 100%;
            height: auto;
            max-height: 100%;
        }
        #svg-box[data-stroke-color] path:not([stroke]):not([fill]) {
            stroke: var(--stroke-color) !important;
            fill: var(--fill-color) !important;
        }
        #svg-box[data-fill-color] svg[fill] {
            fill: var(--fill-color) !important;
        }
        #svg-box[data-stroke-color] svg[stroke] {
            stroke: var(--stroke-color) !important;
        }
        #svg-box[data-fill-color] path[fill] {
            fill: var(--fill-color) !important;
        }
        #svg-box[data-stroke-color] path[stroke] {
            stroke: var(--stroke-color) !important;
        }
    `;

    private static readonly OBSERVED_ATTRIBUTES = ["src", "fill-color", "stroke-color"] as const;

    private svgBox: HTMLElement | null = null;
    private styleElement: HTMLStyleElement | null = null;

    /**
     * 获取 SVG 源文件路径
     */
    get src(): string | null {
        return this.getAttribute("src");
    }

    /**
     * 设置 SVG 源文件路径
     */
    set src(value: string | null) {
        if (value === null) {
            this.removeAttribute("src");
        } else {
            this.setAttribute("src", value);
        }
    }

    /**
     * 获取填充颜色
     */
    get fillColor(): string | null {
        return this.getAttribute("fill-color");
    }

    /**
     * 设置填充颜色
     */
    set fillColor(value: string | null) {
        if (value === null) {
            this.removeAttribute("fill-color");
        } else {
            this.setAttribute("fill-color", value);
        }
    }

    /**
     * 获取描边颜色
     */
    get strokeColor(): string | null {
        return this.getAttribute("stroke-color");
    }

    /**
     * 设置描边颜色
     */
    set strokeColor(value: string | null) {
        if (value === null) {
            this.removeAttribute("stroke-color");
        } else {
            this.setAttribute("stroke-color", value);
        }
    }

    /**
     * 获取需要观察的属性列表
     */
    static get observedAttributes(): readonly string[] {
        return UeSvgView.OBSERVED_ATTRIBUTES;
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.initializeShadowDOM();
    }

    /**
     * 初始化 Shadow DOM 结构
     * @private
     */
    private initializeShadowDOM(): void {
        if (!this.shadowRoot) return;

        this.styleElement = document.createElement("style");
        this.styleElement.textContent = UeSvgView.STYLE_TEMPLATE;

        this.svgBox = document.createElement("div");
        this.svgBox.id = "svg-box";

        this.shadowRoot.append(this.styleElement, this.svgBox);
    }

    /**
     * 加载 SVG 文件
     * @param src - SVG 文件路径
     * @private
     */
    private async loadSVG(src: string): Promise<void> {
        if (!src?.endsWith(".svg")) return;

        try {
            const response = await fetch(src);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const svgData = await response.text();
            this.render(svgData);
        } catch (error) {
            console.error("Failed to load SVG:", src, error);
        }
    }

    /**
     * 渲染 SVG 内容
     * @param svgData - SVG 字符串数据
     * @private
     */
    private render(svgData: string): void {
        if (!this.svgBox) return;
        this.svgBox.innerHTML = svgData;
        this.updateColors();
    }

    /**
     * 更新 SVG 颜色
     * @param type - 颜色类型：fill、stroke 或 all
     * @param color - 颜色值
     * @private
     */
    private updateColor(type: "fill" | "stroke" | "all", color: string | null): void {
        if (!this.svgBox) return;

        if (type === "fill" || type === "all") {
            this.updateColorAttribute("fill", color);
        }

        if (type === "stroke" || type === "all") {
            this.updateColorAttribute("stroke", color);
        }
    }

    /**
     * 更新单个颜色属性
     * @param type - 颜色类型
     * @param color - 颜色值
     * @private
     */
    private updateColorAttribute(type: "fill" | "stroke", color: string | null): void {
        if (!this.svgBox) return;

        const attributeName = `data-${type}-color`;
        const cssVarName = `--${type}-color`;

        if (color) {
            this.svgBox.setAttribute(attributeName, color);
            this.svgBox.style.setProperty(cssVarName, color);
        } else {
            this.svgBox.removeAttribute(attributeName);
            this.svgBox.style.removeProperty(cssVarName);
        }
    }

    /**
     * 更新所有颜色
     * @private
     */
    private updateColors(): void {
        this.updateColor("fill", this.fillColor);
        this.updateColor("stroke", this.strokeColor);
    }

    /**
     * 当元素被添加到 DOM 时调用
     */
    connectedCallback(): void {
        if (this.src) {
            void this.loadSVG(this.src);
        }
    }

    /**
     * 当元素属性发生变化时调用
     * @param name - 属性名
     * @param oldValue - 旧值
     * @param newValue - 新值
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        if (newValue === oldValue) return;

        switch (name) {
            case "src":
                if (newValue) void this.loadSVG(newValue);
                break;
            case "fill-color":
                this.updateColor("fill", newValue);
                break;
            case "stroke-color":
                this.updateColor("stroke", newValue);
                break;
        }
    }
}

// 注册自定义元素
if (!customElements.get("ue-svg-viewer")) {
    customElements.define("ue-svg-viewer", UeSvgView);
}
