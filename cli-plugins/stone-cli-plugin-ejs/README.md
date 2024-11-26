# `stone-cli-ejs`

> 添加 EJS 模板的支持

## 功能

`stone-cli-ejs` 提供了下列功能

1.  支持 EJS 模板
2.  监控 EJS 文件修改触发 HRM
3.  支持多页面

## 使用方式

在 `package.json` 中添加

```json
{
    "devDependencies": {
        "@stone/vue-cli-plugin-ejs": ...,
    }
}
```

执行

```shell
yarn
```

### 配置参数

```json
{
    "watchFiles": []
}
```

示例：

```json
pluginOptions: {
    ejs: {
        watchFiles: ["src/pages/layout/*.ejs"],
    },
},
```

1.  watchFiles: 添加额外的监控文件

## 其它

1.  添加 `webpackDefine`

    ```json
    {
        "process.env.EJS_PAGES": JSON.stringify(htmlRecord),
    }
    ```
