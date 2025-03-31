/*
 * @Description: 组件注册
 * @Author: F-Stone
 * @LastEditTime: 2025-02-20 15:32:50
 */
<% els.forEach(el => { %>import UeTiptap<%= el.name %>, { UeTiptap<%= el.name %>BaseProps } from "../packages/<%= el.dirName %>";
<% }) %>
declare module "vue" {
    export interface GlobalComponents {
        <% els.forEach(el => { %>UeTiptap<%= el.name %>: typeof UeTiptap<%= el.name %>;
        <% }) %>
    }
}

declare global {
    namespace UE_TIPTAP_COMPONENT {
        <% els.forEach(el => { %>interface UeTiptap<%= el.name %>Props extends UeTiptap<%= el.name %>BaseProps {}
        <% }) %>
    }
}

export {};
