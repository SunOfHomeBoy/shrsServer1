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
function mwOrder(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, filter, document, ids, _i, _b, item, key, resumes_1, buffers;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    filter = {
                        where: {
                            openID: foundation_1.utils.openIDDecode(parameters.openID),
                            orderType: 2,
                            orderStatus: 1
                        },
                        order: {
                            orderSubmit: -1,
                            orderID: -1
                        },
                        begin: parameters.begin || 1,
                        limit: parameters.limit || 10
                    };
                    if (parameters.resumeType === 'FULLTIME' || parameters.resumeType === 'PARTTIME') {
                        filter.where.orderComment = parameters.resumeType;
                    }
                    else {
                        filter.where.orderComment = {
                            $in: ['FULLTIME', 'PARTTIME']
                        };
                    }
                    return [4, foundation_1.schema.order.findPage(filter)];
                case 1:
                    document = _c.sent();
                    if (!(document.items instanceof Array && document.items.length > 0)) return [3, 3];
                    ids = [];
                    for (_i = 0, _b = document.items; _i < _b.length; _i++) {
                        item = _b[_i];
                        key = item.orderUser + "#" + item.orderComment;
                        if (ids.indexOf(key) === -1) {
                            ids.push(key);
                        }
                    }
                    return [4, (_a = foundation_1.schema.resume).findMapByIds.apply(_a, ids)];
                case 2:
                    resumes_1 = _c.sent();
                    buffers = foundation_1.utils.forEach(document.items, function (e) {
                        var resume = resumes_1[e.orderUser + "#" + e.orderComment] || {};
                        resume.submitDate = foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', e.orderSubmit);
                        return resume;
                    });
                    document.items = foundation_1.schema.resume.formatResumes(buffers, {
                        fields: ['submitDate'],
                        locationX: parameters.locationX,
                        locationY: parameters.locationY
                    });
                    _c.label = 3;
                case 3: return [2, foundation_1.render({ code: 200, msg: '', data: document })];
            }
        });
    });
}
exports["default"] = mwOrder;
