/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class CssAggregatorService {
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
/** @nocollapse */ CssAggregatorService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssAggregatorService_Factory() { return new CssAggregatorService(i0.ɵɵinject(i1.FormatService), i0.ɵɵinject(i2.CssContextService)); }, token: CssAggregatorService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWFnZ3JlZ2F0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL2Nzcy1hZ2dyZWdhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7O0FBRXBELHdCQUdDOzs7SUFGQyw4QkFBa0I7O0lBQ2xCLGlDQUF1Qjs7QUFNekIsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFDL0IsWUFDbUIsYUFBNEIsRUFDckMsVUFBNkI7UUFEcEIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDckMsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFHL0Isc0JBQWlCLEdBQUcsSUFBSSxDQUFDLENBQUMsZUFBZTs7O1FBRXpDLGNBQVMsR0FBRztZQUNsQixTQUFTO1lBQ1QsR0FBRyxJQUFJLENBQUMsaUJBQWlCLGlCQUFpQjtZQUMxQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIscUJBQXFCO1lBQzlDLEdBQUc7WUFDSCxFQUFFO1NBQ0gsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFWVixDQUFDOzs7Ozs7O0lBZ0JKLFNBQVMsQ0FBQyxPQUFzQixFQUFFLE9BQTJCOztjQUNyRCxNQUFNLEdBQXFCLEVBQUU7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7O2NBQ3hDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxN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QUM7YUFDaEMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO2FBQ3RDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUNQLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQ3pFLENBQUM7SUFDTixDQUFDOzs7Ozs7Ozs7OztJQVVPLGNBQWMsQ0FDcEIsU0FBc0IsRUFDdEIsWUFBb0IsRUFDcEIscUJBQWtDLEVBQ2xDLGdCQUF3QixFQUN4Qiw0QkFBeUM7UUFFekMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNsRCxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQzNDLENBQUM7UUFDRixTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUNsRCxDQUFDO0lBQ0osQ0FBQzs7O1lBalFGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVRRLGFBQWE7WUFGYixpQkFBaUI7Ozs7Ozs7O0lBa0J4QixpREFBaUM7Ozs7O0lBRWpDLHlDQU1hOzs7OztJQVpYLDZDQUE2Qzs7Ozs7SUFDN0MsMENBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDc3NDb250ZXh0U2VydmljZSB9IGZyb20gJy4vY3NzLWNvbnRleHQuc2VydmljZSc7XHJcbmltcG9ydCB7IENzc0NvZGVHZW5PcHRpb25zIH0gZnJvbSAnLi9jc3MtY29kZWdlbic7XHJcbmltcG9ydCB7IEZvcm1hdFNlcnZpY2UgfSBmcm9tICdAeGxheWVycy9za2V0Y2gtbGliJztcclxuXHJcbmludGVyZmFjZSBTdHlsZUxpc3Qge1xyXG4gIGNsYXNzTmFtZTogc3RyaW5nO1xyXG4gIGRlY2xhcmF0aW9uczogc3RyaW5nW107XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENzc0FnZ3JlZ2F0b3JTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgZm9ybWF0U2VydmljZTogRm9ybWF0U2VydmljZSxcclxuICAgIHByaXZhdGUgY3NzQ29udGV4dDogQ3NzQ29udGV4dFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIHByaXZhdGUgaW5kZW50YXRpb25TeW1ib2wgPSBgICBgOyAvLyAyIHNwYWNlcyBmdHdcclxuICAvLyBkZWZhdWx0IGhvc3Qgc3R5bGVcclxuICBwcml2YXRlIGhvc3RTdHlsZSA9IFtcclxuICAgICc6aG9zdCB7JyxcclxuICAgIGAke3RoaXMuaW5kZW50YXRpb25TeW1ib2x9ZGlzcGxheTogYmxvY2s7YCxcclxuICAgIGAke3RoaXMuaW5kZW50YXRpb25TeW1ib2x9cG9zaXRpb246IHJlbGF0aXZlO2AsXHJcbiAgICAnfScsXHJcbiAgICAnJ1xyXG4gIF0uam9pbignXFxuJyk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgd2lsbCBwYXJzZSB0aGUgYXN0IHRvIHJldHVybiBhIG9wdGltaXplZCBjc3Mgc3R5bGVzaGVldFxyXG4gICAqIEBwYXJhbSBjdXJyZW50IFNrZXRjaE1TTGF5ZXIgdGhlIGFzdCBiYXNlZCBvbiBza2V0Y2gganNvblxyXG4gICAqL1xyXG4gIGFnZ3JlZ2F0ZShjdXJyZW50OiBTa2V0Y2hNU0xheWVyLCBvcHRpb25zPzogQ3NzQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHN0eWxlczogQXJyYXk8U3R5bGVMaXN0PiA9IFtdO1xyXG4gICAgdGhpcy5idWlsZEFzdFN0eWxlU2hlZXQoc3R5bGVzLCBjdXJyZW50KTtcclxuICAgIHRoaXMucG9zdFByb2Nlc3NDc3Moc3R5bGVzKTtcclxuICAgIHRoaXMuYnVpbGRQc2V1ZG9FbGVtZW50U3R5bGUoc3R5bGVzLCBjdXJyZW50KTtcclxuICAgIGNvbnN0IHJlR2VuZXJhdGVTdHlsZVNoZWV0ID0gdGhpcy5yZUdlbmVyYXRlU3R5bGVTaGVldChzdHlsZXMpO1xyXG5cclxuICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5mb3JtYXRTZXJ2aWNlLm5vcm1hbGl6ZU5hbWUoY3VycmVudC5uYW1lKTtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIHtcclxuICAgICAgICBraW5kOiAnY3NzJyxcclxuICAgICAgICB2YWx1ZTogdGhpcy5jb21iaW5lU3R5bGVzKHJlR2VuZXJhdGVTdHlsZVNoZWV0KSxcclxuICAgICAgICBsYW5ndWFnZTogJ2NzcycsXHJcbiAgICAgICAgdXJpOiBgJHtvcHRpb25zLmNvbXBvbmVudERpcn0vJHtmaWxlTmFtZX0uY3NzYFxyXG4gICAgICB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNvbXBsZXRlIHN0cmluZyBvZiBjc3Mgc3R5bGVcclxuICAgKiBAcGFyYW0gc3R5bGVzIHN0cmluZyBvZiBzdHlsZXNoZWV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb21iaW5lU3R5bGVzKHN0eWxlczogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBgJHt0aGlzLmhvc3RTdHlsZX0gXFxuJHtzdHlsZXN9YDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1hcCBvdmVyIHN0eWxlcyB3aXRoIG5vcm1hbCBjc3Mgb3V0cHV0XHJcbiAgICogQHBhcmFtIHN0eWxlcyBvcHRpbWl6ZWQgbGlzdCBvZiBzdHlsZXNcclxuICAgKi9cclxuICBwcml2YXRlIHJlR2VuZXJhdGVTdHlsZVNoZWV0KHN0eWxlczogU3R5bGVMaXN0W10pIHtcclxuICAgIHJldHVybiBzdHlsZXNcclxuICAgICAgLmZpbHRlcihlID0+IGUuZGVjbGFyYXRpb25zLmxlbmd0aCA+IDApXHJcbiAgICAgIC5tYXAoY3NzU3R5bGUgPT4gdGhpcy5nZW5lcmF0ZUNzc1N0eWxlKGNzc1N0eWxlKS5qb2luKCdcXG4nKSlcclxuICAgICAgLmpvaW4oJ1xcbicpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGFyc2Ugc3R5bGVsaXN0IHRvIHVuZGVyc3RhbmRhYmxlIGNzcyBjbGFzcyBkZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIHN0eWxlIHRoZSBkZWNsYXJhdGlvbiBvZiBzdHlsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2VuZXJhdGVDc3NTdHlsZShzdHlsZTogU3R5bGVMaXN0KTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgYC4ke3N0eWxlLmNsYXNzTmFtZX0ge2AsXHJcbiAgICAgIHN0eWxlLmRlY2xhcmF0aW9ucy5tYXAocnVsZSA9PiB0aGlzLmluZGVudGF0aW9uU3ltYm9sICsgcnVsZSkuam9pbignXFxuJyksXHJcbiAgICAgICd9JyxcclxuICAgICAgJydcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYXJzZSBzdHlsZSBwc2V1ZG8gZWxlbWVudCB3aXRob3V0IGFueSBwcmUgcHJvY2Vzc2luZ1xyXG4gICAqIEBwYXJhbSBzdHlsZXMgY3VyZW50IGNyZWF0ZWQgbGlzdFxyXG4gICAqIEBwYXJhbSBjdXJyZW50ICBza2V0Y2ggYXN0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBidWlsZFBzZXVkb0VsZW1lbnRTdHlsZShzdHlsZXM6IFN0eWxlTGlzdFtdLCBjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICBjb25zdCBjb21wdXRlU3R5bGUgPSAoX2N1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpID0+IHtcclxuICAgICAgY29uc3QgY29udGVudCA9IChuYW1lOiBzdHJpbmcsIGRhdGE6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHN0eWxlcy5wdXNoKHsgY2xhc3NOYW1lOiBuYW1lLCBkZWNsYXJhdGlvbnM6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoX2N1cnJlbnQubGF5ZXJzICYmIEFycmF5LmlzQXJyYXkoX2N1cnJlbnQubGF5ZXJzKSkge1xyXG4gICAgICAgIF9jdXJyZW50LmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmNzc0NvbnRleHQuaWRlbnRpZnkobGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHsobGF5ZXIgYXMgYW55KS5jc3MuY2xhc3NOYW1lfWA7XHJcbiAgICAgICAgICAgIGlmICgobGF5ZXIuY3NzIGFzIGFueSkucHNldWRvRWxlbWVudHMpIHtcclxuICAgICAgICAgICAgICBPYmplY3QuZW50cmllcygobGF5ZXIuY3NzIGFzIGFueSkucHNldWRvRWxlbWVudHMpLmZvckVhY2goXHJcbiAgICAgICAgICAgICAgICAoW3Byb3AsIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb250ZW50KFxyXG4gICAgICAgICAgICAgICAgICAgIGAke25hbWV9OiR7cHJvcH1gLFxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKHZhbHVlKS5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAoW3J1bGVLZXksIHJ1bGVWYWx1ZV0pID0+IGAke3J1bGVLZXl9OiAke3J1bGVWYWx1ZX07YFxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICBjb21wdXRlU3R5bGUobGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29tcHV0ZVN0eWxlKGN1cnJlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyB0aGUgbWFpbiBhc3QgcGFyc2VyIHRvIGdvIGZyb20gc2tldGNoIHRvIGNzc1xyXG4gICAqIEBwYXJhbSBzdHlsZXMgbmV3bHkgY3JlYXRlZCBsaXN0XHJcbiAgICogQHBhcmFtIGN1cnJlbnQgIHNrZXRjaCBhc3RcclxuICAgKi9cclxuICBwcml2YXRlIGJ1aWxkQXN0U3R5bGVTaGVldChcclxuICAgIHN0eWxlczogU3R5bGVMaXN0W10sXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyXHJcbiAgKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb21wdXRlU3R5bGUgPSAoX2N1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIF9zdHlsZXMpID0+IHtcclxuICAgICAgY29uc3QgY29udGVudCA9IChuYW1lOiBzdHJpbmcsIGRhdGE6IHN0cmluZ1tdKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIHN0eWxlcy5wdXNoKHsgY2xhc3NOYW1lOiBuYW1lLCBkZWNsYXJhdGlvbnM6IGRhdGEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBpZiAoX2N1cnJlbnQubGF5ZXJzICYmIEFycmF5LmlzQXJyYXkoX2N1cnJlbnQubGF5ZXJzKSkge1xyXG4gICAgICAgIF9jdXJyZW50LmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLmNzc0NvbnRleHQuaWRlbnRpZnkobGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHsobGF5ZXIgYXMgYW55KS5jc3MuY2xhc3NOYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IHJ1bGVzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBPYmplY3QuZW50cmllcygobGF5ZXIuY3NzIGFzIGFueSkucnVsZXMpLmZvckVhY2goXHJcbiAgICAgICAgICAgICAgKFtwcm9wLCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJ1bGVzLnB1c2goYCR7cHJvcH06ICR7dmFsdWV9O2ApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29udGVudChuYW1lLCBydWxlcyk7XHJcblxyXG4gICAgICAgICAgICBjb21wdXRlU3R5bGUobGF5ZXIsIFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6IGAkeyhsYXllciBhcyBhbnkpLmNzcy5jbGFzc05hbWV9YCxcclxuICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uczogcnVsZXNcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXB1dGVTdHlsZShjdXJyZW50LCBzdHlsZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyB3aWxsIG9wdGltaXplIHRoZSBBU1QgdG8gJ2JldHRlcicgY3NzXHJcbiAgICogQmFzaWMgY29uY2VwdHMgaXMgdG8gbG9vcCB0aHJvdWdoIGFzdCBhbmQgdmVyaWZ5IGN1cnJlbnQgJiBuZXh0XHJcbiAgICogZGVjbGFyYXRpb24uXHJcbiAgICpcclxuICAgKiBXaGVuIGVxdWFscyBjc3MgZGVjbGFyYXRpb25zIGZvdW5kIHRoaXMgd2lsbCBiZSBwbGFjZWRcclxuICAgKiBpbiBhIHNlcGVyYXRlIGNzcyBjbGFzc1xyXG4gICAqIEBwYXJhbSBzdHlsZXNBc3Qgc2tldGNoIGFzdFxyXG4gICAqL1xyXG4gIHBvc3RQcm9jZXNzQ3NzKHN0eWxlc0FzdDogU3R5bGVMaXN0W10pOiB2b2lkIHtcclxuICAgIGNvbnN0IGR1cGxpY2F0ZXMgPSBbXTtcclxuICAgIGZvciAoXHJcbiAgICAgIGxldCBjdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICBjdXJyZW50SW5kZXggPCBzdHlsZXNBc3QubGVuZ3RoO1xyXG4gICAgICBjdXJyZW50SW5kZXgrK1xyXG4gICAgKSB7XHJcbiAgICAgIGxldCBjaGVja2luZ0RlY0luZGV4ID0gY3VycmVudEluZGV4O1xyXG4gICAgICBjb25zdCBjdXJyZW50RGVjbGFyYXRpb246IFN0eWxlTGlzdCA9IHN0eWxlc0FzdFtjdXJyZW50SW5kZXhdO1xyXG4gICAgICBjb25zdCBjdXJyZW50RGVjbGFyYXRpb25TZXQgPSBuZXcgU2V0PHN0cmluZz4oXHJcbiAgICAgICAgY3VycmVudERlY2xhcmF0aW9uLmRlY2xhcmF0aW9ucy5zb3J0KClcclxuICAgICAgKTtcclxuICAgICAgd2hpbGUgKCsrY2hlY2tpbmdEZWNJbmRleCA8IHN0eWxlc0FzdC5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBuZXh0RGVjbGFyYXRpb24gPSBzdHlsZXNBc3RbY2hlY2tpbmdEZWNJbmRleF07XHJcbiAgICAgICAgY29uc3QgY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldCA9IG5ldyBTZXQ8c3RyaW5nPihcclxuICAgICAgICAgIG5leHREZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMuc29ydCgpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbShjdXJyZW50RGVjbGFyYXRpb25TZXQudmFsdWVzKCkpKSB7XHJcbiAgICAgICAgICBpZiAoY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldC5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICBkdXBsaWNhdGVzLnB1c2goe1xyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogYCR7Y3VycmVudERlY2xhcmF0aW9uLmNsYXNzTmFtZX0sIC4ke25leHREZWNsYXJhdGlvbi5jbGFzc05hbWV9YCxcclxuICAgICAgICAgICAgICBrZXlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNoZWNrRGVjbGFyYXRpb25wcm9wZXJ0aWVzZXQuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnREZWNsYXJhdGlvblNldC5kZWxldGUoa2V5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWVzSW5Bc3QoXHJcbiAgICAgICAgICBzdHlsZXNBc3QsXHJcbiAgICAgICAgICBjdXJyZW50SW5kZXgsXHJcbiAgICAgICAgICBjdXJyZW50RGVjbGFyYXRpb25TZXQsXHJcbiAgICAgICAgICBjaGVja2luZ0RlY0luZGV4LFxyXG4gICAgICAgICAgY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVkdWNlRHVwbGljYXRlcyhkdXBsaWNhdGVzLCBzdHlsZXNBc3QpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2lsbCByZW1vdmUgdGhlIGR1cGxpY2F0ZXMgZnJvbSBhc3RcclxuICAgKiBAcGFyYW0gZHVwbGljYXRlcyBkdXBsaWNheWUgY3NzIHN0eWxlc1xyXG4gICAqIEBwYXJhbSBzdHlsZXNBc3Qgc2tldGNoIGFzdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVkdWNlRHVwbGljYXRlcyhcclxuICAgIGR1cGxpY2F0ZXM6IHsgY2xhc3NOYW1lOiBzdHJpbmc7IGtleTogc3RyaW5nIH1bXSxcclxuICAgIHN0eWxlc0FzdDogU3R5bGVMaXN0W11cclxuICApIHtcclxuICAgIGNvbnN0IGRlRHVwbGljYXRlQ3NzVmFsdWVzOiBPYmplY3QgPSBkdXBsaWNhdGVzLnJlZHVjZShcclxuICAgICAgKGN1cnJlbnQsIG5leHQsIGluZGV4LCBfYXJyYXkpID0+IHtcclxuICAgICAgICBpZiAoaW5kZXggPT09IDAgfHwgIWN1cnJlbnQuaGFzT3duUHJvcGVydHkobmV4dC5jbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICBjdXJyZW50W25leHQuY2xhc3NOYW1lXSA9IHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiBuZXh0LmNsYXNzTmFtZSxcclxuICAgICAgICAgICAgZGVjbGFyYXRpb25zOiBbbmV4dC5rZXldXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjdXJyZW50W25leHQuY2xhc3NOYW1lXS5kZWNsYXJhdGlvbnMgPSBbXHJcbiAgICAgICAgICAgIC4uLmN1cnJlbnRbbmV4dC5jbGFzc05hbWVdLmRlY2xhcmF0aW9ucyxcclxuICAgICAgICAgICAgLi4uW25leHQua2V5XVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIHt9XHJcbiAgICApO1xyXG5cclxuICAgIE9iamVjdC52YWx1ZXMoZGVEdXBsaWNhdGVDc3NWYWx1ZXMpXHJcbiAgICAgIC5maWx0ZXIoZSA9PiBlLmRlY2xhcmF0aW9ucy5sZW5ndGggPiAwKVxyXG4gICAgICAubWFwKGUgPT5cclxuICAgICAgICBzdHlsZXNBc3QucHVzaCh7IGNsYXNzTmFtZTogZS5jbGFzc05hbWUsIGRlY2xhcmF0aW9uczogZS5kZWNsYXJhdGlvbnMgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgZGVjbGFyYXRpb24gZm9yIGVhY2ggY3NzIGRlY2xhcmF0aW9uXHJcbiAgICogQHBhcmFtIHN0eWxlc0FzdFxyXG4gICAqIEBwYXJhbSBjdXJyZW50SW5kZXhcclxuICAgKiBAcGFyYW0gY3VycmVudERlY2xhcmF0aW9uU2V0XHJcbiAgICogQHBhcmFtIGNoZWNraW5nRGVjSW5kZXhcclxuICAgKiBAcGFyYW0gY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0VmFsdWVzSW5Bc3QoXHJcbiAgICBzdHlsZXNBc3Q6IFN0eWxlTGlzdFtdLFxyXG4gICAgY3VycmVudEluZGV4OiBudW1iZXIsXHJcbiAgICBjdXJyZW50RGVjbGFyYXRpb25TZXQ6IFNldDxzdHJpbmc+LFxyXG4gICAgY2hlY2tpbmdEZWNJbmRleDogbnVtYmVyLFxyXG4gICAgY2hlY2tEZWNsYXJhdGlvbnByb3BlcnRpZXNldDogU2V0PHN0cmluZz5cclxuICApIHtcclxuICAgIHN0eWxlc0FzdFtjdXJyZW50SW5kZXhdLmRlY2xhcmF0aW9ucyA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIEFycmF5LmZyb20oY3VycmVudERlY2xhcmF0aW9uU2V0LnZhbHVlcygpKVxyXG4gICAgKTtcclxuICAgIHN0eWxlc0FzdFtjaGVja2luZ0RlY0luZGV4XS5kZWNsYXJhdGlvbnMgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICBBcnJheS5mcm9tKGNoZWNrRGVjbGFyYXRpb25wcm9wZXJ0aWVzZXQudmFsdWVzKCkpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=