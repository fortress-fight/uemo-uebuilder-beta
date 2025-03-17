class UeSvgView extends HTMLElement {
    static get observedAttributes() {
        return ["src", "fill-color", "stroke-color"];
    }

    get src() {
        return this.getAttribute("src");
    }

    get fillColor() {
        return this.getAttribute("fill-color");
    }

    get strokeColor() {
        return this.getAttribute("stroke-color");
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    loadSVG(src: string) {
        if (!src?.endsWith(".svg")) return;
        fetch(src)
            .then((response) => response.text())
            .then((svgData) => {
                this.render(svgData);
            })
            .catch((error) => {
                console.error("Failed to load SVG:", src, error);
            });
    }

    render(svgData: string) {
        const root = this.shadowRoot;
        if (!root) return;

        if (root.querySelector("svg")) {
            const svgBox = root.querySelector("#svg-box")!;
            svgBox.innerHTML = svgData;

            this.updateColor("fill", this.fillColor);
            this.updateColor("stroke", this.strokeColor);
        } else {
            const style = document.createElement("style");
            const svgBox = document.createElement("div");
            svgBox.id = "svg-box";

            style.textContent = `
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
            svgBox.innerHTML = svgData;
            this.shadowRoot?.append(style, svgBox);

            this.updateColor("fill", this.fillColor);
            this.updateColor("stroke", this.strokeColor);
        }
    }

    /**
     * @description 当自定义元素第一次被连接到文档 DOM 时被调用。
     */
    connectedCallback() {
        const root = this.shadowRoot;
        if (!root) return;

        if (this.src) {
            this.loadSVG(this.src);
        }
    }

    updateColor(type: "fill" | "stroke" | "all", color: string | null) {
        const root = this.shadowRoot;
        if (!root) return;

        const svgBox = root.querySelector<HTMLElement>("#svg-box")!;

        if (type === "fill" || type === "all") {
            if (color) {
                svgBox.setAttribute("data-fill-color", color);
                svgBox.style.setProperty("--fill-color", color);
            } else {
                svgBox.removeAttribute("data-fill-color");
                svgBox.style?.removeProperty("--fill-color");
            }
        }

        if (type === "stroke" || type === "all") {
            if (color) {
                svgBox.setAttribute("data-stroke-color", color);
                svgBox.style?.setProperty("--stroke-color", color);
            } else {
                svgBox.removeAttribute("data-stroke-color");
                svgBox.style?.removeProperty("--stroke-color");
            }
        }
    }

    /**
     * @description 当自定义元素的一个属性被增加、移除或更改时被调用。
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        const root = this.shadowRoot;
        if (!root) return;

        const svgBox = root.querySelector<HTMLElement>("#svg-box")!;

        if (newValue === oldValue || !svgBox) return;
        switch (name) {
            case "src":
                if (newValue) {
                    this.loadSVG(newValue);
                }
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

customElements.define("ue-svg-viewer", UeSvgView);
