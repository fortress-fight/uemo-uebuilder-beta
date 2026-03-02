/**
 * 缓存管理器
 * 用于增量构建，跟踪文件变化
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";

export class CacheManager {
    constructor(cacheFilePath) {
        this.cacheFilePath = cacheFilePath;
        this.cache = this.loadCache();
    }

    /**
     * 加载缓存文件
     */
    loadCache() {
        try {
            if (fs.existsSync(this.cacheFilePath)) {
                const data = fs.readFileSync(this.cacheFilePath, "utf8");
                return JSON.parse(data);
            }
        } catch (error) {
            console.warn(`⚠️  加载缓存失败: ${error.message}`);
        }
        return {
            packages: {},
            buildTime: null,
        };
    }

    /**
     * 保存缓存文件
     */
    saveCache() {
        try {
            const cacheDir = path.dirname(this.cacheFilePath);
            if (!fs.existsSync(cacheDir)) {
                fs.mkdirSync(cacheDir, { recursive: true });
            }
            fs.writeFileSync(this.cacheFilePath, JSON.stringify(this.cache, null, 2));
        } catch (error) {
            console.warn(`⚠️  保存缓存失败: ${error.message}`);
        }
    }

    /**
     * 计算文件 MD5 哈希
     */
    getFileHash(filePath) {
        try {
            const content = fs.readFileSync(filePath);
            return crypto.createHash("md5").update(content).digest("hex");
        } catch (error) {
            return null;
        }
    }

    /**
     * 获取目录中所有文件的哈希映射
     */
    getDirectoryHashes(dirPath) {
        const hashes = {};
        if (!fs.existsSync(dirPath)) {
            return hashes;
        }

        const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".svg"));

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            hashes[file] = this.getFileHash(filePath);
        });

        return hashes;
    }

    /**
     * 检查包是否需要重新构建
     */
    needsRebuild(packageName, srcDir) {
        const currentHashes = this.getDirectoryHashes(srcDir);
        const cachedHashes = this.cache.packages[packageName]?.hashes || {};

        // 检查文件数量是否变化
        if (Object.keys(currentHashes).length !== Object.keys(cachedHashes).length) {
            return {
                needed: true,
                reason: "文件数量变化",
                changes: this.getChanges(cachedHashes, currentHashes),
            };
        }

        // 检查文件内容是否变化
        for (const [file, hash] of Object.entries(currentHashes)) {
            if (cachedHashes[file] !== hash) {
                return {
                    needed: true,
                    reason: "文件内容变化",
                    changes: this.getChanges(cachedHashes, currentHashes),
                };
            }
        }

        return {
            needed: false,
            reason: "无变化",
        };
    }

    /**
     * 获取文件变化详情
     */
    getChanges(oldHashes, newHashes) {
        const changes = {
            added: [],
            modified: [],
            deleted: [],
        };

        // 检查新增和修改的文件
        for (const [file, hash] of Object.entries(newHashes)) {
            if (!oldHashes[file]) {
                changes.added.push(file);
            } else if (oldHashes[file] !== hash) {
                changes.modified.push(file);
            }
        }

        // 检查删除的文件
        for (const file of Object.keys(oldHashes)) {
            if (!newHashes[file]) {
                changes.deleted.push(file);
            }
        }

        return changes;
    }

    /**
     * 更新包的缓存信息
     */
    updatePackageCache(packageName, srcDir, buildTime) {
        this.cache.packages[packageName] = {
            hashes: this.getDirectoryHashes(srcDir),
            buildTime: buildTime || Date.now(),
        };
        this.cache.buildTime = Date.now();
        this.saveCache();
    }

    /**
     * 清除指定包的缓存
     */
    clearPackageCache(packageName) {
        delete this.cache.packages[packageName];
        this.saveCache();
    }

    /**
     * 清除所有缓存
     */
    clearAllCache() {
        this.cache = {
            packages: {},
            buildTime: null,
        };
        this.saveCache();
    }

    /**
     * 获取包的构建时间
     */
    getPackageBuildTime(packageName) {
        return this.cache.packages[packageName]?.buildTime || null;
    }

    /**
     * 获取所有包的统计信息
     */
    getStats() {
        const stats = {
            totalPackages: Object.keys(this.cache.packages).length,
            lastBuildTime: this.cache.buildTime,
            packages: {},
        };

        for (const [name, data] of Object.entries(this.cache.packages)) {
            stats.packages[name] = {
                fileCount: Object.keys(data.hashes).length,
                buildTime: data.buildTime,
            };
        }

        return stats;
    }
}
