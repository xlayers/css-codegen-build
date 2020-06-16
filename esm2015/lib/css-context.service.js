/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CssContextService {
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
/** @nocollapse */ CssContextService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssContextService_Factory() { return new CssContextService(); }, token: CssContextService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL2Nzcy1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7O0lBQzVCLFFBQVEsQ0FBQyxPQUFzQjtRQUM3QixPQUFPO1lBQ0wsTUFBTTtZQUNOLE1BQU07WUFDTixXQUFXO1lBQ1gsT0FBTztZQUNQLE1BQU07WUFDTixPQUFPO1lBQ1AseUJBQXlCO1lBQ3pCLE1BQU07WUFDTixVQUFVO1lBQ1YsV0FBVztZQUNYLFlBQVk7U0FDYixDQUFDLFFBQVEsQ0FBQyxtQkFBQSxPQUFPLENBQUMsTUFBTSxFQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELEVBQUUsQ0FBQyxPQUFzQjtRQUN2QixPQUFPLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBRUQsR0FBRyxDQUFDLE9BQXNCLEVBQUUsV0FBOEI7UUFDeEQsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLEdBQUcscUJBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBSyxXQUFXLENBQUUsQ0FBQztJQUNqRSxDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxPQUFzQjtRQUMxQixPQUFPLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDOUIsQ0FBQzs7O1lBOUJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ3NzQ29kZUdlbkNvbnRleHQgfSBmcm9tICcuL2Nzcy1jb2RlZ2VuJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENzc0NvbnRleHRTZXJ2aWNlIHtcclxuICBpZGVudGlmeShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAncmVjdCcsXHJcbiAgICAgICdwYWdlJyxcclxuICAgICAgJ3JlY3RhbmdsZScsXHJcbiAgICAgICdncm91cCcsXHJcbiAgICAgICdvdmFsJyxcclxuICAgICAgJ3NsaWNlJyxcclxuICAgICAgJ01TSW1tdXRhYmxlSG90c3BvdExheWVyJyxcclxuICAgICAgJ3RleHQnLFxyXG4gICAgICAndHJpYW5nbGUnLFxyXG4gICAgICAnc2hhcGVQYXRoJyxcclxuICAgICAgJ3NoYXBlR3JvdXAnXHJcbiAgICBdLmluY2x1ZGVzKGN1cnJlbnQuX2NsYXNzIGFzIHN0cmluZyk7XHJcbiAgfVxyXG5cclxuICBvZihjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gKGN1cnJlbnQgYXMgYW55KS5jc3M7XHJcbiAgfVxyXG5cclxuICBwdXQoY3VycmVudDogU2tldGNoTVNMYXllciwgbmV4dENvbnRleHQ6IENzc0NvZGVHZW5Db250ZXh0KSB7XHJcbiAgICAoY3VycmVudCBhcyBhbnkpLmNzcyA9IHsgLi4udGhpcy5vZihjdXJyZW50KSwgLi4ubmV4dENvbnRleHQgfTtcclxuICB9XHJcblxyXG4gIGNsZWFyKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGRlbGV0ZSAoY3VycmVudCBhcyBhbnkpLndlYjtcclxuICB9XHJcbn1cclxuIl19