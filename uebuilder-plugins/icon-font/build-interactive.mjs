/* eslint-disable no-console */

/**
 * 交互式图标字体构建工具
 */
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";
import config from "./icon-font.config.mjs";
import { FontBuilder } from "./lib/font-builder.mjs";
import { CacheManager } from "./lib/cache-manager.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 终端控制
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 日志工具
const log = {
    info: (msg) => console.log(`\x1b[36mℹ\x1b[0m ${msg}`),
    success: (msg) => console.log(`\x1b[32m✓\x1b[0m ${msg}`),
    error: (msg) => console.error(`\x1b[31m✗\x1b[0m ${msg}`),
    warn: (msg) => console.warn(`\x1b[33m⚠\x1b[0m ${msg}`),
    title: (msg) => console.log(`\n\x1b[1m\x1b[35m${msg}\x1b[0m`),
};

// 绘制分隔线
function drawSeparator(title = "") {
    const width = 60;
    console.log("\n" + "=".repeat(width));
    if (title) {
        const padding = Math.floor((width - title.length - 2) / 2);
        console.log(" ".repeat(padding) + title);
        console.log("=".repeat(width));
    }
}

// 获取所有包的信息
function getAllPackages() {
    const packages = [];
    const cacheManager = new CacheManager(path.resolve(process.cwd(), config.incremental.cacheFile));

    for (const [name, pkgConfig] of Object.entries(config.packages)) {
        const builder = new FontBuilder(config, pkgConfig);
        const srcDir = path.resolve(process.cwd(), config.srcDir, name);
        const hasFiles = builder.hasSourceFiles();
        const fileCount = builder.getSourceFileCount();

        let needsRebuild = false;
        let reason = "无变化";
        let changes = null;

        if (hasFiles) {
            const checkResult = cacheManager.needsRebuild(name, srcDir);
            needsRebuild = checkResult.needed;
            reason = checkResult.reason;
            changes = checkResult.changes;
        }

        packages.push({
            name,
            config: pkgConfig,
            hasFiles,
            fileCount,
            needsRebuild,
            reason,
            changes,
        });
    }

    return packages;
}

// 显示包的详细信息
function displayPackageInfo(pkg) {
    console.log(`\x1b[36m  📦 ${pkg.name}\x1b[0m`);
    console.log(`     描述: ${pkg.config.description}`);
    console.log(`     图标: ${pkg.fileCount} 个`);

    if (pkg.needsRebuild && pkg.changes) {
        const { added, modified, deleted } = pkg.changes;
        if (added.length > 0) {
            console.log(`     \x1b[32m新增: ${added.length} 个\x1b[0m`);
        }
        if (modified.length > 0) {
            console.log(`     \x1b[33m修改: ${modified.length} 个\x1b[0m`);
        }
        if (deleted.length > 0) {
            console.log(`     \x1b[31m删除: ${deleted.length} 个\x1b[0m`);
        }
    }
    console.log(`     原因: ${pkg.reason}`);
}

// 显示构建计划
function displayBuildPlan(packages) {
    drawSeparator("构建计划");

    const needBuild = packages.filter((p) => p.hasFiles && p.needsRebuild);
    const skipped = packages.filter((p) => !p.hasFiles || !p.needsRebuild);

    console.log(`\n📦 需要构建的图标包 (${needBuild.length} 个):\n`);
    if (needBuild.length > 0) {
        needBuild.forEach((pkg, index) => {
            console.log(`  ${index + 1}. \x1b[1m${pkg.name}\x1b[0m`);
            console.log(`     原因: ${pkg.reason}`);
            if (pkg.changes) {
                const { added, modified, deleted } = pkg.changes;
                const details = [];
                if (added.length > 0) details.push(`新增 ${added.length} 个`);
                if (modified.length > 0) details.push(`修改 ${modified.length} 个`);
                if (deleted.length > 0) details.push(`删除 ${deleted.length} 个`);
                if (details.length > 0) {
                    console.log(`     变化: ${details.join(", ")}`);
                }
            }
            console.log("");
        });
    } else {
        console.log("  \x1b[32m所有包都是最新的！\x1b[0m\n");
    }

    if (skipped.length > 0) {
        console.log(`⏭  跳过的图标包 (${skipped.length} 个):\n`);
        const skippedNames = skipped.map((p) => p.name).join(", ");
        console.log(`  ${skippedNames}\n`);
    }

    drawSeparator();
}

// 显示构建范围选择菜单
function displayBuildMenu() {
    console.log("\n\x1b[1m第一步：选择构建范围\x1b[0m\n");
    console.log("  \x1b[36m1.\x1b[0m 增量构建 (仅构建有变化的包) \x1b[32m[默认]\x1b[0m");
    console.log("  \x1b[36m2.\x1b[0m 全量构建 (构建所有包)");
    console.log("  \x1b[36m3.\x1b[0m 选择性构建 (手动选择要构建的包)");
    console.log("  \x1b[36m4.\x1b[0m 清理缓存并全量构建");
    console.log("  \x1b[31m0.\x1b[0m 退出\n");
}

// 显示构建模式选择菜单
function displayModeMenu(packageCount) {
    console.log(`\n\x1b[1m第二步：选择构建模式\x1b[0m (将构建 ${packageCount} 个包)\n`);
    console.log("  \x1b[36m1.\x1b[0m 覆盖模式 \x1b[32m(推荐) [默认]\x1b[0m");
    console.log("      保留 dist 目录，直接覆盖文件");
    console.log("      不会中断 webpack 开发服务器\n");
    console.log("  \x1b[36m2.\x1b[0m 清空模式");
    console.log("      先清空 dist 目录，再生成新文件");
    console.log("      \x1b[33m可能导致 webpack 服务报错\x1b[0m\n");
    console.log("  \x1b[33m9.\x1b[0m 返回上一步");
    console.log("  \x1b[31m0.\x1b[0m 退出\n");
}

// 询问用户选择
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

// 选择性构建：让用户选择要构建的包
async function selectPackagesToBuild(packages) {
    console.log("\n可用的图标包:\n");
    packages.forEach((pkg, index) => {
        const status = pkg.hasFiles ? `${pkg.fileCount} 个图标` : "\x1b[90m(无文件)\x1b[0m";
        console.log(`  ${index + 1}. ${pkg.name} - ${status}`);
    });

    console.log("\n请输入要构建的包编号 (用逗号分隔，如: 1,2,3)");
    console.log("或输入 'all' 构建所有包，输入 '0' 返回主菜单");
    console.log("\x1b[90m(直接回车选择所有有变化的包)\x1b[0m");

    const answer = await askQuestion("\n选择: ");

    // 如果直接回车，选择所有需要重新构建的包
    if (!answer) {
        const needRebuild = packages.filter((p) => p.hasFiles && p.needsRebuild);
        if (needRebuild.length === 0) {
            log.info("没有需要重新构建的包");
            return null;
        }
        return needRebuild.map((p) => p.name);
    }

    if (answer === "0") {
        return null;
    }

    if (answer.toLowerCase() === "all") {
        return packages.map((p) => p.name);
    }

    const indices = answer
        .split(",")
        .map((s) => parseInt(s.trim()))
        .filter((n) => !isNaN(n) && n > 0 && n <= packages.length);

    if (indices.length === 0) {
        console.log("\n\x1b[31m无效的选择！\x1b[0m");
        return null;
    }

    return indices.map((i) => packages[i - 1].name);
}

// 执行构建
async function executeBuild(packageNames, force = false, buildOptions = {}) {
    const cacheManager = new CacheManager(path.resolve(process.cwd(), config.incremental.cacheFile));
    const results = [];
    const startTime = Date.now();

    console.log("\n");
    drawSeparator("开始构建");

    // 显示构建配置
    console.log("");
    log.info("构建配置:");
    console.log(`  模式: ${buildOptions.cleanDist ? "\x1b[31m清空模式\x1b[0m" : "\x1b[32m覆盖模式\x1b[0m"}`);
    console.log(
        `  说明: ${
            buildOptions.cleanDist ? "先清空 dist 目录，然后生成新文件" : "直接覆盖现有文件（避免 webpack 中断）"
        }`
    );
    console.log("");

    for (const packageName of packageNames) {
        const packageConfig = config.packages[packageName];
        if (!packageConfig) {
            log.error(`包 ${packageName} 不存在！`);
            continue;
        }

        const builder = new FontBuilder(config, packageConfig, buildOptions);

        // 检查是否有源文件
        if (!builder.hasSourceFiles()) {
            log.warn(`包 ${packageName} 没有源文件，跳过构建`);
            results.push({ success: true, skipped: true, package: packageName });
            continue;
        }

        // 增量编译检查
        if (!force) {
            const srcDir = path.resolve(process.cwd(), config.srcDir, packageName);
            const checkResult = cacheManager.needsRebuild(packageName, srcDir);

            if (!checkResult.needed) {
                log.info(`包 ${packageName} 无变化，跳过构建`);
                results.push({
                    success: true,
                    skipped: true,
                    package: packageName,
                    reason: checkResult.reason,
                });
                continue;
            }
        }

        // 执行构建
        const result = await builder.build();
        results.push(result);

        // 更新缓存
        if (result.success) {
            const srcDir = path.resolve(process.cwd(), config.srcDir, packageName);
            cacheManager.updatePackageCache(packageName, srcDir);
        }

        console.log("");
    }

    // 打印构建总结
    drawSeparator("构建总结");
    console.log("");

    const successful = results.filter((r) => r.success && !r.skipped);
    const skipped = results.filter((r) => r.skipped);
    const failed = results.filter((r) => !r.success);

    if (successful.length > 0) {
        log.success(`成功构建: ${successful.length} 个包`);
        successful.forEach((r) => {
            console.log(`  ✓ ${r.package} (${r.duration}s)`);
        });
        console.log("");
    }

    if (skipped.length > 0) {
        log.info(`跳过构建: ${skipped.length} 个包`);
        skipped.forEach((r) => {
            console.log(`  - ${r.package} (${r.reason || "无变化"})`);
        });
        console.log("");
    }

    if (failed.length > 0) {
        log.error(`构建失败: ${failed.length} 个包`);
        failed.forEach((r) => {
            console.log(`  ✗ ${r.package}: ${r.error}`);
        });
        console.log("");
    }

    const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    if (failed.length === 0) {
        log.success(`✨ 所有构建完成！总耗时: ${totalDuration}s`);
    } else {
        log.error(`❌ 部分构建失败！总耗时: ${totalDuration}s`);
    }

    drawSeparator();
}

// 主程序
async function main() {
    console.clear();
    drawSeparator("图标字体构建工具 - 交互模式");

    // 扫描所有包
    const packages = getAllPackages();

    const totalCount = packages.length;
    const withFilesCount = packages.filter((p) => p.hasFiles).length;

    log.info(`扫描到 ${totalCount} 个图标包:`);
    console.log(`  有文件: ${withFilesCount} 个`);
    console.log(`  空包: ${totalCount - withFilesCount} 个\n`);

    // 显示详细信息
    console.log("\x1b[1m包详情:\x1b[0m\n");
    packages.forEach((pkg) => {
        if (pkg.hasFiles) {
            displayPackageInfo(pkg);
            console.log("");
        }
    });

    // 主循环
    let running = true;

    while (running) {
        // 第一步：显示构建计划和选择构建范围
        displayBuildPlan(packages);
        displayBuildMenu();

        // 获取用户选择（默认为1）
        let choice = await askQuestion("请选择构建范围 (直接回车默认选 1): ");
        choice = choice || "1"; // 空输入时使用默认值

        let packagesToBuild = [];
        let forceRebuild = false;

        switch (choice) {
            case "1": {
                // 增量构建
                packagesToBuild = packages.filter((p) => p.hasFiles && p.needsRebuild).map((p) => p.name);

                if (packagesToBuild.length === 0) {
                    console.log("\n\x1b[32m✓ 所有包都是最新的，无需构建！\x1b[0m\n");
                    await askQuestion("按回车键继续...");
                    console.clear();
                    drawSeparator("图标字体构建工具 - 交互模式");
                    continue;
                }
                forceRebuild = false;
                break;
            }

            case "2": {
                // 全量构建
                packagesToBuild = packages.filter((p) => p.hasFiles).map((p) => p.name);
                if (packagesToBuild.length === 0) {
                    console.log("\n\x1b[31m✗ 没有可构建的包！\x1b[0m\n");
                    await askQuestion("按回车键继续...");
                    console.clear();
                    drawSeparator("图标字体构建工具 - 交互模式");
                    continue;
                }
                forceRebuild = true;
                break;
            }

            case "3": {
                // 选择性构建
                const selected = await selectPackagesToBuild(packages);
                if (!selected || selected.length === 0) {
                    console.clear();
                    drawSeparator("图标字体构建工具 - 交互模式");
                    continue;
                }
                packagesToBuild = selected;
                forceRebuild = false;
                break;
            }

            case "4": {
                // 清理缓存并全量构建
                console.log("\n\x1b[33m⚠ 将清理所有缓存并重新构建所有包\x1b[0m");
                const confirm = await askQuestion("确认继续？(y/n): ");

                if (confirm.toLowerCase() !== "y") {
                    console.clear();
                    drawSeparator("图标字体构建工具 - 交互模式");
                    continue;
                }

                const cacheManager = new CacheManager(path.resolve(process.cwd(), config.incremental.cacheFile));
                cacheManager.clearAllCache();
                log.success("缓存已清理");

                packagesToBuild = packages.filter((p) => p.hasFiles).map((p) => p.name);
                if (packagesToBuild.length === 0) {
                    console.log("\n\x1b[31m✗ 没有可构建的包！\x1b[0m\n");
                    await askQuestion("按回车键继续...");
                    console.clear();
                    drawSeparator("图标字体构建工具 - 交互模式");
                    continue;
                }
                forceRebuild = true;
                break;
            }

            case "0":
                console.log("\n\x1b[36m👋 再见！\x1b[0m\n");
                running = false;
                continue;

            default:
                console.log("\n\x1b[31m无效的选项，请重新选择！\x1b[0m");
                await askQuestion("\n按回车键继续...");
                console.clear();
                drawSeparator("图标字体构建工具 - 交互模式");
                continue;
        }

        // 第二步：选择构建模式
        let modeSelected = false;
        while (!modeSelected) {
            displayModeMenu(packagesToBuild.length);
            let modeChoice = await askQuestion("请选择构建模式 (直接回车默认选 1): ");
            modeChoice = modeChoice || "1"; // 空输入时使用默认值

            switch (modeChoice) {
                case "1": {
                    // 覆盖模式
                    log.success("已选择：覆盖模式");
                    await executeBuild(packagesToBuild, forceRebuild, { cleanDist: false });
                    running = false;
                    modeSelected = true;
                    break;
                }
                case "2": {
                    // 清空模式
                    log.success("已选择：清空模式");
                    await executeBuild(packagesToBuild, forceRebuild, { cleanDist: true });
                    running = false;
                    modeSelected = true;
                    break;
                }
                case "9":
                    // 返回上一步
                    console.clear();
                    drawSeparator("图标字体构建工具 - 交互模式");
                    modeSelected = true;
                    break;
                case "0":
                    console.log("\n\x1b[36m👋 再见！\x1b[0m\n");
                    running = false;
                    modeSelected = true;
                    break;
                default:
                    console.log("\n\x1b[31m无效的选项，请重新选择！\x1b[0m");
                    await askQuestion("\n按回车键继续...");
                    break;
            }
        }

        if (running) {
            console.clear();
            drawSeparator("图标字体构建工具 - 交互模式");
        }
    }

    rl.close();
}

// 执行主程序
main().catch((error) => {
    console.error("\n\x1b[31m发生错误:\x1b[0m", error.message);
    console.error(error.stack);
    rl.close();
    process.exit(1);
});
