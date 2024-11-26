/*
 * @Description: 校验
 * @Author: F-Stone
 * @LastEditTime: 2022-06-20 02:44:38
 */
const { exit } = require("./exit");

// proxy to joi for option validation
exports.createSchema = (fn) => {
    const joi = require("joi");

    let schema = fn(joi);
    if (typeof schema === "object" && typeof schema.validate !== "function") {
        schema = joi.object(schema);
    }

    return schema;
};

exports.validate = (obj, schema, cb) => {
    const { error } = schema.validate(obj);
    if (error) {
        cb(error.details[0].message);
        exit(1);
    }
};
