# UEMO UEBuilder 4.1

UEMO UEBuilder 4.1 是一个基于 Vue.js 的可视化页面构建器工具集，采用 Monorepo 架构进行管理。该项目旨在提供一个强大、灵活且易用的页面设计和构建解决方案。

## 项目结构

项目采用 Lerna + Nx 进行包管理，主要包含以下几个主要模块：

```txt
+----------------------+
|  uebuilder-creator   |   ← 主项目入口 / 启动器
+----------+-----------+
           |
           v
+----------------------+
|  uebuilder-workbench |   ← 主工作台框架（总线 FrameMessageBus）
+----+---------+--------+
     |         |             （子线注册、事件分发、RPC桥接）
     v         v
+---------+  +--------------------------------------------------------+  +--------------+  +------------------+
| store-  |  |                       editor                           |  |   preview    |  |    composer      |
| house   |  |                 （编辑器子线 FrameMessageClient）        |  |              |  |                  |
+---------+  |                                                        |  +--------------+  +------------------+
             |  +--------------------------+                          |
             |  |   操作面板层（控制器）     |  ← parent iframe         |
             |  |   editor-control-frame   |                          |
             |  +------------+-------------+                          |
             |               |                                        |
             |               v                                        |
             |  +--------------------------+                          |
             |  |   编辑内容层（画布）       |  ← 子 iframe              |
             |  |   editor-canvas-frame    |                          |
             |  +--------------------------+                          |
             +--------------------------------------------------------+
```

### 核心模块 (uebuilder-core)

-   **uebuilder-composer**: 页面组合器，负责页面元素的组合和布局
    -   开发服务器: <https://127.0.0.1:9006>
-   **uebuilder-editor**: 核心编辑器模块，提供页面编辑的主要功能
    -   开发服务器: <https://127.0.0.1:9002>
    -   `index.html` uebuilder-editor 中编辑的及时响应页面
    -   `factory.html` uebuilder-editor 中编辑的控制面板层
-   **uebuilder-preview**: 页面预览模块，用于实时预览编辑效果
    -   开发服务器: <https://127.0.0.1:9003>

### 工具模块 (uebuilder-tools)

-   **uebuilder-creator**: 创建器工具，用于创建新的页面和组件
    -   开发服务器: <https://127.0.0.1:9000>
-   **uebuilder-storehouse**: 资源仓库，管理可复用的组件和资源
    -   开发服务器: <https://127.0.0.1:9004>
-   **uebuilder-workbench**: 工作台，提供统一的开发环境
    -   开发服务器: <https://127.0.0.1:9001>

### 插件模块 (uebuilder-plugins)

-   **uemo-editor-assets**: 编辑器资源管理插件
-   **uemo-editor-element**: 基础 UI 元素库
    -   开发服务器: <https://127.0.0.1:9007>
-   **uemo-editor-i18n**: 国际化支持插件
-   **uemo-editor-page**: 页面管理插件
    -   开发服务器: <https://127.0.0.1:9007>
-   **uemo-editor-panel**: 编辑面板插件
    -   开发服务器: <https://127.0.0.1:9008>
-   **uemo-editor-tiptap**: 富文本编辑器插件
    -   开发服务器: <https://127.0.0.1:9007>
-   **uemo-editor-type**: TypeScript 类型定义
-   **uemo-editor-utils**: 通用工具库
-   **uemo-file-upload**: 文件上传功能
-   **uemo-icon-font**: 图标字体管理
-   **uemo-share-icon-font**: 共享图标字体库

### CLI 工具 (cli-plugins & cli-configs)

#### CLI 插件

-   **stone-cli-plugin-babel**: Babel 配置插件
-   **stone-cli-plugin-dll**: DLL 打包优化插件
-   **stone-cli-plugin-ejs**: EJS 模板支持
-   **stone-cli-plugin-filemanager**: 文件管理插件
-   **stone-cli-plugin-jquery**: jQuery 支持插件
-   **stone-cli-plugin-normalize-css**: CSS 标准化插件
-   **stone-cli-plugin-report**: 构建报告插件
-   **stone-cli-plugin-sass**: Sass 支持插件
-   **stone-cli-plugin-svg-sprite**: SVG 精灵图插件
-   **stone-cli-plugin-tailwindcss**: Tailwind CSS 支持
    -   配置查看器: <http://127.0.0.1:3000>
-   **stone-cli-plugin-typescript**: TypeScript 支持插件

#### CLI 配置

-   **eslint-plugin-base**: ESLint 基础配置
-   **stone-tsconfig**: TypeScript 配置
-   **stone-vue-config**: Vue.js 项目配置
-   **stylelint-config-base**: StyleLint 基础配置

## 技术栈

-   框架：Vue.js
-   构建工具：Webpack
-   包管理：Lerna + Nx
-   语言：TypeScript
-   样式：SCSS + TailwindCSS
-   代码规范：ESLint + StyleLint

## 开发指南

### 环境要求

-   Node.js >= 14.0.0
-   Yarn >= 1.22.0

### 测试环境

-   https
    可以在开发时，创建个人 https 证书<https://github.com/FiloSottile/mkcert>，提供给 nginx 和 webpack devserver 使用
-   nginx

### 安装依赖

```bash
yarn install
```

### 开发命令

```bash
# 启动开发服务
yarn dev

# 构建项目
yarn build

# 代码检查
yarn lint
```

## 项目特点

1.  **模块化设计**: 采用 Monorepo 架构，便于管理和维护
2.  **可扩展性**: 提供丰富的插件系统，支持功能扩展
3.  **TypeScript**: 全面的类型支持，提高代码质量
4.  **国际化**: 内置多语言支持
5.  **主题定制**: 灵活的主题配置系统
6.  **组件库**: 丰富的预置组件

## 版本控制

遵循 [SemVer](http://semver.org/) 语义化版本规范。

## 使用介绍

### 启动

使用 `Nginx` 代理相关端口

1.  `uebuilder-creator` 端口 `9000`
2.  `uebuilder-workbench` 端口 `9001`
3.  `uebuilder-editor` 端口 `9002`
4.  `uebuilder-preview` 端口 `9003`
5.  `uebuilder-storehouse` 端口 `9004`
6.  `test-upload` 端口 `9005`
7.  `uemo-editor-panel-ui` 端口 `9006`

`Nginx` 的配置

```txt
#user  nobody;
worker_processes 1;

error_log logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;
events {
  worker_connections 1024;
}


http {
  include mime.types;
  default_type application/octet-stream;

  log_format main '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';

  #access_log  logs/access.log  main;
  sendfile on;
  #tcp_nopush     on;

  #keepalive_timeout  0;
  keepalive_timeout 65;

  #gzip  on;

  server {
    listen 80;
    server_name 192.168.0.156;

    #charset koi8-r;

    # add_header Set-Cookie "PHPSESSID=p6ihq2hcud5jh7e2ggs4d418e0; Path=/; HttpOnly";
    add_header Set-Cookie "PHPSESSID=13k02mqfikfiv6fvh77blt2q42; Path=/; HttpOnly";
    access_log logs/host.access.log main;
    error_log logs/host.error.log;

    proxy_buffer_size 64k;
    proxy_buffers 32 32k;
    proxy_busy_buffers_size 128k;

    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-Ip $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    location /Api/ {
      proxy_ssl_server_name on;
      proxy_pass https://ai-api.uemox.com;
    }
    location /shop/ {
      proxy_ssl_server_name on;
      proxy_pass https://www.uemo.net;
    }
    location /tools/ {
      proxy_ssl_server_name on;
      proxy_pass https://www.uemo.net;
    }

    location /uploads/ {
      proxy_ssl_server_name on;
      proxy_pass http://static-shop.jsmo.xin;
    }

    location /app-start/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9006/;
    }

    location /app-storehouse/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9004/;
    }

    location /app-preview/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9003/;
    }

    location /app-editor/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9002/;
    }


    location /api/units/ {
      proxy_ssl_server_name on;
      proxy_pass https://moue5.jsmo.xin;
    }

    location /api/pages/ {
      proxy_ssl_server_name on;
      proxy_pass https://moue5.jsmo.xin;
    }

    location /service/ {
      proxy_ssl_server_name on;
      proxy_pass https://moue5.jsmo.xin;
    }

    # 模版CMS接口
    location /mo005-cms-api/ {
      proxy_ssl_server_name on;
      proxy_pass https://moue5.jsmo.xin/;
    }

    # 客户CMS接口
    # location /mo005-cms-api/ {
    #   proxy_ssl_server_name on;
    #   proxy_pass https://hschinaproduct-manage.franke.com/;
    # }

    # add_header Set-Cookie 'PHPSESSID=chcjoqic32n06epm91ggov2sn5';
    location /mo005-cms/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9007/;
    }
    # add_header Set-Cookie 'PHPSESSID=chcjoqic32n06epm91ggov2sn5';

    location /templates/ {
      root html;
      index index.html index.htm;
      proxy_pass https://moue5.jsmo.xin;
    }


    location /uemo-ai-service/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:8001/;
    }

    location /assets/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:10001/assets/;
    }

    location /assets-m/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:10002/assets-m/;
    }

    location /public/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:10003/public/;
    }

    location /public-m/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:10004/public-m/;
    }

    location /mo005/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:8018/;
    }

    # location /ai-api/ {
    #   proxy_ssl_server_name on;
    #   proxy_pass https://moue5.jsmo.xin;
    # }

    location /ai-api/ {
      proxy_ssl_server_name on;
      proxy_pass https://www.uemo.net/ai-api/;
    }


    # http://192.168.0.156/ai-api/ai/Api/Platform/Ai/Chat
    # https://www.uemo.net/ai-api/ai/Api/Platform/Ai/Chat
    location /element-ui/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9007/;
    }

    location /editor-tiptap-ui/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9007/;
    }

    location /uemo-list-module/site-url/ {
      proxy_ssl_server_name on;
      proxy_pass http://mo005-17794.mo5.line1.jsmo.xin/;
    }

    location /uemo-list-module/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:10010/;
    }


    location /UeMaterial.Api/ {
      proxy_ssl_server_name on;
      proxy_pass https://card.uemox.com:8081;
    }

    # start UEBuilder 相关

    location /app-main/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9001/;
    }

    # Uebuilder 4.1 版本
    location /uebuilder-workbench/ {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9001/;
    }

    location / {
      root html;
      index index.html index.htm;
      proxy_pass http://127.0.0.1:9000/;
    }
    # end UEBuilder 相关

    #error_page  404              /404.html;
    # redirect server error pages to the static page /50x.html
    #
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
      root html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}
    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
  }

  # another virtual host using mix of IP-, name-, and port-based configuration
  #
  #server {
  #    listen       8000;
  #    listen       somename:8080;
  #    server_name  somename  alias  another.alias;
  #    location / {
  #        root   html;
  #        index  index.html index.htm;
  #    }
  #}
  # HTTPS server
  #
  server {
    listen 443 ssl;
    server_name 127.0.0.1;
    ssl_certificate /opt/homebrew/etc/nginx/ssl/localhost+2.pem;
    ssl_certificate_key /opt/homebrew/etc/nginx/ssl/localhost+2-key.pem;
`
    ssl_session_cache shared:SSL:1m;
    ssl_session_timeout 5m;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    #charset koi8-r;

    add_header Set-Cookie "PHPSESSID=13k02mqfikfiv6fvh77blt2q42; Path=/; HttpOnly";
    access_log logs/host.access.log main;
    error_log logs/host.error.log;

    proxy_buffer_size 64k;
    proxy_buffers 32 32k;
    proxy_busy_buffers_size 128k;

    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-Ip $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    location /shop/ {
      proxy_ssl_server_name on;
      proxy_pass https://www.uemo.net;
    }
    location /tools/ {
      proxy_ssl_server_name on;
      proxy_pass https://www.uemo.net;
    }
    location /ai-api/ {
      proxy_ssl_server_name on;
      proxy_pass https://www.uemo.net/ai-api/;
    }


    location /editor-tiptap-ui/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9007/;
    }

    location /app-start/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9006/;
    }

    location /app-storehouse/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9004/;
    }

    location /app-preview/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9003/;
    }

    location /app-editor/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9002/;
    }


    location /app-element/ {
      root html;
      index index.html index.htm;
      proxy_pass https://192.168.5.6:9007/;
    }

    location /app-element-beta/ {
      root html;
      index index.html index.htm;
      proxy_pass https://192.168.5.6:9008/;
    }

    # 模版CMS接口
    location /mo005-cms-api/ {
      proxy_ssl_server_name on;
      proxy_pass https://moue5.jsmo.xin/;
    }

    location /UeMaterial.Api/ {
      proxy_ssl_server_name on;
      proxy_pass https://card.uemox.com:8081;
    }

    # start UEBuilder 相关
    location /app-main/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9001/;
    }

    # Uebuilder 4.1 版本
    location /uebuilder-workbench/ {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9001/;
    }

    location / {
      root html;
      index index.html index.htm;
      proxy_pass https://127.0.0.1:9000/;
    }
    # end UEBuilder 相关

    #error_page  404              /404.html;
    # redirect server error pages to the static page /50x.html
    #
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
      root html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}
    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
  }

  include servers/*;
}
```
