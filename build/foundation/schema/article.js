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
var schemaArticle = (function (_super) {
    __extends(schemaArticle, _super);
    function schemaArticle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    schemaArticle.prototype.init = function () {
        return {
            name: 'article',
            schema: schema_1.newSchema({
                _id: String,
                openID: String,
                articleID: String,
                articleMode: String,
                articleMark: String,
                articleLang: String,
                articleType: String,
                title: String,
                subtitle: String,
                authors: String,
                linkURL: String,
                thumb: String,
                keywords: String,
                description: String,
                content: String,
                orderNumber: Number,
                hitNumber: Number,
                publish: Date,
                enable: Boolean
            })
        };
    };
    schemaArticle.prototype.saveSafe = function (configures) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = configures;
                        return [4, this.findById(configures._id)];
                    case 1:
                        document = _a.sent();
                        document._id = configures._id;
                        document.openID = parameters.openID || document.openID || '';
                        document.articleID = parameters.articleID || document.articleID || '';
                        document.articleMode = parameters.articleMode || document.articleMode || '';
                        document.articleMark = parameters.articleMark || document.articleMark || '';
                        document.articleLang = parameters.articleLang || document.articleLang || 'cn';
                        document.articleType = parameters.articleType || document.articleType || '';
                        document.title = parameters.title || document.title || '';
                        document.subtitle = parameters.subtitle || document.subtitle || '';
                        document.authors = parameters.authors || document.authors || '四海日盛';
                        document.linkURL = parameters.linkURL || document.linkURL || '';
                        document.thumb = parameters.thumb || document.thumb || '';
                        document.keywords = parameters.keywords || document.keywords || '';
                        document.description = parameters.description || document.description || '';
                        document.content = parameters.content || document.content || '';
                        document.orderNumber = parameters.orderNumber || document.orderNumber || 0;
                        document.hitNumber = parameters.hitNumber || document.hitNumber || 0;
                        document.publish = parameters.publish || document.publish || (new Date());
                        if (typeof (parameters.enable) === 'boolean') {
                            document.enable = parameters.enable;
                        }
                        else if (typeof (document.enable) === 'undefined') {
                            document.enable = true;
                        }
                        return [2, this.save(document)];
                }
            });
        });
    };
    schemaArticle.prototype.saveArticle = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                parameters.articleID = parameters.articleID || utils_1["default"].NewArticleID();
                parameters.articleMode = parameters.articleMode || '';
                parameters._id = [
                    parameters.articleID,
                    parameters.articleLang || 'cn'
                ].join('#');
                return [2, this.saveSafe(parameters)];
            });
        });
    };
    schemaArticle.prototype.saveCustom = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                parameters.articleMark = String(parameters.articleMark || 'DEFAULT').toUpperCase();
                parameters.articleMode = parameters.articleMode || '';
                parameters._id = [
                    parameters.articleMode,
                    parameters.articleMark,
                    parameters.articleLang
                ].join('#');
                return [2, this.saveSafe(parameters)];
            });
        });
    };
    return schemaArticle;
}(schema_1.schema));
exports["default"] = new schemaArticle();
