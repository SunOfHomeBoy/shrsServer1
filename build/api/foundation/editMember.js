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
function editMember(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var memberInfo, callback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parameters.openID = foundation_1.utils.openIDDecode(parameters.openID);
                    return [4, foundation_1.schema.member.findById(parameters.openID)];
                case 1:
                    memberInfo = _a.sent();
                    if (foundation_1.utils.empty(memberInfo)) {
                        return [2, foundation_1.render({ code: 2018, msg: 'Invalid Member Information' })];
                    }
                    memberInfo.username = parameters.username || memberInfo.username || '';
                    memberInfo.realname = parameters.realname || memberInfo.realname || '';
                    memberInfo.img = parameters.headerImg || memberInfo.img || '';
                    memberInfo.sex = parameters.sex || memberInfo.sex || 0;
                    memberInfo.address = parameters.address || memberInfo.address || '';
                    memberInfo.birthdayYear = parameters.birthdayYear || memberInfo.birthdayYear || 0;
                    memberInfo.birthdayMonth = parameters.birthdayMonth || memberInfo.birthdayMonth || 0;
                    memberInfo.birthdayDay = parameters.birthdayDay || memberInfo.birthdayDay || 0;
                    memberInfo.localeCountry = parameters.localeCountry || memberInfo.localeCountry || '中国';
                    memberInfo.localeProvince = parameters.localeProvince || memberInfo.localeProvince || '';
                    memberInfo.localeCity = parameters.localeCity || memberInfo.localeCity || '';
                    memberInfo.localeTown = parameters.localeTown || memberInfo.localeTown || '';
                    memberInfo.backgroundImg = parameters.backgroundImg || memberInfo.backgroundImg || '';
                    memberInfo.signature = parameters.signature || memberInfo.signature || '';
                    if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                        memberInfo.locationHome = [parameters.locationHomeX, parameters.locationHomeY];
                    }
                    if (!(typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number')) return [3, 3];
                    memberInfo.location = [parameters.locationX, parameters.locationY];
                    return [4, foundation_1.schema.resume.saveLocation(parameters.openID, parameters.locationX, parameters.locationY)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4, foundation_1.schema.member.save(memberInfo)];
                case 4:
                    callback = _a.sent();
                    if (foundation_1.utils.empty(callback)) {
                        return [2, foundation_1.render({ code: 2020, msg: 'Save Parameters Failth' })];
                    }
                    return [2, foundation_1.render({ code: 200, msg: '' })];
            }
        });
    });
}
exports["default"] = editMember;