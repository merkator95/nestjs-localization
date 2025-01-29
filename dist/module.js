"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var LocalizationModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizationModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const services_1 = require("./services");
let LocalizationModule = LocalizationModule_1 = class LocalizationModule {
    static register(options) {
        return {
            module: LocalizationModule_1,
            providers: [
                { provide: constants_1.CONFIG_OPTIONS, useValue: options },
                services_1.LocalizationService,
            ],
            exports: [services_1.LocalizationService],
        };
    }
    static registerAsync(options) {
        return {
            module: LocalizationModule_1,
            imports: [],
            providers: [
                services_1.LocalizationService,
                this.createLocalizationOptionsProvider(options),
            ],
        };
    }
    static createLocalizationOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.CONFIG_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: constants_1.CONFIG_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createLocalizationOptions(); }),
            inject,
        };
    }
};
exports.LocalizationModule = LocalizationModule;
exports.LocalizationModule = LocalizationModule = LocalizationModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({ imports: [], providers: [] })
], LocalizationModule);
