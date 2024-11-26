/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2022-07-26 00:52:56
 */
const { execSync } = require("child_process");

const fs = require("fs");
const path = require("path");
const LRU = require("lru-cache");

let _hasYarn;
const _yarnProjects = new LRU({
    max: 10,
    maxAge: 1000,
});

// env detection
exports.hasYarn = () => {
    if (_hasYarn != null) {
        return _hasYarn;
    }
    try {
        execSync("yarn --version", { stdio: "ignore" });
        return (_hasYarn = true);
    } catch (e) {
        return (_hasYarn = false);
    }
};

function checkYarn(result) {
    if (result && !exports.hasYarn())
        throw new Error(
            `The project seems to require yarn but it's not installed.`
        );
    return result;
}

exports.hasProjectYarn = (cwd) => {
    if (_yarnProjects.has(cwd)) {
        return checkYarn(_yarnProjects.get(cwd));
    }

    const lockFile = path.join(cwd, "yarn.lock");
    const result = fs.existsSync(lockFile);
    _yarnProjects.set(cwd, result);
    return checkYarn(result);
};

const _npmProjects = new LRU({
    max: 10,
    maxAge: 1000,
});

exports.hasProjectNpm = (cwd) => {
    if (_npmProjects.has(cwd)) {
        return _npmProjects.get(cwd);
    }

    const lockFile = path.join(cwd, "package-lock.json");
    const result = fs.existsSync(lockFile);
    _npmProjects.set(cwd, result);
    return result;
};

let _hasGit;
const _gitProjects = new LRU({
    max: 10,
    maxAge: 1000,
});

exports.hasGit = () => {
    if (_hasGit != null) {
        return _hasGit;
    }
    try {
        execSync("git --version", { stdio: "ignore" });
        return (_hasGit = true);
    } catch (e) {
        return (_hasGit = false);
    }
};

/**
 * 判断目录中是否已经初始化 Git
 * @param {string} cwd 目录
 */
exports.hasProjectGit = (cwd) => {
    if (_gitProjects.has(cwd)) {
        return _gitProjects.get(cwd);
    }

    let result;
    try {
        execSync("git status", { stdio: "ignore", cwd });
        result = true;
    } catch (e) {
        result = false;
    }
    _gitProjects.set(cwd, result);
    return result;
};

// OS
exports.isWindows = process.platform === "win32";
exports.isMacintosh = process.platform === "darwin";
exports.isLinux = process.platform === "linux";
