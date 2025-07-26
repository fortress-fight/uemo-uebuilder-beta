/*
* @Description: <%- description %>
* @Author: F-Stone
 * @LastEditTime: 2025-07-26 17:08:39
*/
import type { App } from "vue";

import Unit<%- componentName %> from "./Main.vue";

Unit<%- componentName %>.install = (app: App) => {
    if (!Unit<%- componentName %>.name) return;
    app.component(Unit<%- componentName %>.name, Unit<%- componentName %>);
};

export interface Unit<%- componentName %>BaseProps {
    disabled?: boolean;
}
export type Unit<%- componentName %>Instance = InstanceType<typeof Unit<%- componentName %>>;

export default Unit<%- componentName %>;
