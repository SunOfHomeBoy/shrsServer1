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
function detailParttime(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var document, _a, orderSafe, member;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    parameters.resumeID = parameters.resumeID || parameters.openID;
                    parameters.openID = foundation_1.utils.openIDDecode(parameters.openID);
                    parameters.resumeID = foundation_1.utils.openIDDecode(parameters.resumeID);
                    return [4, foundation_1.schema.resume.findParttime(parameters.resumeID)];
                case 1:
                    document = _b.sent();
                    if (!document) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    _a = document;
                    return [4, foundation_1.schema.resume.onlineStatusRealtime(document.openID)];
                case 2:
                    _a.onlineStatus = _b.sent();
                    if (!(parameters.openID !== parameters.resumeID)) return [3, 5];
                    return [4, foundation_1.schema.resume.checkSafe(parameters.openID, parameters.resumeID, 'PARTTIME')];
                case 3:
                    orderSafe = _b.sent();
                    if (orderSafe) {
                        return [2, foundation_1.render({ code: 200, msg: '', data: foundation_1.schema.resume.formatParttime(document, 'SAFE', orderSafe) })];
                    }
                    return [4, foundation_1.log.parttime(req, parameters.resumeID, parameters)];
                case 4:
                    _b.sent();
                    return [2, foundation_1.render({ code: 200, msg: '', data: foundation_1.schema.resume.formatParttime(document, 'UNSAFE') })];
                case 5: return [4, foundation_1.schema.member.existsByID(parameters.openID)];
                case 6:
                    member = _b.sent();
                    if (!member) {
                        return [2, foundation_1.render({ code: 2018, msg: 'Invalid Member Information' })];
                    }
                    return [2, foundation_1.render({ code: 200, msg: '', data: foundation_1.schema.resume.formatParttime(document, parameters.resumeStep) })];
            }
        });
    });
}
exports["default"] = detailParttime;
