/*
* @Description: <%- description %>
* @Author: F-Stone
 * @LastEditTime: 2025-02-20 10:10:49
*/
import type { App } from "vue";

import UeEl<%- elementName %> from "./Main.vue";

UeEl<%- elementName %>.install = (app: App) => {
    app.component(UeEl<%- elementName %>.name, UeEl<%- elementName %>);
};

export type UeEl<%- elementName %>Instance = InstanceType<typeof UeEl<%- elementName %>>;

export default UeEl<%- elementName %>;
