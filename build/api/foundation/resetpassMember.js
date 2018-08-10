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
function resetpassMember(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var memberInfo, callback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '');
                    if (parameters.resetStep !== 'FIRST' && parameters.resetStep !== 'SECOND') {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    if (foundation_1.sms.check(parameters.captcha, parameters.encrypt) === false) {
                        return [2, foundation_1.render({ code: 2007, msg: 'Please enter the correct verification code' })];
                    }
                    return [4, foundation_1.schema.member.findOneByMobile(parameters.mobile, parameters.mobileArea)];
                case 1:
                    memberInfo = _a.sent();
                    if (foundation_1.utils.empty(memberInfo)) {
                        return [2, foundation_1.render({ code: 2013, msg: 'Given account has not been registered' })];
                    }
                    if (parameters.resetStep === 'FIRST') {
                        return [2, foundation_1.render({ code: 200, msg: '' })];
                    }
                    if (foundation_1.utils.empty(parameters.password) || typeof (parameters.password) !== 'string' || parameters.password.length < 6) {
                        return [2, foundation_1.render({ code: 2003, msg: 'Password contains at least 6 characters' })];
                    }
                    if (/[A-Z]/.test(parameters.password) === false) {
                        return [2, foundation_1.render({ code: 2003, msg: 'Password contains at least 6 characters' })];
                    }
                    if (/[a-z]/.test(parameters.password) === false) {
                        return [2, foundation_1.render({ code: 2004, msg: 'Password must contain uppercase characters' })];
                    }
                    if (/[0-9]/.test(parameters.password) === false) {
                        return [2, foundation_1.render({ code: 2005, msg: 'Password must contain numeric characters' })];
                    }
                    if (parameters.password !== parameters.confirm) {
                        return [2, foundation_1.render({ code: 2006, msg: 'Password and Re-enter password must be consistent' })];
                    }
                    memberInfo.password = foundation_1.utils.cryptoPassword(parameters.password);
                    return [4, foundation_1.schema.member.save(memberInfo)];
                case 2:
                    callback = _a.sent();
                    if (foundation_1.utils.empty(callback)) {
                        return [2, foundation_1.render({ code: 2020, msg: 'Save Parameters Failth' })];
                    }
                    return [2, foundation_1.render({ code: 200, msg: '' })];
            }
        });
    });
}
exports["default"] = resetpassMember;
