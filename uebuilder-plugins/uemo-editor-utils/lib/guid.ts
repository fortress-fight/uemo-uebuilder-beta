/*
 * @Description: 生成 GUID
 * @Author: F-Stone
 * @LastEditTime: 2025-02-28 12:20:09
 */
import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";

const lowercaseRandomString = customAlphabet(lowercase, 10);

export function guid(len = 10) {
    return lowercaseRandomString(len);
}
