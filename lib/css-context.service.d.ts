/// <reference types="sketchapp" />
import { CssCodeGenContext } from './css-codegen';
export declare class CssContextService {
    identify(current: SketchMSLayer): boolean;
    of(current: SketchMSLayer): any;
    put(current: SketchMSLayer, nextContext: CssCodeGenContext): void;
    clear(current: SketchMSLayer): void;
}
