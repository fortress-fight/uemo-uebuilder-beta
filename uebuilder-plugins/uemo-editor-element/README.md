# @stone/uemo-editor-element

> 一个基于 Vue 3 的 UI 组件库，用于构建编辑器插件中的用户界面

## 介绍

@stone/uemo-editor-element 提供了一系列优质的 UI 组件，帮助你快速构建精美且易用的编辑器界面。组件库充分利用 Vue 3 的新特性，支持按需加载、高度定制化以及现代化响应式设计。

## 特性

- 基于 Vue 3 的模块化组件设计
- 按需加载，优化打包体积
- 高度可定制化，满足不同 UI 需求
- 丰富的组件及完善的文档支持

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

## 创建组件

```bash
yarn create-element
```

### 组件命名规则

如果是原子组件，只需要按照功能命名即可
如果是由原子组件创建的属性控件，被 `UeElControlGroup` 包裹，命名为 `<调整的目标属性>-setting`
如果是被 `UeElSettingGroup` 包裹的，命名为 `<调整的目标属性>-group`
如果是整个编辑面板，命名为 `<调整的目标属性>-setting`

## 文档与示例

更多组件用法和详细文档，请参考项目文档或 demo 示例目录。

### 控制器包裹组件

```html
<!-- 一个完整组 | 可以在头部添加操作器 -->
<UeElSettingGroup title="动画" is-last>
    <template #body>
        <!-- 控件分栏容器 | 可以在右侧添加操作按钮  -->
        <UeElControlGroup>
            <!-- 控件 -->
            <UeElColorSetting v-model:value="color" />
        </UeElControlGroup>
    </template>
</UeElSettingGroup>
```

### 如何填写新的资源面板

1.  添加资源文件，例如：

    `uebuilder-plugins/uemo-editor-assets/resource/**/index.ts`

2.  扩展资源类型，文件位置：

    `uebuilder-plugins/uemo-editor-element/types/global.d.ts`

    资源类型：

    `UE_PLUGIN_OPTIONS.Resource`

3.  添加注册时参数支持，文件位置：

    `uebuilder-plugins/uemo-editor-element/packages/resource-plugin/index.ts`

    函数名：

    `install`

4.  更新初始化参数信息，文件位置：

    `uebuilder-plugins/uemo-editor-element/demo/pages/index/index.ts`

## 贡献

欢迎提交 issue 或 pull request 以改进此项目。

## 许可证

MIT
