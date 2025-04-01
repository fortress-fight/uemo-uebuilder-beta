# @stone/uemo-editor-i18n

> UEBuilder 的全局国际化插件，提供中英文双语支持

## 功能特点

- 基于 vue-i18n 实现
- 支持中英文双语切换
- 默认使用中文（zh-cn）作为主要语言
- 提供完整的编辑器界面翻译

## 安装

```bash
npm install @stone/uemo-editor-i18n
# 或
yarn add @stone/uemo-editor-i18n
```

## 使用方法

```typescript
import { i18n, useI18n } from "@stone/uemo-editor-i18n";

// 在 Vue 应用中使用
app.use(i18n);

// 在组件中使用
const { t } = useI18n();
console.log(t("UNIT_BUTTON")); // 输出：按钮
```

## 语言包内容

该插件提供了丰富的语言包，包括：

- 基础单位（UNIT\_\*）
- 布局相关（ALIGN\_\*）
- 间距设置（MARGIN*\*, PADDING*\*）
- 动画效果（ENTER*ANIMATION*\*）
- 日期相关（CALENDER*\*, WEEK\*\*, MONTH\_*）
- 颜色选择器（COLOR*PICKER*\*）
- 文件上传（UPLOAD\_\*）
- 错误提示（ERROR\_\*）

## 注意事项

- 默认语言为中文（zh-cn）
- 支持的语言包：中文（zh-cn）、英文（en）
- 如需添加新的翻译内容，请更新对应的语言包文件

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目。
