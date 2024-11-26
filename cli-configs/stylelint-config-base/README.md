# `stylelint-config-base`

> stylelint config

## Usage

### VSCode 支持

[stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
[stylelint-disable-snippets](https://marketplace.visualstudio.com/items?itemName=hedinne.stylelint-disable-snippets)

修改 config

```json
{
    "scss.format.enable": false,
    "stylelint.snippet": ["css", "scss", "less", "postcss"],
    "stylelint.validate": ["css", "scss"],
    "stylelint.packageManager": "yarn",
    "[scss]": {
        "editor.formatOnSave": false,
        "editor.codeActionsOnSave": {
            "source.fixAll.stylelint": true,
            "source.fixAll": true
        }
    }
}
```

### sass

```js
module.exports = {
    extends: "@stone/stylelint-config-base/sass",
};
```

`package.json` 配置执行命令

```json
{
    "lint:style": "stylelint \"**/*.{css,scss,sass,html,vue}\" --ignore-path .gitignore .stylelintignore",
    "lintfix": "yarn lint:style --fix"
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
            "*.{css,scss,sass,html,vue}": "stylelint"
        }
    }
    ```

    如果使用 `workspace` 修改为

    ```bash
    "prepare": "cd ../.. && husky local-project/wetalk-homepage/.husky",
    ```

3.  `.husky/pre-commit`

    ```shell
    #!/usr/bin/env sh
    . "$(dirname "$0")/_/husky.sh"

    npx lint-staged
    ```
