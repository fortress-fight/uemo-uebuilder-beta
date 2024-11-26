/*
 * @Description: 打印信息
 * @Author: F-Stone
 * @LastEditTime: 2022-06-30 14:55:21
 */
const chalk = require("chalk");
const stripAnsi = require("strip-ansi");

/**
 * 格式化打印信息，输出信息的同时，输出行号
 */
const format = (label, msg) => {
    return msg
        .split("\n")
        .map((line, i) => {
            return i === 0
                ? `${label} ${line}`
                : line.padStart(stripAnsi(label).length + line.length + 1);
        })
        .join("\n");
};

/**
 * 给打印的 Tag 着色
 */
const chalkTag = (msg) => chalk.bgBlackBright.white.dim(` ${msg} `);

/**
 * 打印错误信息
 */
exports.error = (msg, tag = null) => {
    // stopSpinner();
    console.error(
        format(
            chalk.bgRed(" ERROR ") + (tag ? chalkTag(tag) : ""),
            chalk.red(msg)
        )
    );
    if (msg instanceof Error) {
        console.error(msg.stack);
    }
};

exports.info = (msg, tag = null) => {
    console.log(
        format(chalk.bgBlue.black(" INFO ") + (tag ? chalkTag(tag) : ""), msg)
    );
};

exports.log = (msg = "", tag = null) => {
    tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

exports.done = (msg, tag = null) => {
    console.log(
        format(chalk.bgGreen.black(" DONE ") + (tag ? chalkTag(tag) : ""), msg)
    );
};

exports.warn = (msg, tag = null) => {
    console.warn(
        format(
            chalk.bgYellow.black(" WARN ") + (tag ? chalkTag(tag) : ""),
            chalk.yellow(msg)
        )
    );
};

/**
 * 清理终端面板输出
 * @param [string] title 清理后的补充信息
 */
const readline = require("readline");
exports.clearConsole = (title) => {
    //  确定 Node.js 是否在终端上下文中运行
    if (process.stdout.isTTY) {
        const blank = "\n".repeat(process.stdout.rows);
        console.log(blank);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        if (title) {
            console.log(title);
        }
    }
};
