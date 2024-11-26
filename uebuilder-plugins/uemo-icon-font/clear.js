const path = require("path");
const fse = require("fs-extra");

fse.emptyDirSync(path.resolve(process.cwd(), "svgo-clean"));
fse.emptyDirSync(path.resolve(process.cwd(), "svg-fixed"));
fse.emptyDirSync(path.resolve(process.cwd(), "fonts"));
