# Vue3 弹窗组件使用指南

## 概述

这个文档展示了如何使用重构后的 Vue3 弹窗组件。主要提供了两种使用方式：

1.  `useElDialog` - 在组件内部使用的 composable 函数
2.  `createGlobalDialog` - 全局使用的函数

## 主要特性

- ✅ **完全兼容 Vue3** - 使用 Composition API 重写
- ✅ **自动垃圾回收** - 组件卸载时自动销毁弹窗
- ✅ **上下文继承** - 继承父应用的 provide/inject、全局属性等
- ✅ **类型安全** - 完整的 TypeScript 支持
- ✅ **生命周期管理** - 正确的组件挂载和卸载

## 使用方式

### 1. 在 Vue 组件中使用 (推荐)

```vue
<template>
    <div>
        <button @click="openDialog">打开弹窗</button>
    </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import useElDialog from "../utils/mixin";
import type { UeElPopPanelBaseProps } from "../index";

// 弹窗配置
const dialogProps: UeElPopPanelBaseProps = {
    immediate: false,
    autoClose: true,
    draggable: true,
    mask: { color: "rgba(0, 0, 0, 0.5)" },
    panel: { position: "center" },
};

// 插槽内容
const slots = {
    default: () =>
        h("div", { class: "dialog-content" }, [
            h("h3", "弹窗标题"),
            h("p", "这是弹窗内容"),
            h("button", { onClick: closeDialog }, "关闭"),
        ]),
};

// 创建弹窗实例
const { closeDialog, updateDialogBoxPos, destroy } = useElDialog(dialogProps, slots);

function openDialog() {
    // 弹窗会自动显示，因为 open 默认为 true
    // 如果需要手动控制显示，可以在 props 中设置 open: false
}

// 组件卸载时会自动销毁弹窗
</script>
```

### 2. 在 JavaScript 中使用 (传递 App 实例)

```javascript
import { createApp, h } from "vue";
import { createDialogWithApp, useElDialog } from "../utils/mixin";
import MyComponent from "./MyComponent.vue";

// 创建应用实例
const app = createApp(MyComponent);

// 方式1: 使用专门的 createDialogWithApp 函数
function showDialogWithApp() {
    const dialogInstance = createDialogWithApp(
        app, // 传递 app 实例
        {
            immediate: true,
            autoClose: true,
            panel: { position: "center" },
        },
        {
            default: () =>
                h("div", [
                    h("h3", "JavaScript 弹窗"),
                    h(
                        "button",
                        {
                            onClick: () => dialogInstance.destroy(),
                        },
                        "关闭"
                    ),
                ]),
        }
    );

    return dialogInstance;
}

// 方式2: 使用 useElDialog 并传递第三个参数
function showDialogWithUseElDialog() {
    const dialogInstance = useElDialog(
        {
            immediate: true,
            autoClose: true,
            panel: { position: "center" },
        },
        {
            default: () =>
                h("div", [
                    h("h3", "带 App 上下文的弹窗"),
                    h(
                        "button",
                        {
                            onClick: () => dialogInstance.destroy(),
                        },
                        "关闭"
                    ),
                ]),
        },
        app // 第三个参数传递 app 实例
    );

    // 注意: 在非组件环境中需要手动管理销毁
    return dialogInstance;
}
```

### 2.5. 使用 render 函数 (类似 Vue2 的 parent 方式) - **推荐**

```vue
<template>
    <div>
        <button @click="openDialogWithRender">打开弹窗 (render方式)</button>
        <button @click="openDialogWithCustomApp">打开弹窗 (指定app)</button>
    </div>
</template>

<script setup lang="ts">
import { createApp, h } from "vue";
import { createDialogWithRender } from "../utils/mixin";

// 方式1: 使用当前组件的上下文 (类似 Vue2 的 parent 机制)
function openDialogWithRender() {
    const dialogInstance = createDialogWithRender(
        {
            immediate: true,
            autoClose: true,
            panel: { position: "center" },
        },
        {
            default: () =>
                h("div", [
                    h("h3", "使用当前组件上下文的弹窗"),
                    h("p", "这种方式完全避免了上下文继承问题"),
                    h(
                        "button",
                        {
                            onClick: () => dialogInstance.unmount(),
                        },
                        "关闭"
                    ),
                ]),
        }
    );

    return dialogInstance;
}

// 方式2: 传入指定的 app 实例
function openDialogWithCustomApp() {
    const customApp = createApp({});
    // 可以为自定义 app 添加插件或配置
    customApp.config.globalProperties.$customMessage = "Hello from custom app!";

    const dialogInstance = createDialogWithRender(
        {
            immediate: true,
            autoClose: true,
            panel: { position: "center" },
        },
        {
            default: () =>
                h("div", [
                    h("h3", "使用自定义 App 上下文的弹窗"),
                    h("p", "可以访问自定义 app 的全局属性"),
                    h(
                        "button",
                        {
                            onClick: () => dialogInstance.unmount(),
                        },
                        "关闭"
                    ),
                ]),
        },
        customApp // 传入自定义的 app 实例
    );

    return dialogInstance;
}
</script>
```

### 3. 全局使用 (无上下文)

```typescript
import { createGlobalDialog } from "../utils/mixin";
import { h } from "vue";

// 创建全局弹窗
function showGlobalDialog() {
    const dialogInstance = createGlobalDialog(
        {
            immediate: true,
            autoClose: true,
            panel: { position: "center" },
        },
        {
            default: () =>
                h("div", [
                    h("h3", "全局弹窗"),
                    h(
                        "button",
                        {
                            onClick: () => dialogInstance.destroy(),
                        },
                        "关闭"
                    ),
                ]),
        }
    );

    return dialogInstance;
}
```

### 4. 响应式属性使用

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import useElDialog from "../utils/mixin";

const isVisible = ref(false);
const dialogTitle = ref("动态标题");

// 响应式配置
const dialogProps = computed(() => ({
    immediate: true,
    autoClose: true,
    panel: { position: "center" },
}));

// 响应式插槽
const slots = computed(() => ({
    default: () =>
        h("div", [h("h3", dialogTitle.value), h("button", { onClick: () => (isVisible.value = false) }, "关闭")]),
}));

const { closeDialog } = useElDialog(dialogProps, slots);
</script>
```

## API 参考

### 主要函数

#### `useElDialog(props, slots, parentApp?)`

- **描述**: 在组件或 JavaScript 环境中使用的主要函数
- **参数**:
    - `props`: 弹窗属性配置
    - `slots`: 插槽配置 (可选)
    - `parentApp`: 父应用实例 (可选，如果不提供则尝试从组件上下文获取)
- **返回**: `DialogInstance`

#### `createDialogWithApp(app, props, slots)`

- **描述**: 专门为 JavaScript 环境设计的函数
- **参数**:
    - `app`: 通过 `createApp` 创建的应用实例
    - `props`: 弹窗属性配置
    - `slots`: 插槽配置 (可选)
- **返回**: `DialogInstance`

#### `createGlobalDialog(props, slots)`

- **描述**: 创建不依赖任何上下文的全局弹窗
- **参数**:
    - `props`: 弹窗属性配置
    - `slots`: 插槽配置 (可选)
- **返回**: `DialogInstance`

#### `createDialogWithRender(props, slots, app?)` - **推荐**

- **描述**: 使用 render 函数创建弹窗，类似 Vue2 的 parent 方式
- **特点**: 支持使用当前组件上下文或指定的 app 实例上下文
- **参数**:
    - `props`: 弹窗属性配置
    - `slots`: 插槽配置 (可选)
    - `app`: 可选的应用实例，如果提供则使用该实例的上下文，否则使用当前组件上下文
- **返回**: `{ container, unmount, closeDialog, updateDialogBoxPos }`

### DialogInstance 接口

```typescript
interface DialogInstance {
    /** 弹窗应用实例 */
    app: App;
    /** 弹窗组件实例 */
    dialogLayer: PopPanelInstance | undefined;
    /** 关闭弹窗 */
    closeDialog: () => void;
    /** 更新弹窗位置 */
    updateDialogBoxPos: () => void;
    /** 销毁弹窗实例 */
    destroy: () => void;
}
```

### PopPanelInstance 接口

```typescript
interface PopPanelInstance {
    closePanel: () => void;
    updateDialogPos: () => Promise<void>;
}
```

### SlotRenderFunction 类型

```typescript
type SlotRenderFunction = () => VNode | VNode[];
```

## 迁移指南

### 从 Vue2 迁移

**Vue2 (旧版):**

```javascript
import ueElDialog from "../utils/mixin";

// Vue2 方式
const { instance, closeDialog } = ueElDialog(
    this, // Vue 实例
    props,
    slots
);
```

**Vue3 (新版):**

```javascript
import useElDialog, { createDialogWithApp, createGlobalDialog, createDialogWithRender } from "../utils/mixin";

// Vue3 方式 - 在组件中使用
const { closeDialog, destroy } = useElDialog(props, slots);

// Vue3 方式 - 使用 render 函数 (推荐，类似 Vue2 的 parent)
const dialogInstance = createDialogWithRender(props, slots);
// 或者指定 app 实例
const dialogInstance = createDialogWithRender(props, slots, app);

// Vue3 方式 - JavaScript 环境中使用 (传递 app 实例)
const dialogInstance = useElDialog(props, slots, app);
// 或者使用专门的函数
const dialogInstance = createDialogWithApp(app, props, slots);

// Vue3 方式 - 全局使用 (无上下文)
const dialogInstance = createGlobalDialog(props, slots);
```

## 注意事项

1.  **自动销毁**:

- 在组件中使用 `useElDialog` 时，弹窗会在父组件卸载时自动销毁
- 在 JavaScript 环境中使用时，需要手动调用 `destroy()` 方法

2.  **上下文继承**:

- `useElDialog(props, slots, app)` 和 `createDialogWithApp` 会继承传入的 app 实例的上下文
- `createGlobalDialog` 不会继承任何上下文

3.  **推荐使用方式**:

- **组件内使用**: 推荐使用 `createDialogWithRender(props, slots)` (类似 Vue2 的 parent)
- **JavaScript 环境**: 使用 `createDialogWithApp(app, props, slots)` 或 `useElDialog(props, slots, app)`
- **全局使用**: 使用 `createGlobalDialog(props, slots)` (无上下文继承)

4.  **上下文继承对比**:

- `createDialogWithRender`: ✅ 完美继承当前组件上下文 (推荐)
- `createDialogWithApp`: ✅ 继承指定 app 的上下文
- `useElDialog`: ✅ 自动检测并继承上下文
- `createGlobalDialog`: ❌ 不继承任何上下文

5.  **类型安全**: 所有函数都提供完整的 TypeScript 类型支持

## 故障排除

### 常见问题

1.  **弹窗不显示**: 检查 `immediate` 和 `open` 属性设置
2.  **样式问题**: 确保 CSS 模块正确加载
3.  **上下文丢失**: 使用 `useElDialog` 而不是 `createGlobalDialog`
4.  **内存泄漏**: 全局弹窗记得调用 `destroy()` 方法
5.  **I18n 错误**: `Cannot read properties of null (reading '__VUE_I18N_SYMBOL__')`

### I18n 上下文问题解决方案

如果遇到 Vue I18n 相关错误，这通常是应用上下文传递问题：

```javascript
// 确保传递正确的应用实例
const app = getCurrentInstance()?.appContext.app;
const dialogInstance = createDialogWithApp(app, props, slots);

// 或者使用自动检测上下文的方式
const dialogInstance = createDialogWithRender(props, slots);
```

**技术说明**:

- Vue3 的 `useI18n()` 需要正确的应用上下文才能工作
- 我们的解决方案通过设置 `vnode.appContext` 确保插件能正常访问
- 如果仍有问题，检查父应用是否正确安装了 Vue I18n

### 调试建议

- 使用浏览器开发工具检查 DOM 结构
- 查看控制台是否有错误信息
- 确认组件的 provide/inject 是否正常工作
