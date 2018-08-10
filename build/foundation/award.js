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
var index_1 = require("./index");
var award = (function () {
    function award() {
    }
    award.times = function (DateTime) {
        var periods = Math.floor((DateTime.getTime() - this.startTime) / 604800000) + 1;
        var curWeek = DateTime.getDay();
        var curHours = DateTime.getHours();
        return { periods: periods, curWeek: curWeek, curHours: curHours };
    };
    award.RandomNumBoth = function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range);
        return num;
    };
    award.zodiac = function (winNum, rule, periods, curTime) {
        return __awaiter(this, void 0, void 0, function () {
            var lottoZodiac, oneCallback, twoCallback, threeCallback, fourCallback, fiveCallback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        switch (winNum) {
                            case 1:
                                lottoZodiac = rule[0].data.rule.a;
                                break;
                            case 2:
                                lottoZodiac = rule[0].data.rule.b;
                                break;
                            case 3:
                                lottoZodiac = rule[0].data.rule.c;
                                break;
                            case 4:
                                lottoZodiac = rule[0].data.rule.d;
                                break;
                            case 5:
                                lottoZodiac = rule[0].data.rule.e;
                                break;
                            default:
                                lottoZodiac = 201;
                                break;
                        }
                        return [4, index_1.schema.record.find({
                                where: { recordType: 'winningUser', 'recordData.award': 1, 'recordData.periods': periods }
                            })];
                    case 1:
                        oneCallback = _a.sent();
                        return [4, index_1.schema.record.find({
                                where: { recordType: 'winningUser', 'recordData.award': 2, 'recordData.periods': periods }
                            })];
                    case 2:
                        twoCallback = _a.sent();
                        return [4, index_1.schema.record.find({
                                where: { recordType: 'winningUser', 'recordData.award': 3, 'recordData.periods': periods }
                            })];
                    case 3:
                        threeCallback = _a.sent();
                        return [4, index_1.schema.record.find({
                                where: { recordType: 'winningUser', 'recordData.award': 4, 'recordData.periods': periods }
                            })];
                    case 4:
                        fourCallback = _a.sent();
                        return [4, index_1.schema.record.find({
                                where: { recordType: 'winningUser', 'recordData.award': 5, 'recordData.periods': periods }
                            })];
                    case 5:
                        fiveCallback = _a.sent();
                        if (curTime >= 8 && curTime < 12) {
                            if (oneCallback.length >= 1)
                                winNum = -1;
                            if (twoCallback.length >= 1)
                                winNum = -1;
                        }
                        else if (curTime >= 12 && curTime < 18) {
                            if (oneCallback.length >= 2)
                                winNum = -2;
                            if (twoCallback.length >= 2)
                                winNum = -2;
                        }
                        else if (curTime >= 18 && curTime < 22) {
                            if (oneCallback.length >= 3)
                                winNum = -3;
                            if (twoCallback.length >= 3)
                                winNum = -3;
                        }
                        return [2, { winNum: winNum, lottoZodiac: lottoZodiac }];
                }
            });
        });
    };
    award.logical = function (DateTime, openID, req) {
        return __awaiter(this, void 0, void 0, function () {
            var times, winNum, rule, data, prizewinning, allDraw, allLoto, callback, logResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        times = this.times(DateTime);
                        winNum = this.RandomNumBoth(1, 10);
                        return [4, this.onlyRule(times)];
                    case 1:
                        rule = _a.sent();
                        if (!rule.rule || rule.rule.length > 1)
                            return [2, { code: 2019, message: 'Invalid rule' }];
                        return [4, this.zodiac(winNum, rule.rule, times.periods, times.curHours)];
                    case 2:
                        data = _a.sent();
                        if (!(data["lottoZodiac"] !== 201)) return [3, 4];
                        return [4, index_1.schema.record.insert({
                                _id: openID,
                                recordType: "winningUser",
                                recordDest: times.periods,
                                recordTime: DateTime,
                                recordData: {
                                    userOpenID: openID,
                                    award: winNum,
                                    periods: times.periods,
                                    zodiac: data.lottoZodiac
                                }
                            })];
                    case 3:
                        prizewinning = _a.sent();
                        if (!prizewinning) {
                            data.winNum = 0;
                            data.lottoZodiac = 0;
                        }
                        _a.label = 4;
                    case 4:
                        allDraw = {
                            openID: openID,
                            drawResult: data.winNum,
                            drawTime: DateTime,
                            data: { periods: times.periods }
                        };
                        return [4, index_1.schema.allDraw.find({ where: { openID: allDraw.openID, 'data.periods': times.periods } })];
                    case 5:
                        allLoto = _a.sent();
                        if (allLoto.length !== 0)
                            return [2, { code: 2019, message: 'Invalid lotto num' }];
                        return [4, index_1.schema.allDraw.insert(allDraw)];
                    case 6:
                        callback = _a.sent();
                        data["callback"] = callback;
                        return [4, index_1.log.lotto(req, allDraw)];
                    case 7:
                        logResult = _a.sent();
                        return [2, { code: 200, message: 'success', data: data }];
                }
            });
        });
    };
    award.winners = function (times) {
        return __awaiter(this, void 0, void 0, function () {
            var winners, _i, winners_1, item, winUserInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, index_1.schema.record.find({
                            where: { recordType: 'winningUser', recordDest: times.periods, 'recordData.award': { $lt: 5, $gt: 0 } },
                            fields: { recordData: true }
                        })];
                    case 1:
                        winners = _a.sent();
                        _i = 0, winners_1 = winners;
                        _a.label = 2;
                    case 2:
                        if (!(_i < winners_1.length)) return [3, 5];
                        item = winners_1[_i];
                        return [4, index_1.schema.member.find({
                                where: { openID: item["recordData"]["userOpenID"] },
                                fields: { realname: true, sex: 1, mobile: 1, localeProvince: 1, localeCity: 1, localeTown: 1, address: 1 }
                            })];
                    case 3:
                        winUserInfo = _a.sent();
                        item.recordData["UserInfo"] = winUserInfo;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [2, winners];
                }
            });
        });
    };
    award.onlyRule = function (times) {
        return __awaiter(this, void 0, void 0, function () {
            var rule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, index_1.schema.configures.find({
                            where: { name: 'lottoRule', 'data.periods': times.periods },
                            fields: { name: true, data: 1 }
                        })];
                    case 1:
                        rule = _a.sent();
                        if (rule.length > 1)
                            return [2, { code: 2019, msg: 'Invalid rule repetition' }];
                        if (index_1.utils.empty(rule))
                            return [2, { code: 2019, msg: 'Invalid empty rule' }];
                        return [2, { code: 200, rule: rule }];
                }
            });
        });
    };
    award.startTime = new Date(2018, 2, 10).getTime();
    return award;
}());
exports["default"] = award;
