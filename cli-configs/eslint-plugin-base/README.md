# `eslint-plugin-base`

> eslint 扩展

## Usage

### VSCode 支持

[eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
[eslint-disable-snippets](https://marketplace.visualstudio.com/items?itemName=drKnoxy.eslint-disable-snippets)

### 添加配置文件 .eslintrc.js

1.  js

    ```js
    module.exports = {
        extends: ["plugin:@stone/base/js"],
    };
    ```

2.  ts

    ```js
    module.exports = {
        extends: ["plugin:@stone/base/ts"],
    };
    ```

### `package.json` 配置执行命令

```json
{
    "lint:js": "eslint --ext \".js,.ts,.vue\" --ignore-path .gitignore .",
    "lintfix": "yarn lint:js --fix"
}
```

## 补充

### 配合和 lint-staged 在 GIT 提交之前进行校验

1.  安装依赖

    ```shell
    yarn add -D husky lint-staged
    ```

2.  package.json

    ```json
    {
        "script": {
            "prepare": "husky install"
        },
        "lint-staged": {
            "*.{js,ts,vue}": "eslint --cache"
        }
    }
    ```

3.  `.husky/pre-commit`

    ```shell
    #!/usr/bin/env sh
    . "$(dirname "$0")/_/husky.sh"

    npx lint-staged
    ```
