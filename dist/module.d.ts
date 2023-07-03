import { DynamicModule } from "@nestjs/common";
import { LocalizationAsyncOptions, LocalizationOptions } from "./interfaces";
export declare class LocalizationModule {
    static register(options: LocalizationOptions): DynamicModule;
    static registerAsync(options: LocalizationAsyncOptions): DynamicModule;
    private static createLocalizationOptionsProvider;
}
