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
function detailMember(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var v, member, document, _a, _b, _c, fulltime, parttime;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    parameters.openID = foundation_1.utils.openIDDecode(parameters.openID);
                    parameters.items = foundation_1.utils.empty(parameters.items) === false ? String(parameters.items).split('|') : [];
                    if (foundation_1.utils.empty(parameters.vedio) === false && foundation_1.utils.len(parameters.vedio) === 34) {
                        v = String(parameters.vedio).split('');
                        parameters.openID = [
                            [v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9]].join(''),
                            [v[10], v[11], v[12], v[13]].join(''),
                            [v[14], v[15], v[16], v[17]].join(''),
                            [v[18], v[19], v[20], v[21]].join(''),
                            [v[22], v[23], v[24], v[25], v[26], v[27], v[28], v[29], v[30], v[31], v[32], v[33]].join('')
                        ].join('-');
                    }
                    return [4, foundation_1.schema.member.findById(parameters.openID)];
                case 1:
                    member = _d.sent();
                    if (Object.keys(member).length === 0) {
                        return [2, foundation_1.render({ code: 2018, msg: 'Invalid Member Information' })];
                    }
                    document = {
                        openID: foundation_1.utils.openIDEncode(parameters.openID)
                    };
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('mobileArea') !== -1) {
                        document.mobileArea = member.mobileArea || '86';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('mobile') !== -1) {
                        document.mobile = foundation_1.utils.empty(member.mobile) === false ? foundation_1.utils.formatMobile(member.mobile) : '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('username') !== -1) {
                        document.username = member.username || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('realname') !== -1) {
                        document.realname = member.realname || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('headerImg') !== -1) {
                        document.headerImg = member.img || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('passwordPay') !== -1) {
                        document.passwordPay = !foundation_1.utils.empty(member.passwordPay);
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('sex') !== -1) {
                        document.sex = member.sex || 0;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('isEnterprise') !== -1) {
                        document.isEnterprise = member.isEnterprise || false;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('signature') !== -1) {
                        document.signature = member.signature || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('birthdayYear') !== -1) {
                        document.birthdayYear = member.birthdayYear || 0;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('birthdayMonth') !== -1) {
                        document.birthdayMonth = member.birthdayMonth || 0;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('birthdayDay') !== -1) {
                        document.birthdayDay = member.birthdayDay || 0;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('workYears') !== -1) {
                        document.workYears = member.workYears || 0;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('education') !== -1) {
                        document.education = member.education || 0;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('idcardNumber') !== -1) {
                        document.idcardNumber = foundation_1.utils.formatIDCard(member.idcardNumber || '');
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('email') !== -1) {
                        document.email = member.email || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('backgroundImg') !== -1) {
                        document.backgroundImg = member.backgroundImg || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('localeCountry') !== -1) {
                        document.localeCountry = member.localeCountry || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('localeCity') !== -1) {
                        document.localeCity = member.localeCity || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('localeTown') !== -1) {
                        document.localeTown = member.localeTown || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('address') !== -1) {
                        document.address = member.address || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('locationHome') !== -1) {
                        document.locationHome = member.locationHome || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('registerIP') !== -1) {
                        document.registerIP = member.registerIP || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('registerTime') !== -1) {
                        document.registerTime = foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', member.registerTime);
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('lastIP') !== -1) {
                        document.lastIP = member.lastIP || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('lastTime') !== -1) {
                        document.lastTime = foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', member.lastTime);
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('deviceID') !== -1) {
                        document.deviceID = member.deviceID || '';
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('statusEmail') !== -1) {
                        document.statusEmail = member.statusEmail || false;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('statusIDCard') !== -1) {
                        document.statusIDCard = member.statusIDCard || false;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('statusMobile') !== -1) {
                        document.statusMobile = member.statusMobile || true;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('bandWechat') !== -1) {
                        document.bandWechat = foundation_1.utils.empty(member.bandWechat) === false;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('bandTencent') !== -1) {
                        document.bandTencent = foundation_1.utils.empty(member.bandTencent) === false;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('money') !== -1) {
                        document.money = member.money0 || 0;
                    }
                    if (foundation_1.utils.empty(parameters.item) || parameters.item.indexOf('score') !== -1) {
                        document.score = member.score0 || 0;
                    }
                    if (!(foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('seeWho') !== -1)) return [3, 3];
                    _a = document;
                    return [4, foundation_1.schema.order.totalSeeWho(parameters.openID)];
                case 2:
                    _a.seeWho = _d.sent();
                    _d.label = 3;
                case 3:
                    if (!(foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('lookMe') !== -1)) return [3, 5];
                    _b = document;
                    return [4, foundation_1.schema.order.totalLookMe(parameters.openID)];
                case 4:
                    _b.lookMe = _d.sent();
                    _d.label = 5;
                case 5:
                    if (!(foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('unreadLookMe') !== -1)) return [3, 7];
                    _c = document;
                    return [4, foundation_1.schema.order.totalLookMe(parameters.openID, false)];
                case 6:
                    _c.unreadLookMe = _d.sent();
                    _d.label = 7;
                case 7:
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('bandVedio') !== -1) {
                        document.bandVedio = member.bandVedio || false;
                    }
                    if (foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('infoVedio') !== -1) {
                        document.infoVedio = foundation_1.utils.formatOpenID(member.openID);
                    }
                    if (!(foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('fulltime') !== -1)) return [3, 9];
                    document.fulltime = {};
                    if (!!member.isEnterprise) return [3, 9];
                    return [4, foundation_1.schema.resume.findFulltime(member.openID)];
                case 8:
                    fulltime = _d.sent();
                    document.fulltime = {
                        resumeUpdate: foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', fulltime.resumeUpdate),
                        resumeComplete: fulltime.resumeComplete || 0,
                        expectCountry: fulltime.expectCountry || '中国',
                        expectProvince: fulltime.expectProvince || '',
                        expectCity: fulltime.expectCity || '',
                        expectTown: fulltime.expectTown || '',
                        skill: fulltime.skill || [],
                        signature: fulltime.signature || '',
                        expectWork: fulltime.expectWork || ''
                    };
                    _d.label = 9;
                case 9:
                    if (!(foundation_1.utils.empty(parameters.items) || parameters.items.indexOf('parttime') !== -1)) return [3, 11];
                    document.parttime = {};
                    if (!!member.isEnterprise) return [3, 11];
                    return [4, foundation_1.schema.resume.findParttime(member.openID)];
                case 10:
                    parttime = _d.sent();
                    document.parttime = {
                        resumeUpdate: foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', parttime.resumeUpdate),
                        resumeComplete: parttime.resumeComplete || 0,
                        localeCountry: parttime.localeCountry || '中国',
                        localeProvince: parttime.localeProvince || '',
                        localeCity: parttime.localeCity || '',
                        localeTown: parttime.localeTown || '',
                        skill: parttime.skill || [],
                        signature: parttime.signature || ''
                    };
                    _d.label = 11;
                case 11: return [2, foundation_1.render({ code: 200, msg: '', data: document })];
            }
        });
    });
}
exports["default"] = detailMember;
