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
function banners(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var memberInfo, _a, _b, callback;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    parameters.openID = foundation_1.utils.openIDDecode(parameters.openID);
                    if (foundation_1.utils.empty(parameters.openID) || typeof (parameters.bindingID) !== 'string') {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    return [4, foundation_1.schema.member.findById(parameters.openID)];
                case 1:
                    memberInfo = _c.sent();
                    _a = parameters.bindingType;
                    switch (_a) {
                        case 'WECHAT': return [3, 2];
                        case 'TENCENT': return [3, 3];
                        case 'VEDIO': return [3, 4];
                    }
                    return [3, 7];
                case 2:
                    if (foundation_1.utils.len(parameters.bindingID) !== 28) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    memberInfo.bandWechat = parameters.bindingID;
                    return [3, 7];
                case 3:
                    if (foundation_1.utils.len(parameters.bindingID) !== 32) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    memberInfo.bandTencent = parameters.bindingID;
                    return [3, 7];
                case 4:
                    if (!foundation_1.utils.empty(memberInfo.bandVedio)) return [3, 6];
                    _b = memberInfo;
                    return [4, foundation_1.vedio.registerMember(memberInfo.openID)];
                case 5:
                    _b.bandVedio = _c.sent();
                    _c.label = 6;
                case 6: return [3, 7];
                case 7: return [4, foundation_1.schema.member.save(memberInfo)];
                case 8:
                    callback = _c.sent();
                    if (foundation_1.utils.empty(callback)) {
                        return [2, foundation_1.render({ code: 2020, msg: 'Save Parameters Failth' })];
                    }
                    return [2, foundation_1.render({ code: 200, msg: '' })];
            }
        });
    });
}
exports["default"] = banners;
