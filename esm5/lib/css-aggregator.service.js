/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CssContextService } from './css-context.service';
import { FormatService } from '@xlayers/sketch-lib';
import * as i0 from "@angular/core";
import * as i1 from "@xlayers/sketch-lib";
import * as i2 from "./css-context.service";
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
                                var _b = tslib_1.__read(_a, 2), prop = _b[0], value = _b[1];
                                content(name_1 + ":" + prop, Object.entries(value).map((/**
                                 * @param {?} __0
                                 * @return {?}
                                 */
                                function (_a) {
                                    var _b = tslib_1.__read(_a, 2), ruleKey = _b[0], ruleValue = _b[1];
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
                            var _b = tslib_1.__read(_a, 2), prop = _b[0], value = _b[1];
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
                    for (var _b = tslib_1.__values(Array.from(currentDeclarationSet.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                current[next.className].declarations = tslib_1.__spread(current[next.className].declarations, [next.key]);
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
    /** @nocollapse */ CssAggregatorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssAggregatorService_Factory() { return new CssAggregatorService(i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i2.CssContextService)); }, token: CssAggregatorService, providedIn: "root" });
    return CssAggregatorService;
}());
export { CssAggregatorService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWFnZ3JlZ2F0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL2Nzcy1hZ2dyZWdhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7OztBQUVwRCx3QkFHQzs7O0lBRkMsOEJBQWtCOztJQUNsQixpQ0FBdUI7O0FBR3pCO0lBSUUsOEJBQ21CLGFBQTRCLEVBQ3JDLFVBQTZCO1FBRHBCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQ3JDLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBRy9CLHNCQUFpQixHQUFHLElBQUksQ0FBQyxDQUFDLGVBQWU7OztRQUV6QyxjQUFTLEdBQUc7WUFDbEIsU0FBUztZQUNOLElBQUksQ0FBQyxpQkFBaUIsb0JBQWlCO1lBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsd0JBQXFCO1lBQzlDLEdBQUc7WUFDSCxFQUFFO1NBQ0gsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFWVixDQUFDO0lBWUo7OztPQUdHOzs7Ozs7O0lBQ0gsd0NBQVM7Ozs7OztJQUFULFVBQVUsT0FBc0IsRUFBRSxPQUEyQjs7WUFDckQsTUFBTSxHQUFxQixFQUFFO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDOztZQUN4QyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFD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QTRRQyxBQWxRRCxJQWtRQztTQS9QWSxvQkFBb0I7Ozs7OztJQU0vQixpREFBaUM7Ozs7O0lBRWpDLHlDQU1hOzs7OztJQVpYLDZDQUE2Qzs7Ozs7SUFDN0MsMENBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDc3NDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY3NzLWNvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IENzc0NvZGVHZW5PcHRpb25zIH0gZnJvbSAnLi9jc3MtY29kZWdlbic7XHJcbmltcG9ydCB7IEZvcm1hdFNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9za2V0Y2gtbGliJztcclxuXHJcbmludGVyZmFjZSBTdHlsZUxpc3Qge1xyXG4gIGNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIGRlY2xhcmF0aW9uczogc3RyaW5nW107XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENzc0FnZ3JlZ2F0b3JTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcclxuICAgIHByaXZhdGUgY3NzQ29udGV4dDogQ3NzQ29udGV4dFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIHByaXZhdGUgaW5kZW50YXRpb25TeW1ib2wgPSBgICBgOyAvLyAyIHNwYWNlcyBmdHdcclxuICAvLyBkZWZhdWx0IGhvc3Qgc3R5bGVcclxuICBwcml2YXRlIGhvc3RTdHlsZSA9IFtcclxuICAgICc6aG9zdCB7JyxcclxuICAgIGAke3RoaXMuaW5kZW50YXRpb25TeW1ib2x9ZGlzcGxheTogYmxvY2s7YCxcclxuICAgIGAke3RoaXMuaW5kZW50YXRpb25TeW1ib2x9cG9zaXRpb246IHJlbGF0aXZlO2AsXHJcbiAgICAnfScsXHJcbiAgICAnJ1xyXG4gIF0uam9pbignXFxuJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgd2lsbCBwYXJzZSB0aGUgYXN0IHRvIHJldHVybiBhIG9wdGltaXplZCBjc3Mgc3R5bGVzaGVldFxyXG4gICAqIEBwYXJhbSBjdXJyZW50IFNrZXRjaE1TTGF5ZXIgdGhlIGFzdCBiYXNlZCBvbiBza2V0Y2gganNvblxyXG4gICAqL1xyXG4gIGFnZ3JlZ2F0ZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyLCBvcHRpb25zPzogQ3NzQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHN0eWxlczogQXJyYXk8U3R5bGVMaXN0PiA9IFtdO1xyXG4gICAgdGhpcy5idWlsZEFzdFN0eWxlU2hlZXQoc3R5bGVzLCBjdXJyZW50KTtcclxuICAgIHRoaXMucG9zdFByb2Nlc3NDc3Moc3R5bGVzKTtcclxuICAgIHRoaXMuYnVpbGRQc2V1ZG9FbGVtZW50U3R5bGUoc3R5bGVzLCBjdXJyZW50KTtcclxuICAgIGNvbnN0IHJlR2VuZXJhdGVTdHlsZVNoZWV0ID0gdGhpcy5yZUdlbmVyYXRlU3R5bGVTaGVldChzdHlsZXMpO1xyXG5cclxuICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5mb3JtYXRTZXJ2aWNlLm5vcm1hbGl6ZU5hbWUoY3VycmVudC5uYW1lKTtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICBraW5kOiAnY3NzJyxcclxuICAgICAgICB2YWx1ZTogdGhpcy5jb21iaW5lU3R5bGVzKHJlR2VuZXJhdGVTdHlsZVNoZWV0KSxcclxuICAgICAgICBsYW5ndWFnZTogJ2NzcycsXHJcbiAgICAgICAgdXJpOiBgJHtvcHRpb25zLmNvbXBvbmVudERpcn0vJHtmaWxlTmFtZX0uY3NzYFxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBsZXRlIHN0cmluZyBvZiBjc3Mgc3R5bGVcclxuICAgKiBAcGFyYW0gc3R5bGVzIHN0cmluZyBvZiBzdHlsZXNoZWV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21iaW5lU3R5bGVzKHN0eWxlczogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgJHt0aGlzLmhvc3RTdHlsZX0gXFxuJHtzdHlsZXN9YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCBvdmVyIHN0eWxlcyB3aXRoIG5vcm1hbCBjc3Mgb3V0cHV0XHJcbiAgICogQHBhcmFtIHN0eWxlcyBvcHRpbWl6ZWQgbGlzdCBvZiBzdHlsZXNcclxuICAgKi9cclxuICBwcml2YXRlIHJlR2VuZXJhdGVTdHlsZVNoZWV0KHN0eWxlczogU3R5bGVMaXN0W10pIHtcclxuICAgIHJldHVybiBzdHlsZXNcclxuICAgICAgLmZpbHRlcihlID0+IGUuZGVjbGFyYXRpb25zLmxlbmd0aCA+IDApXHJcbiAgICAgIC5tYXAoY3NzU3R5bGUgPT4gdGhpcy5nZW5lcmF0ZUNzc1N0eWxlKGNzc1N0eWxlKS5qb2luKCdcXG4nKSlcclxuICAgICAgLmpvaW4oJ1xcbicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFyc2Ugc3R5bGVsaXN0IHRvIHVuZGVyc3RhbmRhYmxlIGNzcyBjbGFzcyBkZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIHN0eWxlIHRoZSBkZWNsYXJhdGlvbiBvZiBzdHlsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2VuZXJhdGVDc3NTdHlsZShzdHlsZTogU3R5bGVMaXN0KTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgYC4ke3N0eWxlLmNsYXNzTmFtZX0ge2AsXHJcbiAgICAgIHN0eWxlLmRlY2xhcmF0aW9ucy5tYXAocnVsZSA9PiB0aGlzLmluZGVudGF0aW9uU3ltYm9sICsgcnVsZSkuam9pbignXFxuJyksXHJcbiAgICAgICd9JyxcclxuICAgICAgJydcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXJzZSBzdHlsZSBwc2V1ZG8gZWxlbWVudCB3aXRob3V0IGFueSBwcmUgcHJvY2Vzc2luZ1xyXG4gICAqIEBwYXJhbSBzdHlsZXMgY3VyZW50IGNyZWF0ZWQgbGlzdFxyXG4gICAqIEBwYXJhbSBjdXJyZW50ICBza2V0Y2ggYXN0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZFBzZXVkb0VsZW1lbnRTdHlsZShzdHlsZXM6IFN0eWxlTGlzdFtdLCBjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBjb21wdXRlU3R5bGUgPSAoX2N1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgY29udGVudCA9IChuYW1lOiBzdHJpbmcsIGRhdGE6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHN0eWxlcy5wdXNoKHsgY2xhc3NOYW1lOiBuYW1lLCBkZWNsYXJhdGlvbnM6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoX2N1cnJlbnQubGF5ZXJzICYmIEFycmF5LmlzQXJyYXkoX2N1cnJlbnQubGF5ZXJzKSkge1xyXG4gICAgICAgIF9jdXJyZW50LmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmNzc0NvbnRleHQuaWRlbnRpZnkobGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHsobGF5ZXIgYXMgYW55KS5jc3MuY2xhc3NOYW1lfWA7XHJcbiAgICAgICAgICAgIGlmICgobGF5ZXIuY3NzIGFzIGFueSkucHNldWRvRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICBPYmplY3QuZW50cmllcygobGF5ZXIuY3NzIGFzIGFueSkucHNldWRvRWxlbWVudHMpLmZvckVhY2goXHJcbiAgICAgICAgICAgICAgICAoW3Byb3AsIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb250ZW50KFxyXG4gICAgICAgICAgICAgICAgICAgIGAke25hbWV9OiR7cHJvcH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAoW3J1bGVLZXksIHJ1bGVWYWx1ZV0pID0+IGAke3J1bGVLZXl9OiAke3J1bGVWYWx1ZX07YFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICBjb21wdXRlU3R5bGUobGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29tcHV0ZVN0eWxlKGN1cnJlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyB0aGUgbWFpbiBhc3QgcGFyc2VyIHRvIGdvIGZyb20gc2tldGNoIHRvIGNzc1xyXG4gICAqIEBwYXJhbSBzdHlsZXMgbmV3bHkgY3JlYXRlZCBsaXN0XHJcbiAgICogQHBhcmFtIGN1cnJlbnQgIHNrZXRjaCBhc3RcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkQXN0U3R5bGVTaGVldChcclxuICAgIHN0eWxlczogU3R5bGVMaXN0W10sXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wdXRlU3R5bGUgPSAoX2N1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIF9zdHlsZXMpID0+IHtcclxuICAgICAgY29uc3QgY29udGVudCA9IChuYW1lOiBzdHJpbmcsIGRhdGE6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHN0eWxlcy5wdXNoKHsgY2xhc3NOYW1lOiBuYW1lLCBkZWNsYXJhdGlvbnM6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoX2N1cnJlbnQubGF5ZXJzICYmIEFycmF5LmlzQXJyYXkoX2N1cnJlbnQubGF5ZXJzKSkge1xyXG4gICAgICAgIF9jdXJyZW50LmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmNzc0NvbnRleHQuaWRlbnRpZnkobGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHsobGF5ZXIgYXMgYW55KS5jc3MuY2xhc3NOYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IHJ1bGVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcygobGF5ZXIuY3NzIGFzIGFueSkucnVsZXMpLmZvckVhY2goXHJcbiAgICAgICAgICAgICAgKFtwcm9wLCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJ1bGVzLnB1c2goYCR7cHJvcH06ICR7dmFsdWV9O2ApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGVudChuYW1lLCBydWxlcyk7XHJcblxyXG4gICAgICAgICAgICBjb21wdXRlU3R5bGUobGF5ZXIsIFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGAkeyhsYXllciBhcyBhbnkpLmNzcy5jbGFzc05hbWV9YCxcclxuICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uczogcnVsZXNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXB1dGVTdHlsZShjdXJyZW50LCBzdHlsZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyB3aWxsIG9wdGltaXplIHRoZSBBU1QgdG8gJ2JldHRlcicgY3NzXHJcbiAgICogQmFzaWMgY29uY2VwdHMgaXMgdG8gbG9vcCB0aHJvdWdoIGFzdCBhbmQgdmVyaWZ5IGN1cnJlbnQgJiBuZXh0XHJcbiAgICogZGVjbGFyYXRpb24uXHJcbiAgICpcclxuICAgKiBXaGVuIGVxdWFscyBjc3MgZGVjbGFyYXRpb25zIGZvdW5kIHRoaXMgd2lsbCBiZSBwbGFjZWRcclxuICAgKiBpbiBhIHNlcGVyYXRlIGNzcyBjbGFzc1xyXG4gICAqIEBwYXJhbSBzdHlsZXNBc3Qgc2tldGNoIGFzdFxyXG4gICAqL1xyXG4gIHBvc3RQcm9jZXNzQ3NzKHN0eWxlc0FzdDogU3R5bGVMaXN0W10pOiB2b2lkIHtcclxuICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBbXTtcclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICBjdXJyZW50SW5kZXggPCBzdHlsZXNBc3QubGVuZ3RoO1xyXG4gICAgICBjdXJyZW50SW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGxldCBjaGVja2luZ0RlY0luZGV4ID0gY3VycmVudEluZGV4O1xyXG4gICAgICBjb25zdCBjdXJyZW50RGVjbGFyYXRpb246IFN0eWxlTGlzdCA9IHN0eWxlc0FzdFtjdXJyZW50SW5kZXhdO1xyXG4gICAgICBjb25zdCBjdXJyZW50RGVjbGFyYXRpb25TZXQgPSBuZXcgU2V0PHN0cmluZz4oXHJcbiAgICAgICAgY3VycmVudERlY2xhcmF0aW9uLmRlY2xhcmF0aW9ucy5zb3J0KClcclxuICAgICAgKTtcclxuICAgICAgd2hpbGUgKCsrY2hlY2tpbmdEZWNJbmRleCA8IHN0eWxlc0FzdC5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBuZXh0RGVjbGFyYXRpb24gPSBzdHlsZXNBc3RbY2hlY2tpbmdEZWNJbmRleF07XHJcbiAgICAgICAgY29uc3QgY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldCA9IG5ldyBTZXQ8c3RyaW5nPihcclxuICAgICAgICAgIG5leHREZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMuc29ydCgpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbShjdXJyZW50RGVjbGFyYXRpb25TZXQudmFsdWVzKCkpKSB7XHJcbiAgICAgICAgICBpZiAoY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldC5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICBkdXBsaWNhdGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogYCR7Y3VycmVudERlY2xhcmF0aW9uLmNsYXNzTmFtZX0sIC4ke25leHREZWNsYXJhdGlvbi5jbGFzc05hbWV9YCxcclxuICAgICAgICAgICAgICBrZXlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNoZWNrRGVjbGFyYXRpb25wcm9wZXJ0aWVzZXQuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREZWNsYXJhdGlvblNldC5kZWxldGUoa2V5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWVzSW5Bc3QoXHJcbiAgICAgICAgICBzdHlsZXNBc3QsXHJcbiAgICAgICAgICBjdXJyZW50SW5kZXgsXHJcbiAgICAgICAgICBjdXJyZW50RGVjbGFyYXRpb25TZXQsXHJcbiAgICAgICAgICBjaGVja2luZ0RlY0luZGV4LFxyXG4gICAgICAgICAgY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVkdWNlRHVwbGljYXRlcyhkdXBsaWNhdGVzLCBzdHlsZXNBc3QpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lsbCByZW1vdmUgdGhlIGR1cGxpY2F0ZXMgZnJvbSBhc3RcclxuICAgKiBAcGFyYW0gZHVwbGljYXRlcyBkdXBsaWNheWUgY3NzIHN0eWxlc1xyXG4gICAqIEBwYXJhbSBzdHlsZXNBc3Qgc2tldGNoIGFzdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVkdWNlRHVwbGljYXRlcyhcclxuICAgIGR1cGxpY2F0ZXM6IHsgY2xhc3NOYW1lOiBzdHJpbmc7IGtleTogc3RyaW5nIH1bXSxcclxuICAgIHN0eWxlc0FzdDogU3R5bGVMaXN0W11cclxuICApIHtcclxuICAgIGNvbnN0IGRlRHVwbGljYXRlQ3NzVmFsdWVzOiBPYmplY3QgPSBkdXBsaWNhdGVzLnJlZHVjZShcclxuICAgICAgKGN1cnJlbnQsIG5leHQsIGluZGV4LCBfYXJyYXkpID0+IHtcclxuICAgICAgICBpZiAoaW5kZXggPT09IDAgfHwgIWN1cnJlbnQuaGFzT3duUHJvcGVydHkobmV4dC5jbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICBjdXJyZW50W25leHQuY2xhc3NOYW1lXSA9IHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBuZXh0LmNsYXNzTmFtZSxcclxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbbmV4dC5rZXldXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjdXJyZW50W25leHQuY2xhc3NOYW1lXS5kZWNsYXJhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIC4uLmN1cnJlbnRbbmV4dC5jbGFzc05hbWVdLmRlY2xhcmF0aW9ucyxcclxuICAgICAgICAgICAgLi4uW25leHQua2V5XVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIHt9XHJcbiAgICApO1xyXG5cclxuICAgIE9iamVjdC52YWx1ZXMoZGVEdXBsaWNhdGVDc3NWYWx1ZXMpXHJcbiAgICAgIC5maWx0ZXIoZSA9PiBlLmRlY2xhcmF0aW9ucy5sZW5ndGggPiAwKVxyXG4gICAgICAubWFwKGUgPT5cclxuICAgICAgICBzdHlsZXNBc3QucHVzaCh7IGNsYXNzTmFtZTogZS5jbGFzc05hbWUsIGRlY2xhcmF0aW9uczogZS5kZWNsYXJhdGlvbnMgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgZGVjbGFyYXRpb24gZm9yIGVhY2ggY3NzIGRlY2xhcmF0aW9uXHJcbiAgICogQHBhcmFtIHN0eWxlc0FzdFxyXG4gICAqIEBwYXJhbSBjdXJyZW50SW5kZXhcclxuICAgKiBAcGFyYW0gY3VycmVudERlY2xhcmF0aW9uU2V0XHJcbiAgICogQHBhcmFtIGNoZWNraW5nRGVjSW5kZXhcclxuICAgKiBAcGFyYW0gY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0VmFsdWVzSW5Bc3QoXHJcbiAgICBzdHlsZXNBc3Q6IFN0eWxlTGlzdFtdLFxyXG4gICAgY3VycmVudEluZGV4OiBudW1iZXIsXHJcbiAgICBjdXJyZW50RGVjbGFyYXRpb25TZXQ6IFNldDxzdHJpbmc+LFxyXG4gICAgY2hlY2tpbmdEZWNJbmRleDogbnVtYmVyLFxyXG4gICAgY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldDogU2V0PHN0cmluZz5cclxuICApIHtcclxuICAgIHN0eWxlc0FzdFtjdXJyZW50SW5kZXhdLmRlY2xhcmF0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIEFycmF5LmZyb20oY3VycmVudERlY2xhcmF0aW9uU2V0LnZhbHVlcygpKVxyXG4gICAgKTtcclxuICAgIHN0eWxlc0FzdFtjaGVja2luZ0RlY0luZGV4XS5kZWNsYXJhdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICBBcnJheS5mcm9tKGNoZWNrRGVjbGFyYXRpb25wcm9wZXJ0aWVzZXQudmFsdWVzKCkpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=