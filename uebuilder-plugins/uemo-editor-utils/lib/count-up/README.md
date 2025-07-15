# CountUp 数字动画计数器

一个用于创建平滑数字计数动画效果的 TypeScript 类。

## 特性

-   🎯 平滑的数字动画效果
-   🔄 支持智能缓动算法
-   👁️ 滚动监听功能（Scroll Spy）
-   🎨 可自定义格式化函数
-   🧹 完善的资源清理机制
-   📱 响应式设计支持

## 安装

```bash
npm install odometer_countup
```

## 基本用法

```typescript
import { CountUp } from "./count-up";

// 创建实例
const countUp = new CountUp("target-element", 1000, {
    duration: 2.5,
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
});

// 开始动画
countUp.start();

// 更新目标值
countUp.update(2000);

// 暂停/恢复
countUp.pauseResume();

// 重置动画
countUp.reset();
```

## 滚动监听功能

```typescript
const countUp = new CountUp("target-element", 1000, {
    enableScrollSpy: true,
    scrollSpyDelay: 200,
    scrollSpyOnce: true,
    scroller: window, // 或指定滚动容器
});
```

## 资源管理

### 重要：使用 destroy() 方法清理资源

为了防止内存泄漏，在不再需要 CountUp 实例时，请务必调用 `destroy()` 方法：

```typescript
// 创建实例
const countUp = new CountUp("target-element", 1000);

// 使用完毕后销毁
countUp.destroy();
```

### 在 Vue 组件中使用

```vue
<template>
    <div id="counter">0</div>
</template>

<script setup lang="ts">
import { CountUp } from "./count-up";
import { onMounted, onUnmounted, ref } from "vue";

const countUp = ref<CountUp | null>(null);

onMounted(() => {
    countUp.value = new CountUp("counter", 1000, {
        enableScrollSpy: true,
    });
    countUp.value.start();
});

onUnmounted(() => {
    // 重要：清理资源
    if (countUp.value) {
        countUp.value.destroy();
    }
});
</script>
```

### 在 React 组件中使用

```tsx
import React, { useEffect, useRef } from "react";
import { CountUp } from "./count-up";

const Counter: React.FC = () => {
    const countUpRef = useRef<CountUp | null>(null);

    useEffect(() => {
        countUpRef.current = new CountUp("counter", 1000, {
            enableScrollSpy: true,
        });
        countUpRef.current.start();

        // 清理函数
        return () => {
            if (countUpRef.current) {
                countUpRef.current.destroy();
            }
        };
    }, []);

    return <div id="counter">0</div>;
};
```

## 配置选项

| 选项              | 类型                    | 默认值   | 描述                   |
| ----------------- | ----------------------- | -------- | ---------------------- |
| `startVal`        | `number`                | `0`      | 起始值                 |
| `decimalPlaces`   | `number`                | `0`      | 小数位数               |
| `duration`        | `number`                | `2`      | 动画持续时间（秒）     |
| `useEasing`       | `boolean`               | `true`   | 是否使用缓动效果       |
| `useGrouping`     | `boolean`               | `true`   | 是否使用千分位分隔符   |
| `separator`       | `string`                | `','`    | 千分位分隔符           |
| `decimal`         | `string`                | `'.'`    | 小数点符号             |
| `prefix`          | `string`                | `''`     | 前缀                   |
| `suffix`          | `string`                | `''`     | 后缀                   |
| `enableScrollSpy` | `boolean`               | `false`  | 是否启用滚动监听       |
| `scrollSpyDelay`  | `number`                | `200`    | 滚动监听延迟（毫秒）   |
| `scrollSpyOnce`   | `boolean`               | `false`  | 滚动监听是否只执行一次 |
| `scroller`        | `Window \| HTMLElement` | `window` | 滚动容器               |

## 方法

### `start(callback?)`

开始动画

-   `callback`: 动画完成时的回调函数

### `update(newEndVal)`

更新目标值并开始动画

-   `newEndVal`: 新的目标值

### `pauseResume()`

暂停或恢复动画

### `reset()`

重置动画到初始状态

### `destroy()`

**重要：销毁实例并清理所有资源**

## 内存管理

CountUp 类会自动管理以下资源：

-   ✅ requestAnimationFrame 回调
-   ✅ 滚动事件监听器
-   ✅ 定时器
-   ✅ 全局滚动函数数组引用

调用 `destroy()` 方法后，实例将无法再次使用。

## 注意事项

1.  **必须调用 destroy()**: 在组件卸载或不再需要实例时，务必调用 `destroy()` 方法
2.  **滚动监听**: 启用滚动监听时，会自动添加事件监听器，记得清理
3.  **性能优化**: 对于大量实例，建议使用 `scrollSpyOnce: true` 选项
4.  **错误处理**: 检查 `error` 属性以了解初始化错误

## 更新日志

### v2.8.0

-   ✨ 新增 `destroy()` 方法
-   🐛 修复内存泄漏问题
-   🔧 优化滚动监听逻辑
-   📝 添加完整的 JSDoc 注释
-   🎯 改进错误处理机制
