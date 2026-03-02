# @stone/uebuilder-api

UEBuilder 编辑器所需要的公共接口基础库，提供了与 UEBuilder 相关的 API 调用封装和类型定义。

## 📋 目录

- [功能特性](#功能特性)
- [安装](#安装)
- [快速开始](#快速开始)
- [API 文档](#api-文档)
- [类型定义](#类型定义)
- [开发指南](#开发指南)
- [更新日志](#更新日志)

## ✨ 功能特性

- 🚀 **现代化 API 封装**: 基于 Axios 的 HTTP 请求封装
- 📦 **TypeScript 支持**: 完整的类型定义和智能提示
- 🔄 **请求缓存**: 内置缓存机制，提升性能
- 🎯 **模块化设计**: 清晰的 API 模块划分
- 🛡️ **类型安全**: 完整的 TypeScript 类型支持

## 📦 安装

```bash
# 使用 yarn
yarn add @stone/uebuilder-api

# 使用 npm
npm install @stone/uebuilder-api
```

## 🚀 快速开始

### 基础使用

```typescript
import { moduleStoreApi, pageStoreApi } from "@stone/uebuilder-api";

// 获取模板列表
const templateList = await moduleStoreApi.getList({
    style: "dark",
    cat: "business",
    type: 0,
    page: 1,
    limit: 10,
});

// 获取页面详情
const pageDetail = await pageStoreApi.getDetail("page-id");
```

### 自定义配置

```typescript
import { UemoApiAxiosInstance } from "@stone/uebuilder-api";

// 添加请求拦截器
UemoApiAxiosInstance.interceptors.request.use((config) => {
    // 添加认证头
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
```

## 📚 API 文档

### 模板 API (`moduleStoreApi`)

#### `getList(params: TemplateSearchParams)`

获取模板列表

**参数:**

- `style`: 主题样式 (`'dark' | 'tint' | ''`)
- `cat`: 分类名称
- `type`: 类型 (`0` - 普通, `1` - 特殊)
- `page`: 页码
- `limit?`: 每页条数 (可选)
- `order?`: 排序方式 (`'update' | 'hot' | 'create'`) (可选)

**返回:**

```typescript
ApiResponse<TemplateListResponse>;
```

#### `getDetail(id: string)`

获取模板详情

**参数:**

- `id`: 模板 ID

**返回:**

```typescript
ApiResponse<TemplateDetailResponse>;
```

### 页面 API (`pageStoreApi`)

#### `getList(params?: Partial<PageSearchParams>)`

获取页面列表

**参数:**

- `version?`: 版本 (`'v4' | 'v3'`)
- `style?`: 主题样式
- `cat?`: 分类名称
- `type?`: 类型
- `tools_editor?`: 编辑器工具 (`0 | 1`)
- `page?`: 页码
- `order?`: 排序方式

#### `getDetail(id: string)`

获取页面详情

**参数:**

- `id`: 页面 ID

#### `getCategory()`

获取页面分类信息

## 🏷️ 类型定义

### 主要类型

```typescript
// 主题样式类型
export type ThemeStyle = "dark" | "tint" | "";

// 模板查询参数
export interface TemplateSearchParams {
    style: ThemeStyle;
    cat: string;
    type: 0 | 1;
    page: number;
    limit?: number;
    order?: "update" | "hot" | "create";
}

// API 响应格式
interface ApiResponse<T> {
    code: number;
    data: T;
}
```

### 全局命名空间

```typescript
declare global {
    namespace UEBUILDER_BASE_API {
        // 全局类型定义
    }
}
```

## 🛠️ 开发指南

### 环境要求

- Node.js >= 20.19.0
- Yarn >= 1.22.19

### 本地开发

```bash
# 安装依赖
yarn install

# 运行代码检查
yarn lint

# 运行测试
yarn test
```

### 项目结构

```
uebuilder-api/
├── api/                    # API 模块
│   ├── index.ts           # 导出入口
│   ├── api.instance.ts    # Axios 实例配置
│   └── api.uemo-storehouse.ts  # 仓库相关 API
├── types/                 # 类型定义
│   └── global.d.ts       # 全局类型
├── package.json          # 包配置
├── tsconfig.json         # TypeScript 配置
└── README.md            # 项目文档
```

### 代码规范

项目使用以下工具确保代码质量：

- **ESLint**: JavaScript/TypeScript 代码检查
- **Stylelint**: CSS/SCSS 样式检查
- **Prettier**: 代码格式化
- **Husky**: Git hooks 管理
- **lint-staged**: 暂存文件检查

### 构建和发布

```bash
# 构建项目
yarn build

# 发布到 npm
yarn publish
```

## 🔧 配置说明

### Axios 配置

默认配置了以下特性：

- **基础 URL**: `https://moue5.jsmo.xin/api`
- **缓存机制**: 内存缓存，提升重复请求性能
- **响应拦截**: 自动提取 `response.data`

### TypeScript 配置

- 继承 `@stone/tsconfig` 基础配置
- 启用严格模式检查
- 支持 ESNext 语法特性
- 配置路径别名映射

## 🤝 贡献指南

1.  Fork 本仓库
2.  创建特性分支 (`git checkout -b feature/AmazingFeature`)
3.  提交更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  打开 Pull Request

### 提交信息规范

请遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

示例：

```
feat(api): add template search functionality
fix(types): correct ThemeStyle type definition
docs(readme): update API documentation
```
