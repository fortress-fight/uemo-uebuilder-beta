/*
 * @Description: 组件导入
 * @Author: F-Stone
 * @LastEditTime: <%= date %>
 */
<% els.forEach(el => { %>import UeEditorPanel<%= el.name %> from "../packages/<%= el.dirName %>";
<% }) %>

export const components = [
    <% els.forEach(el => { %>UeEditorPanel<%= el.name %>,
    <% }) %>
];
