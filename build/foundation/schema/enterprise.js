"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var schema_1 = require("./schema");
var member_1 = require("./member");
var schemaEnterprise = (function (_super) {
    __extends(schemaEnterprise, _super);
    function schemaEnterprise() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    schemaEnterprise.prototype.init = function () {
        return {
            name: 'enterprise',
            schema: schema_1.newSchema({
                _id: String,
                openID: String,
                name: String,
                type: Number,
                attr: String,
                identify: Array,
                industry: Array,
                nation: String,
                persons: String,
                address: String,
                logo: String,
                connect: String,
                description: String,
                begin: String,
                zipcode: String,
                email: String,
                homepage: String,
                qrcode: String,
                recruit: Array,
                welfare: Array,
                hidden: Boolean,
                status: Boolean,
                localeCountry: String,
                localeProvince: String,
                localeCity: String,
                localeTown: String,
                locationHome: {
                    type: Array,
                    index: '2dsphere'
                },
                enable: Boolean
            })
        };
    };
    schemaEnterprise.prototype.existsByName = function (name, enable) {
        if (enable === void 0) { enable = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.exists({ name: name, enable: enable })];
            });
        });
    };
    schemaEnterprise.prototype.New = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var memberInfo, document, callback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, member_1["default"].New(parameters)];
                    case 1:
                        memberInfo = _a.sent();
                        if (!memberInfo) {
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        if (typeof (parameters.enterpriseIndustry) === 'string') {
                            parameters.enterpriseIndustry = [
                                parameters.enterpriseIndustry
                            ];
                        }
                        document = {
                            openID: memberInfo.openID,
                            name: parameters.enterpriseName,
                            type: parameters.enterpriseType || 1,
                            attr: parameters.enterpriseAttr || '',
                            identify: parameters.enterpriseIdentify || [],
                            industry: parameters.enterpriseIndustry || [],
                            nation: parameters.enterpriseNation || '中国',
                            persons: parameters.enterprisePersons || '',
                            address: parameters.enterpriseAddress || '',
                            logo: parameters.enterpriseLogo || '',
                            connect: parameters.enterpriseConnect || '',
                            description: parameters.enterpriseDescription || '',
                            begin: parameters.enterpriseBegin || '',
                            homepage: parameters.enterpriseHomepage || '',
                            zipcode: parameters.enterpriseZipcode || '',
                            email: parameters.enterpriseEmail || '',
                            recruit: parameters.enterpriseRrecruit || [],
                            welfare: parameters.enterpriseWelfare || [],
                            localeCountry: parameters.localeCountry || '',
                            localeProvince: parameters.localeProvince || '',
                            localeCity: parameters.localeCity || '',
                            localeTown: parameters.localeTown || '',
                            locationHome: [],
                            hidden: false,
                            status: false,
                            enable: true
                        };
                        document._id = document.openID;
                        if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                            document.locationHome = [parameters.locationHomeX, parameters.locationHomeY];
                        }
                        return [4, this.save(document)];
                    case 2:
                        callback = _a.sent();
                        if (!callback) {
                            member_1["default"].findByIdAndRemove(memberInfo.openID);
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        return [2, new Promise(function (resolve) { return resolve(memberInfo); })];
                }
            });
        });
    };
    return schemaEnterprise;
}(schema_1.schema));
exports["default"] = new schemaEnterprise();
