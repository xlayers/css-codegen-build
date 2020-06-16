/// <reference types="sketchapp" />
import { CssContextService } from './css-context.service';
import { CssParserService } from './css-parser.service';
import { CssAggregatorService } from './css-aggregator.service';
import { CssCodeGenOptions } from './css-codegen';
export declare class CssCodeGenService {
    private cssContext;
    private cssParser;
    private cssAggretatorService;
    constructor(cssContext: CssContextService, cssParser: CssParserService, cssAggretatorService: CssAggregatorService);
    compute(current: SketchMSLayer, data: SketchMSData, options?: CssCodeGenOptions): void;
    aggregate(current: SketchMSLayer, options?: CssCodeGenOptions): {
        kind: string;
        value: string;
        language: string;
        uri: string;
    }[];
    identify(current: SketchMSLayer): boolean;
    context(current: SketchMSLayer): any;
    private compileOptions;
}
