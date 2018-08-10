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
var regions_1 = require("../regions");
var custom_1 = require("../articles/custom");
var article01_1 = require("../articles/article01");
var article02_1 = require("../articles/article02");
var article03_1 = require("../articles/article03");
var article04_1 = require("../articles/article04");
var article05_1 = require("../articles/article05");
var skill_1 = require("../configures/skill");
var banners_1 = require("../configures/banners");
var members_1 = require("../member/members");
var resumes_1 = require("../member/resumes");
var company_1 = require("../company");
var orders_1 = require("../orders/orders");
var administrators_1 = require("../administrators/administrators");
var documentBuffers = {
    'administrator': [
        administrators_1["default"]
    ],
    'configures': regions_1["default"].concat(banners_1["default"], [
        skill_1["default"]
    ]),
    'articles': custom_1["default"].concat(article01_1["default"], article02_1["default"], article03_1["default"], article04_1["default"], article05_1["default"]),
    'members': members_1["default"].slice(),
    'resumes': resumes_1["default"].slice(),
    'company': company_1["default"].slice(),
    'orders': orders_1["default"].slice()
};
function beginsV001() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _i, name, schemaBuffers, _c, schemaBuffers_1, document, _d, key, key, recruits, welfares, i, _e, _f, item, callback_1, callback, member, callback_2;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('Begin: ' + (new Date().toString()));
                    _a = [];
                    for (_b in documentBuffers)
                        _a.push(_b);
                    _i = 0;
                    _g.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3, 26];
                    name = _a[_i];
                    schemaBuffers = Object(documentBuffers)[name];
                    _c = 0, schemaBuffers_1 = schemaBuffers;
                    _g.label = 2;
                case 2:
                    if (!(_c < schemaBuffers_1.length)) return [3, 25];
                    document = schemaBuffers_1[_c];
                    _d = name;
                    switch (_d) {
                        case 'administrator': return [3, 3];
                        case 'configures': return [3, 5];
                        case 'articles': return [3, 7];
                        case 'members': return [3, 9];
                        case 'resumes': return [3, 11];
                        case 'company': return [3, 13];
                        case 'orders': return [3, 19];
                    }
                    return [3, 24];
                case 3: return [4, foundation_1.schema.administrator.save(document)];
                case 4:
                    _g.sent();
                    return [3, 24];
                case 5: return [4, foundation_1.schema.configures.set(document)];
                case 6:
                    _g.sent();
                    return [3, 24];
                case 7:
                    document.enable = true;
                    if (document.articleID) {
                        document.publish = new Date([
                            document.articleID.substr(0, 4),
                            document.articleID.substr(4, 2),
                            document.articleID.substr(6, 2)
                        ].join('-'));
                    }
                    return [4, foundation_1.schema.article.save(document)];
                case 8:
                    _g.sent();
                    return [3, 24];
                case 9:
                    for (key in document) {
                        if (document[key]['$date']) {
                            document[key] = new Date(document[key]['$date']);
                        }
                    }
                    return [4, foundation_1.schema.member.save(document)];
                case 10:
                    _g.sent();
                    return [3, 24];
                case 11:
                    for (key in document) {
                        if (document[key]['$date']) {
                            document[key] = new Date(document[key]['$date']);
                        }
                    }
                    document.resumeHidden = false;
                    return [4, foundation_1.schema.resume.save(document)];
                case 12:
                    _g.sent();
                    return [3, 24];
                case 13:
                    recruits = [];
                    welfares = [];
                    document.password = 'Jdyx88888';
                    document.registerType = 'ENTERPRISE';
                    i = 0;
                    _g.label = 14;
                case 14:
                    if (!(i < document.recruitments.length)) return [3, 17];
                    document.recruitments[i]._id = String(document.openID).replace('3c6e', '000' + i);
                    document.recruitments[i].openID = document.openID;
                    document.recruitments[i].company = document.enterpriseName;
                    document.recruitments[i].address = document.enterpriseAddress;
                    document.recruitments[i].localeCountry = document.localeCountry;
                    document.recruitments[i].localeProvince = document.localeProvince;
                    document.recruitments[i].localeCity = document.localeCity;
                    document.recruitments[i].localeTown = document.localeTown;
                    document.recruitments[i].locationHomeX = document.locationHomeX;
                    document.recruitments[i].locationHomeY = document.locationHomeY;
                    recruits.push(document.recruitments[i].workName);
                    if (document.recruitments[i].welfare instanceof Array) {
                        for (_e = 0, _f = document.recruitments[i].welfare; _e < _f.length; _e++) {
                            item = _f[_e];
                            if (welfares.indexOf(item) === -1) {
                                welfares.push(item);
                            }
                        }
                    }
                    return [4, foundation_1.schema.recruitment.New(document.recruitments[i])];
                case 15:
                    callback_1 = _g.sent();
                    _g.label = 16;
                case 16:
                    i++;
                    return [3, 14];
                case 17:
                    document.enterpriseRrecruit = recruits;
                    document.enterpriseWelfare = welfares;
                    return [4, foundation_1.schema.enterprise.New(document)];
                case 18:
                    callback = _g.sent();
                    return [3, 24];
                case 19: return [4, foundation_1.schema.member.findOneByMobile(document.openID, '86')];
                case 20:
                    member = _g.sent();
                    if (foundation_1.utils.empty(member)) {
                        return [3, 24];
                    }
                    document.openID = member.openID;
                    if (!(foundation_1.utils.empty(document.orderUser) === false)) return [3, 22];
                    return [4, foundation_1.schema.member.findOneByMobile(document.orderUser, '86')];
                case 21:
                    callback_2 = _g.sent();
                    document.orderUser = callback_2.openID;
                    _g.label = 22;
                case 22:
                    document._id = document.orderID;
                    document.orderUpdate = new Date();
                    document.orderStatus = 1;
                    document.orderScore = 0;
                    return [4, foundation_1.schema.order.save(document)];
                case 23:
                    _g.sent();
                    return [3, 24];
                case 24:
                    _c++;
                    return [3, 2];
                case 25:
                    _i++;
                    return [3, 1];
                case 26:
                    console.log('Finish: ' + (new Date().toString()));
                    process.exit(0);
                    return [2];
            }
        });
    });
}
exports["default"] = beginsV001;
