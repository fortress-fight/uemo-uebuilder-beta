# 图标字体构建工具

多包图标字体构建系统，支持多入口、增量编译和选择性构建。

## ✨ 特性

- 🎯 **多包管理**：支持将图标分类到不同的包
- ⚡ **增量编译**：智能检测文件变化，只构建需要更新的包
- 🎨 **独立构建**：可以选择构建单个或多个包
- 👤 **人工管理**：完全控制图标分类，精确管理每个包
- 🧹 **目录整洁**：临时文件自动清理，输出结构清晰
- 📊 **构建统计**：详细的构建信息和缓存统计

## 📁 项目结构

```
icon-font/
├── src/                    # 源文件目录（多包入口）
│   └── untitled/          # 图标包示例
│       ├── icon1.svg
│       ├── icon2.svg
│       └── ...
├── dist/                  # 输出目录
│   └── untitled/          # 生成的字体文件
├── lib/                   # 工具库
│   ├── font-builder.mjs   # 字体构建器
│   ├── unicode-manager.mjs # Unicode 管理器
│   └── cache-manager.mjs  # 缓存管理器
├── styles/                # 样式模板
├── .cache/                # 构建缓存（自动生成）
├── .tmp/                  # 临时文件（自动清理）
├── icon-font.config.mjs   # 配置文件
└── build.mjs              # 主构建脚本
```

## 🚀 快速开始

### 交互式构建（默认）⭐

```bash
yarn build
```

交互式面板提供：

- 📊 **状态概览** - 查看所有包的状态和变化详情
- 🎯 **构建模式** - 增量/全量/选择性/清理缓存
- 📝 **变化跟踪** - 显示新增、修改、删除的图标
- ✨ **友好界面** - 清晰的可视化界面和实时反馈

**界面预览：**

```
============================================================
    图标字体构建工具 - 交互模式
============================================================

ℹ 扫描到 3 个图标包:
  有文件: 2 个
  空包: 1 个

包详情:

  📦 untitled
     描述: 图标字体库
     图标: 50 个
     原因: 无变化

============================================================
    构建计划
============================================================

📦 需要构建的图标包 (1 个):
  1. icons
     原因: 文件内容变化
     变化: 新增 3 个, 修改 2 个

⏭  跳过的图标包 (2 个):
  untitled, social

请选择构建模式:
  1. 增量构建 (仅构建有变化的包)
  2. 全量构建 (构建所有包)
  3. 选择性构建 (手动选择要构建的包)
  4. 清理缓存并全量构建
  0. 退出
```

### 命令行构建

```bash
# 命令行方式（增量编译）
yarn build:cli

# 强制重新构建所有包
yarn build:force

# 构建指定的包
node build.mjs -p untitled
```

## 📝 命令说明

### 主要命令

```bash
# 交互式构建（默认）
yarn build

# 命令行构建（增量编译）
yarn build:cli

# 强制重新构建
yarn build:force
```

### 交互式模式功能

交互式构建提供完整的可视化界面：

1. **增量构建** - 自动检测变化，只构建需要更新的包
2. **全量构建** - 重新构建所有包
3. **选择性构建** - 手动选择要构建的包
4. **清理缓存** - 清除所有缓存并全量构建

### 命令行高级选项

```bash
# 显示帮助信息
node build.mjs --help

# 构建指定的包
node build.mjs -p untitled

# 构建多个包
node build.mjs -p package1 -p package2

# 强制重新构建指定包
node build.mjs -p untitled --force

# 禁用增量编译
node build.mjs --no-incremental
```

## 🎯 添加新图标

### 添加图标到包

1.  将 SVG 文件放入对应的包目录：

```bash
# 添加图标到 untitled 包
cp new-icon.svg src/untitled/
```

2.  构建：

```bash
# 构建（增量编译会自动检测变化）
yarn build
```

### 创建新的图标包

1.  在 `icon-font.config.mjs` 中添加新包配置：

```javascript
packages: {
    newpack: {
        name: "newpack",
        fontName: "ue-newpack",
        description: "新图标包",
        startUnicode: 0xeb01,
    },
}
```

2.  创建对应的源文件目录：

```bash
mkdir src/newpack
```

3.  添加 SVG 文件到新目录

4.  构建新包：

```bash
node build.mjs -p newpack
```

## 📊 增量编译

构建系统会自动检测文件变化，只构建需要更新的包：

```bash
$ yarn build

🚀 图标字体构建工具
[INFO] 增量编译模式
[INFO] 准备构建 3 个图标包

[social] 开始构建...  # 有变化，构建
[ui] 无变化，跳过构建  # 无变化，跳过
[brand] 开始构建...    # 有变化，构建

📊 构建总结
成功构建: 2 个包
跳过构建: 1 个包
```

**优势**：

- ⚡ 大幅提升构建速度
- 💾 智能缓存管理
- 🔍 显示文件变化详情（新增、修改、删除）

## 🔧 配置文件

编辑 `icon-font.config.mjs` 来自定义配置：

```javascript
export default {
    // 源文件目录
    srcDir: "src",

    // 输出目录
    distDir: "dist",

    // 图标包配置
    packages: {
        social: {
            name: "social",
            fontName: "ue-social",
            description: "社交媒体图标",
            startUnicode: 0xea01,
        },
        // ... 更多包配置
    },

    // 增量构建配置
    incremental: {
        enabled: true,
        cacheFile: ".cache/build-cache.json",
    },
};
```

## 📤 输出文件

每个包构建后会生成以下文件：

```
dist/{package}/
├── ue-{package}.ttf         # TrueType 字体
├── ue-{package}.woff        # WOFF 字体
├── ue-{package}.woff2       # WOFF2 字体（推荐）
├── ue-{package}.eot         # EOT 字体（IE 兼容）
├── ue-{package}.svg         # SVG 字体
├── ue-{package}.scss        # SCSS 样式文件
├── ue-{package}.css         # CSS 样式文件
├── ue-{package}-base64.scss # 内嵌 Base64 的 SCSS
├── _var.ue-{package}.scss   # SCSS 变量
├── ue-{package}.symbol.svg  # SVG Symbol
├── unicode-map.json         # Unicode 映射
└── *.html                   # 预览页面
```

## 💡 使用生成的字体

### 在 SCSS 中使用

```scss
// 引入图标字体
@import "@stone/icon-font/dist/untitled/untitled.scss";

// 使用图标
.icon {
    font-family: "untitled";
    &::before {
        content: $untitled-icon-name;
    }
}
```

### 在 HTML 中使用

```html
<!-- 引入 CSS -->
<link rel="stylesheet" href="dist/untitled/untitled.css" />

<!-- 使用图标类 -->
<i class="untitled untitled-icon-name"></i>
```

## 🛠️ 开发

### 图标包管理建议

**包分类示例：**

- `icons` - 通用图标集
- `social` - 社交媒体图标
- `ui` - UI 元素图标
- `brand` - 品牌图标
- 根据项目需要自定义

**人工管理优势：**

- ✅ 完全控制图标分类
- ✅ 更精确的包划分
- ✅ 符合项目实际需求

## 📈 性能特点

- **首次构建**：约 3-5s（取决于图标数量）
- **增量编译**：无变化时约 0.1s ⚡
- **部分更新**：只构建变化的包，约 2s ⚡
- **选择性构建**：支持按需构建指定包 ✅

## 📚 文档

- **[交互式构建指南](./INTERACTIVE-GUIDE.md)** - 详细的交互式构建使用说明

## ❓ 常见问题

### Q: 如何清除缓存？

```bash
rm -rf .cache
yarn build:force

# 或使用交互式构建的"清理缓存"选项
yarn build
```

### Q: 如何查看某个包的图标？

打开 `dist/{package}/index.html` 在浏览器中预览。

### Q: 构建失败怎么办？

1.  检查 SVG 文件格式是否正确
2.  确保依赖已安装：`yarn install`
3.  尝试强制重新构建：`yarn build:force`
4.  清除临时文件：`rm -rf .tmp .cache`

## 📄 许可证

MIT

## 👤 作者

ff-stone <stone_fu_work@163.com>
