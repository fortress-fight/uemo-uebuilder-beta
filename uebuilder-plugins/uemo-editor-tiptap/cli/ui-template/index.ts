/*
* @Description: <%- description %>
* @Author: F-Stone
 * @LastEditTime: 2025-03-31 23:49:07
*/
import type { App } from "vue";

import UeTiptap<%- elementName %> from "./Main.vue";

UeTiptap<%- elementName %>.install = (app: App) => {
    if (!UeTiptap<%- elementName %>.name) return;
    app.component(UeTiptap<%- elementName %>.name, UeTiptap<%- elementName %>);
};

export interface UeTiptap<%- elementName %>BaseProps {}
export type UeTiptap<%- elementName %>Instance = InstanceType<typeof UeTiptap<%- elementName %>>;

export default UeTiptap<%- elementName %>;
