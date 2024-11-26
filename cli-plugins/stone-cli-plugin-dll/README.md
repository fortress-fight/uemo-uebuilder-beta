# `@stone/vue-cli-plugin-dll`

> 添加 dll 打包功能

## 功能

`@stone/vue-cli-plugin-dll` 提供了下列功能

1.  添加 DLL 命令，提供 dll 打包功能

## 使用方式

在 `package.json` 中添加

```json
{
    "devDependencies": {
        "@stone/vue-cli-plugin-dll": ...,
    }
}
```

执行

```shell
yarn
```

### dll 命令

```js
{
    "script": {
        "dll": "vue-cli-service dll --mode production",
    }
}
```

### 配置参数

```json
{
    "pluginOptions": {
        "dll": {
            "entry": { "vendor": [...] }
        }
    }
}
```

示例：

```json
pluginOptions: {
    dll: {
        entry: { vendor: ["jquery"] },
    },
},
```
