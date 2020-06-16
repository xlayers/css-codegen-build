/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { CssContextService } from './css-context.service';
import { CssParserService } from './css-parser.service';
import { CssAggregatorService } from './css-aggregator.service';
import * as i0 from "@angular/core";
import * as i1 from "./css-context.service";
import * as i2 from "./css-parser.service";
import * as i3 from "./css-aggregator.service";
export class CssCodeGenService {
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
/** @nocollapse */ CssCodeGenService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function CssCodeGenService_Factory() { return new CssCodeGenService(i0.ɵɵinject(i1.CssContextService), i0.ɵɵinject(i2.CssParserService), i0.ɵɵinject(i3.CssAggregatorService)); }, token: CssCodeGenService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLWNvZGVnZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B4bGF5ZXJzL2Nzcy1jb2RlZ2VuLyIsInNvdXJjZXMiOlsibGliL2Nzcy1jb2RlZ2VuLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBTWhFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7OztJQUM1QixZQUNVLFVBQTZCLEVBQzdCLFNBQTJCLEVBQzNCLG9CQUEwQztRQUYxQyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBQ2pELENBQUM7Ozs7Ozs7SUFFSixPQUFPLENBQ0wsT0FBc0IsRUFDdEIsSUFBa0IsRUFDbEIsT0FBMkI7UUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQXNCLEVBQUUsT0FBMkI7UUFDM0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUN4QyxPQUFPLEVBQ1AsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FDN0IsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLE9BQXNCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsT0FBc0I7UUFDNUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsT0FBMEI7UUFDL0MsdUJBQ0UsaUJBQWlCLEVBQUUsSUFBSSxFQUN2QixTQUFTLEVBQUUsTUFBTSxFQUNqQixZQUFZLEVBQUUsWUFBWSxJQUN2QixPQUFPLEVBQ1Y7SUFDSixDQUFDOzs7WUF4Q0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBUFEsaUJBQWlCO1lBQ2pCLGdCQUFnQjtZQUNoQixvQkFBb0I7Ozs7Ozs7O0lBUXpCLHVDQUFxQzs7Ozs7SUFDckMsc0NBQW1DOzs7OztJQUNuQyxpREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENzc0NvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi9jc3MtY29udGV4dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ3NzUGFyc2VyU2VydmljZSB9IGZyb20gJy4vY3NzLXBhcnNlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ3NzQWdncmVnYXRvclNlcnZpY2UgfSBmcm9tICcuL2Nzcy1hZ2dyZWdhdG9yLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDc3NDb2RlR2VuT3B0aW9ucyB9IGZyb20gJy4vY3NzLWNvZGVnZW4nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3NzQ29kZUdlblNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjc3NDb250ZXh0OiBDc3NDb250ZXh0U2VydmljZSxcclxuICAgIHByaXZhdGUgY3NzUGFyc2VyOiBDc3NQYXJzZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjc3NBZ2dyZXRhdG9yU2VydmljZTogQ3NzQWdncmVnYXRvclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGNvbXB1dGUoXHJcbiAgICBjdXJyZW50OiBTa2V0Y2hNU0xheWVyLFxyXG4gICAgZGF0YTogU2tldGNoTVNEYXRhLFxyXG4gICAgb3B0aW9ucz86IENzc0NvZGVHZW5PcHRpb25zXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNzc1BhcnNlci5jb21wdXRlKGN1cnJlbnQsIGRhdGEsIHRoaXMuY29tcGlsZU9wdGlvbnMob3B0aW9ucykpO1xyXG4gIH1cclxuXHJcbiAgYWdncmVnYXRlKGN1cnJlbnQ6IFNrZXRjaE1TTGF5ZXIsIG9wdGlvbnM/OiBDc3NDb2RlR2VuT3B0aW9ucykge1xyXG4gICAgcmV0dXJuIHRoaXMuY3NzQWdncmV0YXRvclNlcnZpY2UuYWdncmVnYXRlKFxyXG4gICAgICBjdXJyZW50LFxyXG4gICAgICB0aGlzLmNvbXBpbGVPcHRpb25zKG9wdGlvbnMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWRlbnRpZnkoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY3NzQ29udGV4dC5pZGVudGlmeShjdXJyZW50KTtcclxuICB9XHJcblxyXG4gIGNvbnRleHQoY3VycmVudDogU2tldGNoTVNMYXllcikge1xyXG4gICAgcmV0dXJuIHRoaXMuY3NzQ29udGV4dC5vZihjdXJyZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29tcGlsZU9wdGlvbnMob3B0aW9uczogQ3NzQ29kZUdlbk9wdGlvbnMpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdlbmVyYXRlQ2xhc3NOYW1lOiB0cnVlLFxyXG4gICAgICBjc3NQcmVmaXg6ICd4bHlfJyxcclxuICAgICAgY29tcG9uZW50RGlyOiAnY29tcG9uZW50cycsXHJcbiAgICAgIC4uLm9wdGlvbnNcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==