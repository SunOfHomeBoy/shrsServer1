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
var fs = require("fs");
var path = require("path");
function dataHandle(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var val, count, allMobile, _i, val_1, i, regMobile, userTest, member, fulltime, parttime, fr, pr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fs.writeFileSync(path.join('/mnt/d/Project', "/req.json"), "json(req)", 'utf-8');
                    if (foundation_1.utils.empty(parameters.data)) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    val = String(parameters.data)
                        .replace(/\r\n/g, '\n')
                        .replace(/\r/g, '\n')
                        .split('\n');
                    count = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };
                    allMobile = [];
                    _i = 0, val_1 = val;
                    _a.label = 1;
                case 1:
                    if (!(_i < val_1.length)) return [3, 9];
                    i = val_1[_i];
                    regMobile = i.replace(/(^\s*)|(\s*$)/g, "");
                    if (!(regMobile.length !== 0)) return [3, 8];
                    userTest = {
                        mobile: regMobile,
                        typeCode: '',
                        result: ''
                    };
                    count.a++;
                    if (!!foundation_1.utils.isMobileChina(regMobile)) return [3, 2];
                    userTest.typeCode = 'B';
                    userTest.result = '手机号码格式错误';
                    count.d++;
                    return [3, 7];
                case 2:
                    count.b++;
                    return [4, foundation_1.schema.member.findOneByMobile(regMobile, '86')];
                case 3:
                    member = _a.sent();
                    if (!foundation_1.utils.empty(member)) return [3, 4];
                    userTest.typeCode = 'C';
                    userTest.result = '手机号码尚未注册';
                    count.e++;
                    return [3, 7];
                case 4: return [4, foundation_1.schema.resume.findFulltime(member.openID)];
                case 5:
                    fulltime = _a.sent();
                    return [4, foundation_1.schema.resume.findParttime(member.openID)];
                case 6:
                    parttime = _a.sent();
                    fr = fulltime.resumeComplete || 0, pr = parttime.resumeComplete || 0;
                    if (fr < 80 && pr < 80) {
                        userTest.typeCode = 'F';
                        userTest.result = '两种简历均不合格';
                        count.h++;
                    }
                    else if (fr < 80 && pr > 80) {
                        userTest.typeCode = 'D';
                        userTest.result = '全职简历不合格';
                        count.f++;
                    }
                    else if (fr > 80 && pr < 80) {
                        userTest.typeCode = 'E';
                        userTest.result = '兼职简历不合格';
                        count.g++;
                    }
                    else if (fr > 80 && pr > 80) {
                        userTest.typeCode = 'A';
                        userTest.result = '注册信息合格';
                        count.c++;
                    }
                    _a.label = 7;
                case 7:
                    if (userTest.mobile !== '')
                        allMobile.push(userTest);
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3, 1];
                case 9: return [2, foundation_1.render({ code: 200, msg: '', data: { count: count, allMobile: allMobile } })];
            }
        });
    });
}
exports["default"] = dataHandle;
