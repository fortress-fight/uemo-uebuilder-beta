# UEMO 的页面编辑器 V5

> 重构 UEMO 的页面编辑器 -- 第四版

## 目录介绍

### web-apps 主项目目录

1.  `app-creator` APP 初始化程序
2.  `app-main` APP 主面板项目
    app-main 层不负责页面数据解析，只负责将页面需要解析的数据传递给 (app-editor | app-preview) 层，这样是为了解耦
3.  `app-editor` APP 页面编辑项目
    1.  `index.html` APP-editor 中编辑的及时响应页面
    2.  `factory.html` APP-editor 中编辑的控制面板层
4.  `app-preview` APP 页面预览项目
5.  `app-storehouse` APP 的模板仓库

### test 项目测试目录

1.  `test-app-main` APP 的项目测试
1.  `test-upload` APP 图片上传服务

### types 类型定义目录

1.  `uemo-editor-type` APP 的全局类型

### cli-tools 脚手架工具目录

### packages 组件/工具 相关目录

1.  `uemo-editor-assets` APP 静态资源管理
2.  `uemo-editor-ui` APP UI 组件库
3.  `uemo-editor-element` APP UI 组件库 V2
4.  `uemo-editor-utils` APP 工具方法
5.  `uemo-editor-page` APP 页面的组件库
6.  `uemo-editor-panel-ui` APP 页面的编辑面板组件库

## 使用介绍

### 启动

使用 `Nginx` 代理相关端口

1.  `app-creator` 端口 `9000`
2.  `app-main` 端口 `9001`
3.  `app-editor` 端口 `9002`
4.  `app-preview` 端口 `9003`
5.  `app-storehouse` 端口 `9004`
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
        server_name 192.168.2.213;

        #charset koi8-r;

        access_log logs/host.access.log main;
        error_log logs/host.error.log;

        proxy_buffer_size 64k;
        proxy_buffers 32 32k;
        proxy_busy_buffers_size 128k;

        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

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

        location /app-main/ {
            root html;
            index index.html index.htm;
            proxy_pass http://127.0.0.1:9001/;
        }

        location / {
            root html;
            index index.html index.htm;
            proxy_pass http://127.0.0.1:9000/;
        }

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
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}
```
