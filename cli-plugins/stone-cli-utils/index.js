/*
 * @Description: 公用方法集合
 * @Author: F-Stone
 * @LastEditTime: 2022-07-29 00:34:39
 */
exports.chalk = require("chalk");
exports.semver = require("semver");
exports.fs = require("fs-extra");
exports.execa = require("execa");

exports.logger = require("./lib/logger");
exports.pkg = require("./lib/pkg");
exports.moduleManage = require("./lib/module-manage");
exports.pluginResolution = require("./lib/plugin-resolution");
exports.validate = require("./lib/validate");
exports.env = require("./lib/env");
exports.spinner = require("./lib/spinner");
exports.exit = require("./lib/exit");
exports.pluginOrder = require("./lib/plugin-order");
