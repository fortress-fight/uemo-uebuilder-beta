/**
 * 字体构建器
 * 负责单个图标包的构建流程
 */
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import svgtofont from "svgtofont";
import { UnicodeManager } from "./unicode-manager.mjs";

export class FontBuilder {
    constructor(config, packageConfig, options = {}) {
        this.config = config;
        this.packageConfig = packageConfig;
        this.packageName = packageConfig.name;
        this.fontName = packageConfig.fontName;
        // 构建选项：cleanDist 控制是否清空 dist 目录
        this.options = {
            cleanDist: false, // 默认不清空，直接覆盖
            ...options,
        };
    }

    /**
     * 日志工具
     */
    log = {
        // eslint-disable-next-line no-console
        info: (msg) => console.log(`\x1b[36m[${this.packageName}]\x1b[0m ${msg}`),
        // eslint-disable-next-line no-console
        success: (msg) => console.log(`\x1b[32m[${this.packageName}]\x1b[0m ${msg}`),
        error: (msg) => console.error(`\x1b[31m[${this.packageName}]\x1b[0m ${msg}`),
        warn: (msg) => console.warn(`\x1b[33m[${this.packageName}]\x1b[0m ${msg}`),
    };

    /**
     * 获取路径
     */
    getPaths() {
        const rootDir = process.cwd();
        return {
            src: path.resolve(rootDir, this.config.srcDir, this.packageName),
            dist: path.resolve(rootDir, this.config.distDir, this.packageName),
            temp: path.resolve(rootDir, this.config.tempDir, this.packageName),
            svgFixed: path.resolve(rootDir, this.config.tempDir, this.packageName, "svg-fixed"),
            svgClean: path.resolve(rootDir, this.config.tempDir, this.packageName, "svgo-clean"),
            unicodeMap: path.resolve(rootDir, this.config.distDir, this.packageName, "unicode-map.json"),
        };
    }

    /**
     * 清理目录
     */
    clearDirectories() {
        const paths = this.getPaths();

        try {
            // 根据选项决定是清空还是覆盖 dist 目录
            if (this.options.cleanDist) {
                fse.emptyDirSync(paths.dist);
                this.log.info("清空 dist 目录");
            } else {
                fse.ensureDirSync(paths.dist);
                this.log.info("保留 dist 目录（覆盖模式）");
            }

            // 始终清空临时目录
            fse.emptyDirSync(paths.temp);
            fse.ensureDirSync(paths.svgFixed);
            fse.ensureDirSync(paths.svgClean);
            this.log.success("目录准备完成");
        } catch (error) {
            this.log.error(`目录准备失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 将所有 SVG 文件（包括子目录）复制到临时扁平目录
     */
    copyAllSvgToFlat() {
        const paths = this.getPaths();
        const flatTempDir = path.join(paths.temp, "svg-flat");

        // 创建扁平临时目录
        if (fs.existsSync(flatTempDir)) {
            fse.removeSync(flatTempDir);
        }
        fse.ensureDirSync(flatTempDir);

        // 递归查找所有 SVG 文件
        const svgFiles = this.findSvgFilesRecursively(paths.src);

        // 复制到扁平目录（只使用文件名，不包含目录名）
        svgFiles.forEach((filePath) => {
            // 只使用文件名，移除目录路径
            const flatFileName = path.basename(filePath);
            const destPath = path.join(flatTempDir, flatFileName);
            fse.copySync(filePath, destPath);
        });

        return flatTempDir;
    }

    /**
     * 修复 SVG 文件
     */
    fixSvgFiles() {
        const paths = this.getPaths();

        try {
            this.log.info("修复 SVG 文件...");

            // 先将所有 SVG（包括子目录）复制到扁平目录
            const flatSrcDir = this.copyAllSvgToFlat();

            // 在扁平目录上执行修复
            execSync(`npx oslllo-svg-fixer -s ${flatSrcDir} -d ${paths.svgFixed}`, {
                stdio: "pipe",
            });
            this.log.success("SVG 文件修复完成");
        } catch (error) {
            this.log.error(`SVG 修复失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 优化 SVG 文件
     */
    cleanSvgFiles() {
        const paths = this.getPaths();

        try {
            this.log.info("优化 SVG 文件...");
            execSync(`npx svgo -f ${paths.svgFixed} -o ${paths.svgClean}`, {
                stdio: "pipe",
            });
            this.log.success("SVG 文件优化完成");
        } catch (error) {
            this.log.error(`SVG 优化失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 生成字体文件
     */
    async generateFonts() {
        const paths = this.getPaths();
        const rootDir = process.cwd();

        try {
            this.log.info("生成字体文件...");

            // 创建 Unicode 管理器
            const unicodeManager = new UnicodeManager(
                this.packageName,
                paths.unicodeMap,
                this.packageConfig.startUnicode
            );

            // 临时禁用 console.log 以隐藏 svgtofont 的详细输出
            // eslint-disable-next-line no-console
            const originalLog = console.log;
            // eslint-disable-next-line no-console
            console.log = () => {
                // 故意为空，用于隐藏 svgtofont 的详细输出
            };

            try {
                await svgtofont({
                    src: paths.svgClean,
                    dist: paths.dist,
                    fontName: this.fontName,
                    css: this.config.fontConfig.css,
                    startUnicode: this.packageConfig.startUnicode,
                    useCSSVars: this.config.fontConfig.useCSSVars,
                    getIconUnicode: (name) => unicodeManager.getIconUnicode(name),
                    svgicons2svgfont: {
                        fontHeight: this.config.fontConfig.fontHeight,
                        normalize: this.config.fontConfig.normalize,
                    },
                    styleTemplates: path.resolve(rootDir, "styles"),
                    website: {
                        title: `${this.packageConfig.description} - ${this.fontName}`,
                        description: this.packageConfig.description,
                        links: [
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
                    },
                });
            } finally {
                // 恢复 console.log
                // eslint-disable-next-line no-console
                console.log = originalLog;
            }

            this.log.success("字体文件生成完成");
        } catch (error) {
            this.log.error(`字体生成失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 嵌入 Base64 字体
     */
    embedBase64Font() {
        const paths = this.getPaths();

        try {
            this.log.info("嵌入 base64 字体...");

            const woff2Path = path.resolve(paths.dist, `${this.fontName}.woff2`);
            const scssPath = path.resolve(paths.dist, `${this.fontName}-base64.scss`);

            if (!fs.existsSync(woff2Path)) {
                this.log.warn("未找到 woff2 文件，跳过 base64 嵌入");
                return;
            }

            const fontData = fs.readFileSync(woff2Path);
            const base64Str = fontData.toString("base64");

            if (fs.existsSync(scssPath)) {
                let scssContent = fs.readFileSync(scssPath, "utf8");
                scssContent = scssContent.replace("<% base64 %>", base64Str);
                fs.writeFileSync(scssPath, scssContent);
            }

            this.log.success("Base64 字体嵌入完成");
        } catch (error) {
            this.log.error(`Base64 嵌入失败: ${error.message}`);
            // 不抛出错误，因为这不是关键步骤
        }
    }

    /**
     * 清理临时文件
     */
    cleanupTempFiles() {
        const paths = this.getPaths();

        try {
            fse.removeSync(paths.temp);
            this.log.success("临时文件清理完成");
        } catch (error) {
            this.log.warn(`清理临时文件失败: ${error.message}`);
        }
    }

    /**
     * 执行完整构建流程
     */
    async build() {
        const startTime = Date.now();
        this.log.info(`开始构建 ${this.packageConfig.description}...`);

        try {
            this.clearDirectories();
            this.fixSvgFiles();
            this.cleanSvgFiles();
            await this.generateFonts();
            this.embedBase64Font();
            this.cleanupTempFiles();

            const duration = ((Date.now() - startTime) / 1000).toFixed(2);
            this.log.success(`✨ 构建完成！耗时: ${duration}s`);

            return {
                success: true,
                package: this.packageName,
                duration,
            };
        } catch (error) {
            this.log.error(`❌ 构建失败: ${error.message}`);

            // 清理临时文件
            try {
                const paths = this.getPaths();
                fse.removeSync(paths.temp);
            } catch (_e) {
                // 忽略清理错误
            }

            return {
                success: false,
                package: this.packageName,
                error: error.message,
            };
        }
    }

    /**
     * 递归查找目录下所有 svg 文件
     * @param {string} dir - 要查找的目录
     * @returns {string[]} svg 文件路径数组
     */
    findSvgFilesRecursively(dir) {
        if (!fs.existsSync(dir)) {
            return [];
        }

        let svgFiles = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                // 递归查找子目录
                svgFiles = svgFiles.concat(this.findSvgFilesRecursively(fullPath));
            } else if (entry.isFile() && entry.name.endsWith(".svg")) {
                // 找到 svg 文件
                svgFiles.push(fullPath);
            }
        }

        return svgFiles;
    }

    /**
     * 检查源文件是否存在
     */
    hasSourceFiles() {
        const paths = this.getPaths();
        if (!fs.existsSync(paths.src)) {
            return false;
        }
        const svgFiles = this.findSvgFilesRecursively(paths.src);
        return svgFiles.length > 0;
    }

    /**
     * 获取源文件数量
     */
    getSourceFileCount() {
        const paths = this.getPaths();
        if (!fs.existsSync(paths.src)) {
            return 0;
        }
        const svgFiles = this.findSvgFilesRecursively(paths.src);
        return svgFiles.length;
    }
}
