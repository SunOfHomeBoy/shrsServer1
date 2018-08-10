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
var needle = require("needle");
var foundation_1 = require("../../foundation");
var config_1 = require("../../config");
function upload(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        function fileCDN(fh) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, new Promise(function (resolve) {
                            fs.readFile(fh.path, function (err, buffers) {
                                console.log("decodeFhUri::", decodeURI(fh.name));
                                var targetName = new Buffer(foundation_1.utils.md5(String(buffers))).toString('base64').replace(/=/, '');
                                var targetSuff = fh.name.split('.')[1];
                                var targetFile = targetName + "." + targetSuff;
                                var targetDist = path.join(config_1.setting.pathPublic, foundation_1.utils.formatDate('YYYYMM'), targetFile);
                                var targetPath = path.dirname(targetDist);
                                fs.existsSync(config_1.setting.pathPublic) || fs.mkdirSync(config_1.setting.pathPublic);
                                fs.existsSync(targetPath) || fs.mkdirSync(targetPath);
                                fs.writeFile(targetDist, buffers, function (err) {
                                    if (err) {
                                        return resolve({ code: 201, msg: err.message });
                                    }
                                    needle.post('http://up.imgapi.com/', {
                                        file: {
                                            file: targetDist,
                                            content_type: fh.headers['content-type']
                                        },
                                        Token: config_1.outside.token,
                                        aid: config_1.outside.aid,
                                        deadline: Math.floor(Date.now() / 1000) + 60,
                                        from: 'file',
                                        httptype: 1
                                    }, { multipart: true }, function (err, callback) {
                                        if (err) {
                                            return resolve({ code: 202, msg: err.message });
                                        }
                                        var result = foundation_1.utils.jsonDecode(callback.body || '');
                                        if (err) {
                                            return resolve({ code: 203, msg: result.info });
                                        }
                                        return resolve({ code: 200, msg: 'success', data: { uri: result, name: targetFile } });
                                    });
                                });
                            });
                        })];
                });
            });
        }
        var _a, fh, cdns, i, cdn, cdn;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'POST');
                    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
                    _a = req.method.toUpperCase();
                    switch (_a) {
                        case 'OPTIONS': return [3, 1];
                        case 'POST': return [3, 2];
                    }
                    return [3, 9];
                case 1: return [2, foundation_1.render({ code: 201, msg: '' })];
                case 2:
                    fh = Object(req).files['photos'];
                    if (!(fh instanceof Array)) return [3, 7];
                    return [2, foundation_1.render({ code: 2019, msg: "no Array" })];
                case 3:
                    if (!(i < fh.length)) return [3, 6];
                    return [4, fileCDN(fh[i])];
                case 4:
                    cdn = _b.sent();
                    cdns.push(cdn.data);
                    if (!foundation_1.utils.empty(cdns)) {
                        fs.unlink(fh[i].path, function (err) { console.log(err, '删除'); });
                    }
                    _b.label = 5;
                case 5:
                    i++;
                    return [3, 3];
                case 6: return [2, foundation_1.render({ code: 200, msg: 'array', data: cdns })];
                case 7: return [4, fileCDN(fh)];
                case 8:
                    cdn = _b.sent();
                    if (!foundation_1.utils.empty(cdn) && cdn.data) {
                        fs.unlink(fh.path, function (err) { console.log(err, '删除'); });
                    }
                    return [2, foundation_1.render({ code: 200, msg: 'obj', data: cdn.data })];
                case 9: return [2, foundation_1.render({ code: 200, msg: 'fail to upload' })];
            }
        });
    });
}
exports["default"] = upload;
