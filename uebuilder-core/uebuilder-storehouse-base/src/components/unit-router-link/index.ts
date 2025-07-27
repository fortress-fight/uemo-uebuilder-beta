/*
 * @Description: Link 组件
 * @Author: F-Stone
 * @LastEditTime: 2025-07-27 00:49:34
 */
import type { App } from "vue";
import type { RouteLocationRaw } from "vue-router";

import UnitRouterLink from "./Main.vue";

UnitRouterLink.install = (app: App) => {
    if (!UnitRouterLink.name) return;
    app.component(UnitRouterLink.name, UnitRouterLink);
};

export interface UnitRouterLinkBaseProps {
    to: RouteLocationRaw | string;
    exact?: boolean;
    target?: "_blank" | "_self" | "";
    activeClass?: string;
    easeActiveClass?: string;
}
export type UnitRouterLinkInstance = InstanceType<typeof UnitRouterLink>;

export default UnitRouterLink;
