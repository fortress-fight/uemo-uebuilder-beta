/*
 * @Description: Home 页面路由
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 00:53:46
 */
import type { App } from "vue";

import RouterHomeView from "./Main.vue";

RouterHomeView.install = (app: App) => {
    if (!RouterHomeView.name) return;
    app.component(RouterHomeView.name, RouterHomeView);
};

export interface RouterHomeViewBaseProps {
    navList: {
        title: string;
        link: string;
        target: "_self" | "_blank";
        linkIcon: { size: number; name: string; arrow?: boolean };
    }[];
}
export type RouterHomeViewInstance = InstanceType<typeof RouterHomeView>;

export default RouterHomeView;
