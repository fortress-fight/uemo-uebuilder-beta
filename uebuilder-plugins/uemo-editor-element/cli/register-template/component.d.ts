/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
<% els.forEach(el => { %>import UeEl<%= el.name %>, { UeEl<%= el.name %>BaseProps } from "../packages/<%= el.dirName %>";
<% }) %>
declare module "vue" {
    export interface GlobalComponents {
        <% els.forEach(el => { %>UeEl<%= el.name %>: typeof UeEl<%= el.name %>;
        <% }) %>
    }
}

declare global {
    namespace UE_EL_COMPONENT {
        <% els.forEach(el => { %>interface UeEl<%= el.name %>Props extends UeEl<%= el.name %>BaseProps {}
        <% }) %>
    }
}

export {};
