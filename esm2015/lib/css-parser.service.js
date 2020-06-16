/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { LayerService, StyleService, SymbolService } from '@xlayers/sketch-lib';
import { CssContextService } from './css-context.service';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "./css-context.service";
export class CssParserService {
    /**
     * @param {?} styleHelperService
     * @param {?} cssContext
     * @param {?} symbolService
     * @param {?} layerService
     */
    constructor(styleHelperService, cssContext, symbolService, layerService) {
        this.styleHelperService = styleHelperService;
        this.cssContext = cssContext;
        this.symbolService = symbolService;
        this.layerService = layerService;
    }
    /**
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    compute(current, data, options) {
        if (current._class === 'page') {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            layer => {
                this.flattenLayer(layer);
                this.visit(layer, data, options);
            }));
        }
        else {
            this.visit(current, data, options);
        }
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    flattenLayer(current) {
        current.frame.x = 0;
        current.frame.y = 0;
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    walk(current, data, options) {
        if (this.layerService.identify(current)) {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            layer => {
                this.visit(layer, data, options);
            }));
        }
        else if (this.symbolService.identify(current)) {
            return this.visitSymbol(current, data, options);
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    visit(current, data, options) {
        if (options.force) {
            this.cssContext.clear(current);
        }
        if (this.cssContext.identify(current)) {
            if (!this.cssContext.of(current)) {
                this.visitContent(current, options);
            }
        }
        this.walk(current, data, options);
    }
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    visitSymbol(current, data, options) {
        /** @type {?} */
        const symbolMaster = this.symbolService.lookup(current, data);
        if (symbolMaster) {
            this.compute(symbolMaster, data, options);
        }
    }
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    visitContent(current, options) {
        if (options.generateClassName) {
            this.cssContext.put(current, {
                className: this.generateCssClassName(options)
            });
        }
        switch ((/** @type {?} */ (current._class))) {
            case 'rectangle':
                this.visitRectangleStyle(current);
                break;
            case 'text':
                this.visitTextStyle(current);
                break;
            case 'oval':
                this.visitOvalStyle(current);
                break;
            default:
                this.visitLayerStyle(current);
                break;
        }
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    visitLayerStyle(current) {
        this.cssContext.put(current, {
            rules: Object.assign({}, this.extractFrame(current), this.extractRotation(current), this.extractBorderRadius(current), this.extractOpacity(current))
        });
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    visitRectangleStyle(current) {
        this.cssContext.put(current, {
            rules: Object.assign({}, this.extractFrame(current), this.extractBorders(current), this.extractFills(current), this.extractShadows(current)),
            pseudoElements: { before: this.extractBlurPseudoElement(current) }
        });
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    visitOvalStyle(current) {
        this.cssContext.put(current, {
            rules: Object.assign({}, this.addOvalShape(), this.extractFrame(current), this.extractBorders(current), this.extractFills(current), this.extractShadows(current)),
            pseudoElements: { before: this.extractBlurPseudoElement(current) }
        });
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    visitTextStyle(current) {
        this.cssContext.put(current, {
            rules: Object.assign({}, this.extractFrame(current), this.extractTextFont(current), this.extractTextColor(current), this.extractParagraphStyle(current))
        });
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractFrame(current) {
        if (current.frame) {
            return {
                display: 'block',
                position: 'absolute',
                left: `${current.frame.x}px`,
                top: `${current.frame.y}px`,
                width: `${current.frame.width}px`,
                height: `${current.frame.height}px`,
                visibility: current.isVisible ? 'visible' : 'hidden'
            };
        }
        return {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractTextColor(current) {
        /** @type {?} */
        const obj = current.style.textStyle.encodedAttributes;
        if (obj.hasOwnProperty('MSAttributedStringColorAttribute')) {
            return {
                color: this.styleHelperService.parseColorAsRgba(obj.MSAttributedStringColorAttribute)
            };
        }
        else if (obj.hasOwnProperty('NSColor')) {
            // TODO: Handle legacy
            // const archive =
            // this.binaryPlistParser.parse64Content(obj.NSColor._archive);
            // (scope.style.textStyle.encodedAttributes.NSColor as any)._transformed =
            // archive;
            return {};
        }
        return { color: 'black' };
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractParagraphStyle(current) {
        /** @type {?} */
        const obj = current.style.textStyle.encodedAttributes;
        if (obj.hasOwnProperty('NSParagraphStyle')) {
            // TODO: Handle legacy
            // const archive =
            // this.binaryPlistParser.parse64Content(scope.style.textStyle.encodedAttributes.NSParagraphStyle._archive);
            // (scope.style.textStyle.encodedAttributes.NSParagraphStyle as
            // any)._transformed = archive;
            return {};
        }
        return {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractTextFont(current) {
        /** @type {?} */
        const obj = current.style.textStyle.encodedAttributes.MSAttributedStringFontAttribute;
        if (obj.hasOwnProperty('_class') && obj._class === 'fontDescriptor') {
            return {
                'font-family': `'${obj.attributes.name}', 'Roboto', 'sans-serif'`,
                'font-size': `${obj.attributes.size}px`
            };
        }
        else if (obj.hasOwnProperty('_archive')) {
            // TODO: Handle legacy
            // const archive = this.binaryPlistParser.parse64Content(obj._archive);
            // (scope.style.textStyle.encodedAttributes.MSAttributedStringFontAttribute
            // as any)._transformed = archive;
            return {};
        }
        return {};
    }
    /**
     * @private
     * @return {?}
     */
    addOvalShape() {
        return { 'border-radius': '50%' };
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractOpacity(current) {
        return ((/** @type {?} */ (current))).opacity
            ? { opacity: `${((/** @type {?} */ (current))).opacity}` }
            : {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractBorderRadius(current) {
        /** @type {?} */
        const obj = ((/** @type {?} */ (current))).fixedRadius;
        return obj ? { 'border-radius': `${obj.fixedRadius}px` } : {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractRotation(current) {
        /** @type {?} */
        const obj = ((/** @type {?} */ (current))).rotation;
        return obj ? { transform: `rotate(${current.rotation}deg)` } : {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractBlurPseudoElement(current) {
        /** @type {?} */
        const obj = ((/** @type {?} */ (current))).style.blur;
        if (obj && obj.hasOwnProperty('radius') && obj.radius > 0) {
            /** @type {?} */
            const objFill = ((/** @type {?} */ (current))).style.fills;
            if (objFill && objFill.length > 0) {
                // we only support one fill: take the first one!
                // ignore the other fills
                /** @type {?} */
                const firstFill = objFill[0];
                if (firstFill.isEnabled) {
                    /** @type {?} */
                    const fillColor = this.styleHelperService.parseColorAsRgba(firstFill.color);
                    return {
                        height: `${current.frame.height + 50}px`,
                        width: `${current.frame.width + 50}px`,
                        content: '""',
                        position: 'absolute',
                        top: '-25px',
                        left: '-25px',
                        bottom: '0',
                        right: '0',
                        background: 'inherit',
                        'box-shadow': `inset 0 0 0 ${current.frame.width /
                            2}px ${fillColor}`,
                        filter: `blur(${obj.radius.toFixed(2)}px)`
                    };
                }
            }
        }
        return {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractBorders(current) {
        /** @enum {number} */
        const BorderType = {
            INSIDE: 1,
            OUTSIDE: 2,
            CENTER: 0,
        };
        BorderType[BorderType.INSIDE] = 'INSIDE';
        BorderType[BorderType.OUTSIDE] = 'OUTSIDE';
        BorderType[BorderType.CENTER] = 'CENTER';
        /** @type {?} */
        const obj = ((/** @type {?} */ (current))).style.borders;
        if (obj && obj.length > 0) {
            /** @type {?} */
            const bordersStyles = obj.reduce((/**
             * @param {?} acc
             * @param {?} border
             * @return {?}
             */
            (acc, border) => {
                if (border.thickness > 0) {
                    /** @type {?} */
                    const borderColor = this.styleHelperService.parseColorAsRgba(border.color);
                    /** @type {?} */
                    const inset = border.position === BorderType.INSIDE ? 'inset' : '';
                    /** @type {?} */
                    const shadow = [
                        `0 0 0 ${border.thickness}px ${borderColor}`,
                        inset
                    ].join(' ');
                    return [shadow, ...acc];
                }
                return acc;
            }), []);
            if (bordersStyles.length > 0) {
                return { 'box-shadow': bordersStyles.join(',') };
            }
        }
        return {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractFills(current) {
        /** @type {?} */
        const obj = ((/** @type {?} */ (current))).style.fills;
        if (obj && obj.length > 0) {
            // we only support one fill: take the first one!
            // ignore the other fills
            /** @type {?} */
            const firstFill = obj[0];
            if (firstFill.isEnabled) {
                /** @type {?} */
                const fillColor = this.styleHelperService.parseColorAsRgba(firstFill.color);
                /** @type {?} */
                const blurObj = ((/** @type {?} */ (current))).style.blur;
                if (blurObj && blurObj.hasOwnProperty('radius') && blurObj.radius > 0) {
                    return Object.assign({}, this.extractFillGradient(firstFill), { background: 'inherit', overflow: 'hidden', 'background-color': fillColor });
                }
                else {
                    return Object.assign({}, this.extractFillGradient(firstFill), { 'background-color': fillColor });
                }
            }
        }
        return {};
    }
    /**
     * @private
     * @param {?} fill
     * @return {?}
     */
    extractFillGradient(fill) {
        if (fill.gradient) {
            /** @type {?} */
            const fillsStyles = fill.gradient.stops.map((/**
             * @param {?} stop
             * @return {?}
             */
            stop => {
                /** @type {?} */
                const position = stop.position >= 0 && stop.position <= 1
                    ? ` ${stop.position * 100}%`
                    : '';
                /** @type {?} */
                const fillColor = this.styleHelperService.parseColorAsRgba(stop.color);
                return `${fillColor}${position}`;
            }));
            if (fillsStyles.length > 0) {
                // apply gradient, if multiple fills
                // default angle is 90deg
                return {
                    background: `linear-gradient(90deg, ${fillsStyles.join(',')})`
                };
            }
        }
        return {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractShadows(current) {
        /** @type {?} */
        const innerShadow = this.extractInnerShadow(current);
        /** @type {?} */
        const outterShadow = this.extractOuterShadow(current);
        return innerShadow + outterShadow !== ''
            ? { 'box-shadow': innerShadow + outterShadow }
            : {};
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractInnerShadow(current) {
        /** @type {?} */
        const innerShadows = ((/** @type {?} */ (current))).style.innerShadows;
        if (innerShadows) {
            return innerShadows.map((/**
             * @param {?} innerShadow
             * @return {?}
             */
            innerShadow => {
                /** @type {?} */
                const shadowColor = this.styleHelperService.parseColorAsRgba(innerShadow.color);
                return [
                    `${innerShadow.offsetX}px`,
                    `${innerShadow.offsetY}px`,
                    `${innerShadow.blurRadius}px`,
                    `${innerShadow.spread}px`,
                    `${shadowColor}`,
                    `inset`
                ].join(' ');
            }));
        }
        return '';
    }
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    extractOuterShadow(current) {
        /** @type {?} */
        const outerShadows = ((/** @type {?} */ (current))).style.shadows;
        if (outerShadows) {
            return outerShadows.map((/**
             * @param {?} shadow
             * @return {?}
             */
            shadow => {
                /** @type {?} */
                const shadowColor = this.styleHelperService.parseColorAsRgba(shadow.color);
                return [
                    `${shadow.offsetX}px`,
                    `${shadow.offsetY}px`,
                    `${shadow.blurRadius}px`,
                    `${shadow.spread}px`,
                    `${shadowColor}`
                ].join(' ');
            }));
        }
        return '';
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    generateCssClassName(options) {
        /** @type {?} */
        const randomString = Math.random()
            .toString(36)
            .substring(2, 6);
        return `${options.cssPrefix}${randomString}`;
    }
}
CssParserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CssParserService.ctorParameters = () => [
    { type: StyleService },
    { type: CssContextService },
    { type: SymbolService },
    { type: LayerService }
];
/** @nocollapse */ CssParserService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssParserService_Factory() { return new CssParserService(i0.ɵɵinject(i1.StyleService), i0.ɵɵinject(i2.CssContextService), i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.LayerService)); }, token: CssParserService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    CssParserService.prototype.styleHelperService;
    /**
     * @type {?}
     * @private
     */
    CssParserService.prototype.cssContext;
    /**
     * @type {?}
     * @private
     */
    CssParserService.prototype.symbolService;
    /**
     * @type {?}
     * @private
     */
    CssParserService.prototype.layerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXBhcnNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHhsYXllcnMvY3NzLWNvZGVnZW4vIiwic291cmNlcyI6WyJsaWIvY3NzLXBhcnNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBSzFELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7Ozs7SUFDM0IsWUFDVSxrQkFBZ0MsRUFDaEMsVUFBNkIsRUFDcEIsYUFBNEIsRUFDNUIsWUFBMEI7UUFIbkMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFjO1FBQ2hDLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBQ3BCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQzFDLENBQUM7Ozs7Ozs7SUFFSixPQUFPLENBQ0wsT0FBc0IsRUFDdEIsSUFBa0IsRUFDbEIsT0FBMEI7UUFFMUIsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxLQUFLLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLENBQUMsRUFBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxPQUFzQjtRQUN6QyxP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R0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJO29CQUNyQixHQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUk7b0JBQ3JCLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSTtvQkFDeEIsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJO29CQUNwQixHQUFHLFdBQVcsRUFBRTtpQkFDakIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxPQUEwQjs7Y0FDL0MsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7YUFDL0IsUUFBUSxDQUFDLEVBQUUsQ0FBQzthQUNaLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWxCLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7OztZQXZhRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFQc0IsWUFBWTtZQUcxQixpQkFBaUI7WUFIVyxhQUFhO1lBQXpDLFlBQVk7Ozs7Ozs7O0lBVWpCLDhDQUF3Qzs7Ozs7SUFDeEMsc0NBQXFDOzs7OztJQUNyQyx5Q0FBNkM7Ozs7O0lBQzdDLHdDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGF5ZXJTZXJ2aWNlLCBTdHlsZVNlcnZpY2UsIFN5bWJvbFNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9za2V0Y2gtbGliJztcclxuXHJcbmltcG9ydCB7IENzc0NvZGVHZW5PcHRpb25zIH0gZnJvbSAnLi9jc3MtY29kZWdlbic7XHJcbmltcG9ydCB7IENzc0NvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi9jc3MtY29udGV4dC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENzc1BhcnNlclNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBzdHlsZUhlbHBlclNlcnZpY2U6IFN0eWxlU2VydmljZSxcclxuICAgIHByaXZhdGUgY3NzQ29udGV4dDogQ3NzQ29udGV4dFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHN5bWJvbFNlcnZpY2U6IFN5bWJvbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxheWVyU2VydmljZTogTGF5ZXJTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBjb21wdXRlKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IENzc0NvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBpZiAoY3VycmVudC5fY2xhc3MgPT09ICdwYWdlJykge1xyXG4gICAgICBjdXJyZW50LmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICB0aGlzLmZsYXR0ZW5MYXllcihsYXllcik7XHJcbiAgICAgICAgdGhpcy52aXNpdChsYXllciwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aXNpdChjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmxhdHRlbkxheWVyKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGN1cnJlbnQuZnJhbWUueCA9IDA7XHJcbiAgICBjdXJyZW50LmZyYW1lLnkgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB3YWxrKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IENzc0NvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBpZiAodGhpcy5sYXllclNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgY3VycmVudC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgICAgdGhpcy52aXNpdChsYXllciwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnN5bWJvbFNlcnZpY2UuaWRlbnRpZnkoY3VycmVudCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmlzaXRTeW1ib2woY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0KFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IENzc0NvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBpZiAob3B0aW9ucy5mb3JjZSkge1xyXG4gICAgICB0aGlzLmNzc0NvbnRleHQuY2xlYXIoY3VycmVudCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5jc3NDb250ZXh0LmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIGlmICghdGhpcy5jc3NDb250ZXh0Lm9mKGN1cnJlbnQpKSB7XHJcbiAgICAgICAgdGhpcy52aXNpdENvbnRlbnQoY3VycmVudCwgb3B0aW9ucyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMud2FsayhjdXJyZW50LCBkYXRhLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRTeW1ib2woXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9uczogQ3NzQ29kZUdlbk9wdGlvbnNcclxuICApIHtcclxuICAgIGNvbnN0IHN5bWJvbE1hc3RlciA9IHRoaXMuc3ltYm9sU2VydmljZS5sb29rdXAoY3VycmVudCwgZGF0YSk7XHJcbiAgICBpZiAoc3ltYm9sTWFzdGVyKSB7XHJcbiAgICAgIHRoaXMuY29tcHV0ZShzeW1ib2xNYXN0ZXIsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdENvbnRlbnQoY3VycmVudDogU2tldGNoTVNMYXllciwgb3B0aW9uczogQ3NzQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGlmIChvcHRpb25zLmdlbmVyYXRlQ2xhc3NOYW1lKSB7XHJcbiAgICAgIHRoaXMuY3NzQ29udGV4dC5wdXQoY3VycmVudCwge1xyXG4gICAgICAgIGNsYXNzTmFtZTogdGhpcy5nZW5lcmF0ZUNzc0NsYXNzTmFtZShvcHRpb25zKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGN1cnJlbnQuX2NsYXNzIGFzIHN0cmluZykge1xyXG4gICAgICBjYXNlICdyZWN0YW5nbGUnOlxyXG4gICAgICAgIHRoaXMudmlzaXRSZWN0YW5nbGVTdHlsZShjdXJyZW50KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgIHRoaXMudmlzaXRUZXh0U3R5bGUoY3VycmVudCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdvdmFsJzpcclxuICAgICAgICB0aGlzLnZpc2l0T3ZhbFN0eWxlKGN1cnJlbnQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLnZpc2l0TGF5ZXJTdHlsZShjdXJyZW50KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRMYXllclN0eWxlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIHRoaXMuY3NzQ29udGV4dC5wdXQoY3VycmVudCwge1xyXG4gICAgICBydWxlczoge1xyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEZyYW1lKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdFJvdGF0aW9uKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEJvcmRlclJhZGl1cyhjdXJyZW50KSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RPcGFjaXR5KGN1cnJlbnQpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdFJlY3RhbmdsZVN0eWxlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIHRoaXMuY3NzQ29udGV4dC5wdXQoY3VycmVudCwge1xyXG4gICAgICBydWxlczoge1xyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEZyYW1lKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEJvcmRlcnMoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0RmlsbHMoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0U2hhZG93cyhjdXJyZW50KVxyXG4gICAgICB9LFxyXG4gICAgICBwc2V1ZG9FbGVtZW50czogeyBiZWZvcmU6IHRoaXMuZXh0cmFjdEJsdXJQc2V1ZG9FbGVtZW50KGN1cnJlbnQpIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdE92YWxTdHlsZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICB0aGlzLmNzc0NvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgcnVsZXM6IHtcclxuICAgICAgICAuLi50aGlzLmFkZE92YWxTaGFwZSgpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEZyYW1lKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEJvcmRlcnMoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0RmlsbHMoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0U2hhZG93cyhjdXJyZW50KVxyXG4gICAgICB9LFxyXG4gICAgICBwc2V1ZG9FbGVtZW50czogeyBiZWZvcmU6IHRoaXMuZXh0cmFjdEJsdXJQc2V1ZG9FbGVtZW50KGN1cnJlbnQpIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdFRleHRTdHlsZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICB0aGlzLmNzc0NvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgcnVsZXM6IHtcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RGcmFtZShjdXJyZW50KSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RUZXh0Rm9udChjdXJyZW50KSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RUZXh0Q29sb3IoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0UGFyYWdyYXBoU3R5bGUoY3VycmVudClcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RGcmFtZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBpZiAoY3VycmVudC5mcmFtZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgbGVmdDogYCR7Y3VycmVudC5mcmFtZS54fXB4YCxcclxuICAgICAgICB0b3A6IGAke2N1cnJlbnQuZnJhbWUueX1weGAsXHJcbiAgICAgICAgd2lkdGg6IGAke2N1cnJlbnQuZnJhbWUud2lkdGh9cHhgLFxyXG4gICAgICAgIGhlaWdodDogYCR7Y3VycmVudC5mcmFtZS5oZWlnaHR9cHhgLFxyXG4gICAgICAgIHZpc2liaWxpdHk6IGN1cnJlbnQuaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbidcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFRleHRDb2xvcihjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBvYmogPSBjdXJyZW50LnN0eWxlLnRleHRTdHlsZS5lbmNvZGVkQXR0cmlidXRlcztcclxuXHJcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KCdNU0F0dHJpYnV0ZWRTdHJpbmdDb2xvckF0dHJpYnV0ZScpKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29sb3I6IHRoaXMuc3R5bGVIZWxwZXJTZXJ2aWNlLnBhcnNlQ29sb3JBc1JnYmEoXHJcbiAgICAgICAgICBvYmouTVNBdHRyaWJ1dGVkU3RyaW5nQ29sb3JBdHRyaWJ1dGVcclxuICAgICAgICApXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2UgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgnTlNDb2xvcicpKSB7XHJcbiAgICAgIC8vIFRPRE86IEhhbmRsZSBsZWdhY3lcclxuICAgICAgLy8gY29uc3QgYXJjaGl2ZSA9XHJcbiAgICAgIC8vIHRoaXMuYmluYXJ5UGxpc3RQYXJzZXIucGFyc2U2NENvbnRlbnQob2JqLk5TQ29sb3IuX2FyY2hpdmUpO1xyXG4gICAgICAvLyAoc2NvcGUuc3R5bGUudGV4dFN0eWxlLmVuY29kZWRBdHRyaWJ1dGVzLk5TQ29sb3IgYXMgYW55KS5fdHJhbnNmb3JtZWQgPVxyXG4gICAgICAvLyBhcmNoaXZlO1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgY29sb3I6ICdibGFjaycgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFBhcmFncmFwaFN0eWxlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IG9iaiA9IGN1cnJlbnQuc3R5bGUudGV4dFN0eWxlLmVuY29kZWRBdHRyaWJ1dGVzO1xyXG5cclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoJ05TUGFyYWdyYXBoU3R5bGUnKSkge1xyXG4gICAgICAvLyBUT0RPOiBIYW5kbGUgbGVnYWN5XHJcbiAgICAgIC8vIGNvbnN0IGFyY2hpdmUgPVxyXG4gICAgICAvLyB0aGlzLmJpbmFyeVBsaXN0UGFyc2VyLnBhcnNlNjRDb250ZW50KHNjb3BlLnN0eWxlLnRleHRTdHlsZS5lbmNvZGVkQXR0cmlidXRlcy5OU1BhcmFncmFwaFN0eWxlLl9hcmNoaXZlKTtcclxuICAgICAgLy8gKHNjb3BlLnN0eWxlLnRleHRTdHlsZS5lbmNvZGVkQXR0cmlidXRlcy5OU1BhcmFncmFwaFN0eWxlIGFzXHJcbiAgICAgIC8vIGFueSkuX3RyYW5zZm9ybWVkID0gYXJjaGl2ZTtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFRleHRGb250KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IG9iaiA9XHJcbiAgICAgIGN1cnJlbnQuc3R5bGUudGV4dFN0eWxlLmVuY29kZWRBdHRyaWJ1dGVzLk1TQXR0cmlidXRlZFN0cmluZ0ZvbnRBdHRyaWJ1dGU7XHJcblxyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgnX2NsYXNzJykgJiYgb2JqLl9jbGFzcyA9PT0gJ2ZvbnREZXNjcmlwdG9yJykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgICdmb250LWZhbWlseSc6IGAnJHtvYmouYXR0cmlidXRlcy5uYW1lfScsICdSb2JvdG8nLCAnc2Fucy1zZXJpZidgLFxyXG4gICAgICAgICdmb250LXNpemUnOiBgJHtvYmouYXR0cmlidXRlcy5zaXplfXB4YFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmIChvYmouaGFzT3duUHJvcGVydHkoJ19hcmNoaXZlJykpIHtcclxuICAgICAgLy8gVE9ETzogSGFuZGxlIGxlZ2FjeVxyXG4gICAgICAvLyBjb25zdCBhcmNoaXZlID0gdGhpcy5iaW5hcnlQbGlzdFBhcnNlci5wYXJzZTY0Q29udGVudChvYmouX2FyY2hpdmUpO1xyXG4gICAgICAvLyAoc2NvcGUuc3R5bGUudGV4dFN0eWxlLmVuY29kZWRBdHRyaWJ1dGVzLk1TQXR0cmlidXRlZFN0cmluZ0ZvbnRBdHRyaWJ1dGVcclxuICAgICAgLy8gYXMgYW55KS5fdHJhbnNmb3JtZWQgPSBhcmNoaXZlO1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRPdmFsU2hhcGUoKSB7XHJcbiAgICByZXR1cm4geyAnYm9yZGVyLXJhZGl1cyc6ICc1MCUnIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RPcGFjaXR5KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIHJldHVybiAoY3VycmVudCBhcyBhbnkpLm9wYWNpdHlcclxuICAgICAgPyB7IG9wYWNpdHk6IGAkeyhjdXJyZW50IGFzIGFueSkub3BhY2l0eX1gIH1cclxuICAgICAgOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEJvcmRlclJhZGl1cyhjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBvYmogPSAoY3VycmVudCBhcyBhbnkpLmZpeGVkUmFkaXVzO1xyXG4gICAgcmV0dXJuIG9iaiA/IHsgJ2JvcmRlci1yYWRpdXMnOiBgJHtvYmouZml4ZWRSYWRpdXN9cHhgIH0gOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFJvdGF0aW9uKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IG9iaiA9IChjdXJyZW50IGFzIGFueSkucm90YXRpb247XHJcbiAgICByZXR1cm4gb2JqID8geyB0cmFuc2Zvcm06IGByb3RhdGUoJHtjdXJyZW50LnJvdGF0aW9ufWRlZylgIH0gOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEJsdXJQc2V1ZG9FbGVtZW50KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IG9iaiA9IChjdXJyZW50IGFzIGFueSkuc3R5bGUuYmx1cjtcclxuICAgIGlmIChvYmogJiYgb2JqLmhhc093blByb3BlcnR5KCdyYWRpdXMnKSAmJiBvYmoucmFkaXVzID4gMCkge1xyXG4gICAgICBjb25zdCBvYmpGaWxsID0gKGN1cnJlbnQgYXMgYW55KS5zdHlsZS5maWxscztcclxuXHJcbiAgICAgIGlmIChvYmpGaWxsICYmIG9iakZpbGwubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIHdlIG9ubHkgc3VwcG9ydCBvbmUgZmlsbDogdGFrZSB0aGUgZmlyc3Qgb25lIVxyXG4gICAgICAgIC8vIGlnbm9yZSB0aGUgb3RoZXIgZmlsbHNcclxuICAgICAgICBjb25zdCBmaXJzdEZpbGwgPSBvYmpGaWxsWzBdO1xyXG5cclxuICAgICAgICBpZiAoZmlyc3RGaWxsLmlzRW5hYmxlZCkge1xyXG4gICAgICAgICAgY29uc3QgZmlsbENvbG9yID0gdGhpcy5zdHlsZUhlbHBlclNlcnZpY2UucGFyc2VDb2xvckFzUmdiYShcclxuICAgICAgICAgICAgZmlyc3RGaWxsLmNvbG9yXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhlaWdodDogYCR7Y3VycmVudC5mcmFtZS5oZWlnaHQgKyA1MH1weGAsXHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHtjdXJyZW50LmZyYW1lLndpZHRoICsgNTB9cHhgLFxyXG4gICAgICAgICAgICBjb250ZW50OiAnXCJcIicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICB0b3A6ICctMjVweCcsXHJcbiAgICAgICAgICAgIGxlZnQ6ICctMjVweCcsXHJcbiAgICAgICAgICAgIGJvdHRvbTogJzAnLFxyXG4gICAgICAgICAgICByaWdodDogJzAnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnaW5oZXJpdCcsXHJcbiAgICAgICAgICAgICdib3gtc2hhZG93JzogYGluc2V0IDAgMCAwICR7Y3VycmVudC5mcmFtZS53aWR0aCAvXHJcbiAgICAgICAgICAgICAgMn1weCAke2ZpbGxDb2xvcn1gLFxyXG4gICAgICAgICAgICBmaWx0ZXI6IGBibHVyKCR7b2JqLnJhZGl1cy50b0ZpeGVkKDIpfXB4KWBcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0Qm9yZGVycyhjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBlbnVtIEJvcmRlclR5cGUge1xyXG4gICAgICBJTlNJREUgPSAxLFxyXG4gICAgICBPVVRTSURFID0gMixcclxuICAgICAgQ0VOVEVSID0gMFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9iaiA9IChjdXJyZW50IGFzIGFueSkuc3R5bGUuYm9yZGVycztcclxuXHJcbiAgICBpZiAob2JqICYmIG9iai5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGJvcmRlcnNTdHlsZXMgPSBvYmoucmVkdWNlKChhY2MsIGJvcmRlcikgPT4ge1xyXG4gICAgICAgIGlmIChib3JkZXIudGhpY2tuZXNzID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgYm9yZGVyQ29sb3IgPSB0aGlzLnN0eWxlSGVscGVyU2VydmljZS5wYXJzZUNvbG9yQXNSZ2JhKFxyXG4gICAgICAgICAgICBib3JkZXIuY29sb3JcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zdCBpbnNldCA9IGJvcmRlci5wb3NpdGlvbiA9PT0gQm9yZGVyVHlwZS5JTlNJREUgPyAnaW5zZXQnIDogJyc7XHJcbiAgICAgICAgICBjb25zdCBzaGFkb3cgPSBbXHJcbiAgICAgICAgICAgIGAwIDAgMCAke2JvcmRlci50aGlja25lc3N9cHggJHtib3JkZXJDb2xvcn1gLFxyXG4gICAgICAgICAgICBpbnNldFxyXG4gICAgICAgICAgXS5qb2luKCcgJyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIFtzaGFkb3csIC4uLmFjY107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICB9LCBbXSk7XHJcblxyXG4gICAgICBpZiAoYm9yZGVyc1N0eWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgJ2JveC1zaGFkb3cnOiBib3JkZXJzU3R5bGVzLmpvaW4oJywnKSB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RmlsbHMoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgY29uc3Qgb2JqID0gKGN1cnJlbnQgYXMgYW55KS5zdHlsZS5maWxscztcclxuXHJcbiAgICBpZiAob2JqICYmIG9iai5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIHdlIG9ubHkgc3VwcG9ydCBvbmUgZmlsbDogdGFrZSB0aGUgZmlyc3Qgb25lIVxyXG4gICAgICAvLyBpZ25vcmUgdGhlIG90aGVyIGZpbGxzXHJcbiAgICAgIGNvbnN0IGZpcnN0RmlsbCA9IG9ialswXTtcclxuXHJcbiAgICAgIGlmIChmaXJzdEZpbGwuaXNFbmFibGVkKSB7XHJcbiAgICAgICAgY29uc3QgZmlsbENvbG9yID0gdGhpcy5zdHlsZUhlbHBlclNlcnZpY2UucGFyc2VDb2xvckFzUmdiYShcclxuICAgICAgICAgIGZpcnN0RmlsbC5jb2xvclxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJsdXJPYmogPSAoY3VycmVudCBhcyBhbnkpLnN0eWxlLmJsdXI7XHJcbiAgICAgICAgaWYgKGJsdXJPYmogJiYgYmx1ck9iai5oYXNPd25Qcm9wZXJ0eSgncmFkaXVzJykgJiYgYmx1ck9iai5yYWRpdXMgPiAwKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi50aGlzLmV4dHJhY3RGaWxsR3JhZGllbnQoZmlyc3RGaWxsKSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2luaGVyaXQnLFxyXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogZmlsbENvbG9yXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi50aGlzLmV4dHJhY3RGaWxsR3JhZGllbnQoZmlyc3RGaWxsKSxcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBmaWxsQ29sb3JcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RmlsbEdyYWRpZW50KGZpbGwpIHtcclxuICAgIGlmIChmaWxsLmdyYWRpZW50KSB7XHJcbiAgICAgIGNvbnN0IGZpbGxzU3R5bGVzID0gZmlsbC5ncmFkaWVudC5zdG9wcy5tYXAoc3RvcCA9PiB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPVxyXG4gICAgICAgICAgc3RvcC5wb3NpdGlvbiA+PSAwICYmIHN0b3AucG9zaXRpb24gPD0gMVxyXG4gICAgICAgICAgICA/IGAgJHtzdG9wLnBvc2l0aW9uICogMTAwfSVgXHJcbiAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgY29uc3QgZmlsbENvbG9yID0gdGhpcy5zdHlsZUhlbHBlclNlcnZpY2UucGFyc2VDb2xvckFzUmdiYShzdG9wLmNvbG9yKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2ZpbGxDb2xvcn0ke3Bvc2l0aW9ufWA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGZpbGxzU3R5bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyBhcHBseSBncmFkaWVudCwgaWYgbXVsdGlwbGUgZmlsbHNcclxuICAgICAgICAvLyBkZWZhdWx0IGFuZ2xlIGlzIDkwZGVnXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICR7ZmlsbHNTdHlsZXMuam9pbignLCcpfSlgXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdFNoYWRvd3MoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgY29uc3QgaW5uZXJTaGFkb3cgPSB0aGlzLmV4dHJhY3RJbm5lclNoYWRvdyhjdXJyZW50KTtcclxuICAgIGNvbnN0IG91dHRlclNoYWRvdyA9IHRoaXMuZXh0cmFjdE91dGVyU2hhZG93KGN1cnJlbnQpO1xyXG5cclxuICAgIHJldHVybiBpbm5lclNoYWRvdyArIG91dHRlclNoYWRvdyAhPT0gJydcclxuICAgICAgPyB7ICdib3gtc2hhZG93JzogaW5uZXJTaGFkb3cgKyBvdXR0ZXJTaGFkb3cgfVxyXG4gICAgICA6IHt9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0SW5uZXJTaGFkb3coY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgY29uc3QgaW5uZXJTaGFkb3dzID0gKGN1cnJlbnQgYXMgYW55KS5zdHlsZS5pbm5lclNoYWRvd3M7XHJcblxyXG4gICAgaWYgKGlubmVyU2hhZG93cykge1xyXG4gICAgICByZXR1cm4gaW5uZXJTaGFkb3dzLm1hcChpbm5lclNoYWRvdyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hhZG93Q29sb3IgPSB0aGlzLnN0eWxlSGVscGVyU2VydmljZS5wYXJzZUNvbG9yQXNSZ2JhKFxyXG4gICAgICAgICAgaW5uZXJTaGFkb3cuY29sb3JcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgYCR7aW5uZXJTaGFkb3cub2Zmc2V0WH1weGAsXHJcbiAgICAgICAgICBgJHtpbm5lclNoYWRvdy5vZmZzZXRZfXB4YCxcclxuICAgICAgICAgIGAke2lubmVyU2hhZG93LmJsdXJSYWRpdXN9cHhgLFxyXG4gICAgICAgICAgYCR7aW5uZXJTaGFkb3cuc3ByZWFkfXB4YCxcclxuICAgICAgICAgIGAke3NoYWRvd0NvbG9yfWAsXHJcbiAgICAgICAgICBgaW5zZXRgXHJcbiAgICAgICAgXS5qb2luKCcgJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdE91dGVyU2hhZG93KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IG91dGVyU2hhZG93cyA9IChjdXJyZW50IGFzIGFueSkuc3R5bGUuc2hhZG93cztcclxuICAgIGlmIChvdXRlclNoYWRvd3MpIHtcclxuICAgICAgcmV0dXJuIG91dGVyU2hhZG93cy5tYXAoc2hhZG93ID0+IHtcclxuICAgICAgICBjb25zdCBzaGFkb3dDb2xvciA9IHRoaXMuc3R5bGVIZWxwZXJTZXJ2aWNlLnBhcnNlQ29sb3JBc1JnYmEoXHJcbiAgICAgICAgICBzaGFkb3cuY29sb3JcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgYCR7c2hhZG93Lm9mZnNldFh9cHhgLFxyXG4gICAgICAgICAgYCR7c2hhZG93Lm9mZnNldFl9cHhgLFxyXG4gICAgICAgICAgYCR7c2hhZG93LmJsdXJSYWRpdXN9cHhgLFxyXG4gICAgICAgICAgYCR7c2hhZG93LnNwcmVhZH1weGAsXHJcbiAgICAgICAgICBgJHtzaGFkb3dDb2xvcn1gXHJcbiAgICAgICAgXS5qb2luKCcgJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2VuZXJhdGVDc3NDbGFzc05hbWUob3B0aW9uczogQ3NzQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHJhbmRvbVN0cmluZyA9IE1hdGgucmFuZG9tKClcclxuICAgICAgLnRvU3RyaW5nKDM2KVxyXG4gICAgICAuc3Vic3RyaW5nKDIsIDYpO1xyXG5cclxuICAgIHJldHVybiBgJHtvcHRpb25zLmNzc1ByZWZpeH0ke3JhbmRvbVN0cmluZ31gO1xyXG4gIH1cclxufVxyXG4iXX0=