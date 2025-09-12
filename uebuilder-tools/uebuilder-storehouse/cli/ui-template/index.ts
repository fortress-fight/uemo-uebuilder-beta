/*
* @Description: <%- description %>
* @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:37:38
*/
import type { App } from "vue";

import <%- componentName %> from "./Main.vue";

<%- componentName %>.install = (app: App) => {
    if (!<%- componentName %>.name) return;
    app.component(<%- componentName %>.name, <%- componentName %>);
};

export interface <%- componentName %>BaseProps {
    disabled?: boolean;
}
export type <%- componentName %>Instance = InstanceType<typeof <%- componentName %>>;

export default <%- componentName %>;
