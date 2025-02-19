/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: <%= date %>
 */
<% els.forEach(el => { %>import UeEl<%= el.name %> from "../packages/<%= el.dirName %>";
<% }) %>
declare module "vue" {
    export interface GlobalComponents {
        <% els.forEach(el => { %>UeEl<%= el.name %>: typeof UeEl<%= el.name %>;
        <% }) %>
    }
}

export {};
