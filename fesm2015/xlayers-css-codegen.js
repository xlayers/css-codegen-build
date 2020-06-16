import { Injectable, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { StyleService, SymbolService, LayerService, FormatService, SketchLibModule } from '@xlayers/sketch-lib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CssContextService {
    /**
     * @param {?} current
     * @return {?}
     */
    identify(current) {
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
    }
    /**
     * @param {?} current
     * @return {?}
     */
    of(current) {
        return ((/** @type {?} */ (current))).css;
    }
    /**
     * @param {?} current
     * @param {?} nextContext
     * @return {?}
     */
    put(current, nextContext) {
        ((/** @type {?} */ (current))).css = Object.assign({}, this.of(current), nextContext);
    }
    /**
     * @param {?} current
     * @return {?}
     */
    clear(current) {
        delete ((/** @type {?} */ (current))).web;
    }
}
CssContextService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ CssContextService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssContextService_Factory() { return new CssContextService(); }, token: CssContextService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CssParserService {
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
/** @nocollapse */ CssParserService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssParserService_Factory() { return new CssParserService(ɵɵinject(StyleService), ɵɵinject(CssContextService), ɵɵinject(SymbolService), ɵɵinject(LayerService)); }, token: CssParserService, providedIn: "root" });
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
class CssAggregatorService {
    /**
     * @param {?} formatService
     * @param {?} cssContext
     */
    constructor(formatService, cssContext) {
        this.formatService = formatService;
        this.cssContext = cssContext;
        this.indentationSymbol = `  `; // 2 spaces ftw
        // 2 spaces ftw
        // default host style
        this.hostStyle = [
            ':host {',
            `${this.indentationSymbol}display: block;`,
            `${this.indentationSymbol}position: relative;`,
            '}',
            ''
        ].join('\n');
    }
    /**
     * This will parse the ast to return a optimized css stylesheet
     * @param {?} current SketchMSLayer the ast based on sketch json
     * @param {?=} options
     * @return {?}
     */
    aggregate(current, options) {
        /** @type {?} */
        const styles = [];
        this.buildAstStyleSheet(styles, current);
        this.postProcessCss(styles);
        this.buildPseudoElementStyle(styles, current);
        /** @type {?} */
        const reGenerateStyleSheet = this.reGenerateStyleSheet(styles);
        /** @type {?} */
        const fileName = this.formatService.normalizeName(current.name);
        return [
            {
                kind: 'css',
                value: this.combineStyles(reGenerateStyleSheet),
                language: 'css',
                uri: `${options.componentDir}/${fileName}.css`
            }
        ];
    }
    /**
     * The complete string of css style
     * @private
     * @param {?} styles string of stylesheet
     * @return {?}
     */
    combineStyles(styles) {
        return `${this.hostStyle} \n${styles}`;
    }
    /**
     * Map over styles with normal css output
     * @private
     * @param {?} styles optimized list of styles
     * @return {?}
     */
    reGenerateStyleSheet(styles) {
        return styles
            .filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.declarations.length > 0))
            .map((/**
         * @param {?} cssStyle
         * @return {?}
         */
        cssStyle => this.generateCssStyle(cssStyle).join('\n')))
            .join('\n');
    }
    /**
     * Parse stylelist to understandable css class definition
     * @private
     * @param {?} style the declaration of style
     * @return {?}
     */
    generateCssStyle(style) {
        return [
            `.${style.className} {`,
            style.declarations.map((/**
             * @param {?} rule
             * @return {?}
             */
            rule => this.indentationSymbol + rule)).join('\n'),
            '}',
            ''
        ];
    }
    /**
     * Parse style pseudo element without any pre processing
     * @private
     * @param {?} styles curent created list
     * @param {?} current  sketch ast
     * @return {?}
     */
    buildPseudoElementStyle(styles, current) {
        /** @type {?} */
        const computeStyle = (/**
         * @param {?} _current
         * @return {?}
         */
        (_current) => {
            /** @type {?} */
            const content = (/**
             * @param {?} name
             * @param {?} data
             * @return {?}
             */
            (name, data) => {
                if (data) {
                    styles.push({ className: name, declarations: data });
                }
            });
            if (_current.layers && Array.isArray(_current.layers)) {
                _current.layers.forEach((/**
                 * @param {?} layer
                 * @return {?}
                 */
                layer => {
                    if (this.cssContext.identify(layer)) {
                        /** @type {?} */
                        const name = `${((/** @type {?} */ (layer))).css.className}`;
                        if (((/** @type {?} */ (layer.css))).pseudoElements) {
                            Object.entries(((/** @type {?} */ (layer.css))).pseudoElements).forEach((/**
                             * @param {?} __0
                             * @return {?}
                             */
                            ([prop, value]) => {
                                content(`${name}:${prop}`, Object.entries(value).map((/**
                                 * @param {?} __0
                                 * @return {?}
                                 */
                                ([ruleKey, ruleValue]) => `${ruleKey}: ${ruleValue};`)));
                            }));
                            computeStyle(layer);
                        }
                    }
                }));
            }
        });
        computeStyle(current);
    }
    /**
     * This is the main ast parser to go from sketch to css
     * @private
     * @param {?} styles newly created list
     * @param {?} current  sketch ast
     * @return {?}
     */
    buildAstStyleSheet(styles, current) {
        /** @type {?} */
        const computeStyle = (/**
         * @param {?} _current
         * @param {?} _styles
         * @return {?}
         */
        (_current, _styles) => {
            /** @type {?} */
            const content = (/**
             * @param {?} name
             * @param {?} data
             * @return {?}
             */
            (name, data) => {
                if (data) {
                    styles.push({ className: name, declarations: data });
                }
            });
            if (_current.layers && Array.isArray(_current.layers)) {
                _current.layers.forEach((/**
                 * @param {?} layer
                 * @return {?}
                 */
                layer => {
                    if (this.cssContext.identify(layer)) {
                        /** @type {?} */
                        const name = `${((/** @type {?} */ (layer))).css.className}`;
                        /** @type {?} */
                        const rules = [];
                        Object.entries(((/** @type {?} */ (layer.css))).rules).forEach((/**
                         * @param {?} __0
                         * @return {?}
                         */
                        ([prop, value]) => {
                            rules.push(`${prop}: ${value};`);
                        }));
                        content(name, rules);
                        computeStyle(layer, [
                            {
                                className: `${((/** @type {?} */ (layer))).css.className}`,
                                declarations: rules
                            }
                        ]);
                    }
                }));
            }
        });
        computeStyle(current, styles);
    }
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
    postProcessCss(stylesAst) {
        /** @type {?} */
        const duplicates = [];
        for (let currentIndex = 0; currentIndex < stylesAst.length; currentIndex++) {
            /** @type {?} */
            let checkingDecIndex = currentIndex;
            /** @type {?} */
            const currentDeclaration = stylesAst[currentIndex];
            /** @type {?} */
            const currentDeclarationSet = new Set(currentDeclaration.declarations.sort());
            while (++checkingDecIndex < stylesAst.length) {
                /** @type {?} */
                const nextDeclaration = stylesAst[checkingDecIndex];
                /** @type {?} */
                const checkDeclarationpropertieset = new Set(nextDeclaration.declarations.sort());
                for (const key of Array.from(currentDeclarationSet.values())) {
                    if (checkDeclarationpropertieset.has(key)) {
                        duplicates.push({
                            className: `${currentDeclaration.className}, .${nextDeclaration.className}`,
                            key
                        });
                        checkDeclarationpropertieset.delete(key);
                        currentDeclarationSet.delete(key);
                    }
                }
                this.setValuesInAst(stylesAst, currentIndex, currentDeclarationSet, checkingDecIndex, checkDeclarationpropertieset);
            }
        }
        this.reduceDuplicates(duplicates, stylesAst);
    }
    /**
     * Will remove the duplicates from ast
     * @private
     * @param {?} duplicates duplicaye css styles
     * @param {?} stylesAst sketch ast
     * @return {?}
     */
    reduceDuplicates(duplicates, stylesAst) {
        /** @type {?} */
        const deDuplicateCssValues = duplicates.reduce((/**
         * @param {?} current
         * @param {?} next
         * @param {?} index
         * @param {?} _array
         * @return {?}
         */
        (current, next, index, _array) => {
            if (index === 0 || !current.hasOwnProperty(next.className)) {
                current[next.className] = {
                    className: next.className,
                    declarations: [next.key]
                };
            }
            else {
                current[next.className].declarations = [
                    ...current[next.className].declarations,
                    ...[next.key]
                ];
            }
            return current;
        }), {});
        Object.values(deDuplicateCssValues)
            .filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.declarations.length > 0))
            .map((/**
         * @param {?} e
         * @return {?}
         */
        e => stylesAst.push({ className: e.className, declarations: e.declarations })));
    }
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
    setValuesInAst(stylesAst, currentIndex, currentDeclarationSet, checkingDecIndex, checkDeclarationpropertieset) {
        stylesAst[currentIndex].declarations = Object.assign(Array.from(currentDeclarationSet.values()));
        stylesAst[checkingDecIndex].declarations = Object.assign(Array.from(checkDeclarationpropertieset.values()));
    }
}
CssAggregatorService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CssAggregatorService.ctorParameters = () => [
    { type: FormatService },
    { type: CssContextService }
];
/** @nocollapse */ CssAggregatorService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssAggregatorService_Factory() { return new CssAggregatorService(ɵɵinject(FormatService), ɵɵinject(CssContextService)); }, token: CssAggregatorService, providedIn: "root" });
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
class CssCodeGenService {
    /**
     * @param {?} cssContext
     * @param {?} cssParser
     * @param {?} cssAggretatorService
     */
    constructor(cssContext, cssParser, cssAggretatorService) {
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
    compute(current, data, options) {
        this.cssParser.compute(current, data, this.compileOptions(options));
    }
    /**
     * @param {?} current
     * @param {?=} options
     * @return {?}
     */
    aggregate(current, options) {
        return this.cssAggretatorService.aggregate(current, this.compileOptions(options));
    }
    /**
     * @param {?} current
     * @return {?}
     */
    identify(current) {
        return this.cssContext.identify(current);
    }
    /**
     * @param {?} current
     * @return {?}
     */
    context(current) {
        return this.cssContext.of(current);
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    compileOptions(options) {
        return Object.assign({ generateClassName: true, cssPrefix: 'xly_', componentDir: 'components' }, options);
    }
}
CssCodeGenService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
CssCodeGenService.ctorParameters = () => [
    { type: CssContextService },
    { type: CssParserService },
    { type: CssAggregatorService }
];
/** @nocollapse */ CssCodeGenService.ngInjectableDef = ɵɵdefineInjectable({ factory: function CssCodeGenService_Factory() { return new CssCodeGenService(ɵɵinject(CssContextService), ɵɵinject(CssParserService), ɵɵinject(CssAggregatorService)); }, token: CssCodeGenService, providedIn: "root" });
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
class CssCodeGenModule {
}
CssCodeGenModule.decorators = [
    { type: NgModule, args: [{
                imports: [SketchLibModule]
            },] }
];

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
