"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transChoice = exports.__ = void 0;
__exportStar(require("./String"), exports);
const services_1 = require("../services");
const __ = (key, language, options) => {
    return services_1.LocalizationService.trans(key, language, options);
};
exports.__ = __;
const transChoice = (key, language, count, options) => {
    return services_1.LocalizationService.transChoice(key, language, count, options);
};
exports.transChoice = transChoice;
