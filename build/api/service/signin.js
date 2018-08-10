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
function signin(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var memberInfo, _a, _b, document;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (parameters.signinType !== 'MOBILE' && parameters.signinType !== 'WECHAT' && parameters.signinType !== 'TENCENT') {
                        return [2, foundation_1.render({ code: 2001, msg: '' })];
                    }
                    memberInfo = {};
                    _a = parameters.signinType;
                    switch (_a) {
                        case 'MOBILE': return [3, 1];
                        case 'WECHAT': return [3, 3];
                        case 'TENCENT': return [3, 5];
                    }
                    return [3, 7];
                case 1:
                    parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '');
                    if (!Object(config_1.mobileArea)[parameters.mobileArea]) {
                        return [2, foundation_1.render({ code: 2001, msg: 'Invalid parameters mobileArea' })];
                    }
                    if (foundation_1.utils.isMobileISO(parameters.mobile) === false) {
                        return [2, foundation_1.render({ code: 2001, msg: 'Invalid parameters mobile' })];
                    }
                    if (foundation_1.utils.empty(parameters.password) || parameters.password.length <= 5) {
                        return [2, foundation_1.render({ code: 2013, msg: 'Account or Password Errors' })];
                    }
                    return [4, foundation_1.schema.member.findOneByMobile(parameters.mobile, parameters.mobileArea)];
                case 2:
                    memberInfo = _c.sent();
                    if (foundation_1.utils.empty(memberInfo)) {
                        return [2, foundation_1.render({ code: 2013, msg: 'Invalid Member Information' })];
                    }
                    if (foundation_1.utils.cryptoPassword(parameters.password) !== memberInfo.password) {
                        return [2, foundation_1.render({ code: 2018, msg: 'Invalid Member Information' })];
                    }
                    return [3, 7];
                case 3:
                    if (String(parameters.wechatID).length !== 28) {
                        return [2, foundation_1.render({ code: 2014, msg: '' })];
                    }
                    return [4, foundation_1.schema.member.findOne({ where: { bandWechat: parameters.wechatID } })];
                case 4:
                    memberInfo = _c.sent();
                    if (foundation_1.utils.empty(memberInfo)) {
                        return [2, foundation_1.render({ code: 2014, msg: 'Not Found Third Account' })];
                    }
                    return [3, 7];
                case 5:
                    if (String(parameters.tencentID).length !== 32) {
                        return [2, foundation_1.render({ code: 2014, msg: '' })];
                    }
                    return [4, foundation_1.schema.member.findOne({ where: { bandTencent: parameters.tencentID } })];
                case 6:
                    memberInfo = _c.sent();
                    if (foundation_1.utils.empty(memberInfo)) {
                        return [2, foundation_1.render({ code: 2014, msg: 'Not Found Third Account' })];
                    }
                    return [3, 7];
                case 7:
                    memberInfo.signinTimes = (new Date().getTime()) - (memberInfo.signinDate || new Date()).getTime() < 2592000000
                        ? memberInfo.signinTimes + 1
                        : 1;
                    memberInfo.signinDate = new Date();
                    memberInfo.signinAll = memberInfo.signinAll + 1;
                    memberInfo.lastIp = memberInfo.signinIP;
                    memberInfo.lastTime = memberInfo.lastTime;
                    memberInfo.signinIP = req.IPAddress();
                    memberInfo.signinTime = new Date();
                    if (parameters.deviceID) {
                        memberInfo.deviceID = parameters.deviceID;
                    }
                    if (!foundation_1.utils.empty(memberInfo.bandVedio)) return [3, 9];
                    _b = memberInfo;
                    return [4, foundation_1.vedio.registerMember(memberInfo.openID)];
                case 8:
                    _b.bandVedio = _c.sent();
                    _c.label = 9;
                case 9:
                    if (!(typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number')) return [3, 11];
                    memberInfo.location = [parameters.locationX, parameters.locationY];
                    return [4, foundation_1.schema.resume.saveLocation(memberInfo.openID, parameters.locationX, parameters.locationY)];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11: return [4, foundation_1.schema.member.save(memberInfo)];
                case 12:
                    _c.sent();
                    return [4, foundation_1.log.signin(req, parameters.mobile, Object.assign(parameters, { openID: memberInfo.openID }))];
                case 13:
                    _c.sent();
                    document = {
                        tokenID: foundation_1.token.New(foundation_1.purview.API_PURVIEW_MEMBER, memberInfo.openID),
                        openID: foundation_1.utils.openIDEncode(memberInfo.openID),
                        isEnterprise: memberInfo.isEnterprise || false,
                        username: memberInfo.username || '',
                        realname: memberInfo.realname || '',
                        mobile: foundation_1.utils.formatMobile(memberInfo.mobile),
                        headerImg: memberInfo.img || '',
                        backgroundImg: memberInfo.backgroundImg || '',
                        rebate: memberInfo.rebate ? foundation_1.utils.openIDEncode(memberInfo.rebate) : '',
                        bandVedio: memberInfo.bandVedio || false,
                        infoVedio: foundation_1.utils.formatOpenID(memberInfo.openID)
                    };
                    return [2, foundation_1.render({ code: 200, msg: '', data: document })];
            }
        });
    });
}
exports["default"] = signin;
