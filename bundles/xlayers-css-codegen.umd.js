(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@xlayers/sketch-lib')) :
    typeof define === 'function' && define.amd ? define('@xlayers/css-codegen', ['exports', '@angular/core', '@xlayers/sketch-lib'], factory) :
    (global = global || self, factory((global.xlayers = global.xlayers || {}, global.xlayers['css-codegen'] = {}), global.ng.core, global.sketchLib));
}(this, (function (exports, core, sketchLib) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */ CssContextService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function CssContextService_Factory() { return new CssContextService(); }, token: CssContextService, providedIn: "root" });
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        CssParserService.ctorParameters = function () { return [
            { type: sketchLib.StyleService },
            { type: CssContextService },
            { type: sketchLib.SymbolService },
            { type: sketchLib.LayerService }
        ]; };
        /** @nocollapse */ CssParserService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function CssParserService_Factory() { return new CssParserService(core.ɵɵinject(sketchLib.StyleService), core.ɵɵinject(CssContextService), core.ɵɵinject(sketchLib.SymbolService), core.ɵɵinject(sketchLib.LayerService)); }, token: CssParserService, providedIn: "root" });
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        CssAggregatorService.ctorParameters = function () { return [
            { type: sketchLib.FormatService },
            { type: CssContextService }
        ]; };
        /** @nocollapse */ CssAggregatorService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function CssAggregatorService_Factory() { return new CssAggregatorService(core.ɵɵinject(sketchLib.FormatService), core.ɵɵinject(CssContextService)); }, token: CssAggregatorService, providedIn: "root" });
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        CssCodeGenService.ctorParameters = function () { return [
            { type: CssContextService },
            { type: CssParserService },
            { type: CssAggregatorService }
        ]; };
        /** @nocollapse */ CssCodeGenService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function CssCodeGenService_Factory() { return new CssCodeGenService(core.ɵɵinject(CssContextService), core.ɵɵinject(CssParserService), core.ɵɵinject(CssAggregatorService)); }, token: CssCodeGenService, providedIn: "root" });
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
            { type: core.NgModule, args: [{
                        imports: [sketchLib.SketchLibModule]
                    },] }
        ];
        return CssCodeGenModule;
    }());

    exports.CssCodeGenModule = CssCodeGenModule;
    exports.CssCodeGenService = CssCodeGenService;
    exports.ɵa = CssContextService;
    exports.ɵb = CssParserService;
    exports.ɵc = CssAggregatorService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=xlayers-css-codegen.umd.js.map
