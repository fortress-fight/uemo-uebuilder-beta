const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// 启用 CORS 中间件
app.use(cors());
app.use(express.static("./"));

// 在启动时确保 uploads 目录存在
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// 使用 path 模块获取文件扩展名
function getExtension(file) {
    return path.extname(file.originalname);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + getExtension(file));
    },
});

// 添加文件类型过滤器，例如只允许图片上传
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10240 * 1024, // 限制文件大小
    },
    // 修改文件过滤器，允许图片、svg、lottie 和 splinecode 类型
    fileFilter: (req, file, cb) => {
        const ext = getExtension(file).toLowerCase();
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".lottie", ".splinecode", ".json", ".jsmo"];
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("只允许上传图片、svg、lottie 或 splinecode 类型文件"));
        }
    },
});

app.post("/service", upload.single("Filedata"), (req, res) => {
    console.log("Uploaded file:", req.file);
    res.status(200).json({
        url: req.file.path,
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

app.listen(9005, () => {
    console.log("Working on port 9005");
});
