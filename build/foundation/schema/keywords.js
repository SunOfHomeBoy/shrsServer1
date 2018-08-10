"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var schema_1 = require("./schema");
var utils_1 = require("../utils");
var schemaKeywords = (function (_super) {
    __extends(schemaKeywords, _super);
    function schemaKeywords() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    schemaKeywords.prototype.init = function () {
        return {
            name: 'keywords',
            schema: schema_1.newSchema({
                _id: String,
                name: String,
                tag: Number,
                total: Number,
                resume: Number,
                t201801: Number,
                t201802: Number,
                t201803: Number,
                t201804: Number,
                t201805: Number,
                t201806: Number,
                t201807: Number,
                t201808: Number,
                t201809: Number,
                t201810: Number,
                t201811: Number,
                t201812: Number,
                t201901: Number,
                t201902: Number,
                t201903: Number,
                t201904: Number,
                t201905: Number,
                t201906: Number,
                t201907: Number,
                t201908: Number,
                t201909: Number,
                t201910: Number,
                t201911: Number,
                t201912: Number,
                t202001: Number,
                t202002: Number,
                t202003: Number,
                t202004: Number,
                t202005: Number,
                t202007: Number,
                t202008: Number,
                t202009: Number,
                t202010: Number,
                t202011: Number,
                t202012: Number,
                t202101: Number,
                t202102: Number,
                t202103: Number,
                t202104: Number,
                t202105: Number,
                t202106: Number,
                t202107: Number,
                t202108: Number,
                t202109: Number,
                t202110: Number,
                t202111: Number,
                t202112: Number,
                t202201: Number,
                t202202: Number,
                t202203: Number,
                t202204: Number,
                t202205: Number,
                t202206: Number,
                t202207: Number,
                t202208: Number,
                t202209: Number,
                t202210: Number,
                t202211: Number,
                t202212: Number
            })
        };
    };
    schemaKeywords.prototype.sign = function (tag, keyword) {
        return __awaiter(this, void 0, void 0, function () {
            var name, tkey, document, callback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = keyword.toLowerCase();
                        tkey = 't' + utils_1["default"].formatDate('YYYYMM');
                        return [4, this.findById(tag + "#" + name)];
                    case 1:
                        document = _a.sent();
                        document._id = tag + "#" + name;
                        document.name = name;
                        document.tag = tag;
                        document.total = (document.total || 0) + 1;
                        document[tkey] = (document[tkey] || 0) + 1;
                        return [4, this.save(document)];
                    case 2:
                        callback = _a.sent();
                        if (utils_1["default"].empty(callback)) {
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        return [2, new Promise(function (resolve) { return resolve(true); })];
                }
            });
        });
    };
    schemaKeywords.prototype.signSearch = function (search) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.sign(1, search)];
            });
        });
    };
    schemaKeywords.prototype.signSkills = function (skills) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, skills_1, skill;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, skills_1 = skills;
                        _a.label = 1;
                    case 1:
                        if (!(_i < skills_1.length)) return [3, 4];
                        skill = skills_1[_i];
                        return [4, this.sign(2, skill)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2, new Promise(function (resolve) { return resolve(true); })];
                }
            });
        });
    };
    return schemaKeywords;
}(schema_1.schema));
exports["default"] = new schemaKeywords();
