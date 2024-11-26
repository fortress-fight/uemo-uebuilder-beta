const svgtofont = require("svgtofont");
const path = require("path");

svgtofont({
    src: path.resolve(process.cwd(), "svgo-clean"), // svg path
    dist: path.resolve(process.cwd(), "fonts"), // output path
    fontName: "ueicon", // font name
    css: true, // Create CSS files.
    startUnicode: 0xea01, // unicode start number
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
    })
    .catch((err) => {
        console.log("图标字创建失败!");
    });
