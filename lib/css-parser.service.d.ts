/// <reference types="sketchapp" />
import { LayerService, StyleService, SymbolService } from '@xlayers/sketch-lib';
import { CssCodeGenOptions } from './css-codegen';
import { CssContextService } from './css-context.service';
export declare class CssParserService {
    private styleHelperService;
    private cssContext;
    private readonly symbolService;
    private readonly layerService;
    constructor(styleHelperService: StyleService, cssContext: CssContextService, symbolService: SymbolService, layerService: LayerService);
    compute(current: SketchMSLayer, data: SketchMSData, options: CssCodeGenOptions): void;
    private flattenLayer;
    private walk;
    private visit;
    private visitSymbol;
    private visitContent;
    private visitLayerStyle;
    private visitRectangleStyle;
    private visitOvalStyle;
    private visitTextStyle;
    private extractFrame;
    private extractTextColor;
    private extractParagraphStyle;
    private extractTextFont;
    private addOvalShape;
    private extractOpacity;
    private extractBorderRadius;
    private extractRotation;
    private extractBlurPseudoElement;
    private extractBorders;
    private extractFills;
    private extractFillGradient;
    private extractShadows;
    private extractInnerShadow;
    private extractOuterShadow;
    private generateCssClassName;
}
