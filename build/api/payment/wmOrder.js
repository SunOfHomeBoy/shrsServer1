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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
function wmOrder(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, filter, document, ids, _i, _c, item, members, enterprises, items, _d, _e, item, member, enterprise;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    filter = {
                        where: {
                            orderUser: foundation_1.utils.openIDDecode(parameters.openID),
                            orderType: 2,
                            orderStatus: 1,
                            orderComment: {
                                $in: ['FULLTIME', 'PARTTIME']
                            }
                        },
                        order: {
                            orderSubmit: -1,
                            orderID: -1
                        },
                        begin: parameters.begin || 1,
                        limit: parameters.limit || 10
                    };
                    return [4, foundation_1.schema.order.findPage(filter)];
                case 1:
                    document = _f.sent();
                    if (!(document.items instanceof Array && document.items.length > 0)) return [3, 4];
                    ids = [];
                    for (_i = 0, _c = document.items; _i < _c.length; _i++) {
                        item = _c[_i];
                        if (ids.indexOf(item.openID) === -1) {
                            ids.push(item.openID);
                        }
                    }
                    return [4, (_a = foundation_1.schema.member).findMapByIds.apply(_a, ids)];
                case 2:
                    members = _f.sent();
                    return [4, (_b = foundation_1.schema.enterprise).findMapByIds.apply(_b, ids)];
                case 3:
                    enterprises = _f.sent();
                    items = [];
                    for (_d = 0, _e = document.items; _d < _e.length; _d++) {
                        item = _e[_d];
                        member = members[item.openID] || {};
                        enterprise = enterprises[item.openID] || {};
                        items.push({
                            openID: foundation_1.utils.openIDEncode(item.openID),
                            username: member.username || '',
                            realname: member.realname || '',
                            sex: member.sex || 0,
                            img: member.img || '',
                            mobile: foundation_1.utils.formatMobile(member.mobile),
                            mobileArea: member.mobileArea || '86',
                            address: member.address || '',
                            isEnterprise: member.isEnterprise || false,
                            enterpriseName: enterprise.name || '',
                            enterpriseAttr: enterprise.attr || '',
                            enterpriseLogo: enterprise.logo || '',
                            enterpriseAddress: enterprise.address || '',
                            submitDate: foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', item.orderSubmit),
                            locationX: (member.location || [])[0] || 0,
                            locationY: (member.location || [])[1] || 0,
                            distance: foundation_1.utils.gcDistance((member.location || [])[0] || 0, (member.location || [])[1] || 0, parameters.locationX, parameters.locationY),
                            orderID: item.orderID || '',
                            readed: item.orderReaded || false,
                            resumeType: item.orderComment || ''
                        });
                    }
                    document.items = items;
                    _f.label = 4;
                case 4: return [2, foundation_1.render({ code: 200, msg: '', data: document })];
            }
        });
    });
}
exports["default"] = wmOrder;
