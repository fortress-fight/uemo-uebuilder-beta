/*
 * @Description: 首页用户收藏路由页面
 * @Author: F-Stone
 * @LastEditTime: 2025-07-31 13:05:12
 */
import type { App } from "vue";

import RouterHomeUserCollectView from "./Main.vue";

RouterHomeUserCollectView.install = (app: App) => {
    if (!RouterHomeUserCollectView.name) return;
    app.component(RouterHomeUserCollectView.name, RouterHomeUserCollectView);
};

export interface RouterHomeUserCollectViewBaseProps {
    disabled?: boolean;
}
export type RouterHomeUserCollectViewInstance = InstanceType<typeof RouterHomeUserCollectView>;

export default RouterHomeUserCollectView;
