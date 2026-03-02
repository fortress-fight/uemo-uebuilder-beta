/**
 * Unicode 管理器
 * 管理每个图标包的 Unicode 映射
 */
import fs from "fs";
import path from "path";

export class UnicodeManager {
    constructor(packageName, mappingFilePath, startUnicode) {
        this.packageName = packageName;
        this.mappingFilePath = mappingFilePath;
        this.startUnicode = startUnicode;
        this.nameToUnicodeMap = {};
        this.usedUnicodes = new Set();
        this.loadMapping();
    }

    /**
     * 加载已有的映射
     */
    loadMapping() {
        if (fs.existsSync(this.mappingFilePath)) {
            try {
                const data = fs.readFileSync(this.mappingFilePath, "utf-8");
                this.nameToUnicodeMap = JSON.parse(data);

                // 将现有的 Unicode 加入到已使用集合中
                Object.values(this.nameToUnicodeMap).forEach((item) => {
                    this.usedUnicodes.add(item.unicode);
                });
            } catch (error) {
                console.warn(`⚠️  加载 Unicode 映射失败: ${error.message}`);
            }
        }
    }

    /**
     * 保存映射到文件
     */
    saveMapping() {
        try {
            const dir = path.dirname(this.mappingFilePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(this.mappingFilePath, JSON.stringify(this.nameToUnicodeMap, null, 2));
        } catch (error) {
            console.error(`❌ 保存 Unicode 映射失败: ${error.message}`);
        }
    }

    /**
     * 生成盐值
     */
    generateSalt() {
        return Math.random().toString(36).substring(2, 8);
    }

    /**
     * 基于 name 生成唯一的 Unicode
     */
    generateUnicodeFromName(name, salt = "") {
        const saltedName = name + salt;

        // 使用哈希值映射到 Unicode 范围
        const hash = saltedName.split("").reduce((acc, char) => {
            acc = (acc << 5) - acc + char.charCodeAt(0);
            return acc & acc; // 32-bit integer
        }, 0);

        // 根据包的 startUnicode 设置范围
        const rangeSize = 0x1000; // 每个包 4096 个 Unicode 位置
        return this.startUnicode + (Math.abs(hash) % rangeSize);
    }

    /**
     * 解决 Unicode 冲突
     */
    resolveCollision(name, proposedUnicode) {
        let unicode = proposedUnicode;

        // 如果该 Unicode 已经被使用，尝试加盐并重新生成
        while (this.usedUnicodes.has(unicode)) {
            const salt = this.generateSalt();
            unicode = this.generateUnicodeFromName(name, salt);
        }

        return unicode;
    }

    /**
     * 获取图标的 Unicode
     */
    getIconUnicode(name) {
        // 如果该 name 已经有对应的 Unicode，直接返回
        if (this.nameToUnicodeMap[name]) {
            return [String.fromCharCode(this.nameToUnicodeMap[name].unicode), this.nameToUnicodeMap[name].unicode];
        }

        // 基于 name 生成一个 Unicode
        let unicode = this.generateUnicodeFromName(name);

        // 检查是否有冲突，如果有，则通过加盐重新生成 Unicode
        unicode = this.resolveCollision(name, unicode);

        // 将生成的 Unicode 和 name 绑定
        this.nameToUnicodeMap[name] = {
            unicode: unicode,
            package: this.packageName,
        };

        // 将新的 Unicode 加入已使用集合
        this.usedUnicodes.add(unicode);

        // 保存映射到文件
        this.saveMapping();

        // 返回 Unicode 和对应字符
        return [String.fromCharCode(unicode), unicode];
    }

    /**
     * 获取所有映射
     */
    getAllMappings() {
        return this.nameToUnicodeMap;
    }

    /**
     * 清除映射
     */
    clearMapping() {
        this.nameToUnicodeMap = {};
        this.usedUnicodes.clear();
        if (fs.existsSync(this.mappingFilePath)) {
            fs.unlinkSync(this.mappingFilePath);
        }
    }

    /**
     * 获取统计信息
     */
    getStats() {
        return {
            package: this.packageName,
            totalIcons: Object.keys(this.nameToUnicodeMap).length,
            startUnicode: this.startUnicode,
            unicodeRange: `U+${this.startUnicode.toString(16).toUpperCase()}`,
        };
    }
}
