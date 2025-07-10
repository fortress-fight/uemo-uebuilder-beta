# LoopTextClass 循环文本组件

一个用于创建平滑文本轮播效果的 TypeScript 类，支持自动切换、可见性检测和手动控制。

## 特性

-   🎯 平滑的文本轮播动画效果
-   👁️ 智能可见性检测（Scroll Spy）
-   ⏸️ 自动暂停/恢复功能
-   🎨 可自定义切换延迟时间
-   🧹 完善的资源清理机制
-   📱 响应式设计支持
-   🎮 丰富的手动控制接口

## 安装

```bash
npm install @stone/uemo-editor-utils
```

## 基本用法

```typescript
import { LoopTextClass } from "@stone/uemo-editor-utils/lib/loop-text";

// 创建实例
const loopText = new LoopTextClass(document.getElementById("loop-text-container"), {
    delay: 2.4,
    enableVisibilityCheck: true,
    visibilityThreshold: 0.1,
});

// 初始化并开始动画
loopText.init();

// 暂停动画
loopText.pause();

// 恢复动画
loopText.resume();

// 跳转到指定索引
loopText.goTo(2);

// 销毁实例（重要！）
loopText.destroy();
```

## 可见性检测功能

```typescript
const loopText = new LoopTextClass(domElement, {
    enableVisibilityCheck: true,
    visibilityThreshold: 0.1,
    delay: 2.4,
});

// 当元素不可见时自动暂停，可见时自动恢复
loopText.init();
```

## 资源管理

### 重要：使用 destroy() 方法清理资源

为了防止内存泄漏，在不再需要 LoopTextClass 实例时，请务必调用 `destroy()` 方法：

```typescript
// 创建实例
const loopText = new LoopTextClass(domElement);

// 使用完毕后销毁
loopText.destroy();
```

### 在 Vue 组件中使用

```vue
<template>
    <div ref="loopTextContainer" class="loop-text-container">
        <div class="loop-text-group">
            <div class="loop-text-item" data-active="true">第一段文本</div>
            <div class="loop-text-item">第二段文本</div>
            <div class="loop-text-item">第三段文本</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoopTextClass } from "@stone/uemo-editor-utils/lib/loop-text";
import { onMounted, onUnmounted, ref } from "vue";

const loopTextContainer = ref<HTMLElement | null>(null);
const loopText = ref<LoopTextClass | null>(null);

onMounted(() => {
    if (loopTextContainer.value) {
        loopText.value = new LoopTextClass(loopTextContainer.value, {
            enableVisibilityCheck: true,
            delay: 2.4,
        });
        loopText.value.init();
    }
});

onUnmounted(() => {
    // 重要：清理资源
    if (loopText.value) {
        loopText.value.destroy();
    }
});
</script>
```

### 在 React 组件中使用

```tsx
import React, { useEffect, useRef } from "react";
import { LoopTextClass } from "@stone/uemo-editor-utils/lib/loop-text";

const LoopTextComponent: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const loopTextRef = useRef<LoopTextClass | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            loopTextRef.current = new LoopTextClass(containerRef.current, {
                enableVisibilityCheck: true,
                delay: 2.4,
            });
            loopTextRef.current.init();
        }

        // 清理函数
        return () => {
            if (loopTextRef.current) {
                loopTextRef.current.destroy();
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="loop-text-container">
            <div className="loop-text-group">
                <div className="loop-text-item" data-active="true">第一段文本</div>
                <div className="loop-text-item">第二段文本</div>
                <div className="loop-text-item">第三段文本</div>
            </div>
        </div>
    );
};
```

## 配置选项

| 选项                    | 类型      | 默认值   | 描述                           |
| ----------------------- | --------- | -------- | ------------------------------ |
| `scroller`              | `HTMLElement` | `undefined` | 滚动容器（可选）               |
| `loopTextContainer`     | `string`  | `'.loop-text-group'` | 循环文本容器选择器             |
| `loopTextItems`         | `string`  | `'.loop-text-item'` | 循环文本项选择器               |
| `enableVisibilityCheck` | `boolean` | `true`   | 是否启用可见性检测             |
| `visibilityThreshold`   | `number`  | `0.1`    | 可见性检测阈值（0-1）          |
| `delay`                 | `number`  | `2.4`    | 切换延迟时间（秒）             |

## 方法

### `init()`

初始化循环文本效果并开始动画

-   返回：当前实例，支持链式调用

### `update()`

更新循环文本效果，重新初始化元素引用并重启循环

-   返回：当前实例，支持链式调用

### `pause()`

暂停循环播放，停止定时器但保持当前状态

### `resume()`

恢复循环播放，从当前状态重新开始循环

### `stop()`

停止循环播放，清理所有定时器

### `resetLayout()`

重置布局状态，清除所有样式并设置第一个元素为激活状态

### `goTo(index)`

跳转到指定索引

-   `index`: 目标索引（从0开始）

### `setVisibilityOptions(options)`

设置可见性检测配置

-   `options`: 新的配置选项（Partial<UeLoopTextFactoryParams>）

### `destroy()`

**重要：销毁实例并清理所有资源**

### 状态查询方法

### `isDestroyedInstance()`

检查实例是否已销毁

-   返回：`boolean`

### `getCurrentIndex()`

获取当前激活索引

-   返回：`number`

### `getTotalCount()`

获取总项目数

-   返回：`number`

### `isElementVisible()`

检查元素是否当前可见

-   返回：`boolean`

### `getOptions()`

获取当前配置

-   返回：`UeLoopTextFactoryParams`

## 内存管理

LoopTextClass 类会自动管理以下资源：

-   ✅ setTimeout 定时器
-   ✅ setInterval 定时器
-   ✅ IntersectionObserver 观察器
-   ✅ 防抖函数引用
-   ✅ DOM 数据引用

调用 `destroy()` 方法后，实例将无法再次使用。

## 可见性检测详解

### 工作原理

组件使用 `IntersectionObserver` API 来检测元素在视口中的可见性：

1. **自动暂停**：当元素不可见时，自动停止动画循环
2. **自动恢复**：当元素重新可见时，自动恢复动画循环
3. **性能优化**：减少不必要的计算和DOM操作
4. **防抖处理**：避免频繁的可见性状态切换

### 配置示例

```typescript
// 禁用可见性检测
const loopText = new LoopTextClass(domElement, {
    enableVisibilityCheck: false,
});

// 设置严格的可见性要求（需要50%以上可见）
const loopText = new LoopTextClass(domElement, {
    enableVisibilityCheck: true,
    visibilityThreshold: 0.5,
});

// 设置宽松的可见性要求（只需要10%可见）
const loopText = new LoopTextClass(domElement, {
    enableVisibilityCheck: true,
    visibilityThreshold: 0.1,
});
```

## 注意事项

1.  **必须调用 destroy()**: 在组件卸载或不再需要实例时，务必调用 `destroy()` 方法
2.  **可见性检测**: 启用可见性检测时，会自动添加 IntersectionObserver，记得清理
3.  **性能优化**: 对于大量实例，建议使用 `enableVisibilityCheck: true` 选项
4.  **DOM结构**: 确保DOM结构符合组件要求，包含正确的CSS类名
5.  **数据属性**: 可以通过 `data-delay` 属性设置延迟时间

## 完整示例

### HTML 结构

```html
<div class="loop-text-container" data-delay="2.4">
    <div class="loop-text-group">
        <div class="loop-text-item" data-active="true">欢迎使用</div>
        <div class="loop-text-item">循环文本组件</div>
        <div class="loop-text-item">功能强大</div>
    </div>
</div>
```

### JavaScript 使用

```typescript
import { LoopTextClass } from "@stone/uemo-editor-utils/lib/loop-text";

class LoopTextManager {
    private loopText: LoopTextClass | null = null;

    init(container: HTMLElement) {
        this.loopText = new LoopTextClass(container, {
            enableVisibilityCheck: true,
            visibilityThreshold: 0.1,
            delay: 2.4,
        });
        
        this.loopText.init();
    }

    // 手动控制
    pause() {
        this.loopText?.pause();
    }

    resume() {
        this.loopText?.resume();
    }

    goTo(index: number) {
        this.loopText?.goTo(index);
    }

    // 更新配置
    updateVisibilityOptions(options: Partial<UeLoopTextFactoryParams>) {
        this.loopText?.setVisibilityOptions(options);
    }

    // 清理资源
    destroy() {
        if (this.loopText) {
            this.loopText.destroy();
            this.loopText = null;
        }
    }
}
```

## 更新日志

### v1.0.0

-   ✨ 新增 LoopTextClass 类
-   🎯 实现平滑文本轮播效果
-   👁️ 添加可见性检测功能
-   ⏸️ 支持暂停/恢复控制
-   🎮 提供丰富的手动控制接口
-   🧹 完善的资源清理机制
-   📝 添加完整的 TypeScript 类型定义
-   🎨 支持自定义配置选项 
