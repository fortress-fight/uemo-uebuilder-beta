/*
 * @Description: 我的页面路由入口
 * @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:37:10
 */
import type { App } from "vue";

import RouterUserPageView from "./Main.vue";

RouterUserPageView.install = (app: App) => {
    if (!RouterUserPageView.name) return;
    app.component(RouterUserPageView.name, RouterUserPageView);
};

export interface RouterUserPageViewBaseProps {
    disabled?: boolean;
}
export type RouterUserPageViewInstance = InstanceType<typeof RouterUserPageView>;

export default RouterUserPageView;
