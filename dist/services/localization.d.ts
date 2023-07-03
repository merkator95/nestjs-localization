import { LocalizationOptions } from "../interfaces";
export declare class LocalizationService {
    private options;
    private static data;
    private static fallbackLang;
    private static caseTypes;
    constructor(options: LocalizationOptions);
    static trans(key: string, language?: string | Record<string, any>, options?: Record<string, any>): string;
    static transChoice(key: string, language?: string | number, count?: number | Record<string, any>, options?: Record<string, any>): string;
    private static choiceStringParser;
    private static handleOptions;
    private static readFiles;
}
