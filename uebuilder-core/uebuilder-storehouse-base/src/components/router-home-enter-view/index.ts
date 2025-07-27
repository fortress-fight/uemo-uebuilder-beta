/*
 * @Description: 入口路由页面
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 00:23:45
 */
import type { App } from "vue";

import RouterEnterView from "./Main.vue";

RouterEnterView.install = (app: App) => {
    if (!RouterEnterView.name) return;
    app.component(RouterEnterView.name, RouterEnterView);
};

export interface RouterEnterViewBaseProps {
    banner?: { link: string; image: string };
}
export type RouterEnterViewInstance = InstanceType<typeof RouterEnterView>;

export default RouterEnterView;
