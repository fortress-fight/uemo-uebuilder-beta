# @stone/uemo-editor-utils

> 用于 UeEditor 编辑器插件集合中常用工具函数和辅助功能的工具库

## 介绍

@stone/uemo-editor-utils 提供了一系列工具和辅助函数，旨在简化 UeEditor 插件的开发流程并提升编辑体验。

## 特性

-   常用工具函数

## 安装

```bash
npm install @stone/uemo-editor-utils --save
```

## 使用示例

```typescript
import copy from "@stone/uemo-editor-utils/lib/copy";

const success = copy("示例文本");
if (success) {
    console.log("复制成功");
} else {
    console.error("复制失败");
}
```
