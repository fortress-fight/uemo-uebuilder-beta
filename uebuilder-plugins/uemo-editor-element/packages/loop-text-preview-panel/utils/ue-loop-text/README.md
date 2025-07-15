# 循环文本组件 (LoopTextClass)

一个高性能的循环文本轮播组件，支持可见性检测和自动暂停/恢复功能。

## 功能特性

- ✅ 自动循环播放文本
- ✅ 可见性检测（元素不可见时自动暂停）
- ✅ 可配置的延迟时间
- ✅ 内存泄漏防护
- ✅ 完善的销毁机制
- ✅ 支持手动控制（暂停/恢复/跳转）

## 基本使用

### 1. 简单初始化

```typescript
import { initLoopText } from "./utils/init-loop-text";

// 基本使用
const initFunction = await initLoopText();
const loopText = initFunction(domElement);
```

### 2. 带配置初始化

```typescript
import { initLoopText, LoopTextOptions } from "./utils/init-loop-text";

const options: LoopTextOptions = {
    enableVisibilityCheck: true, // 启用可见性检测（默认true）
    visibilityThreshold: 0.1, // 可见性阈值（0-1，默认0.1）
    delay: 2.4, // 延迟时间（秒，默认2.4）
};

const initFunction = await initLoopText(options);
const loopText = initFunction(domElement);
```

## 配置选项

### LoopTextOptions

| 属性                    | 类型      | 默认值 | 说明                  |
| ----------------------- | --------- | ------ | --------------------- |
| `enableVisibilityCheck` | `boolean` | `true` | 是否启用可见性检测    |
| `visibilityThreshold`   | `number`  | `0.1`  | 可见性检测阈值（0-1） |
| `delay`                 | `number`  | `2.4`  | 切换延迟时间（秒）    |

## API 方法

### 控制方法

```typescript
// 暂停播放
loopText.pause();

// 恢复播放
loopText.resume();

// 跳转到指定索引
loopText.goTo(2);

// 更新组件（重新初始化）
loopText.update();

// 销毁组件（重要！）
loopText.destroy();
```

### 状态查询

```typescript
// 检查是否已销毁
const isDestroyed = loopText.isDestroyedInstance();

// 获取当前索引
const currentIndex = loopText.getCurrentIndex();

// 获取总项目数
const totalCount = loopText.getTotalCount();

// 检查元素是否可见
const isVisible = loopText.isElementVisible();

// 获取当前配置
const options = loopText.getOptions();
```

### 动态配置

```typescript
// 动态更新配置
loopText.setVisibilityOptions({
    enableVisibilityCheck: false, // 禁用可见性检测
    visibilityThreshold: 0.5, // 设置可见性阈值为50%
    delay: 3.0, // 设置延迟时间为3秒
});
```

## 可见性检测功能

### 工作原理

组件使用 `IntersectionObserver` API 来检测元素在视口中的可见性：

1. **自动暂停**：当元素不可见时，自动停止动画循环
2. **自动恢复**：当元素重新可见时，自动恢复动画循环
3. **性能优化**：减少不必要的计算和DOM操作
4. **防抖处理**：避免频繁的可见性状态切换

### 配置可见性检测

```typescript
// 禁用可见性检测
const options = {
    enableVisibilityCheck: false,
};

// 设置严格的可见性要求（需要50%以上可见）
const options = {
    enableVisibilityCheck: true,
    visibilityThreshold: 0.5,
};

// 设置宽松的可见性要求（只需要10%可见）
const options = {
    enableVisibilityCheck: true,
    visibilityThreshold: 0.1,
};
```

## 内存管理

### 重要提醒

⚠️ **必须调用 `destroy()` 方法**来清理资源，避免内存泄漏：

```typescript
// 在组件销毁时调用
loopText.destroy();
```

### 自动清理

组件会自动清理以下资源：

- 定时器（setTimeout, setInterval）
- IntersectionObserver
- DOM 数据引用
- 对象属性引用

## 性能优化

### 1. 可见性检测

- 元素不可见时自动暂停动画
- 减少CPU和GPU使用
- 节省电池电量（移动设备）

### 2. 防抖处理

- 避免频繁的可见性状态切换
- 减少不必要的暂停/恢复操作

### 3. 内存管理

- 完善的销毁机制
- 防止内存泄漏
- 及时清理定时器和观察器

## 使用示例

### 完整示例

```typescript
import { initLoopText, LoopTextOptions } from "./utils/init-loop-text";

class MyComponent {
    private loopText: any = null;

    async init() {
        const options: LoopTextOptions = {
            enableVisibilityCheck: true,
            visibilityThreshold: 0.2,
            delay: 3.0,
        };

        const initFunction = await initLoopText(options);
        this.loopText = initFunction(this.$refs.loopTextContainer);
    }

    // 组件销毁时清理
    destroy() {
        if (this.loopText) {
            this.loopText.destroy();
            this.loopText = null;
        }
    }

    // 手动控制
    pause() {
        this.loopText?.pause();
    }

    resume() {
        this.loopText?.resume();
    }

    // 动态更新配置
    updateConfig() {
        this.loopText?.setVisibilityOptions({
            enableVisibilityCheck: false,
        });
    }
}
```

### Vue 组件示例

```vue
<template>
    <div ref="loopTextContainer" class="loop-text-container">
        <div class="loop-text-group">
            <div class="loop-text-item" data-active="true">文本1</div>
            <div class="loop-text-item">文本2</div>
            <div class="loop-text-item">文本3</div>
        </div>
    </div>
</template>

<script>
import { initLoopText } from "./utils/init-loop-text";

export default {
    data() {
        return {
            loopText: null,
        };
    },

    async mounted() {
        const initFunction = await initLoopText({
            enableVisibilityCheck: true,
            visibilityThreshold: 0.1,
            delay: 2.4,
        });

        this.loopText = initFunction(this.$refs.loopTextContainer);
    },

    beforeDestroy() {
        if (this.loopText) {
            this.loopText.destroy();
        }
    },

    methods: {
        pause() {
            this.loopText?.pause();
        },

        resume() {
            this.loopText?.resume();
        },
    },
};
</script>
```

## 注意事项

1. **浏览器兼容性**：可见性检测需要 `IntersectionObserver` 支持，现代浏览器都支持
2. **性能考虑**：在大量使用循环文本的页面中，建议启用可见性检测
3. **内存管理**：务必在组件销毁时调用 `destroy()` 方法
4. **配置调优**：根据实际需求调整可见性阈值和延迟时间
