/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-05-07 18:17:59
 */
<% els.forEach(el => { %>import UeEditorPanel<%= el.name %>, { UeEditorPanel<%= el.name %>BaseProps } from "../packages/<%= el.dirName %>";
<% }) %>
declare module "vue" {
    export interface GlobalComponents {
        <% els.forEach(el => { %>UeEditorPanel<%= el.name %>: typeof UeEditorPanel<%= el.name %>;
        <% }) %>
    }
}

declare global {
    namespace UE_EDITOR_PANEL_COMPONENT {
        <% els.forEach(el => { %>interface UeEditorPanel<%= el.name %>Props extends UeEditorPanel<%= el.name %>BaseProps {}
        <% }) %>
    }
}

export {};
