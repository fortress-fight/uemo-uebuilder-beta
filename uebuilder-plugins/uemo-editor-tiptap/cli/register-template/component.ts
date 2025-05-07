/*
 * @Description: 组件导入
 * @Author: F-Stone
 * @LastEditTime: <%= date %>
 */
<% els.forEach(el => { %>import UeTiptap<%= el.name %> from "../packages/<%= el.dirName %>";
<% }) %>

export const components = [
    <% els.forEach(el => { %>UeTiptap<%= el.name %>,
    <% }) %>
];
