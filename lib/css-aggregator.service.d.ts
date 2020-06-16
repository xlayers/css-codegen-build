/// <reference types="sketchapp" />
import { CssContextService } from './css-context.service';
import { CssCodeGenOptions } from './css-codegen';
import { FormatService } from '@xlayers/sketch-lib';
interface StyleList {
    className: string;
    declarations: string[];
}
export declare class CssAggregatorService {
    private readonly formatService;
    private cssContext;
    constructor(formatService: FormatService, cssContext: CssContextService);
    private indentationSymbol;
    private hostStyle;
    /**
     * This will parse the ast to return a optimized css stylesheet
     * @param current SketchMSLayer the ast based on sketch json
     */
    aggregate(current: SketchMSLayer, options?: CssCodeGenOptions): {
        kind: string;
        value: string;
        language: string;
        uri: string;
    }[];
    /**
     * The complete string of css style
     * @param styles string of stylesheet
     */
    private combineStyles;
    /**
     * Map over styles with normal css output
     * @param styles optimized list of styles
     */
    private reGenerateStyleSheet;
    /**
     * Parse stylelist to understandable css class definition
     * @param style the declaration of style
     */
    private generateCssStyle;
    /**
     * Parse style pseudo element without any pre processing
     * @param styles curent created list
     * @param current  sketch ast
     */
    private buildPseudoElementStyle;
    /**
     * This is the main ast parser to go from sketch to css
     * @param styles newly created list
     * @param current  sketch ast
     */
    private buildAstStyleSheet;
    /**
     * This will optimize the AST to 'better' css
     * Basic concepts is to loop through ast and verify current & next
     * declaration.
     *
     * When equals css declarations found this will be placed
     * in a seperate css class
     * @param stylesAst sketch ast
     */
    postProcessCss(stylesAst: StyleList[]): void;
    /**
     * Will remove the duplicates from ast
     * @param duplicates duplicaye css styles
     * @param stylesAst sketch ast
     */
    private reduceDuplicates;
    /**
     * Helper function to set declaration for each css declaration
     * @param stylesAst
     * @param currentIndex
     * @param currentDeclarationSet
     * @param checkingDecIndex
     * @param checkDeclarationpropertieset
     */
    private setValuesInAst;
}
export {};
