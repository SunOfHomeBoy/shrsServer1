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
};
exports.__esModule = true;
var foundation_1 = require("../../foundation");
var config_1 = require("../../config");
function sendSMS(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
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
                    if (parameters.mobileArea === '86' && foundation_1.utils.isMobileChina(parameters.mobile) === false) {
                        return [2, foundation_1.render({ code: 2001, msg: 'Invalid Parameters Chinese Mobile' })];
                    }
                    if (['SIGNIN', 'SIGNUP', 'RESETPASSWORD'].indexOf(parameters.smsType) === -1) {
                        return [2, foundation_1.render({ code: 200, msg: '' })];
                    }
                    parameters.randomCode = foundation_1.sms.NewCode();
                    parameters.messageBegin = new Date();
                    _a = parameters;
                    return [4, foundation_1.sms.send(parameters.mobile, parameters.mobileArea, parameters.smsType, parameters.randomCode)];
                case 1:
                    _a.messageData = _b.sent();
                    parameters.messageFinish = new Date();
                    foundation_1.schema.message.sms(parameters);
                    if (!parameters.messageData || typeof (parameters.messageData) !== 'boolean') {
                        return [2, foundation_1.render({ code: 2009, msg: 'Message send too often later' })];
                    }
                    return [2, foundation_1.render({ code: 200, msg: '', data: foundation_1.sms.encrypt(parameters.randomCode) })];
            }
        });
    });
}
exports["default"] = sendSMS;
