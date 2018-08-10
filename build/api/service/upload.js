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
var needle = require("needle");
var path = require("path");
var fs = require("fs");
function upload(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        function writeCDNFile(targetDist, buffers, contentType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) {
                            var targetPath = path.dirname(targetDist);
                            var targetFile = path.basename(targetDist);
                            fs.existsSync(config_1.setting.pathPublic) || fs.mkdirSync(config_1.setting.pathPublic);
                            fs.existsSync(targetPath) || fs.mkdirSync(targetPath);
                            fs.writeFile(targetDist, buffers, function (err) {
                                if (err) {
                                    return resolve({ success: false, msg: err.message });
                                }
                                needle.post('http://up.imgapi.com/', {
                                    file: {
                                        file: targetDist,
                                        content_type: 'image/' + contentType.toLowerCase()
                                    },
                                    Token: config_1.cdn.token,
                                    aid: config_1.cdn.aid,
                                    deadline: Math.floor(Date.now() / 1000) + 60,
                                    from: 'file',
                                    httptype: 1
                                }, { multipart: true }, function (err, callback) {
                                    if (err) {
                                        return resolve({ success: false, msg: err.message });
                                    }
                                    var result = foundation_1.utils.jsonDecode(callback.body || '');
                                    if (result.err) {
                                        return resolve({ success: false, msg: result.info });
                                    }
                                    return resolve({ success: true, uri: result.linkurl, name: targetFile });
                                });
                            });
                        })];
                });
            });
        }
        var buffers, targetName, targetSuff, targetDist, callback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(String(req.native.path).indexOf('/api/service/upload') !== -1)) return [3, 2];
                    buffers = new Buffer(parameters.contentData, 'base64');
                    if (['PNG', 'JPG', 'JPEG', 'GIF'].indexOf(parameters.contentType) === -1) {
                        return [2, foundation_1.render({ code: 2016, msg: 'Upload Format Invalid' })];
                    }
                    if (buffers.length >= 4194304) {
                        return [2, foundation_1.render({ code: 2017, msg: 'Upload Size too Large' })];
                    }
                    targetName = new Buffer(foundation_1.utils.md5(String(buffers))).toString('base64').replace(/=/, '');
                    targetSuff = String(parameters.contentType).toLowerCase();
                    targetDist = path.join(config_1.setting.pathPublic, foundation_1.utils.formatDate('YYYYMM'), targetName + "." + targetSuff);
                    return [4, writeCDNFile(targetDist, buffers, parameters.contentType)];
                case 1:
                    callback = _a.sent();
                    if (!callback.success) {
                        return [2, foundation_1.render({ code: 200, msg: '', data: targetDist.replace(config_1.setting.pathPublic, '/public') })];
                    }
                    return [2, foundation_1.render({ code: 200, msg: '', data: callback.uri })];
                case 2:
                    if (String(req.native.path).indexOf('/service/ajax/upload') !== -1) {
                    }
                    _a.label = 3;
                case 3: return [2, foundation_1.render({ code: 200, msg: '' })];
            }
        });
    });
}
exports["default"] = upload;
