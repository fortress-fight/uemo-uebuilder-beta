/*
 * @Description: 数据加密解密
 * @Author: F-Stone
 * @LastEditTime: 2025-07-18 18:04:02
 */
import AES from "crypto-js/aes";
import utf8 from "crypto-js/enc-utf8";
import modeCfb from "crypto-js/mode-cfb";
import NoPadding from "crypto-js/pad-nopadding";

const key = "uemo_page_editor!^_^";
const proxy = "[UE_BUILDER:V4.0.0]";

const oldCryptParam = { key };
const newCryptParam = {
    key: utf8.parse(key),
    param: { iv: utf8.parse(key), mode: modeCfb, padding: NoPadding },
};

/**
 * 转义正则表达式
 * @param str
 * @returns
 */
function escapeRegExp(str: string) {
    return str.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

/**
 * 加密
 * @param message
 */
export function encrypt(message: string) {
    return proxy + AES.encrypt(message, newCryptParam.key, newCryptParam.param).toString();
}

/**
 * 解密
 * @param code
 */
export function decrypt(code: string) {
    const regex = new RegExp("^" + escapeRegExp(proxy));
    if (regex.test(code)) {
        code = code.replace(proxy, "");
        return AES.decrypt(code, newCryptParam.key, newCryptParam.param).toString(utf8);
    } else {
        return AES.decrypt(code, oldCryptParam.key).toString(utf8);
    }
}
