# @stone/uemo-editor-element

> 一个基于 Vue 3 的 UI 组件库，用于构建编辑器插件中的用户界面

## 介绍

@stone/uemo-editor-element 提供了一系列优质的 UI 组件，帮助你快速构建精美且易用的编辑器界面。组件库充分利用 Vue 3 的新特性，支持按需加载、高度定制化以及现代化响应式设计。

## 特性

-   基于 Vue 3 的模块化组件设计
-   按需加载，优化打包体积
-   高度可定制化，满足不同 UI 需求
-   丰富的组件及完善的文档支持

## 安装

使用 npm 或 yarn 安装：

```bash
npm install @stone/uemo-editor-element --save
# 或者使用 yarn
yarn add @stone/uemo-editor-element
```

## 快速上手

在 Vue 3 项目中全局注册组件库：

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import UeEditorElement from "@stone/uemo-editor-element";

const app = createApp(App);
app.use(UeEditorElement, { plugin: {} });
app.mount("#app");
```

## 文档与示例

更多组件用法和详细文档，请参考项目文档或 demo 示例目录。

## 贡献

欢迎提交 issue 或 pull request 以改进此项目。

## 许可证

MIT
