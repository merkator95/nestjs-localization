"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringToPath_1 = require("./stringToPath");
function baseGet(object, path) {
    path = castPath(path, object);
    let index = 0;
    const length = path.length;
    while (object != null && index < length) {
        object = object[toKey(path[index++])];
    }
    return index && index == length ? object : undefined;
}
const toString = Object.prototype.toString;
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
}
function castPath(value, object) {
    if (Array.isArray(value)) {
        return value;
    }
    return isKey(value, object) ? [value] : (0, stringToPath_1.default)(value);
}
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;
function isKey(value, object) {
    if (Array.isArray(value)) {
        return false;
    }
    const type = typeof value;
    if (type === 'number' ||
        type === 'boolean' ||
        value == null ||
        isSymbol(value)) {
        return true;
    }
    return (reIsPlainProp.test(value) ||
        !reIsDeepProp.test(value) ||
        (object != null && value in Object(object)));
}
const INFINITY = 1 / 0;
function toKey(value) {
    if (typeof value === 'string' || isSymbol(value)) {
        return value;
    }
    const result = `${value}`;
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
function isSymbol(value) {
    const type = typeof value;
    return (type == 'symbol' ||
        (type === 'object' && value != null && getTag(value) == '[object Symbol]'));
}
function get(object, path, defaultValue) {
    const result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
}
exports.default = get;
