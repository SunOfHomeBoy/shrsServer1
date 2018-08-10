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
var foundation_1 = require("../../foundation");
function beginOrder(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var orderInfo, memberInfo, rebateByRebate, rebateByResume, memberRebate, memberResume;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, foundation_1.schema.order.findById(parameters.orderID)];
                case 1:
                    orderInfo = _a.sent();
                    if (!(foundation_1.utils.empty(orderInfo) === false && orderInfo.orderRebate && parameters.rebateStatus)) return [3, 14];
                    return [4, foundation_1.schema.member.findById(orderInfo.openID)];
                case 2:
                    memberInfo = _a.sent();
                    return [4, foundation_1.schema.account.findById(orderInfo.orderID + '#' + orderInfo.orderComment)];
                case 3:
                    rebateByRebate = _a.sent();
                    return [4, foundation_1.schema.account.findById(orderInfo.orderID + '#' + orderInfo.orderComment + 'D')];
                case 4:
                    rebateByResume = _a.sent();
                    if (!(foundation_1.utils.empty(rebateByRebate) === false && !rebateByRebate.enable)) return [3, 8];
                    return [4, foundation_1.schema.member.findById(rebateByRebate.openID)];
                case 5:
                    memberRebate = _a.sent();
                    memberRebate.money0 = Number((memberRebate.money0 || 0) + rebateByRebate.money);
                    if (memberInfo.openID === memberRebate.openID) {
                        memberInfo.money0 = memberRebate.money0;
                    }
                    return [4, foundation_1.schema.member.save(memberRebate)];
                case 6:
                    _a.sent();
                    rebateByRebate.enable = true;
                    return [4, foundation_1.schema.account.save(rebateByRebate)];
                case 7:
                    _a.sent();
                    memberInfo.rebateStatus = false;
                    _a.label = 8;
                case 8:
                    if (!(foundation_1.utils.empty(rebateByResume) === false && !rebateByResume.enable)) return [3, 12];
                    return [4, foundation_1.schema.member.findById(rebateByResume.openID)];
                case 9:
                    memberResume = _a.sent();
                    memberResume.money0 = (memberResume.money0 || 0) + rebateByResume.money;
                    return [4, foundation_1.schema.member.save(memberResume)];
                case 10:
                    _a.sent();
                    rebateByResume.enable = true;
                    return [4, foundation_1.schema.account.save(rebateByResume)];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [4, foundation_1.schema.member.save(memberInfo)];
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14:
                    orderInfo.orderRebate = false;
                    orderInfo.orderReaded = true;
                    return [4, foundation_1.schema.order.save(orderInfo)];
                case 15:
                    _a.sent();
                    return [2, foundation_1.render({ code: 200, msg: '' })];
            }
        });
    });
}
exports["default"] = beginOrder;
