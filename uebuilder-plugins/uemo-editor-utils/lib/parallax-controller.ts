import type { ParallaxElementConfig, ParallaxControllerOptions, Element } from "parallax-controller";

import { ParallaxController } from "parallax-controller";

class UeParallaxController {
    private domMap = new Map<HTMLElement, { element: Element; props: ParallaxElementConfig }>();
    private controller: ParallaxController | null = null;

    constructor(private params: ParallaxControllerOptions) {
        this.controller = this.getController();
    }

    private getController() {
        if (!this.controller) {
            this.controller = ParallaxController.init(this.params);
        }
        return this.controller;
    }

    create(params: ParallaxControllerOptions) {
        return new UeParallaxController(params);
    }

    createElement(doms: HTMLElement[], props: ParallaxElementConfig = {}) {
        if (!doms) {
            throw new Error("Invalid parameters");
        }

        doms.forEach((dom) => {
            const element = this.getController().createElement({ el: dom, props });
            this.domMap.set(dom, { element, props });
        });
    }

    update(doms?: HTMLElement[], props?: ParallaxElementConfig) {
        if (doms) {
            doms.forEach((dom) => {
                const data = this.domMap.get(dom);
                if (!data) return;

                this.getController().updateElementPropsById(data.element.id, props || {});
            });
        } else if (props) {
            this.domMap.forEach((data) => {
                this.getController().updateElementPropsById(data.element.id, data.props);
            });
        } else {
            this.getController().update();
        }
    }

    destroyParallax(doms: HTMLElement[]) {
        doms.forEach((dom) => {
            const data = this.domMap.get(dom);
            if (!data || !this.controller) return;

            this.getController().removeElementById(data.element.id);
            this.domMap.delete(dom);
        });

        if (this.domMap.size === 0) {
            this.getController().destroy();
        }
    }

    destroy() {
        this.destroyParallax(Array.from(this.domMap.keys()));
    }
}

export default new UeParallaxController({});
