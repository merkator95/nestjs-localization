"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAll = exports.isLowerCase = exports.isSentenceCase = exports.isUpperCase = void 0;
const isUpperCase = (value) => {
    return value.toUpperCase() === value;
};
exports.isUpperCase = isUpperCase;
const isSentenceCase = (value) => {
    return value[0].toUpperCase() === value[0];
};
exports.isSentenceCase = isSentenceCase;
const isLowerCase = (value) => {
    return value.toLowerCase() === value;
};
exports.isLowerCase = isLowerCase;
const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, "g"), replace);
};
exports.replaceAll = replaceAll;
