import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);

// 获取当前模块的目录路径
const __dirname = path.dirname(__filename);

// 存储映射的文件路径
const mappingFilePath = path.join(__dirname, "unicode-map.json");

// 从文件加载已有的映射
let nameToUnicodeMap = {};
let usedUnicodes = new Set(); // 用于存储已使用的 Unicode 编码

// 加载现有映射
function loadMapping() {
    if (fs.existsSync(mappingFilePath)) {
        const data = fs.readFileSync(mappingFilePath, "utf-8");
        nameToUnicodeMap = JSON.parse(data);

        // 将现有的 Unicode 加入到已使用集合中
        Object.values(nameToUnicodeMap).forEach((item) => {
            usedUnicodes.add(item.unicode);
        });
    }
}

// 将映射保存到文件
function saveMapping() {
    fs.writeFileSync(mappingFilePath, JSON.stringify(nameToUnicodeMap, null, 2));
}

// 生成盐值
function generateSalt() {
    return Math.random().toString(36).substring(2, 8); // 随机生成一个 6 位字符串盐
}

// 基于 name 生成唯一的 Unicode
function generateUnicodeFromName(name, salt) {
    // 将 salt 加入到 name 中生成新的字符串
    const saltedName = name + salt;

    // 使用哈希值映射到 Unicode 范围
    const hash = saltedName.split("").reduce((acc, char) => {
        acc = (acc << 5) - acc + char.charCodeAt(0);
        return acc & acc; // 32-bit integer
    }, 0);

    // 将哈希值映射到 Unicode 范围
    return 0xe000 + (Math.abs(hash) % 0x1000); // 将 Unicode 范围设定为 U+e000 到 U+efff
}

// 检查是否有冲突的 Unicode，如果有冲突，进行加盐处理
function resolveCollision(name, proposedUnicode) {
    // 如果该 Unicode 已经被其他 name 使用，尝试加盐并重新生成
    while (usedUnicodes.has(proposedUnicode)) {
        const salt = generateSalt(); // 生成盐值
        const newUnicode = generateUnicodeFromName(name, salt); // 使用盐生成新的 Unicode
        if (!usedUnicodes.has(newUnicode)) {
            proposedUnicode = newUnicode;
            break;
        }
    }

    return proposedUnicode;
}

export function getIconUnicode(name) {
    // 如果该 name 已经有对应的 Unicode，直接返回
    if (nameToUnicodeMap[name]) {
        return [String.fromCharCode(nameToUnicodeMap[name].unicode), nameToUnicodeMap[name].unicode];
    }

    // 基于 name 和盐生成一个 Unicode
    let unicode = generateUnicodeFromName(name, "");

    // 检查是否有冲突，如果有，则通过加盐重新生成 Unicode
    unicode = resolveCollision(name, unicode);

    // 将生成的 Unicode 和 name 绑定，并记录盐值
    nameToUnicodeMap[name] = {
        unicode: unicode,
        salt: "", // 保存生成该 Unicode 的盐值
    };

    // 将新的 Unicode 加入已使用集合
    usedUnicodes.add(unicode);

    // 保存映射到文件
    saveMapping();

    // 返回 Unicode 和对应字符
    return [String.fromCharCode(unicode), unicode];
}

// 加载之前保存的映射
loadMapping();
