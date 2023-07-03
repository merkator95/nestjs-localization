"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LocalizationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const get_1 = require("../utils/get");
const helpers_1 = require("../helpers");
const fs_1 = require("fs");
let LocalizationService = LocalizationService_1 = class LocalizationService {
    constructor(options) {
        this.options = options;
        const { path, fallbackLang } = this.options;
        const data = {};
        LocalizationService_1.readFiles(path, function (filename, content) {
            data[filename.split(".")[0]] = JSON.parse(content);
        });
        LocalizationService_1.data = data;
        LocalizationService_1.fallbackLang = fallbackLang;
    }
    static trans(key, language, options) {
        let langData = LocalizationService_1.data[this.fallbackLang];
        if (typeof language === "string" && language != "") {
            langData = LocalizationService_1.data[language];
        }
        else {
            options = language;
        }
        let text = (0, get_1.default)(langData, key, null);
        if (!text || typeof text !== "string")
            return `ERR::INVALID KEY ==> ${key}`;
        if (options) {
            for (const k in options) {
                text = this.handleOptions(text, k, options[k]);
            }
        }
        return text;
    }
    static transChoice(key, language, count, options) {
        let langData = LocalizationService_1.data[this.fallbackLang];
        if (typeof language === "string" && language != "") {
            langData = LocalizationService_1.data[language];
        }
        if (typeof count === "object") {
            options = count;
        }
        if (typeof language === "number") {
            count = language;
        }
        if (!count && count != 0)
            throw new Error("Count value not found");
        let text = (0, get_1.default)(langData, key, null);
        if (!text || typeof text !== "string")
            return `ERR::INVALID KEY ==> ${key}`;
        const textObjArr = [];
        text.split("|").forEach((t) => {
            textObjArr.push(this.choiceStringParser(t));
        });
        let finalText = "";
        for (const t of textObjArr) {
            if (t.limit.upper === count && t.limit.lower === count) {
                finalText = t.text;
                break;
            }
            if (t.limit.upper >= count && t.limit.lower <= count) {
                finalText = t.text;
                break;
            }
        }
        if (finalText && finalText.match(/\bcount\b/)) {
            options = Object.assign(Object.assign({}, options), { count });
        }
        if (options) {
            for (const k in options) {
                finalText = this.handleOptions(finalText, k, options[k]);
            }
        }
        return finalText ? finalText : `ERR::INVALID COUNT ==> ${count}`;
    }
    static choiceStringParser(t) {
        const limits = t.match(/\[(.*?)\]/)[1].split(",");
        return {
            text: (0, helpers_1.replaceAll)(t, /\[.*?\]/, "").trim(),
            limit: {
                lower: limits[0] === "*" ? Number.NEGATIVE_INFINITY : +limits[0],
                upper: limits[1]
                    ? limits[1] === "*"
                        ? Number.POSITIVE_INFINITY
                        : +limits[1]
                    : +limits[0],
            },
        };
    }
    static handleOptions(text, key, value) {
        if (!isNaN(+value))
            return (0, helpers_1.replaceAll)(text, `:${key}`, value);
        let lowerCaseText = text.toLowerCase();
        const keyStartIdx = lowerCaseText.indexOf(key);
        const identifier = text.substr(keyStartIdx, keyStartIdx + key.length);
        const caseType = (0, helpers_1.isUpperCase)(identifier)
            ? this.caseTypes.UPPER_CASE
            : (0, helpers_1.isLowerCase)(identifier)
                ? this.caseTypes.LOWER_CASE
                : (0, helpers_1.isSentenceCase)(identifier)
                    ? this.caseTypes.SENTENCE_CASE
                    : this.caseTypes.UNKNOWN;
        text = (0, helpers_1.replaceAll)(text, `:${caseType === this.caseTypes.UPPER_CASE
            ? key.toUpperCase()
            : caseType === this.caseTypes.LOWER_CASE
                ? key.toLowerCase()
                : caseType === this.caseTypes.SENTENCE_CASE
                    ? key[0].toUpperCase() + key.slice(1)
                    : key}`, () => {
            switch (caseType) {
                case this.caseTypes.UPPER_CASE:
                    return value.toUpperCase();
                case this.caseTypes.LOWER_CASE:
                    return value.toLowerCase();
                case this.caseTypes.SENTENCE_CASE:
                    return value[0].toUpperCase() + value.slice(1);
                default:
                    return value;
            }
        });
        return text;
    }
    static readFiles(dirname, onFileContent) {
        const fss = (0, fs_1.readdirSync)(dirname);
        fss.forEach((filename) => {
            const fileData = (0, fs_1.readFileSync)(dirname + "/" + filename, {
                encoding: "utf-8",
            });
            onFileContent(filename, fileData);
        });
    }
};
LocalizationService.caseTypes = {
    UPPER_CASE: 1,
    LOWER_CASE: 2,
    SENTENCE_CASE: 3,
    UNKNOWN: 0,
};
LocalizationService = LocalizationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], LocalizationService);
exports.LocalizationService = LocalizationService;
