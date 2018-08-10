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
var config_1 = require("../../config");
var wechatQRCode = 'http://paysdk.weixin.qq.com/example/qrcode.php?data=';
function beginOrder(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var orderInformation, memberInfo, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    parameters.openID = foundation_1.utils.openIDDecode(parameters.openID);
                    if (foundation_1.utils.empty(parameters.openID) || foundation_1.utils.empty(parameters.orderPay)) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    if (['RECHANGE', 'FULLTIME', 'PARTTIME', 'TIXIAN'].indexOf(parameters.orderType) === -1) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    if (parameters.orderType === 'RECHANGE' || parameters.orderType === 'TIXIAN') {
                        if (foundation_1.utils.empty(parameters.orderMoney)) {
                            return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                        }
                    }
                    if (parameters.orderType === 'FULLTIME' || parameters.orderType === 'PARTTIME') {
                        if (foundation_1.utils.empty(parameters.resumeID)) {
                            return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                        }
                    }
                    if (['WECHAT', 'ALIPAY', 'SYSTEM', 'FREE'].indexOf(parameters.orderPay) === -1) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    orderInformation = {
                        openID: parameters.openID,
                        orderID: foundation_1.utils.NewOrderID(),
                        orderType: 0,
                        orderPay: 0,
                        orderMoney: 0,
                        orderScore: 0,
                        orderUser: '',
                        orderStatus: 3,
                        orderComment: '',
                        orderRebate: false
                    };
                    parameters.resumeID = foundation_1.utils.openIDDecode(parameters.resumeID);
                    return [4, foundation_1.schema.member.findById(parameters.openID)];
                case 1:
                    memberInfo = _b.sent();
                    switch (parameters.orderType) {
                        case 'RECHANGE':
                            orderInformation.orderType = 1;
                            orderInformation.orderMoney = parameters.orderMoney;
                            parameters.orderProduct = '账号充值';
                            break;
                        case 'TIXIAN':
                            orderInformation.orderType = 3;
                            orderInformation.orderMoney = parameters.orderMoney;
                            parameters.orderProduct = '';
                            break;
                        case 'FULLTIME':
                            orderInformation.orderType = 2;
                            orderInformation.orderMoney = memberInfo.rebateStatus ? foundation_1.schema.order.disPrice : foundation_1.schema.order.allPrice;
                            orderInformation.orderUser = parameters.resumeID;
                            orderInformation.orderComment = 'FULLTIME';
                            orderInformation.orderRebate = true;
                            memberInfo.rebateStatus = false;
                            parameters.orderProduct = '信息服务费';
                            if (parameters.infoType === 'VIDEOFIRST' || parameters.infoType === 'VIDEONEXT') {
                                orderInformation.orderMoney = foundation_1.schema.order.itvPrice;
                                if (parameters.infoType === 'VIDEONEXT') {
                                    orderInformation.orderComment = 'FULLTIME#VIDEONEXT';
                                }
                            }
                            break;
                        case 'PARTTIME':
                            orderInformation.orderType = 2;
                            orderInformation.orderMoney = memberInfo.rebateStatus ? foundation_1.schema.order.disPrice : foundation_1.schema.order.allPrice;
                            orderInformation.orderUser = parameters.resumeID;
                            orderInformation.orderComment = 'PARTTIME';
                            orderInformation.orderRebate = true;
                            memberInfo.rebateStatus = false;
                            parameters.orderProduct = '信息服务费';
                            if (parameters.infoType === 'VIDEOFIRST' || parameters.infoType === 'VIDEONEXT') {
                                orderInformation.orderMoney = foundation_1.schema.order.itvPrice;
                                if (parameters.infoType === 'VIDEONEXT') {
                                    orderInformation.orderComment = 'PARTTIME#VIDEONEXT';
                                }
                            }
                            break;
                    }
                    _a = parameters.orderPay;
                    switch (_a) {
                        case 'FREE': return [3, 2];
                        case 'SYSTEM': return [3, 5];
                        case 'WECHAT': return [3, 9];
                        case 'ALIPAY': return [3, 10];
                    }
                    return [3, 11];
                case 2:
                    if (memberInfo.score0 <= 0) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    orderInformation.orderPay = 4;
                    orderInformation.orderStatus = 1;
                    memberInfo.score0 = memberInfo.score0 - 1;
                    if (!(parameters.infoType === 'MOBILE' || parameters.infoType === 'VIDEOFIRST')) return [3, 4];
                    return [4, foundation_1.payment.rebateByAccount(memberInfo, orderInformation)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3, 11];
                case 5:
                    if (memberInfo.money0 <= orderInformation.orderMoney) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    if (foundation_1.utils.empty(memberInfo.passwordPay) || foundation_1.utils.len(parameters.passwordPay) !== 6) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    if (foundation_1.utils.cryptoPassword(parameters.passwordPay) !== memberInfo.passwordPay) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    orderInformation.orderPay = 4;
                    orderInformation.orderStatus = 1;
                    memberInfo.money0 = memberInfo.money0 - orderInformation.orderMoney;
                    if (!(parameters.infoType === 'MOBILE' || parameters.infoType === 'VIDEOFIRST')) return [3, 8];
                    return [4, foundation_1.schema.account.consume(orderInformation)];
                case 6:
                    _b.sent();
                    return [4, foundation_1.payment.rebateByAccount(memberInfo, orderInformation)];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8: return [3, 11];
                case 9:
                    orderInformation.orderPay = 3;
                    return [3, 11];
                case 10:
                    orderInformation.orderPay = 2;
                    return [3, 11];
                case 11: return [4, foundation_1.schema.member.save(memberInfo)];
                case 12:
                    _b.sent();
                    return [4, foundation_1.schema.order.New(orderInformation)];
                case 13:
                    _b.sent();
                    return [2, new Promise(function (resolve) {
                            switch (parameters.orderPay) {
                                case 'FREE':
                                    return resolve({ code: 200, msg: '' });
                                case 'SYSTEM':
                                    return resolve({ code: 200, msg: '' });
                                case 'WECHAT':
                                    return foundation_1.payment.wechat().createUnifiedOrder({
                                        body: parameters.orderProduct,
                                        out_trade_no: orderInformation.orderID,
                                        total_fee: orderInformation.orderMoney,
                                        notify_url: config_1.wxpay.notify_url,
                                        trade_type: parameters.deviceType === 'MOBILE' ? 'APP' : 'NATIVE'
                                    }, function (err, callback) {
                                        callback = callback || {};
                                        if (callback.return_code !== 'SUCCESS') {
                                            return resolve({ code: 200, msg: callback.return_msg });
                                        }
                                        var timestamp = Math.ceil(new Date().getTime() / 1000);
                                        return resolve({
                                            code: 200, msg: '', data: {
                                                appid: callback.appid,
                                                partnerid: callback.mch_id,
                                                prepayid: callback.prepay_id,
                                                noncestr: callback.nonce_str,
                                                timestamp: timestamp,
                                                qrcode: wechatQRCode + callback.code_url,
                                                orderid: orderInformation.orderID,
                                                sign: foundation_1.utils.md5([
                                                    'appid=' + callback.appid,
                                                    'noncestr=' + callback.nonce_str,
                                                    'package=Sign=WXPay',
                                                    'partnerid=' + callback.mch_id,
                                                    'prepayid=' + callback.prepay_id,
                                                    'timestamp=' + timestamp,
                                                    'key=' + config_1.wxpay.apiKey
                                                ].join('&')).toUpperCase()
                                            }
                                        });
                                    });
                                case 'ALIPAY':
                                    break;
                            }
                        })];
            }
        });
    });
}
exports["default"] = beginOrder;
