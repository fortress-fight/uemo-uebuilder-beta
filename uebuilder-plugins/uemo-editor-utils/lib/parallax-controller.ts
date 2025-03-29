import type { ParallaxElementConfig, ParallaxControllerOptions, Element } from "parallax-controller";

import { ParallaxController } from "parallax-controller";

/**
 * UeParallaxController 类用于管理视差滚动效果
 * 封装了 parallax-controller 库的核心功能，提供了更简单的接口来创建和管理视差元素
 */
class UeParallaxController {
    /** 存储 DOM 元素与其对应的视差元素配置的映射关系 */
    private domMap = new Map<HTMLElement, { element: Element; props: ParallaxElementConfig }>();
    /** 视差控制器实例 */
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

    /**
     * 创建一个新的 UeParallaxController 实例
     * @param params - 视差控制器的配置选项
     * @returns 新的 UeParallaxController 实例
     */
    create(params: ParallaxControllerOptions) {
        return new UeParallaxController(params);
    }

    /**
     * 为指定的 DOM 元素创建视差效果
     * @param doms - 需要添加视差效果的 DOM 元素数组
     * @param props - 视差效果的配置参数
     * @throws {Error} 当传入的 DOM 元素数组无效时抛出错误
     */
    createElement(doms: HTMLElement[], props: ParallaxElementConfig = {}) {
        if (!doms) {
            throw new Error("Invalid parameters");
        }

        doms.forEach((dom) => {
            const element = this.getController().createElement({ el: dom, props });
            this.domMap.set(dom, { element, props });
        });
    }

    /**
     * 更新视差效果的配置
     * @param doms - 可选，需要更新的 DOM 元素数组，如果不提供则更新所有元素
     * @param props - 可选，新的视差效果配置参数
     */
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

    /**
     * 销毁指定 DOM 元素的视差效果
     * @param doms - 需要销毁视差效果的 DOM 元素数组
     */
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

    /**
     * 销毁所有视差效果并清理资源
     */
    destroy() {
        this.destroyParallax(Array.from(this.domMap.keys()));
    }
}

export default new UeParallaxController({});
