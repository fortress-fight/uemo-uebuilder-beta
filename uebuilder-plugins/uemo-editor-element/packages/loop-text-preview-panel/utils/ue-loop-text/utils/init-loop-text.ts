import type { UeLoopTextFactoryParams } from "../index";

import $ from "@stone/uemo-editor-utils/lib/jquery";
import pageStyle from "@stone/uemo-editor-tiptap/src/app.module.scss";

import { LoopTextEventEventBus } from "./event-bus";

/**
 * 初始化循环文本组件
 * @param dom - 容器 DOM
 * @param options - 配置选项
 */
export async function initLoopText(dom: HTMLElement, params: UeLoopTextFactoryParams) {
    const { LoopTextClass } = await import("@stone/uemo-editor-utils/lib/loop-text");

    function setupLoopText(dom: HTMLElement, params: UeLoopTextFactoryParams) {
        let loopText: InstanceType<typeof LoopTextClass> | null = new LoopTextClass(dom, {
            ...params,
            loopTextContainer: "." + pageStyle["loop-text-group"],
            loopTextItems: "." + pageStyle["loop-text-item"],
        });

        loopText.init();

        /**
         * 启动计数动画
         */
        function updateLoopText() {
            loopText?.update();
        }
        /**
         * 销毁计数器，释放内存
         */
        function destroyLoopText() {
            loopText?.destroy();
            loopText = null;
        }

        // 事件绑定，确保解绑，防止内存泄漏
        LoopTextEventEventBus.bind($(dom), "ue.loop-text.update", updateLoopText);
        LoopTextEventEventBus.bind($(dom), "ue.loop-text.destroy", () => {
            destroyLoopText();
            LoopTextEventEventBus.unbind($(dom), "ue.loop-text.update", updateLoopText);
        });
    }

    setupLoopText(dom, params);
}
