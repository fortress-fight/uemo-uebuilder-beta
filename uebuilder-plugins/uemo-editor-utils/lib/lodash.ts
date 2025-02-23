/*
 * @Description:
 * @Author: F-Stone
 * @LastEditTime: 2025-02-23 17:55:56
 */
import _get from "lodash/get";
import _debounce from "lodash/debounce";
import _throttle from "lodash/throttle";
import _defaultsDeep from "lodash/defaultsDeep";
import _reject from "lodash/reject";
import _pickBy from "lodash/pickBy";
import _isEqual from "lodash/isEqual";
import _eq from "lodash/eq";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _assign from "lodash/assign";
import _flatten from "lodash/flatten";
import _has from "lodash/has";
import _set from "lodash/set";
import _omit from "lodash/omit";
import _omitBy from "lodash/omitBy";
import _pick from "lodash/pick";
import _differenceBy from "lodash/differenceBy";

// 一个深度 pickBy 方法
function _deepPickBy<T extends object>(obj: T, predicate: (value: any, key: string) => boolean) {
    const newObj: Partial<T> = {};
    Object.keys(obj).forEach((key) => {
        const _key = key as keyof T;
        const value = obj[_key];
        if (predicate(value, key)) {
            if (typeof obj[_key] === "object") {
                // @ts-expect-error
                newObj[_key] = _deepPickBy(obj[_key], predicate);
            } else {
                newObj[_key] = value;
            }
        }
    });
    return newObj;
}

export {
    _get,
    _debounce,
    _defaultsDeep,
    _reject,
    _throttle,
    _pickBy,
    _isEqual,
    _isEmpty,
    _deepPickBy,
    _cloneDeep,
    _omit,
    _omitBy,
    _assign,
    _eq,
    _flatten,
    _has,
    _set,
    _differenceBy,
    _pick,
};
