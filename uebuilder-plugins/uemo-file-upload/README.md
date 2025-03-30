# 文件上传服务

本项目使用 Node.js、Express 以及 Multer 实现文件上传，支持图片、SVG、Lottie 和 Splinecode 类型文件。

## 功能特点

-   支持本地文件选择上传和通过 URL 上传
-   自动创建上传目录（uploads）
-   文件重命名（附加时间戳）
-   限制文件大小和类型（仅允许特定后缀）
-   跨域资源共享（CORS）支持
-   统一错误处理

## 快速开始

1.  安装依赖：

    ```bash
    npm install
    ```

2.  启动服务：

    ```bash
    nodemon
    ```

    若未全局安装 nodemon，可运行：

    ```bash
    npm install -g nodemon
    ```

3.  访问服务：
    -   静态页面：`http://localhost:9005/`
    -   上传接口：`POST http://localhost:9005/service`

## 配置说明

-   **上传目录**：自动创建并存放上传文件的目录为 `uploads`
-   **文件类型**：允许上传的文件后缀包括：.jpg, .jpeg, .png, .gif, .svg, .lottie, .splinecode, .json, .jsmo
-   **文件大小限制**：默认设置为 10240 \* 1024（可根据需求调整）

## 参考资源

-   [Express 官方文档](https://expressjs.com/)
-   [Multer 项目主页](https://github.com/expressjs/multer)
