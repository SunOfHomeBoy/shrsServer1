"use strict";
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
var WechatPayment = require("node-wxpay");
var schema_1 = require("./schema");
var utils_1 = require("./utils");
var config_1 = require("../config");
var order_1 = require("./schema/order");
var welfareOpenID = 'w00000000-0000-0000-0000-000000000000';
var Payment = (function () {
    function Payment() {
    }
    Payment.wechat = function () {
        return new WechatPayment({
            appid: config_1.wxpay.appid,
            mch_id: config_1.wxpay.mch_id,
            partner_key: config_1.wxpay.apiKey
        });
    };
    Payment.callbackSuccess = function (out_trade_no) {
        return __awaiter(this, void 0, void 0, function () {
            var orderInfo, memberInfo, _a, a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, schema_1["default"].order.findById(out_trade_no)];
                    case 1:
                        orderInfo = _b.sent();
                        if (utils_1["default"].empty(orderInfo)) {
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        return [4, schema_1["default"].member.findById(orderInfo.openID)];
                    case 2:
                        memberInfo = _b.sent();
                        _a = orderInfo.orderType;
                        switch (_a) {
                            case 1: return [3, 3];
                            case 2: return [3, 7];
                            case 3: return [3, 11];
                        }
                        return [3, 12];
                    case 3:
                        if (!(orderInfo.orderStatus !== 1)) return [3, 5];
                        memberInfo.money0 = memberInfo.money0 + orderInfo.orderMoney;
                        return [4, schema_1["default"].member.save(memberInfo)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [4, schema_1["default"].account.rechange(orderInfo)];
                    case 6:
                        a = _b.sent();
                        return [3, 12];
                    case 7:
                        memberInfo.rebateStatus = true;
                        return [4, schema_1["default"].member.save(memberInfo)];
                    case 8:
                        _b.sent();
                        if (!(orderInfo.orderComment === 'FULLTIME' || orderInfo.orderComment === 'PARTTIME')) return [3, 10];
                        return [4, this.rebateByAccount(memberInfo, orderInfo)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10: return [3, 12];
                    case 11: return [3, 12];
                    case 12:
                        orderInfo.orderStatus = 1;
                        return [4, schema_1["default"].order.save(orderInfo)];
                    case 13:
                        _b.sent();
                        return [2, new Promise(function (resolve) { return resolve(true); })];
                }
            });
        });
    };
    Payment.rebateByAccount = function (memberInfo, orderInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var isVedio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isVedio = orderInfo.orderMoney === order_1["default"].itvPrice;
                        return [4, schema_1["default"].account.rebateByRebate(memberInfo.rebate, orderInfo.orderID, orderInfo.orderComment, isVedio)];
                    case 1:
                        _a.sent();
                        return [4, schema_1["default"].account.rebateByResume(orderInfo.orderUser, orderInfo.orderID, orderInfo.orderComment, isVedio)];
                    case 2:
                        _a.sent();
                        return [4, schema_1["default"].account.rebateByShare(welfareOpenID, orderInfo.orderID)];
                    case 3:
                        _a.sent();
                        return [2, new Promise(function (resolve) { return resolve(true); })];
                }
            });
        });
    };
    return Payment;
}());
exports["default"] = Payment;
