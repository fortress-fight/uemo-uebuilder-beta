/*
* @Description: <%- description %>
* @Author: F-Stone
* @LastEditTime: <%= date %>
*/
import type { VueConstructor } from "vue";

import UeEl<%- elementName %> from "./Main.vue";

// @ts-ignore
UeEl<%- elementName %>.install = function (Vue: VueConstructor) {
    // @ts-ignore
    Vue.component(UeEl<%- elementName %>.name, UeEl<%- elementName %>);
};

// @ts-ignore
export type UeEl<%- elementName %>Instance = InstanceType<typeof UeEl<%- elementName %>>;

export default UeEl<%- elementName %>;
