import { __assign, __spread, __read, __values } from 'tslib';
import { Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { StyleService, SymbolService, LayerService, FormatService, SketchLibModule } from '@xlayers/sketch-lib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CssContextService = /** @class */ (function () {
    function CssContextService() {
    }
    /**
     * @param {?} current
     * @return {?}
     */
    CssContextService.prototype.identify = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return [
            'rect',
            'page',
            'rectangle',
            'group',
            'oval',
            'slice',
            'MSImmutableHotspotLayer',
            'text',
            'triangle',
            'shapePath',
            'shapeGroup'
        ].includes((/** @type {?} */ (current._class)));
    };
    /**
     * @param {?} current
     * @return {?}
     */
    CssContextService.prototype.of = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return ((/** @type {?} */ (current))).css;
    };
    /**
     * @param {?} current
     * @param {?} nextContext
     * @return {?}
     */
    CssContextService.prototype.put = /**
     * @param {?} current
     * @param {?} nextContext
     * @return {?}
     */
    function (current, nextContext) {
        ((/** @type {?} */ (current))).css = __assign({}, this.of(current), nextContext);
    };
    /**
     * @param {?} current
     * @return {?}
     */
    CssContextService.prototype.clear = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        delete ((/** @type {?} */ (current))).web;
    };
    CssContextService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ CssContextService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssContextService_Factory() { return new CssContextService(); }, token: CssContextService, providedIn: "root" });
    return CssContextService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            rules: __assign({}, this.extractFrame(current), this.extractRotation(current), this.extractBorderRadius(current), this.extractOpacity(current))
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
            rules: __assign({}, this.extractFrame(current), this.extractBorders(current), this.extractFills(current), this.extractShadows(current)),
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
            rules: __assign({}, this.addOvalShape(), this.extractFrame(current), this.extractBorders(current), this.extractFills(current), this.extractShadows(current)),
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
            rules: __assign({}, this.extractFrame(current), this.extractTextFont(current), this.extractTextColor(current), this.extractParagraphStyle(current))
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
                    return __spread([shadow], acc);
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
                    return __assign({}, this.extractFillGradient(firstFill), { background: 'inherit', overflow: 'hidden', 'background-color': fillColor });
                }
                else {
                    return __assign({}, this.extractFillGradient(firstFill), { 'background-color': fillColor });
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
    /** @nocollapse */ CssParserService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssParserService_Factory() { return new CssParserService(ɵɵinject(StyleService), ɵɵinject(CssContextService), ɵɵinject(SymbolService), ɵɵinject(LayerService)); }, token: CssParserService, providedIn: "root" });
    return CssParserService;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function StyleList() { }
if (false) {
    /** @type {?} */
    StyleList.prototype.className;
    /** @type {?} */
    StyleList.prototype.declarations;
}
var CssAggregatorService = /** @class */ (function () {
    function CssAggregatorService(formatService, cssContext) {
        this.formatService = formatService;
        this.cssContext = cssContext;
        this.indentationSymbol = "  "; // 2 spaces ftw
        // 2 spaces ftw
        // default host style
        this.hostStyle = [
            ':host {',
            this.indentationSymbol + "display: block;",
            this.indentationSymbol + "position: relative;",
            '}',
            ''
        ].join('\n');
    }
    /**
     * This will parse the ast to return a optimized css stylesheet
     * @param current SketchMSLayer the ast based on sketch json
     */
    /**
     * This will parse the ast to return a optimized css stylesheet
     * @param {?} current SketchMSLayer the ast based on sketch json
     * @param {?=} options
     * @return {?}
     */
    CssAggregatorService.prototype.aggregate = /**
     * This will parse the ast to return a optimized css stylesheet
     * @param {?} current SketchMSLayer the ast based on sketch json
     * @param {?=} options
     * @return {?}
     */
    function (current, options) {
        /** @type {?} */
        var styles = [];
        this.buildAstStyleSheet(styles, current);
        this.postProcessCss(styles);
        this.buildPseudoElementStyle(styles, current);
        /** @type {?} */
        var reGenerateStyleSheet = this.reGenerateStyleSheet(styles);
        /** @type {?} */
        var fileName = this.formatService.normalizeName(current.name);
        return [
            {
                kind: 'css',
                value: this.combineStyles(reGenerateStyleSheet),
                language: 'css',
                uri: options.componentDir + "/" + fileName + ".css"
            }
        ];
    };
    /**
     * The complete string of css style
     * @param styles string of stylesheet
     */
    /**
     * The complete string of css style
     * @private
     * @param {?} styles string of stylesheet
     * @return {?}
     */
    CssAggregatorService.prototype.combineStyles = /**
     * The complete string of css style
     * @private
     * @param {?} styles string of stylesheet
     * @return {?}
     */
    function (styles) {
        return this.hostStyle + " \n" + styles;
    };
    /**
     * Map over styles with normal css output
     * @param styles optimized list of styles
     */
    /**
     * Map over styles with normal css output
     * @private
     * @param {?} styles optimized list of styles
     * @return {?}
     */
    CssAggregatorService.prototype.reGenerateStyleSheet = /**
     * Map over styles with normal css output
     * @private
     * @param {?} styles optimized list of styles
     * @return {?}
     */
    function (styles) {
        var _this = this;
        return styles
            .filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.declarations.length > 0; }))
            .map((/**
         * @param {?} cssStyle
         * @return {?}
         */
        function (cssStyle) { return _this.generateCssStyle(cssStyle).join('\n'); }))
            .join('\n');
    };
    /**
     * Parse stylelist to understandable css class definition
     * @param style the declaration of style
     */
    /**
     * Parse stylelist to understandable css class definition
     * @private
     * @param {?} style the declaration of style
     * @return {?}
     */
    CssAggregatorService.prototype.generateCssStyle = /**
     * Parse stylelist to understandable css class definition
     * @private
     * @param {?} style the declaration of style
     * @return {?}
     */
    function (style) {
        var _this = this;
        return [
            "." + style.className + " {",
            style.declarations.map((/**
             * @param {?} rule
             * @return {?}
             */
            function (rule) { return _this.indentationSymbol + rule; })).join('\n'),
            '}',
            ''
        ];
    };
    /**
     * Parse style pseudo element without any pre processing
     * @param styles curent created list
     * @param current  sketch ast
     */
    /**
     * Parse style pseudo element without any pre processing
     * @private
     * @param {?} styles curent created list
     * @param {?} current  sketch ast
     * @return {?}
     */
    CssAggregatorService.prototype.buildPseudoElementStyle = /**
     * Parse style pseudo element without any pre processing
     * @private
     * @param {?} styles curent created list
     * @param {?} current  sketch ast
     * @return {?}
     */
    function (styles, current) {
        var _this = this;
        /** @type {?} */
        var computeStyle = (/**
         * @param {?} _current
         * @return {?}
         */
        function (_current) {
            /** @type {?} */
            var content = (/**
             * @param {?} name
             * @param {?} data
             * @return {?}
             */
            function (name, data) {
                if (data) {
                    styles.push({ className: name, declarations: data });
                }
            });
            if (_current.layers && Array.isArray(_current.layers)) {
                _current.layers.forEach((/**
                 * @param {?} layer
                 * @return {?}
                 */
                function (layer) {
                    if (_this.cssContext.identify(layer)) {
                        /** @type {?} */
                        var name_1 = "" + ((/** @type {?} */ (layer))).css.className;
                        if (((/** @type {?} */ (layer.css))).pseudoElements) {
                            Object.entries(((/** @type {?} */ (layer.css))).pseudoElements).forEach((/**
                             * @param {?} __0
                             * @return {?}
                             */
                            function (_a) {
                                var _b = __read(_a, 2), prop = _b[0], value = _b[1];
                                content(name_1 + ":" + prop, Object.entries(value).map((/**
                                 * @param {?} __0
                                 * @return {?}
                                 */
                                function (_a) {
                                    var _b = __read(_a, 2), ruleKey = _b[0], ruleValue = _b[1];
                                    return ruleKey + ": " + ruleValue + ";";
                                })));
                            }));
                            computeStyle(layer);
                        }
                    }
                }));
            }
        });
        computeStyle(current);
    };
    /**
     * This is the main ast parser to go from sketch to css
     * @param styles newly created list
     * @param current  sketch ast
     */
    /**
     * This is the main ast parser to go from sketch to css
     * @private
     * @param {?} styles newly created list
     * @param {?} current  sketch ast
     * @return {?}
     */
    CssAggregatorService.prototype.buildAstStyleSheet = /**
     * This is the main ast parser to go from sketch to css
     * @private
     * @param {?} styles newly created list
     * @param {?} current  sketch ast
     * @return {?}
     */
    function (styles, current) {
        var _this = this;
        /** @type {?} */
        var computeStyle = (/**
         * @param {?} _current
         * @param {?} _styles
         * @return {?}
         */
        function (_current, _styles) {
            /** @type {?} */
            var content = (/**
             * @param {?} name
             * @param {?} data
             * @return {?}
             */
            function (name, data) {
                if (data) {
                    styles.push({ className: name, declarations: data });
                }
            });
            if (_current.layers && Array.isArray(_current.layers)) {
                _current.layers.forEach((/**
                 * @param {?} layer
                 * @return {?}
                 */
                function (layer) {
                    if (_this.cssContext.identify(layer)) {
                        /** @type {?} */
                        var name_2 = "" + ((/** @type {?} */ (layer))).css.className;
                        /** @type {?} */
                        var rules_1 = [];
                        Object.entries(((/** @type {?} */ (layer.css))).rules).forEach((/**
                         * @param {?} __0
                         * @return {?}
                         */
                        function (_a) {
                            var _b = __read(_a, 2), prop = _b[0], value = _b[1];
                            rules_1.push(prop + ": " + value + ";");
                        }));
                        content(name_2, rules_1);
                        computeStyle(layer, [
                            {
                                className: "" + ((/** @type {?} */ (layer))).css.className,
                                declarations: rules_1
                            }
                        ]);
                    }
                }));
            }
        });
        computeStyle(current, styles);
    };
    /**
     * This will optimize the AST to 'better' css
     * Basic concepts is to loop through ast and verify current & next
     * declaration.
     *
     * When equals css declarations found this will be placed
     * in a seperate css class
     * @param stylesAst sketch ast
     */
    /**
     * This will optimize the AST to 'better' css
     * Basic concepts is to loop through ast and verify current & next
     * declaration.
     *
     * When equals css declarations found this will be placed
     * in a seperate css class
     * @param {?} stylesAst sketch ast
     * @return {?}
     */
    CssAggregatorService.prototype.postProcessCss = /**
     * This will optimize the AST to 'better' css
     * Basic concepts is to loop through ast and verify current & next
     * declaration.
     *
     * When equals css declarations found this will be placed
     * in a seperate css class
     * @param {?} stylesAst sketch ast
     * @return {?}
     */
    function (stylesAst) {
        var e_1, _a;
        /** @type {?} */
        var duplicates = [];
        for (var currentIndex = 0; currentIndex < stylesAst.length; currentIndex++) {
            /** @type {?} */
            var checkingDecIndex = currentIndex;
            /** @type {?} */
            var currentDeclaration = stylesAst[currentIndex];
            /** @type {?} */
            var currentDeclarationSet = new Set(currentDeclaration.declarations.sort());
            while (++checkingDecIndex < stylesAst.length) {
                /** @type {?} */
                var nextDeclaration = stylesAst[checkingDecIndex];
                /** @type {?} */
                var checkDeclarationpropertieset = new Set(nextDeclaration.declarations.sort());
                try {
                    for (var _b = __values(Array.from(currentDeclarationSet.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        if (checkDeclarationpropertieset.has(key)) {
                            duplicates.push({
                                className: currentDeclaration.className + ", ." + nextDeclaration.className,
                                key: key
                            });
                            checkDeclarationpropertieset.delete(key);
                            currentDeclarationSet.delete(key);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.setValuesInAst(stylesAst, currentIndex, currentDeclarationSet, checkingDecIndex, checkDeclarationpropertieset);
            }
        }
        this.reduceDuplicates(duplicates, stylesAst);
    };
    /**
     * Will remove the duplicates from ast
     * @param duplicates duplicaye css styles
     * @param stylesAst sketch ast
     */
    /**
     * Will remove the duplicates from ast
     * @private
     * @param {?} duplicates duplicaye css styles
     * @param {?} stylesAst sketch ast
     * @return {?}
     */
    CssAggregatorService.prototype.reduceDuplicates = /**
     * Will remove the duplicates from ast
     * @private
     * @param {?} duplicates duplicaye css styles
     * @param {?} stylesAst sketch ast
     * @return {?}
     */
    function (duplicates, stylesAst) {
        /** @type {?} */
        var deDuplicateCssValues = duplicates.reduce((/**
         * @param {?} current
         * @param {?} next
         * @param {?} index
         * @param {?} _array
         * @return {?}
         */
        function (current, next, index, _array) {
            if (index === 0 || !current.hasOwnProperty(next.className)) {
                current[next.className] = {
                    className: next.className,
                    declarations: [next.key]
                };
            }
            else {
                current[next.className].declarations = __spread(current[next.className].declarations, [next.key]);
            }
            return current;
        }), {});
        Object.values(deDuplicateCssValues)
            .filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.declarations.length > 0; }))
            .map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            return stylesAst.push({ className: e.className, declarations: e.declarations });
        }));
    };
    /**
     * Helper function to set declaration for each css declaration
     * @param stylesAst
     * @param currentIndex
     * @param currentDeclarationSet
     * @param checkingDecIndex
     * @param checkDeclarationpropertieset
     */
    /**
     * Helper function to set declaration for each css declaration
     * @private
     * @param {?} stylesAst
     * @param {?} currentIndex
     * @param {?} currentDeclarationSet
     * @param {?} checkingDecIndex
     * @param {?} checkDeclarationpropertieset
     * @return {?}
     */
    CssAggregatorService.prototype.setValuesInAst = /**
     * Helper function to set declaration for each css declaration
     * @private
     * @param {?} stylesAst
     * @param {?} currentIndex
     * @param {?} currentDeclarationSet
     * @param {?} checkingDecIndex
     * @param {?} checkDeclarationpropertieset
     * @return {?}
     */
    function (stylesAst, currentIndex, currentDeclarationSet, checkingDecIndex, checkDeclarationpropertieset) {
        stylesAst[currentIndex].declarations = Object.assign(Array.from(currentDeclarationSet.values()));
        stylesAst[checkingDecIndex].declarations = Object.assign(Array.from(checkDeclarationpropertieset.values()));
    };
    CssAggregatorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CssAggregatorService.ctorParameters = function () { return [
        { type: FormatService },
        { type: CssContextService }
    ]; };
    /** @nocollapse */ CssAggregatorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssAggregatorService_Factory() { return new CssAggregatorService(ɵɵinject(FormatService), ɵɵinject(CssContextService)); }, token: CssAggregatorService, providedIn: "root" });
    return CssAggregatorService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    CssAggregatorService.prototype.indentationSymbol;
    /**
     * @type {?}
     * @private
     */
    CssAggregatorService.prototype.hostStyle;
    /**
     * @type {?}
     * @private
     */
    CssAggregatorService.prototype.formatService;
    /**
     * @type {?}
     * @private
     */
    CssAggregatorService.prototype.cssContext;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CssCodeGenService = /** @class */ (function () {
    function CssCodeGenService(cssContext, cssParser, cssAggretatorService) {
        this.cssContext = cssContext;
        this.cssParser = cssParser;
        this.cssAggretatorService = cssAggretatorService;
    }
    /**
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    CssCodeGenService.prototype.compute = /**
     * @param {?} current
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    function (current, data, options) {
        this.cssParser.compute(current, data, this.compileOptions(options));
    };
    /**
     * @param {?} current
     * @param {?=} options
     * @return {?}
     */
    CssCodeGenService.prototype.aggregate = /**
     * @param {?} current
     * @param {?=} options
     * @return {?}
     */
    function (current, options) {
        return this.cssAggretatorService.aggregate(current, this.compileOptions(options));
    };
    /**
     * @param {?} current
     * @return {?}
     */
    CssCodeGenService.prototype.identify = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return this.cssContext.identify(current);
    };
    /**
     * @param {?} current
     * @return {?}
     */
    CssCodeGenService.prototype.context = /**
     * @param {?} current
     * @return {?}
     */
    function (current) {
        return this.cssContext.of(current);
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    CssCodeGenService.prototype.compileOptions = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return __assign({ generateClassName: true, cssPrefix: 'xly_', componentDir: 'components' }, options);
    };
    CssCodeGenService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    CssCodeGenService.ctorParameters = function () { return [
        { type: CssContextService },
        { type: CssParserService },
        { type: CssAggregatorService }
    ]; };
    /** @nocollapse */ CssCodeGenService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssCodeGenService_Factory() { return new CssCodeGenService(ɵɵinject(CssContextService), ɵɵinject(CssParserService), ɵɵinject(CssAggregatorService)); }, token: CssCodeGenService, providedIn: "root" });
    return CssCodeGenService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    CssCodeGenService.prototype.cssContext;
    /**
     * @type {?}
     * @private
     */
    CssCodeGenService.prototype.cssParser;
    /**
     * @type {?}
     * @private
     */
    CssCodeGenService.prototype.cssAggretatorService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CssCodeGenModule = /** @class */ (function () {
    function CssCodeGenModule() {
    }
    CssCodeGenModule.decorators = [
        { type: NgModule, args: [{
                    imports: [SketchLibModule]
                },] }
    ];
    return CssCodeGenModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CssCodeGenModule, CssCodeGenService, CssContextService as ɵa, CssParserService as ɵb, CssAggregatorService as ɵc };
//# sourceMappingURL=xlayers-css-codegen.js.map
