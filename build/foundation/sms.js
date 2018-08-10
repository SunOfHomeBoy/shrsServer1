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
var sdk = require("@alicloud/sms-sdk");
var utils_1 = require("./utils");
var password_1 = require("../config/password");
var sms = (function () {
    function sms() {
    }
    sms.NewCode = function () {
        var caches = [];
        for (var _i = 0, _a = utils_1["default"].uuid().split(''); _i < _a.length; _i++) {
            var item = _a[_i];
            if ('0123456789'.indexOf(item) !== -1 && caches.length < 6) {
                caches.push(item);
            }
        }
        if (caches.length < 6) {
            for (var i = 0; i < 6 - caches.length; i++) {
                caches.push((Math.random() * 9).toString());
            }
        }
        return caches.join('');
    };
    sms.encrypt = function (code) {
        return utils_1["default"].md5(code + '#' + password_1["default"].offset);
    };
    sms.check = function (code, encrypt) {
        return utils_1["default"].empty(code) === false && sms.encrypt(code) === encrypt;
    };
    sms.send = function (mobile, mobileArea, smsType, code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var parameters = {
                            PhoneNumbers: mobile,
                            SignName: '京典一线',
                            TemplateParam: utils_1["default"].jsonEncode({
                                no: code
                            }),
                            TemplateCode: ''
                        };
                        switch (smsType) {
                            case 'SIGNIN':
                                parameters.TemplateCode = 'SMS_123292193';
                                break;
                            case 'SIGNUP':
                                parameters.TemplateCode = 'SMS_123292192';
                                break;
                            case 'RESETPASSWORD':
                                parameters.TemplateCode = 'SMS_129747057';
                        }
                        new sdk({
                            accessKeyId: sms.accessKeyID,
                            secretAccessKey: sms.secretAccessKey
                        }).sendSMS(parameters).then(function (callback) {
                            return resolve(callback.Code === 'OK');
                        });
                    })];
            });
        });
    };
    sms.accessKeyID = 'LTAIDOA6SND0jwdO';
    sms.secretAccessKey = '3r3VhrD0iycoHDbYZnO6ed7oOWRONP';
    return sms;
}());
exports["default"] = sms;
