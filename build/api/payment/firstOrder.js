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
        var infoType, orderInfo, orderBuff, memberFrom, memberTo, onlineFrom, onlineTo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (foundation_1.utils.empty(parameters.openID) || foundation_1.utils.empty(parameters.resumeID)) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    if (['FULLTIME', 'PARTTIME'].indexOf(parameters.resumeType) === -1) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    parameters.openID = foundation_1.utils.openIDDecode(parameters.openID);
                    parameters.resumeID = foundation_1.utils.openIDDecode(parameters.resumeID);
                    infoType = 'MOBILE';
                    return [4, foundation_1.schema.order.recent(parameters.openID, parameters.resumeID, parameters.resumeType)];
                case 1:
                    orderInfo = _a.sent();
                    if (!(parameters.infoType === 'VIDEO')) return [3, 3];
                    return [4, foundation_1.schema.order.recentSub(parameters.openID, parameters.resumeID, parameters.resumeType)];
                case 2:
                    orderBuff = _a.sent();
                    if (foundation_1.utils.empty(orderBuff) === false) {
                        orderInfo = orderBuff;
                    }
                    infoType = orderInfo.orderMoney === foundation_1.schema.order.itvPrice ? 'VIDEO' : 'MOBILE';
                    _a.label = 3;
                case 3:
                    if (foundation_1.utils.empty(orderInfo)) {
                        return [2, foundation_1.render({ code: 2020, msg: 'Save Parameters Failth' })];
                    }
                    return [4, foundation_1.schema.member.findById(orderInfo.openID)];
                case 4:
                    memberFrom = _a.sent();
                    return [4, foundation_1.schema.member.findById(orderInfo.orderUser)];
                case 5:
                    memberTo = _a.sent();
                    return [4, foundation_1.vedio.onlineMember(orderInfo.openID)];
                case 6:
                    onlineFrom = _a.sent();
                    return [4, foundation_1.vedio.onlineMember(orderInfo.orderUser)];
                case 7:
                    onlineTo = _a.sent();
                    return [2, foundation_1.render({
                            code: 200, msg: '', data: {
                                orderID: orderInfo.orderID,
                                orderRebate: orderInfo.orderRebate,
                                orderVideo: orderInfo.orderRebate,
                                orderFrom: foundation_1.utils.formatOpenID(orderInfo.openID),
                                stateFrom: memberFrom.bandVedio || false,
                                onlineFrom: onlineFrom,
                                orderTo: foundation_1.utils.formatOpenID(orderInfo.orderUser),
                                stateTo: memberTo.bandVedio || false,
                                onlineTo: onlineTo,
                                infoType: infoType
                            }
                        })];
            }
        });
    });
}
exports["default"] = beginOrder;
