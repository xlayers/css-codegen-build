/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
        ((/** @type {?} */ (current))).css = tslib_1.__assign({}, this.of(current), nextContext);
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
    /** @nocollapse */ CssContextService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssContextService_Factory() { return new CssContextService(); }, token: CssContextService, providedIn: "root" });
    return CssContextService;
}());
export { CssContextService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL2Nzcy1jb250ZXh0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUczQztJQUFBO0tBK0JDOzs7OztJQTNCQyxvQ0FBUTs7OztJQUFSLFVBQVMsT0FBc0I7UUFDN0IsT0FBTztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sV0FBVztZQUNYLE9BQU87WUFDUCxNQUFNO1lBQ04sT0FBTztZQUNQLHlCQUF5QjtZQUN6QixNQUFNO1lBQ04sVUFBVTtZQUNWLFdBQVc7WUFDWCxZQUFZO1NBQ2IsQ0FBQyxRQUFRLENBQUMsbUJBQUEsT0FBTyxDQUFDLE1BQU0sRUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7SUFFRCw4QkFBRTs7OztJQUFGLFVBQUcsT0FBc0I7UUFDdkIsT0FBTyxDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQzlCLENBQUM7Ozs7OztJQUVELCtCQUFHOzs7OztJQUFILFVBQUksT0FBc0IsRUFBRSxXQUE4QjtRQUN4RCxDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsR0FBRyx3QkFBUSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFLLFdBQVcsQ0FBRSxDQUFDO0lBQ2pFLENBQUM7Ozs7O0lBRUQsaUNBQUs7Ozs7SUFBTCxVQUFNLE9BQXNCO1FBQzFCLE9BQU8sQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM5QixDQUFDOztnQkE5QkYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OzRCQUxEO0NBa0NDLEFBL0JELElBK0JDO1NBNUJZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ3NzQ29kZUdlbkNvbnRleHQgfSBmcm9tICcuL2Nzcy1jb2RlZ2VuJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENzc0NvbnRleHRTZXJ2aWNlIHtcclxuICBpZGVudGlmeShjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAncmVjdCcsXHJcbiAgICAgICdwYWdlJyxcclxuICAgICAgJ3JlY3RhbmdsZScsXHJcbiAgICAgICdncm91cCcsXHJcbiAgICAgICdvdmFsJyxcclxuICAgICAgJ3NsaWNlJyxcclxuICAgICAgJ01TSW1tdXRhYmxlSG90c3BvdExheWVyJyxcclxuICAgICAgJ3RleHQnLFxyXG4gICAgICAndHJpYW5nbGUnLFxyXG4gICAgICAnc2hhcGVQYXRoJyxcclxuICAgICAgJ3NoYXBlR3JvdXAnXHJcbiAgICBdLmluY2x1ZGVzKGN1cnJlbnQuX2NsYXNzIGFzIHN0cmluZyk7XHJcbiAgfVxyXG5cclxuICBvZihjdXJyZW50OiBTa2V0Y2hNU0xheWVyKSB7XHJcbiAgICByZXR1cm4gKGN1cnJlbnQgYXMgYW55KS5jc3M7XHJcbiAgfVxyXG5cclxuICBwdXQoY3VycmVudDogU2tldGNoTVNMYXllciwgbmV4dENvbnRleHQ6IENzc0NvZGVHZW5Db250ZXh0KSB7XHJcbiAgICAoY3VycmVudCBhcyBhbnkpLmNzcyA9IHsgLi4udGhpcy5vZihjdXJyZW50KSwgLi4ubmV4dENvbnRleHQgfTtcclxuICB9XHJcblxyXG4gIGNsZWFyKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIpIHtcclxuICAgIGRlbGV0ZSAoY3VycmVudCBhcyBhbnkpLndlYjtcclxuICB9XHJcbn1cclxuIl19