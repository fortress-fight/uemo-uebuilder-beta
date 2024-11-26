# `@stone/vue-cli-plugin-tailwindcss`

> 添加 tailwindcss 支持

## 功能

`@stone/vue-cli-plugin-tailwindcss` 提供了下列功能

1.  添加 `tailwindcss`
2.  添加 `tailwindcss-config-viewer` 命令

## 使用方式

在 `package.json` 中添加

```json
{
    "devDependencies": {
        "@stone/vue-cli-plugin-tailwindcss": ...,
    }
}
```

执行

```shell
yarn
```

### tailwindcss 预览

```js
{
    usage: "vue-cli-service tailwindcss-config-viewer [options]",
    options: {
        "--port":
            "The port to run the viewer on. If occupied it will use next available port. (default: 3000)",
        "--open": "Open the viewer in default browser",
        "--config": "Path to your Tailwind config file",
    },
}
```
