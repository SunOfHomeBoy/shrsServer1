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
var debugPrivate = config_1.setting.debug;
function signup(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var existsMobile, existsEnterprise, callback, _a, document;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '');
                    if (!Object(config_1.mobileArea)[parameters.mobileArea]) {
                        return [2, foundation_1.render({ code: 2001, msg: 'Invalid parameters mobileArea' })];
                    }
                    if (foundation_1.utils.isMobileISO(parameters.mobile) === false) {
                        return [2, foundation_1.render({ code: 2001, msg: 'Invalid parameters mobile' })];
                    }
                    if (foundation_1.utils.isMobileChina(parameters.mobile) === false) {
                        return [2, foundation_1.render({ code: 2001, msg: 'Invalid parameters Chinese mobile' })];
                    }
                    if (foundation_1.utils.empty(parameters.password) || typeof (parameters.password) !== 'string' || parameters.password.length < 6) {
                        return [2, foundation_1.render({ code: 2003, msg: 'Password contains at least 6 characters' })];
                    }
                    if (parameters.password !== parameters.confirm) {
                        return [2, foundation_1.render({ code: 2006, msg: 'Password and Re-enter password must be consistent' })];
                    }
                    if (!parameters.captcha || !parameters.encrypt || foundation_1.sms.encrypt(parameters.captcha) !== parameters.encrypt) {
                        if (debugPrivate === false) {
                            return [2, foundation_1.render({ code: 2007, msg: 'Please enter the correct verification code' })];
                        }
                    }
                    return [4, foundation_1.schema.member.existsByMobile(parameters.mobile, parameters.mobileArea)];
                case 1:
                    existsMobile = _b.sent();
                    if (existsMobile) {
                        return [2, foundation_1.render({ code: 2010, msg: 'Given mobile has been registered' })];
                    }
                    if (!(parameters.registerType === 'ENTERPRISE')) return [3, 3];
                    return [4, foundation_1.schema.enterprise.existsByName(parameters.enterpriseName)];
                case 2:
                    existsEnterprise = _b.sent();
                    if (existsEnterprise) {
                        return [2, foundation_1.render({ code: 2011, msg: 'Given enterprise has been registered' })];
                    }
                    _b.label = 3;
                case 3:
                    callback = {};
                    parameters.registerIP = req.IPAddress();
                    parameters.signinIP = parameters.registerIP;
                    parameters.role = 0;
                    _a = parameters.registerType;
                    switch (_a) {
                        case 'PERSON': return [3, 4];
                        case 'ENTERPRISE': return [3, 6];
                    }
                    return [3, 8];
                case 4:
                    if (debugPrivate) {
                        parameters.role = 1;
                    }
                    return [4, foundation_1.schema.member.New(parameters)];
                case 5:
                    callback = _b.sent();
                    return [3, 8];
                case 6: return [4, foundation_1.schema.enterprise.New(parameters)];
                case 7:
                    callback = _b.sent();
                    return [3, 8];
                case 8:
                    if (foundation_1.utils.empty(callback)) {
                        return [2, foundation_1.render({ code: 2012, msg: 'Account Registered Failth' })];
                    }
                    document = {
                        tokenID: foundation_1.token.New(foundation_1.purview.API_PURVIEW_MEMBER, callback.openID),
                        openID: foundation_1.utils.openIDEncode(callback.openID),
                        isEnterprise: parameters.registerType === 'ENTERPRISE',
                        username: callback.username || '',
                        realname: callback.realname || '',
                        mobile: foundation_1.utils.formatMobile(parameters.mobile),
                        headerImg: callback.img || '',
                        backgroundImg: callback.backgroundImg || '',
                        rebate: callback.rebate ? foundation_1.utils.openIDEncode(callback.rebate) : '',
                        bandVedio: callback.bandVedio || false,
                        infoVedio: foundation_1.utils.formatOpenID(callback.openID)
                    };
                    return [2, foundation_1.render({ code: 200, msg: '', data: document })];
            }
        });
    });
}
exports["default"] = signup;
