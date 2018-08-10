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
var fs = require("fs");
var path = require("path");
var request = require("request");
var utils_1 = require("./utils");
var config_1 = require("../config");
var vedio = (function () {
    function vedio() {
    }
    vedio.token = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        request({
                            method: 'POST',
                            url: "http://a1.easemob.com/" + vedio.orgName + "/" + vedio.appName + "/token",
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                'grant_type': 'client_credentials',
                                'client_id': vedio.clientID,
                                'client_secret': vedio.clientSecret
                            })
                        }, function (err, response, callback) {
                            if (!err && response.statusCode == 200) {
                                var tmp = utils_1["default"].jsonDecode(callback);
                                if (utils_1["default"].empty(tmp.access_token) === false) {
                                    tmp.expires_start = utils_1["default"].time();
                                    utils_1["default"].jsonDump(vedio.tmpFile, tmp);
                                    return resolve(tmp.access_token);
                                }
                            }
                            return resolve(null);
                        });
                    })];
            });
        });
    };
    vedio.callback = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var access_token, tmp, access_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(fs.existsSync(vedio.tmpFile) === false)) return [3, 2];
                        return [4, vedio.token()];
                    case 1:
                        access_token = _a.sent();
                        return [2, fn(access_token)];
                    case 2:
                        tmp = utils_1["default"].jsonLoad(vedio.tmpFile);
                        if (!(!tmp.enexpires_start || utils_1["default"].time() - tmp.expires_start >= vedio.expiresIn)) return [3, 4];
                        return [4, vedio.token()];
                    case 3:
                        access_token = _a.sent();
                        return [2, fn(access_token)];
                    case 4: return [2, fn(tmp.access_token)];
                }
            });
        });
    };
    vedio.registerMember = function (openID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, vedio.callback(function (access_token) {
                        return new Promise(function (resolve) {
                            request({
                                method: 'POST',
                                url: "http://a1.easemob.com/" + vedio.orgName + "/" + vedio.appName + "/users",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'Authorization': 'Bearer ' + access_token
                                },
                                body: JSON.stringify({
                                    username: utils_1["default"].formatOpenID(openID),
                                    password: vedio.customPass
                                })
                            }, function (err, response, callback) {
                                if (!err && response.statusCode == 200) {
                                    return resolve(true);
                                }
                                return resolve(false);
                            });
                        });
                    })];
            });
        });
    };
    vedio.onlineMember = function (openID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, vedio.callback(function (access_token) {
                        var account = utils_1["default"].formatOpenID(openID);
                        return new Promise(function (resolve) {
                            request({
                                method: 'GET',
                                url: "http://a1.easemob.com/" + vedio.orgName + "/" + vedio.appName + "/users/" + account + "/status",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'Authorization': 'Bearer ' + access_token
                                }
                            }, function (err, response, callback) {
                                if (!err && response.statusCode == 200) {
                                    var tmp = utils_1["default"].jsonDecode(callback);
                                    return resolve(tmp.data[account] !== 'offline');
                                }
                                return resolve(false);
                            });
                        });
                    })];
            });
        });
    };
    vedio.orgName = '1169180327177665';
    vedio.appName = 'jingdianyixian';
    vedio.clientID = 'YXA60TaMwDGoEeiXB--hZWNm8w';
    vedio.clientSecret = 'YXA6jVWh9I2-Zie2l3gBi29Bp5NxXmo';
    vedio.tmpFile = path.join(config_1.setting.pathTmpdir, 'access_token.vedio');
    vedio.expiresIn = 604800000;
    vedio.customPass = 'Jdyx12345678';
    return vedio;
}());
exports["default"] = vedio;
