/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { CssContextService } from './css-context.service';
import { CssParserService } from './css-parser.service';
import { CssAggregatorService } from './css-aggregator.service';
import * as i0 from "@angular/core";
import * as i1 from "./css-context.service";
import * as i2 from "./css-parser.service";
import * as i3 from "./css-aggregator.service";
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
        return tslib_1.__assign({ generateClassName: true, cssPrefix: 'xly_', componentDir: 'components' }, options);
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
    /** @nocollapse */ CssCodeGenService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssCodeGenService_Factory() { return new CssCodeGenService(i0.ɵɵinject(i1.CssContextService), i0.ɵɵinject(i2.CssParserService), i0.ɵɵinject(i3.CssAggregatorService)); }, token: CssCodeGenService, providedIn: "root" });
    return CssCodeGenService;
}());
export { CssCodeGenService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWNvZGVnZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL2Nzcy1jb2RlZ2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQUdoRTtJQUlFLDJCQUNVLFVBQTZCLEVBQzdCLFNBQTJCLEVBQzNCLG9CQUEwQztRQUYxQyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQ2pELENBQUM7Ozs7Ozs7SUFFSixtQ0FBTzs7Ozs7O0lBQVAsVUFDRSxPQUFzQixFQUN0QixJQUFrQixFQUNsQixPQUEyQjtRQUUzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7Ozs7SUFFRCxxQ0FBUzs7Ozs7SUFBVCxVQUFVLE9BQXNCLEVBQUUsT0FBMkI7UUFDM0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUN4QyxPQUFPLEVBQ1AsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FDN0IsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsb0NBQVE7Ozs7SUFBUixVQUFTLE9BQXNCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxtQ0FBTzs7OztJQUFQLFVBQVEsT0FBc0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFTywwQ0FBYzs7Ozs7SUFBdEIsVUFBdUIsT0FBMEI7UUFDL0MsMEJBQ0UsaUJBQWlCLEVBQUUsSUFBSSxFQUN2QixTQUFTLEVBQUUsTUFBTSxFQUNqQixZQUFZLEVBQUUsWUFBWSxJQUN2QixPQUFPLEVBQ1Y7SUFDSixDQUFDOztnQkF4Q0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFQUSxpQkFBaUI7Z0JBQ2pCLGdCQUFnQjtnQkFDaEIsb0JBQW9COzs7NEJBSDdCO0NBK0NDLEFBekNELElBeUNDO1NBdENZLGlCQUFpQjs7Ozs7O0lBRTFCLHVDQUFxQzs7Ozs7SUFDckMsc0NBQW1DOzs7OztJQUNuQyxpREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENzc0NvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi9jc3MtY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ3NzUGFyc2VyU2VydmljZSB9IGZyb20gJy4vY3NzLXBhcnNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ3NzQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuL2Nzcy1hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDc3NDb2RlR2VuT3B0aW9ucyB9IGZyb20gJy4vY3NzLWNvZGVnZW4nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3NzQ29kZUdlblNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjc3NDb250ZXh0OiBDc3NDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgY3NzUGFyc2VyOiBDc3NQYXJzZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjc3NBZ2dyZXRhdG9yU2VydmljZTogQ3NzQWdncmVnYXRvclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGNvbXB1dGUoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9ucz86IENzc0NvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNzc1BhcnNlci5jb21wdXRlKGN1cnJlbnQsIGRhdGEsIHRoaXMuY29tcGlsZU9wdGlvbnMob3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgYWdncmVnYXRlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG9wdGlvbnM/OiBDc3NDb2RlR2VuT3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHRoaXMuY3NzQWdncmV0YXRvclNlcnZpY2UuYWdncmVnYXRlKFxyXG4gICAgICBjdXJyZW50LFxyXG4gICAgICB0aGlzLmNvbXBpbGVPcHRpb25zKG9wdGlvbnMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWRlbnRpZnkoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY3NzQ29udGV4dC5pZGVudGlmeShjdXJyZW50KTtcclxuICB9XHJcblxyXG4gIGNvbnRleHQoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY3NzQ29udGV4dC5vZihjdXJyZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcGlsZU9wdGlvbnMob3B0aW9uczogQ3NzQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdlbmVyYXRlQ2xhc3NOYW1lOiB0cnVlLFxyXG4gICAgICBjc3NQcmVmaXg6ICd4bHlfJyxcclxuICAgICAgY29tcG9uZW50RGlyOiAnY29tcG9uZW50cycsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==