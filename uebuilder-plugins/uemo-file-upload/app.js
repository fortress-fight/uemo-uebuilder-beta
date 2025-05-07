const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// 文件类型映射
const FILE_TYPE_MAP = {
    image: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    video: [".mp4", ".webm", ".mov"],
    lottie: [".lottie", ".json"],
    spline: [".splinecode"],
    jsmo: [".jsmo"],
    svg: [".svg"],
};

// 获取文件类型
function getFileType(extname) {
    extname = extname.toLowerCase();
    for (const [type, extensions] of Object.entries(FILE_TYPE_MAP)) {
        if (extensions.includes(extname)) {
            return type;
        }
    }
    return "other";
}

// 启用 CORS 中间件
app.use(cors());
app.use(express.json());
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
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + getExtension(file));
    },
});

// 添加文件类型过滤器，例如只允许图片上传
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 10240 * 1024, // 限制文件大小
    // },
    // 修改文件过滤器，允许图片、svg、lottie 和 splinecode 类型
    fileFilter: (_req, file, cb) => {
        const ext = getExtension(file).toLowerCase();
        const allowedExtensions = Object.values(FILE_TYPE_MAP).flat();
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("只允许上传图片、svg、lottie 或 splinecode 类型文件"));
        }
    },
});

// 获取文件大小的格式化字符串
function formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// 获取上传历史记录
app.get("/service/history", (req, res) => {
    const { page = "1", limit = 10, type, filename } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    try {
        // 读取上传目录中的所有文件
        const files = fs.readdirSync(uploadsDir);

        // 过滤文件
        const filteredFiles = files.filter((file) => {
            const filePath = path.join(uploadsDir, file);
            const _stats = fs.statSync(filePath);

            // 根据类型和文件名过滤
            const fileType = getFileType(path.extname(file));
            const matchesType = !type || fileType === type;
            const matchesFilename = !filename || file.toLowerCase().includes(filename.toLowerCase());

            return matchesType && matchesFilename;
        });

        // 计算总数
        const total = filteredFiles.length;

        // 分页处理
        const start = (pageNum - 1) * limitNum;
        const end = start + limitNum;
        const paginatedFiles = filteredFiles.slice(start, end);

        // 构建返回数据
        const list = paginatedFiles.map((file) => {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);
            return {
                id: file,
                filename: file,
                url: `http://127.0.0.1:9005/uploads/${file}`,
                size: formatFileSize(stats.size),
                type: getFileType(path.extname(file)),
                post_date: stats.mtime.toISOString(),
            };
        });

        res.json({
            code: 200,
            data: {
                limit: limitNum,
                page: pageNum,
                total,
                list,
            },
        });
    } catch (error) {
        console.error("获取上传历史记录失败:", error);
        res.status(500).json({
            code: 500,
            message: "获取上传历史记录失败",
        });
    }
});

app.post("/service", upload.single("Filedata"), (req, res) => {
    // eslint-disable-next-line no-console
    console.log("Uploaded file:", req.file);
    res.status(200).json({
        url: req.file.path,
    });
});

// 错误处理中间件
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
});

app.listen(9005, () => {
    // eslint-disable-next-line no-console
    console.log("Working on port 9005");
});
