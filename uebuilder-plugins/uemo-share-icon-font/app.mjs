import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import svgtofont from "svgtofont";
import { getIconUnicode } from "./get-icon-unicode.mjs";

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前模块的目录路径
const __dirname = dirname(__filename);

svgtofont({
    src: path.resolve(process.cwd(), "svgo-clean"), // svg path
    dist: path.resolve(process.cwd(), "fonts"), // output path
    fontName: "ue-share", // font name
    css: true, // Create CSS files.
    startUnicode: 0xea01, // unicode startzxs number
    useCSSVars: false,
    getIconUnicode,
    svgicons2svgfont: {
        fontHeight: 1000,
        normalize: true,
    },
    styleTemplates: path.resolve(__dirname, "./styles"),
    // website = null, no demo html files
    website: {
        title: "svgtofont",
        // Must be a .svg format image.
        logo: path.resolve(process.cwd(), "svg", "git.svg"),
        // version: pkg.version,
        meta: {
            description: "Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.",
            keywords: "svgtofont,TTF,EOT,WOFF,WOFF2,SVG",
        },
        description: ``,
        // Add a Github corner to your website
        // Like: https://github.com/uiwjs/react-github-corners
        corners: {
            url: "https://github.com/jaywcjlove/svgtofont",
            width: 62, // default: 60
            height: 62, // default: 60
            bgColor: "#dc3545", // default: '#151513'
        },
        links: [
            {
                title: "GitHub",
                url: "https://github.com/jaywcjlove/svgtofont",
            },
            {
                title: "Feedback",
                url: "https://github.com/jaywcjlove/svgtofont/issues",
            },
            {
                title: "Font Class",
                url: "index.html",
            },
            {
                title: "Unicode",
                url: "unicode.html",
            },
            {
                title: "Symbol",
                url: "symbol.html",
            },
        ],
        footerInfo: `Licensed under MIT. (Yes it's free and <a href="https://github.com/jaywcjlove/svgtofont">open-sourced</a>`,
    },
})
    .then(() => {
        console.log("图标字创建成功!");
        // 新增：读取生成的 woff2 字体文件并转换为 base64 字符串
        const woff2Path = path.resolve(process.cwd(), "fonts", "ue-share.woff2");
        const fontData = fs.readFileSync(woff2Path);
        const base64Str = fontData.toString("base64");

        // 读取 ue-share-base64.scss 文件，替换 <% base64 %> 占位符为 base64Str
        const scssPath = path.resolve(process.cwd(), "fonts", "ue-share-base64.scss");
        let scssContent = fs.readFileSync(scssPath, "utf8");
        scssContent = scssContent.replace("<% base64 %>", base64Str);
        fs.writeFileSync(scssPath, scssContent);
    })
    .then(() => {
        fs.copyFileSync("./unicode-map.json", path.resolve(process.cwd(), "fonts", "unicode-map.json"));
        console.log("done!");
    })
    .catch((err) => {
        console.log("图标字创建失败!");
    });
