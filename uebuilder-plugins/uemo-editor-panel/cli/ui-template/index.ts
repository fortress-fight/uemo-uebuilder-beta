/*
* @Description: <%- description %>
* @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:20:50
*/
import type { App } from "vue";

import UeEditorPanel<%- elementName %> from "./Main.vue";

UeEditorPanel<%- elementName %>.install = (app: App) => {
    if (!UeEditorPanel<%- elementName %>.name) return;
    app.component(UeEditorPanel<%- elementName %>.name, UeEditorPanel<%- elementName %>);
};

export interface UeEditorPanel<%- elementName %>BaseProps {}
export type UeEditorPanel<%- elementName %>Instance = InstanceType<typeof UeEditorPanel<%- elementName %>>;

export default UeEditorPanel<%- elementName %>;
