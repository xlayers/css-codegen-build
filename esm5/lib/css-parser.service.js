/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LayerService, StyleService, SymbolService } from '@xlayers/sketch-lib';
import { CssContextService } from './css-context.service';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "./css-context.service";
var CssParserService = /** @class */ (function () {
    function CssParserService(styleHelperService, cssContext, symbolService, layerService) {
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
    CssParserService.prototype.compute = /**
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        var _this = this;
        if (current._class === 'page') {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                _this.flattenLayer(layer);
                _this.visit(layer, data, options);
            }));
        }
        else {
            this.visit(current, data, options);
        }
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.flattenLayer = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        current.frame.x = 0;
        current.frame.y = 0;
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    CssParserService.prototype.walk = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        var _this = this;
        if (this.layerService.identify(current)) {
            current.layers.forEach((/**
             * @param {?} layer
             * @return {?}
             */
            function (layer) {
                _this.visit(layer, data, options);
            }));
        }
        else if (this.symbolService.identify(current)) {
            return this.visitSymbol(current, data, options);
        }
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    CssParserService.prototype.visit = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        if (options.force) {
            this.cssContext.clear(current);
        }
        if (this.cssContext.identify(current)) {
            if (!this.cssContext.of(current)) {
                this.visitContent(current, options);
            }
        }
        this.walk(current, data, options);
    };
    /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    CssParserService.prototype.visitSymbol = /**
     * @private
     * @param {?} current
     * @param {?} data
     * @param {?} options
     * @return {?}
     */
    function (current, data, options) {
        /** @type {?} */
        var symbolMaster = this.symbolService.lookup(current, data);
        if (symbolMaster) {
            this.compute(symbolMaster, data, options);
        }
    };
    /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    CssParserService.prototype.visitContent = /**
     * @private
     * @param {?} current
     * @param {?} options
     * @return {?}
     */
    function (current, options) {
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
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.visitLayerStyle = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        this.cssContext.put(current, {
            rules: tslib_1.__assign({}, this.extractFrame(current), this.extractRotation(current), this.extractBorderRadius(current), this.extractOpacity(current))
        });
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.visitRectangleStyle = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        this.cssContext.put(current, {
            rules: tslib_1.__assign({}, this.extractFrame(current), this.extractBorders(current), this.extractFills(current), this.extractShadows(current)),
            pseudoElements: { before: this.extractBlurPseudoElement(current) }
        });
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.visitOvalStyle = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        this.cssContext.put(current, {
            rules: tslib_1.__assign({}, this.addOvalShape(), this.extractFrame(current), this.extractBorders(current), this.extractFills(current), this.extractShadows(current)),
            pseudoElements: { before: this.extractBlurPseudoElement(current) }
        });
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.visitTextStyle = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        this.cssContext.put(current, {
            rules: tslib_1.__assign({}, this.extractFrame(current), this.extractTextFont(current), this.extractTextColor(current), this.extractParagraphStyle(current))
        });
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractFrame = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        if (current.frame) {
            return {
                display: 'block',
                position: 'absolute',
                left: current.frame.x + "px",
                top: current.frame.y + "px",
                width: current.frame.width + "px",
                height: current.frame.height + "px",
                visibility: current.isVisible ? 'visible' : 'hidden'
            };
        }
        return {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractTextColor = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var obj = current.style.textStyle.encodedAttributes;
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
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractParagraphStyle = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var obj = current.style.textStyle.encodedAttributes;
        if (obj.hasOwnProperty('NSParagraphStyle')) {
            // TODO: Handle legacy
            // const archive =
            // this.binaryPlistParser.parse64Content(scope.style.textStyle.encodedAttributes.NSParagraphStyle._archive);
            // (scope.style.textStyle.encodedAttributes.NSParagraphStyle as
            // any)._transformed = archive;
            return {};
        }
        return {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractTextFont = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var obj = current.style.textStyle.encodedAttributes.MSAttributedStringFontAttribute;
        if (obj.hasOwnProperty('_class') && obj._class === 'fontDescriptor') {
            return {
                'font-family': "'" + obj.attributes.name + "', 'Roboto', 'sans-serif'",
                'font-size': obj.attributes.size + "px"
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
    };
    /**
     * @private
     * @return {?}
     */
    CssParserService.prototype.addOvalShape = /**
     * @private
     * @return {?}
     */
    function () {
        return { 'border-radius': '50%' };
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractOpacity = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return ((/** @type {?} */ (current))).opacity
            ? { opacity: "" + ((/** @type {?} */ (current))).opacity }
            : {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractBorderRadius = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var obj = ((/** @type {?} */ (current))).fixedRadius;
        return obj ? { 'border-radius': obj.fixedRadius + "px" } : {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractRotation = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var obj = ((/** @type {?} */ (current))).rotation;
        return obj ? { transform: "rotate(" + current.rotation + "deg)" } : {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractBlurPseudoElement = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var obj = ((/** @type {?} */ (current))).style.blur;
        if (obj && obj.hasOwnProperty('radius') && obj.radius > 0) {
            /** @type {?} */
            var objFill = ((/** @type {?} */ (current))).style.fills;
            if (objFill && objFill.length > 0) {
                // we only support one fill: take the first one!
                // ignore the other fills
                /** @type {?} */
                var firstFill = objFill[0];
                if (firstFill.isEnabled) {
                    /** @type {?} */
                    var fillColor = this.styleHelperService.parseColorAsRgba(firstFill.color);
                    return {
                        height: current.frame.height + 50 + "px",
                        width: current.frame.width + 50 + "px",
                        content: '""',
                        position: 'absolute',
                        top: '-25px',
                        left: '-25px',
                        bottom: '0',
                        right: '0',
                        background: 'inherit',
                        'box-shadow': "inset 0 0 0 " + current.frame.width /
                            2 + "px " + fillColor,
                        filter: "blur(" + obj.radius.toFixed(2) + "px)"
                    };
                }
            }
        }
        return {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractBorders = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        var _this = this;
        /** @enum {number} */
        var BorderType = {
            INSIDE: 1,
            OUTSIDE: 2,
            CENTER: 0,
        };
        BorderType[BorderType.INSIDE] = 'INSIDE';
        BorderType[BorderType.OUTSIDE] = 'OUTSIDE';
        BorderType[BorderType.CENTER] = 'CENTER';
        /** @type {?} */
        var obj = ((/** @type {?} */ (current))).style.borders;
        if (obj && obj.length > 0) {
            /** @type {?} */
            var bordersStyles = obj.reduce((/**
             * @param {?} acc
             * @param {?} border
             * @return {?}
             */
            function (acc, border) {
                if (border.thickness > 0) {
                    /** @type {?} */
                    var borderColor = _this.styleHelperService.parseColorAsRgba(border.color);
                    /** @type {?} */
                    var inset = border.position === BorderType.INSIDE ? 'inset' : '';
                    /** @type {?} */
                    var shadow = [
                        "0 0 0 " + border.thickness + "px " + borderColor,
                        inset
                    ].join(' ');
                    return tslib_1.__spread([shadow], acc);
                }
                return acc;
            }), []);
            if (bordersStyles.length > 0) {
                return { 'box-shadow': bordersStyles.join(',') };
            }
        }
        return {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractFills = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var obj = ((/** @type {?} */ (current))).style.fills;
        if (obj && obj.length > 0) {
            // we only support one fill: take the first one!
            // ignore the other fills
            /** @type {?} */
            var firstFill = obj[0];
            if (firstFill.isEnabled) {
                /** @type {?} */
                var fillColor = this.styleHelperService.parseColorAsRgba(firstFill.color);
                /** @type {?} */
                var blurObj = ((/** @type {?} */ (current))).style.blur;
                if (blurObj && blurObj.hasOwnProperty('radius') && blurObj.radius > 0) {
                    return tslib_1.__assign({}, this.extractFillGradient(firstFill), { background: 'inherit', overflow: 'hidden', 'background-color': fillColor });
                }
                else {
                    return tslib_1.__assign({}, this.extractFillGradient(firstFill), { 'background-color': fillColor });
                }
            }
        }
        return {};
    };
    /**
     * @private
     * @param {?} fill
     * @return {?}
     */
    CssParserService.prototype.extractFillGradient = /**
     * @private
     * @param {?} fill
     * @return {?}
     */
    function (fill) {
        var _this = this;
        if (fill.gradient) {
            /** @type {?} */
            var fillsStyles = fill.gradient.stops.map((/**
             * @param {?} stop
             * @return {?}
             */
            function (stop) {
                /** @type {?} */
                var position = stop.position >= 0 && stop.position <= 1
                    ? " " + stop.position * 100 + "%"
                    : '';
                /** @type {?} */
                var fillColor = _this.styleHelperService.parseColorAsRgba(stop.color);
                return "" + fillColor + position;
            }));
            if (fillsStyles.length > 0) {
                // apply gradient, if multiple fills
                // default angle is 90deg
                return {
                    background: "linear-gradient(90deg, " + fillsStyles.join(',') + ")"
                };
            }
        }
        return {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractShadows = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        /** @type {?} */
        var innerShadow = this.extractInnerShadow(current);
        /** @type {?} */
        var outterShadow = this.extractOuterShadow(current);
        return innerShadow + outterShadow !== ''
            ? { 'box-shadow': innerShadow + outterShadow }
            : {};
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractInnerShadow = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        var _this = this;
        /** @type {?} */
        var innerShadows = ((/** @type {?} */ (current))).style.innerShadows;
        if (innerShadows) {
            return innerShadows.map((/**
             * @param {?} innerShadow
             * @return {?}
             */
            function (innerShadow) {
                /** @type {?} */
                var shadowColor = _this.styleHelperService.parseColorAsRgba(innerShadow.color);
                return [
                    innerShadow.offsetX + "px",
                    innerShadow.offsetY + "px",
                    innerShadow.blurRadius + "px",
                    innerShadow.spread + "px",
                    "" + shadowColor,
                    "inset"
                ].join(' ');
            }));
        }
        return '';
    };
    /**
     * @private
     * @param {?} current
     * @return {?}
     */
    CssParserService.prototype.extractOuterShadow = /**
     * @private
     * @param {?} current
     * @return {?}
     */
    function (current) {
        var _this = this;
        /** @type {?} */
        var outerShadows = ((/** @type {?} */ (current))).style.shadows;
        if (outerShadows) {
            return outerShadows.map((/**
             * @param {?} shadow
             * @return {?}
             */
            function (shadow) {
                /** @type {?} */
                var shadowColor = _this.styleHelperService.parseColorAsRgba(shadow.color);
                return [
                    shadow.offsetX + "px",
                    shadow.offsetY + "px",
                    shadow.blurRadius + "px",
                    shadow.spread + "px",
                    "" + shadowColor
                ].join(' ');
            }));
        }
        return '';
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    CssParserService.prototype.generateCssClassName = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var randomString = Math.random()
            .toString(36)
            .substring(2, 6);
        return "" + options.cssPrefix + randomString;
    };
    CssParserService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CssParserService.ctorParameters = function () { return [
        { type: StyleService },
        { type: CssContextService },
        { type: SymbolService },
        { type: LayerService }
    ]; };
    /** @nocollapse */ CssParserService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssParserService_Factory() { return new CssParserService(i0.ɵɵinject(i1.StyleService), i0.ɵɵinject(i2.CssContextService), i0.ɵɵinject(i1.SymbolService), i0.ɵɵinject(i1.LayerService)); }, token: CssParserService, providedIn: "root" });
    return CssParserService;
}());
export { CssParserService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXBhcnNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHhsYXllcnMvY3NzLWNvZGVnZW4vIiwic291cmNlcyI6WyJsaWIvY3NzLXBhcnNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUUxRDtJQUlFLDBCQUNVLGtCQUFnQyxFQUNoQyxVQUE2QixFQUNwQixhQUE0QixFQUM1QixZQUEwQjtRQUhuQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWM7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDcEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDMUMsQ0FBQzs7Ozs7OztJQUVKLGtDQUFPOzs7Ozs7SUFBUCxVQUNFLE9BQXNCLEVBQ3RCLElBQWtCLEVBQ2xCLE9BQTBCO1FBSDVCLGlCQWFDO1FBUkMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLEtBQUs7Z0JBQzFCLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuQyxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7Ozs7SUFFTyx1Q0FBWTs7Ozs7SUFBcEIsVUFBcUIsT0FBc0I7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WSxHQUFHLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTztRQUNuRCxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLFlBQVksQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxNQUFNOztvQkFDdEIsV0FBVyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FDMUQsTUFBTSxDQUFDLEtBQUssQ0FDYjtnQkFFRCxPQUFPO29CQUNGLE1BQU0sQ0FBQyxPQUFPLE9BQUk7b0JBQ2xCLE1BQU0sQ0FBQyxPQUFPLE9BQUk7b0JBQ2xCLE1BQU0sQ0FBQyxVQUFVLE9BQUk7b0JBQ3JCLE1BQU0sQ0FBQyxNQUFNLE9BQUk7b0JBQ3BCLEtBQUcsV0FBYTtpQkFDakIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzs7Ozs7SUFFTywrQ0FBb0I7Ozs7O0lBQTVCLFVBQTZCLE9BQTBCOztZQUMvQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTthQUMvQixRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ1osU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbEIsT0FBTyxLQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsWUFBYyxDQUFDO0lBQy9DLENBQUM7O2dCQXZhRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVBzQixZQUFZO2dCQUcxQixpQkFBaUI7Z0JBSFcsYUFBYTtnQkFBekMsWUFBWTs7OzJCQURyQjtDQThhQyxBQXhhRCxJQXdhQztTQXJhWSxnQkFBZ0I7Ozs7OztJQUV6Qiw4Q0FBd0M7Ozs7O0lBQ3hDLHNDQUFxQzs7Ozs7SUFDckMseUNBQTZDOzs7OztJQUM3Qyx3Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExheWVyU2VydmljZSwgU3R5bGVTZXJ2aWNlLCBTeW1ib2xTZXJ2aWNlIH0gZnJvbSAnQHhsYXllcnMvc2tldGNoLWxpYic7XHJcblxyXG5pbXBvcnQgeyBDc3NDb2RlR2VuT3B0aW9ucyB9IGZyb20gJy4vY3NzLWNvZGVnZW4nO1xyXG5pbXBvcnQgeyBDc3NDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY3NzLWNvbnRleHQuc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDc3NQYXJzZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgc3R5bGVIZWxwZXJTZXJ2aWNlOiBTdHlsZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNzc0NvbnRleHQ6IENzc0NvbnRleHRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzeW1ib2xTZXJ2aWNlOiBTeW1ib2xTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBsYXllclNlcnZpY2U6IExheWVyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgY29tcHV0ZShcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zOiBDc3NDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgaWYgKGN1cnJlbnQuX2NsYXNzID09PSAncGFnZScpIHtcclxuICAgICAgY3VycmVudC5sYXllcnMuZm9yRWFjaChsYXllciA9PiB7XHJcbiAgICAgICAgdGhpcy5mbGF0dGVuTGF5ZXIobGF5ZXIpO1xyXG4gICAgICAgIHRoaXMudmlzaXQobGF5ZXIsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudmlzaXQoY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZsYXR0ZW5MYXllcihjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjdXJyZW50LmZyYW1lLnggPSAwO1xyXG4gICAgY3VycmVudC5mcmFtZS55ID0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgd2FsayhcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zOiBDc3NDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgaWYgKHRoaXMubGF5ZXJTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIGN1cnJlbnQubGF5ZXJzLmZvckVhY2gobGF5ZXIgPT4ge1xyXG4gICAgICAgIHRoaXMudmlzaXQobGF5ZXIsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zeW1ib2xTZXJ2aWNlLmlkZW50aWZ5KGN1cnJlbnQpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnZpc2l0U3ltYm9sKGN1cnJlbnQsIGRhdGEsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2aXNpdChcclxuICAgIGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsXHJcbiAgICBkYXRhOiBTa2V0Y2hNU0RhdGEsXHJcbiAgICBvcHRpb25zOiBDc3NDb2RlR2VuT3B0aW9uc1xyXG4gICkge1xyXG4gICAgaWYgKG9wdGlvbnMuZm9yY2UpIHtcclxuICAgICAgdGhpcy5jc3NDb250ZXh0LmNsZWFyKGN1cnJlbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3NzQ29udGV4dC5pZGVudGlmeShjdXJyZW50KSkge1xyXG4gICAgICBpZiAoIXRoaXMuY3NzQ29udGV4dC5vZihjdXJyZW50KSkge1xyXG4gICAgICAgIHRoaXMudmlzaXRDb250ZW50KGN1cnJlbnQsIG9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLndhbGsoY3VycmVudCwgZGF0YSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0U3ltYm9sKFxyXG4gICAgY3VycmVudDogU2tldGNoTVNMYXllcixcclxuICAgIGRhdGE6IFNrZXRjaE1TRGF0YSxcclxuICAgIG9wdGlvbnM6IENzc0NvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICBjb25zdCBzeW1ib2xNYXN0ZXIgPSB0aGlzLnN5bWJvbFNlcnZpY2UubG9va3VwKGN1cnJlbnQsIGRhdGEpO1xyXG4gICAgaWYgKHN5bWJvbE1hc3Rlcikge1xyXG4gICAgICB0aGlzLmNvbXB1dGUoc3ltYm9sTWFzdGVyLCBkYXRhLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRDb250ZW50KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG9wdGlvbnM6IENzc0NvZGVHZW5PcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucy5nZW5lcmF0ZUNsYXNzTmFtZSkge1xyXG4gICAgICB0aGlzLmNzc0NvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgICBjbGFzc05hbWU6IHRoaXMuZ2VuZXJhdGVDc3NDbGFzc05hbWUob3B0aW9ucylcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChjdXJyZW50Ll9jbGFzcyBhcyBzdHJpbmcpIHtcclxuICAgICAgY2FzZSAncmVjdGFuZ2xlJzpcclxuICAgICAgICB0aGlzLnZpc2l0UmVjdGFuZ2xlU3R5bGUoY3VycmVudCk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICd0ZXh0JzpcclxuICAgICAgICB0aGlzLnZpc2l0VGV4dFN0eWxlKGN1cnJlbnQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAnb3ZhbCc6XHJcbiAgICAgICAgdGhpcy52aXNpdE92YWxTdHlsZShjdXJyZW50KTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy52aXNpdExheWVyU3R5bGUoY3VycmVudCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZpc2l0TGF5ZXJTdHlsZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICB0aGlzLmNzc0NvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgcnVsZXM6IHtcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RGcmFtZShjdXJyZW50KSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RSb3RhdGlvbihjdXJyZW50KSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RCb3JkZXJSYWRpdXMoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0T3BhY2l0eShjdXJyZW50KVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRSZWN0YW5nbGVTdHlsZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICB0aGlzLmNzc0NvbnRleHQucHV0KGN1cnJlbnQsIHtcclxuICAgICAgcnVsZXM6IHtcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RGcmFtZShjdXJyZW50KSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RCb3JkZXJzKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEZpbGxzKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdFNoYWRvd3MoY3VycmVudClcclxuICAgICAgfSxcclxuICAgICAgcHNldWRvRWxlbWVudHM6IHsgYmVmb3JlOiB0aGlzLmV4dHJhY3RCbHVyUHNldWRvRWxlbWVudChjdXJyZW50KSB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRPdmFsU3R5bGUoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgdGhpcy5jc3NDb250ZXh0LnB1dChjdXJyZW50LCB7XHJcbiAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgLi4udGhpcy5hZGRPdmFsU2hhcGUoKSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RGcmFtZShjdXJyZW50KSxcclxuICAgICAgICAuLi50aGlzLmV4dHJhY3RCb3JkZXJzKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdEZpbGxzKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdFNoYWRvd3MoY3VycmVudClcclxuICAgICAgfSxcclxuICAgICAgcHNldWRvRWxlbWVudHM6IHsgYmVmb3JlOiB0aGlzLmV4dHJhY3RCbHVyUHNldWRvRWxlbWVudChjdXJyZW50KSB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdmlzaXRUZXh0U3R5bGUoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgdGhpcy5jc3NDb250ZXh0LnB1dChjdXJyZW50LCB7XHJcbiAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0RnJhbWUoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0VGV4dEZvbnQoY3VycmVudCksXHJcbiAgICAgICAgLi4udGhpcy5leHRyYWN0VGV4dENvbG9yKGN1cnJlbnQpLFxyXG4gICAgICAgIC4uLnRoaXMuZXh0cmFjdFBhcmFncmFwaFN0eWxlKGN1cnJlbnQpXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0RnJhbWUoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgaWYgKGN1cnJlbnQuZnJhbWUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgIGxlZnQ6IGAke2N1cnJlbnQuZnJhbWUueH1weGAsXHJcbiAgICAgICAgdG9wOiBgJHtjdXJyZW50LmZyYW1lLnl9cHhgLFxyXG4gICAgICAgIHdpZHRoOiBgJHtjdXJyZW50LmZyYW1lLndpZHRofXB4YCxcclxuICAgICAgICBoZWlnaHQ6IGAke2N1cnJlbnQuZnJhbWUuaGVpZ2h0fXB4YCxcclxuICAgICAgICB2aXNpYmlsaXR5OiBjdXJyZW50LmlzVmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RUZXh0Q29sb3IoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgY29uc3Qgb2JqID0gY3VycmVudC5zdHlsZS50ZXh0U3R5bGUuZW5jb2RlZEF0dHJpYnV0ZXM7XHJcblxyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eSgnTVNBdHRyaWJ1dGVkU3RyaW5nQ29sb3JBdHRyaWJ1dGUnKSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbG9yOiB0aGlzLnN0eWxlSGVscGVyU2VydmljZS5wYXJzZUNvbG9yQXNSZ2JhKFxyXG4gICAgICAgICAgb2JqLk1TQXR0cmlidXRlZFN0cmluZ0NvbG9yQXR0cmlidXRlXHJcbiAgICAgICAgKVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmIChvYmouaGFzT3duUHJvcGVydHkoJ05TQ29sb3InKSkge1xyXG4gICAgICAvLyBUT0RPOiBIYW5kbGUgbGVnYWN5XHJcbiAgICAgIC8vIGNvbnN0IGFyY2hpdmUgPVxyXG4gICAgICAvLyB0aGlzLmJpbmFyeVBsaXN0UGFyc2VyLnBhcnNlNjRDb250ZW50KG9iai5OU0NvbG9yLl9hcmNoaXZlKTtcclxuICAgICAgLy8gKHNjb3BlLnN0eWxlLnRleHRTdHlsZS5lbmNvZGVkQXR0cmlidXRlcy5OU0NvbG9yIGFzIGFueSkuX3RyYW5zZm9ybWVkID1cclxuICAgICAgLy8gYXJjaGl2ZTtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IGNvbG9yOiAnYmxhY2snIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RQYXJhZ3JhcGhTdHlsZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBvYmogPSBjdXJyZW50LnN0eWxlLnRleHRTdHlsZS5lbmNvZGVkQXR0cmlidXRlcztcclxuXHJcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KCdOU1BhcmFncmFwaFN0eWxlJykpIHtcclxuICAgICAgLy8gVE9ETzogSGFuZGxlIGxlZ2FjeVxyXG4gICAgICAvLyBjb25zdCBhcmNoaXZlID1cclxuICAgICAgLy8gdGhpcy5iaW5hcnlQbGlzdFBhcnNlci5wYXJzZTY0Q29udGVudChzY29wZS5zdHlsZS50ZXh0U3R5bGUuZW5jb2RlZEF0dHJpYnV0ZXMuTlNQYXJhZ3JhcGhTdHlsZS5fYXJjaGl2ZSk7XHJcbiAgICAgIC8vIChzY29wZS5zdHlsZS50ZXh0U3R5bGUuZW5jb2RlZEF0dHJpYnV0ZXMuTlNQYXJhZ3JhcGhTdHlsZSBhc1xyXG4gICAgICAvLyBhbnkpLl90cmFuc2Zvcm1lZCA9IGFyY2hpdmU7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RUZXh0Rm9udChjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBvYmogPVxyXG4gICAgICBjdXJyZW50LnN0eWxlLnRleHRTdHlsZS5lbmNvZGVkQXR0cmlidXRlcy5NU0F0dHJpYnV0ZWRTdHJpbmdGb250QXR0cmlidXRlO1xyXG5cclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoJ19jbGFzcycpICYmIG9iai5fY2xhc3MgPT09ICdmb250RGVzY3JpcHRvcicpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAnZm9udC1mYW1pbHknOiBgJyR7b2JqLmF0dHJpYnV0ZXMubmFtZX0nLCAnUm9ib3RvJywgJ3NhbnMtc2VyaWYnYCxcclxuICAgICAgICAnZm9udC1zaXplJzogYCR7b2JqLmF0dHJpYnV0ZXMuc2l6ZX1weGBcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAob2JqLmhhc093blByb3BlcnR5KCdfYXJjaGl2ZScpKSB7XHJcbiAgICAgIC8vIFRPRE86IEhhbmRsZSBsZWdhY3lcclxuICAgICAgLy8gY29uc3QgYXJjaGl2ZSA9IHRoaXMuYmluYXJ5UGxpc3RQYXJzZXIucGFyc2U2NENvbnRlbnQob2JqLl9hcmNoaXZlKTtcclxuICAgICAgLy8gKHNjb3BlLnN0eWxlLnRleHRTdHlsZS5lbmNvZGVkQXR0cmlidXRlcy5NU0F0dHJpYnV0ZWRTdHJpbmdGb250QXR0cmlidXRlXHJcbiAgICAgIC8vIGFzIGFueSkuX3RyYW5zZm9ybWVkID0gYXJjaGl2ZTtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkT3ZhbFNoYXBlKCkge1xyXG4gICAgcmV0dXJuIHsgJ2JvcmRlci1yYWRpdXMnOiAnNTAlJyB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBleHRyYWN0T3BhY2l0eShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gKGN1cnJlbnQgYXMgYW55KS5vcGFjaXR5XHJcbiAgICAgID8geyBvcGFjaXR5OiBgJHsoY3VycmVudCBhcyBhbnkpLm9wYWNpdHl9YCB9XHJcbiAgICAgIDoge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RCb3JkZXJSYWRpdXMoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgY29uc3Qgb2JqID0gKGN1cnJlbnQgYXMgYW55KS5maXhlZFJhZGl1cztcclxuICAgIHJldHVybiBvYmogPyB7ICdib3JkZXItcmFkaXVzJzogYCR7b2JqLmZpeGVkUmFkaXVzfXB4YCB9IDoge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RSb3RhdGlvbihjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBvYmogPSAoY3VycmVudCBhcyBhbnkpLnJvdGF0aW9uO1xyXG4gICAgcmV0dXJuIG9iaiA/IHsgdHJhbnNmb3JtOiBgcm90YXRlKCR7Y3VycmVudC5yb3RhdGlvbn1kZWcpYCB9IDoge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RCbHVyUHNldWRvRWxlbWVudChjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBvYmogPSAoY3VycmVudCBhcyBhbnkpLnN0eWxlLmJsdXI7XHJcbiAgICBpZiAob2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eSgncmFkaXVzJykgJiYgb2JqLnJhZGl1cyA+IDApIHtcclxuICAgICAgY29uc3Qgb2JqRmlsbCA9IChjdXJyZW50IGFzIGFueSkuc3R5bGUuZmlsbHM7XHJcblxyXG4gICAgICBpZiAob2JqRmlsbCAmJiBvYmpGaWxsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyB3ZSBvbmx5IHN1cHBvcnQgb25lIGZpbGw6IHRha2UgdGhlIGZpcnN0IG9uZSFcclxuICAgICAgICAvLyBpZ25vcmUgdGhlIG90aGVyIGZpbGxzXHJcbiAgICAgICAgY29uc3QgZmlyc3RGaWxsID0gb2JqRmlsbFswXTtcclxuXHJcbiAgICAgICAgaWYgKGZpcnN0RmlsbC5pc0VuYWJsZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGZpbGxDb2xvciA9IHRoaXMuc3R5bGVIZWxwZXJTZXJ2aWNlLnBhcnNlQ29sb3JBc1JnYmEoXHJcbiAgICAgICAgICAgIGZpcnN0RmlsbC5jb2xvclxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWlnaHQ6IGAke2N1cnJlbnQuZnJhbWUuaGVpZ2h0ICsgNTB9cHhgLFxyXG4gICAgICAgICAgICB3aWR0aDogYCR7Y3VycmVudC5mcmFtZS53aWR0aCArIDUwfXB4YCxcclxuICAgICAgICAgICAgY29udGVudDogJ1wiXCInLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgdG9wOiAnLTI1cHgnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnLTI1cHgnLFxyXG4gICAgICAgICAgICBib3R0b206ICcwJyxcclxuICAgICAgICAgICAgcmlnaHQ6ICcwJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2luaGVyaXQnLFxyXG4gICAgICAgICAgICAnYm94LXNoYWRvdyc6IGBpbnNldCAwIDAgMCAke2N1cnJlbnQuZnJhbWUud2lkdGggL1xyXG4gICAgICAgICAgICAgIDJ9cHggJHtmaWxsQ29sb3J9YCxcclxuICAgICAgICAgICAgZmlsdGVyOiBgYmx1cigke29iai5yYWRpdXMudG9GaXhlZCgyKX1weClgXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEJvcmRlcnMoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgZW51bSBCb3JkZXJUeXBlIHtcclxuICAgICAgSU5TSURFID0gMSxcclxuICAgICAgT1VUU0lERSA9IDIsXHJcbiAgICAgIENFTlRFUiA9IDBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYmogPSAoY3VycmVudCBhcyBhbnkpLnN0eWxlLmJvcmRlcnM7XHJcblxyXG4gICAgaWYgKG9iaiAmJiBvYmoubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBib3JkZXJzU3R5bGVzID0gb2JqLnJlZHVjZSgoYWNjLCBib3JkZXIpID0+IHtcclxuICAgICAgICBpZiAoYm9yZGVyLnRoaWNrbmVzcyA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IGJvcmRlckNvbG9yID0gdGhpcy5zdHlsZUhlbHBlclNlcnZpY2UucGFyc2VDb2xvckFzUmdiYShcclxuICAgICAgICAgICAgYm9yZGVyLmNvbG9yXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgY29uc3QgaW5zZXQgPSBib3JkZXIucG9zaXRpb24gPT09IEJvcmRlclR5cGUuSU5TSURFID8gJ2luc2V0JyA6ICcnO1xyXG4gICAgICAgICAgY29uc3Qgc2hhZG93ID0gW1xyXG4gICAgICAgICAgICBgMCAwIDAgJHtib3JkZXIudGhpY2tuZXNzfXB4ICR7Ym9yZGVyQ29sb3J9YCxcclxuICAgICAgICAgICAgaW5zZXRcclxuICAgICAgICAgIF0uam9pbignICcpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBbc2hhZG93LCAuLi5hY2NdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgfSwgW10pO1xyXG5cclxuICAgICAgaWYgKGJvcmRlcnNTdHlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybiB7ICdib3gtc2hhZG93JzogYm9yZGVyc1N0eWxlcy5qb2luKCcsJykgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEZpbGxzKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IG9iaiA9IChjdXJyZW50IGFzIGFueSkuc3R5bGUuZmlsbHM7XHJcblxyXG4gICAgaWYgKG9iaiAmJiBvYmoubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyB3ZSBvbmx5IHN1cHBvcnQgb25lIGZpbGw6IHRha2UgdGhlIGZpcnN0IG9uZSFcclxuICAgICAgLy8gaWdub3JlIHRoZSBvdGhlciBmaWxsc1xyXG4gICAgICBjb25zdCBmaXJzdEZpbGwgPSBvYmpbMF07XHJcblxyXG4gICAgICBpZiAoZmlyc3RGaWxsLmlzRW5hYmxlZCkge1xyXG4gICAgICAgIGNvbnN0IGZpbGxDb2xvciA9IHRoaXMuc3R5bGVIZWxwZXJTZXJ2aWNlLnBhcnNlQ29sb3JBc1JnYmEoXHJcbiAgICAgICAgICBmaXJzdEZpbGwuY29sb3JcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBibHVyT2JqID0gKGN1cnJlbnQgYXMgYW55KS5zdHlsZS5ibHVyO1xyXG4gICAgICAgIGlmIChibHVyT2JqICYmIGJsdXJPYmouaGFzT3duUHJvcGVydHkoJ3JhZGl1cycpICYmIGJsdXJPYmoucmFkaXVzID4gMCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4udGhpcy5leHRyYWN0RmlsbEdyYWRpZW50KGZpcnN0RmlsbCksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdpbmhlcml0JyxcclxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGZpbGxDb2xvclxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4udGhpcy5leHRyYWN0RmlsbEdyYWRpZW50KGZpcnN0RmlsbCksXHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogZmlsbENvbG9yXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdEZpbGxHcmFkaWVudChmaWxsKSB7XHJcbiAgICBpZiAoZmlsbC5ncmFkaWVudCkge1xyXG4gICAgICBjb25zdCBmaWxsc1N0eWxlcyA9IGZpbGwuZ3JhZGllbnQuc3RvcHMubWFwKHN0b3AgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID1cclxuICAgICAgICAgIHN0b3AucG9zaXRpb24gPj0gMCAmJiBzdG9wLnBvc2l0aW9uIDw9IDFcclxuICAgICAgICAgICAgPyBgICR7c3RvcC5wb3NpdGlvbiAqIDEwMH0lYFxyXG4gICAgICAgICAgICA6ICcnO1xyXG4gICAgICAgIGNvbnN0IGZpbGxDb2xvciA9IHRoaXMuc3R5bGVIZWxwZXJTZXJ2aWNlLnBhcnNlQ29sb3JBc1JnYmEoc3RvcC5jb2xvcik7XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtmaWxsQ29sb3J9JHtwb3NpdGlvbn1gO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChmaWxsc1N0eWxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gYXBwbHkgZ3JhZGllbnQsIGlmIG11bHRpcGxlIGZpbGxzXHJcbiAgICAgICAgLy8gZGVmYXVsdCBhbmdsZSBpcyA5MGRlZ1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBgbGluZWFyLWdyYWRpZW50KDkwZGVnLCAke2ZpbGxzU3R5bGVzLmpvaW4oJywnKX0pYFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RTaGFkb3dzKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IGlubmVyU2hhZG93ID0gdGhpcy5leHRyYWN0SW5uZXJTaGFkb3coY3VycmVudCk7XHJcbiAgICBjb25zdCBvdXR0ZXJTaGFkb3cgPSB0aGlzLmV4dHJhY3RPdXRlclNoYWRvdyhjdXJyZW50KTtcclxuXHJcbiAgICByZXR1cm4gaW5uZXJTaGFkb3cgKyBvdXR0ZXJTaGFkb3cgIT09ICcnXHJcbiAgICAgID8geyAnYm94LXNoYWRvdyc6IGlubmVyU2hhZG93ICsgb3V0dGVyU2hhZG93IH1cclxuICAgICAgOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXh0cmFjdElubmVyU2hhZG93KGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGNvbnN0IGlubmVyU2hhZG93cyA9IChjdXJyZW50IGFzIGFueSkuc3R5bGUuaW5uZXJTaGFkb3dzO1xyXG5cclxuICAgIGlmIChpbm5lclNoYWRvd3MpIHtcclxuICAgICAgcmV0dXJuIGlubmVyU2hhZG93cy5tYXAoaW5uZXJTaGFkb3cgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNoYWRvd0NvbG9yID0gdGhpcy5zdHlsZUhlbHBlclNlcnZpY2UucGFyc2VDb2xvckFzUmdiYShcclxuICAgICAgICAgIGlubmVyU2hhZG93LmNvbG9yXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGAke2lubmVyU2hhZG93Lm9mZnNldFh9cHhgLFxyXG4gICAgICAgICAgYCR7aW5uZXJTaGFkb3cub2Zmc2V0WX1weGAsXHJcbiAgICAgICAgICBgJHtpbm5lclNoYWRvdy5ibHVyUmFkaXVzfXB4YCxcclxuICAgICAgICAgIGAke2lubmVyU2hhZG93LnNwcmVhZH1weGAsXHJcbiAgICAgICAgICBgJHtzaGFkb3dDb2xvcn1gLFxyXG4gICAgICAgICAgYGluc2V0YFxyXG4gICAgICAgIF0uam9pbignICcpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGV4dHJhY3RPdXRlclNoYWRvdyhjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBvdXRlclNoYWRvd3MgPSAoY3VycmVudCBhcyBhbnkpLnN0eWxlLnNoYWRvd3M7XHJcbiAgICBpZiAob3V0ZXJTaGFkb3dzKSB7XHJcbiAgICAgIHJldHVybiBvdXRlclNoYWRvd3MubWFwKHNoYWRvdyA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2hhZG93Q29sb3IgPSB0aGlzLnN0eWxlSGVscGVyU2VydmljZS5wYXJzZUNvbG9yQXNSZ2JhKFxyXG4gICAgICAgICAgc2hhZG93LmNvbG9yXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgIGAke3NoYWRvdy5vZmZzZXRYfXB4YCxcclxuICAgICAgICAgIGAke3NoYWRvdy5vZmZzZXRZfXB4YCxcclxuICAgICAgICAgIGAke3NoYWRvdy5ibHVyUmFkaXVzfXB4YCxcclxuICAgICAgICAgIGAke3NoYWRvdy5zcHJlYWR9cHhgLFxyXG4gICAgICAgICAgYCR7c2hhZG93Q29sb3J9YFxyXG4gICAgICAgIF0uam9pbignICcpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdlbmVyYXRlQ3NzQ2xhc3NOYW1lKG9wdGlvbnM6IENzc0NvZGVHZW5PcHRpb25zKSB7XHJcbiAgICBjb25zdCByYW5kb21TdHJpbmcgPSBNYXRoLnJhbmRvbSgpXHJcbiAgICAgIC50b1N0cmluZygzNilcclxuICAgICAgLnN1YnN0cmluZygyLCA2KTtcclxuXHJcbiAgICByZXR1cm4gYCR7b3B0aW9ucy5jc3NQcmVmaXh9JHtyYW5kb21TdHJpbmd9YDtcclxuICB9XHJcbn1cclxuIl19