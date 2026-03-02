/* eslint-disable no-console */

/**
 * 多包图标字体构建器
 * 支持多入口、增量编译、选择性构建
 */
import path from "path";
import { fileURLToPath } from "url";
import config from "./icon-font.config.mjs";
import { FontBuilder } from "./lib/font-builder.mjs";
import { CacheManager } from "./lib/cache-manager.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 日志工具
const log = {
    info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
    success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
    error: (msg) => console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
    warn: (msg) => console.warn(`\x1b[33m[WARN]\x1b[0m ${msg}`),
    title: (msg) => console.log(`\n\x1b[1m\x1b[35m${msg}\x1b[0m`),
};

/**
 * 解析命令行参数
 */
function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        packages: [], // 指定要构建的包
        all: false, // 构建所有包
        incremental: true, // 默认启用增量编译
        force: false, // 强制重新构建
        watch: false, // 监听模式
        cleanDist: false, // 是否清空 dist 目录（默认覆盖模式）
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        switch (arg) {
            case "--all":
            case "-a":
                options.all = true;
                break;
            case "--package":
            case "-p":
                if (args[i + 1]) {
                    options.packages.push(args[i + 1]);
                    i++;
                }
                break;
            case "--no-incremental":
                options.incremental = false;
                break;
            case "--force":
            case "-f":
                options.force = true;
                options.incremental = false;
                break;
            case "--watch":
            case "-w":
                options.watch = true;
                break;
            case "--clean":
            case "-c":
                options.cleanDist = true;
                break;
            case "--help":
            case "-h":
                printHelp();
                process.exit(0);
        }
    }

    // 如果没有指定包且没有 --all，则构建所有包
    if (options.packages.length === 0 && !options.all) {
        options.all = true;
    }

    return options;
}

/**
 * 打印帮助信息
 */
function printHelp() {
    console.log(`
\x1b[1m图标字体构建工具\x1b[0m

\x1b[33m用法：\x1b[0m
  node build.mjs [选项]

\x1b[33m选项：\x1b[0m
  -a, --all              构建所有图标包（默认）
  -p, --package <name>   构建指定的图标包（可多次使用）
  -f, --force            强制重新构建所有包
  --no-incremental       禁用增量编译
  -c, --clean            清空 dist 目录模式（默认为覆盖模式）
  -w, --watch            监听文件变化并自动构建
  -h, --help             显示帮助信息

\x1b[33m构建模式说明：\x1b[0m
  默认模式（覆盖）：      保留 dist 目录，直接覆盖文件
                        \x1b[32m推荐用于开发环境，避免 webpack 服务中断\x1b[0m
  
  清空模式 (-c/--clean)：先清空 dist 目录，再生成新文件
                        \x1b[33m可能导致 webpack 开发服务器报错\x1b[0m

\x1b[33m示例：\x1b[0m
  node build.mjs                      # 构建所有包（增量，覆盖模式）
  node build.mjs --all                # 构建所有包（增量，覆盖模式）
  node build.mjs -p social            # 只构建 social 包
  node build.mjs -p social -p ui      # 构建 social 和 ui 包
  node build.mjs --force              # 强制重新构建所有包
  node build.mjs --clean              # 清空模式构建所有包
  node build.mjs -p social --force    # 强制重新构建 social 包

\x1b[33m可用的图标包：\x1b[0m
${Object.keys(config.packages)
    .map((name) => `  - ${name.padEnd(15)} ${config.packages[name].description}`)
    .join("\n")}
`);
}

/**
 * 获取要构建的包列表
 */
function getPackagesToBuild(options) {
    if (options.all) {
        return Object.keys(config.packages);
    }

    // 验证指定的包是否存在
    const invalidPackages = options.packages.filter((name) => !config.packages[name]);
    if (invalidPackages.length > 0) {
        log.error(`未知的图标包: ${invalidPackages.join(", ")}`);
        log.info(`可用的包: ${Object.keys(config.packages).join(", ")}`);
        process.exit(1);
    }

    return options.packages;
}

/**
 * 构建单个包
 */
async function buildPackage(packageName, packageConfig, cacheManager, options) {
    const builder = new FontBuilder(config, packageConfig, {
        cleanDist: options.cleanDist,
    });

    // 检查是否有源文件
    if (!builder.hasSourceFiles()) {
        log.warn(`包 ${packageName} 没有源文件，跳过构建`);
        return { success: true, skipped: true, package: packageName };
    }

    // 增量编译检查
    if (options.incremental && !options.force) {
        const srcDir = path.resolve(process.cwd(), config.srcDir, packageName);
        const checkResult = cacheManager.needsRebuild(packageName, srcDir);

        if (!checkResult.needed) {
            log.info(`包 ${packageName} 无变化，跳过构建`);
            return { success: true, skipped: true, package: packageName, reason: checkResult.reason };
        }

        // 打印变化信息
        if (checkResult.changes) {
            const { added, modified, deleted } = checkResult.changes;
            if (added.length > 0) {
                log.info(`  新增: ${added.join(", ")}`);
            }
            if (modified.length > 0) {
                log.info(`  修改: ${modified.join(", ")}`);
            }
            if (deleted.length > 0) {
                log.info(`  删除: ${deleted.join(", ")}`);
            }
        }
    }

    // 执行构建
    const result = await builder.build();

    // 更新缓存
    if (result.success) {
        const srcDir = path.resolve(process.cwd(), config.srcDir, packageName);
        cacheManager.updatePackageCache(packageName, srcDir);
    }

    return result;
}

/**
 * 主构建流程
 */
async function build() {
    const startTime = Date.now();
    const options = parseArgs();

    log.title("🚀 图标字体构建工具");

    // 打印构建选项
    if (options.force) {
        log.warn("强制重新构建模式");
    } else if (options.incremental) {
        log.info("增量编译模式");
    }

    if (options.cleanDist) {
        log.warn("清空模式：将清空 dist 目录");
    } else {
        log.info("覆盖模式：直接覆盖现有文件（推荐）");
    }

    // 初始化缓存管理器
    const cacheManager = new CacheManager(path.resolve(process.cwd(), config.incremental.cacheFile));

    // 如果是强制构建，清除缓存
    if (options.force) {
        cacheManager.clearAllCache();
    }

    // 获取要构建的包
    const packagesToBuild = getPackagesToBuild(options);

    log.info(`准备构建 ${packagesToBuild.length} 个图标包`);
    packagesToBuild.forEach((name) => {
        const pkg = config.packages[name];
        const builder = new FontBuilder(config, pkg);
        const count = builder.getSourceFileCount();
        log.info(`  - ${name}: ${count} 个图标`);
    });

    console.log("");

    // 构建结果
    const results = [];

    // 依次构建每个包
    for (const packageName of packagesToBuild) {
        const packageConfig = config.packages[packageName];
        const result = await buildPackage(packageName, packageConfig, cacheManager, options);
        results.push(result);
        console.log("");
    }

    // 打印构建总结
    log.title("📊 构建总结");

    const successful = results.filter((r) => r.success && !r.skipped);
    const skipped = results.filter((r) => r.skipped);
    const failed = results.filter((r) => !r.success);

    if (successful.length > 0) {
        log.success(`成功构建: ${successful.length} 个包`);
        successful.forEach((r) => {
            log.success(`  ✓ ${r.package} (${r.duration}s)`);
        });
    }

    if (skipped.length > 0) {
        log.info(`跳过构建: ${skipped.length} 个包`);
        skipped.forEach((r) => {
            log.info(`  - ${r.package} (${r.reason || "无变化"})`);
        });
    }

    if (failed.length > 0) {
        log.error(`构建失败: ${failed.length} 个包`);
        failed.forEach((r) => {
            log.error(`  ✗ ${r.package}: ${r.error}`);
        });
    }

    const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log("");
    if (failed.length === 0) {
        log.success(`✨ 所有构建完成！总耗时: ${totalDuration}s`);
    } else {
        log.error(`❌ 部分构建失败！总耗时: ${totalDuration}s`);
        process.exit(1);
    }

    // 打印缓存统计
    if (config.incremental.enabled) {
        console.log("");
        log.title("📦 缓存统计");
        const stats = cacheManager.getStats();
        log.info(`已缓存包: ${stats.totalPackages} 个`);
        for (const [name, data] of Object.entries(stats.packages)) {
            log.info(`  - ${name}: ${data.fileCount} 个图标`);
        }
    }
}

// 执行构建
build().catch((error) => {
    log.error(`构建过程发生错误: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
});
