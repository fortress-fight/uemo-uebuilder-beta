# `stone-cli-plugin-sass`

> 添加 sass 的支持

## 功能

1.  提供 sass 的支持
2.  提供 sass 变量/方法的自动导入

## 使用方式

在 `package.json` 中添加

```json
{
    "devDependencies": {
        "@stone/vue-cli-plugin-sass": ...,
    }
}
```

执行

```shell
yarn
```

### 配置

```json
{
    "sassLoaderOption": {},
    "resource": {
        "patterns": []
    }
}
```

示例：

```json
pluginOptions: {
    sass: {
        "sassLoaderOption": {},
        resource: {
            patterns: [
                "src/assets/style/resource/*.scss",
                "src/pages/site/_local.scss",
            ],
        },
    },
},
```

1.  `sassLoaderOption` 重新定义 `sass-loader` 的配置

2.  `resource.patterns` 添加自动导入的匹配正则
