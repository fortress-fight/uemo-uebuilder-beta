/*
* @Description: <%- description %>
* @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:23:55
*/
import type { App } from "vue";

import UeEl<%- elementName %> from "./Main.vue";

UeEl<%- elementName %>.install = (app: App) => {
    if (!UeEl<%- elementName %>.name) return;
    app.component(UeEl<%- elementName %>.name, UeEl<%- elementName %>);
};

export interface UeEl<%- elementName %>BaseProps {}
export type UeEl<%- elementName %>Instance = InstanceType<typeof UeEl<%- elementName %>>;

export default UeEl<%- elementName %>;
