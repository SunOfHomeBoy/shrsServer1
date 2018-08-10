"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
};
exports.__esModule = true;
var schema_1 = require("./schema");
var utils_1 = require("../utils");
var ORDER_PAYNMENT_DEBUG = false;
var schemaOrder = (function (_super) {
    __extends(schemaOrder, _super);
    function schemaOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allPrice = 10 * (ORDER_PAYNMENT_DEBUG ? 1 : 100);
        _this.disPrice = 8 * (ORDER_PAYNMENT_DEBUG ? 1 : 100);
        _this.itvPrice = 15 * (ORDER_PAYNMENT_DEBUG ? 1 : 100);
        _this.rebate = 2 * (ORDER_PAYNMENT_DEBUG ? 1 : 100);
        _this.rebateExt = 3 * (ORDER_PAYNMENT_DEBUG ? 1 : 100);
        _this.welfare = 1 * (ORDER_PAYNMENT_DEBUG ? 1 : 100);
        _this.team = 1 * (ORDER_PAYNMENT_DEBUG ? 1 : 100);
        return _this;
    }
    schemaOrder.prototype.init = function () {
        return {
            name: 'order',
            schema: schema_1.newSchema({
                _id: String,
                openID: String,
                orderID: String,
                orderType: Number,
                orderPay: Number,
                orderMoney: Number,
                orderScore: Number,
                orderUser: String,
                orderSubmit: Date,
                orderUpdate: Date,
                orderStatus: Number,
                orderComment: String,
                orderRebate: Boolean,
                orderReaded: Boolean
            })
        };
    };
    schemaOrder.prototype.New = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.save(utils_1["default"].union(parameters, {
                        _id: parameters.orderID || utils_1["default"].uuid(),
                        orderStatus: parameters.orderStatus || 3,
                        orderSubmit: parameters.orderSubmit || (new Date()),
                        orderUpdate: new Date(),
                        orderReaded: false
                    }))];
            });
        });
    };
    schemaOrder.prototype.totalSeeWho = function (openID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.count({
                        openID: openID,
                        orderType: 2,
                        orderStatus: 1,
                        orderComment: {
                            $in: ['FULLTIME', 'PARTTIME']
                        }
                    })];
            });
        });
    };
    schemaOrder.prototype.totalLookMe = function (openID, all) {
        if (all === void 0) { all = true; }
        return __awaiter(this, void 0, void 0, function () {
            var filter;
            return __generator(this, function (_a) {
                filter = {
                    orderUser: openID,
                    orderType: 2,
                    orderStatus: 1,
                    orderComment: {
                        $in: ['FULLTIME', 'PARTTIME']
                    }
                };
                if (utils_1["default"].empty(all)) {
                    filter.orderReaded = {
                        $ne: true
                    };
                }
                return [2, this.count(filter)];
            });
        });
    };
    schemaOrder.prototype.recent = function (openID, resumeID, resumeType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.findOne({
                        where: {
                            openID: openID,
                            orderUser: resumeID,
                            orderComment: resumeType,
                            orderStatus: 1
                        },
                        order: {
                            orderSubmit: -1
                        }
                    })];
            });
        });
    };
    schemaOrder.prototype.recentSub = function (openID, resumeID, resumeType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findOne({
                            where: {
                                openID: openID,
                                orderUser: resumeID,
                                orderComment: resumeType + "#VIDEONEXT",
                                orderStatus: 1
                            },
                            order: {
                                orderSubmit: -1
                            }
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    schemaOrder.prototype.recentAny = function (openID, resumeID, resumeType) {
        return __awaiter(this, void 0, void 0, function () {
            var orderInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.recentSub(openID, resumeID, resumeType)];
                    case 1:
                        orderInfo = _a.sent();
                        if (!utils_1["default"].empty(orderInfo)) return [3, 3];
                        return [4, this.recent(openID, resumeID, resumeType)];
                    case 2:
                        orderInfo = _a.sent();
                        _a.label = 3;
                    case 3: return [2, new Promise(function (resolve) { return resolve(orderInfo); })];
                }
            });
        });
    };
    schemaOrder.prototype.setReaded = function (openID, resumeID, resumeType, readed) {
        return __awaiter(this, void 0, void 0, function () {
            var orderInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.recent(openID, resumeID, resumeType)];
                    case 1:
                        orderInfo = _a.sent();
                        if (utils_1["default"].empty(orderInfo) === false) {
                            return [2, this.findByIdAndUpdate(orderInfo.orderID, { orderReaded: readed })];
                        }
                        return [2, new Promise(function (resolve) { return resolve(false); })];
                }
            });
        });
    };
    return schemaOrder;
}(schema_1.schema));
exports["default"] = new schemaOrder();
