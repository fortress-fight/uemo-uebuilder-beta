/**
 * 监听 SIGINT 信号，确保在按下 ctrl+c 时静默退出。
 */
process.on("SIGINT", () => {
    process.exit(0);
});

import ejs from "ejs";
import path from "path";
import fg from "fast-glob";
import { fileURLToPath } from "url";
import fse from "fs-extra";
import { input } from "@inquirer/prompts";
import * as changeCase from "change-case";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 全局参数对象，包含组件名称和描述。
 * @type {{ componentName: string, description: string }}
 */
const param = { componentName: "", description: "" };

/**
 * 将路径转换为适合当前平台的格式。
 * @param {string} path1 - 需要转换的路径。
 * @returns {string} 转换后的路径。
 */
function covertPath(path1) {
    if (process.platform === "win32") {
        return fg.convertPathToPattern(path1);
    } else {
        return path1;
    }
}

/**
 * 根据模板配置创建组件文件。
 * @returns {Promise<void>}
 */
async function createComponent() {
    const tplConfig = {
        ui: {
            filePaths: [path.resolve(__dirname, "./ui-template/**/*.*")],
            targetPath: path.resolve(__dirname, "../src/components"),
            getFileName: (componentName, fileName) => {
                return `${changeCase.kebabCase(componentName)}/${fileName}`;
            },
        },
    };
    const uiParam = {
        date: new Date().toLocaleString(),
        className: changeCase.kebabCase(param.componentName),
        componentName: changeCase.pascalCase(param.componentName),
        description: param.description,
    };

    // 遍历所有模板配置，渲染并输出组件文件
    await Promise.all(
        Object.values(tplConfig).map(async (tplParam) => {
            const entries = await fg(
                tplParam.filePaths.map((p) => covertPath(p)),
                { dot: true }
            );
            const tplMap = await Promise.all(
                entries.map((tplPath) => {
                    return fse.readFile(tplPath, "utf8").then((content) => {
                        const parsePath = path.parse(tplPath);
                        return { name: parsePath.base, content };
                    });
                })
            );
            await Promise.all(
                Object.values(tplMap).map(async (tpl) => {
                    /**
                     * 使用 ejs 渲染模板文件内容，并输出到目标路径。
                     * @param {Object} data - 模板参数，包含组件信息和当前时间。
                     */
                    const renderContent = ejs.compile(tpl.content, {
                        rmWhitespace: false,
                    })(uiParam);
                    const file = path.resolve(tplParam.targetPath, tplParam.getFileName(param.componentName, tpl.name));
                    return fse.outputFile(file, renderContent);
                })
            );
        })
    );
}

/**
 * 主流程，获取输入、执行创建组件和更新类型定义，捕获 ctrl+c 错误并静默退出。
 * @returns {Promise<void>}
 */
async function main() {
    try {
        // 获取用户输入的组件名称和描述
        param.componentName = await input({ message: "输入组件名称：" });
        param.description = await input({ message: "输入组件描述：" });
    } catch (_err) {
        // 用户可能通过 ctrl+c 退出，直接退出不会打印错误
        process.exit(0);
    }
    if (!param.componentName) {
        console.error("组件名称不能为空");
        process.exit(1);
    }
    if (!param.description) {
        console.error("组件描述不能为空");
        process.exit(1);
    }
    await createComponent();
}

await main();
