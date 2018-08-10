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
function detailArticle(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var callback, callback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(String(req.native.path).indexOf('cmsid') !== -1)) return [3, 3];
                    return [4, foundation_1.schema.article.findById('1#' + req.GET('s') + '#cn')];
                case 1:
                    callback = _a.sent();
                    if (foundation_1.utils.empty(callback)) {
                        return [2, foundation_1.render({ code: 404, msg: '' })];
                    }
                    return [4, foundation_1.log.article(req, callback.articleID)];
                case 2:
                    _a.sent();
                    return [2, foundation_1.render({
                            code: 200, msg: '', data: [
                                '<!DOCTYPE html>',
                                '<html>',
                                '<head>',
                                '<meta charset="utf-8"/>',
                                '<meta name="viewport" content="width=320,maximum-scale=1.3,user-scalable=no">',
                                '<style type="text/css">',
                                '*{margin:0;padding:0;text-decoration:none;list-style:none}',
                                '.box{padding-left:0.1rem;padding-right:0.1rem}',
                                'header{font-size:0.14rem;padding:0.18rem 0 0.12rem 0.12rem}',
                                '.title{color:rgb(0,119,181)}',
                                '.datetime{color:rgb(178,178,178);margin-top:0.12rem;font-size:0.12rem}',
                                'section{width:100%;overflow-x:hidden;padding-bottom:0.125rem}',
                                'section p{text-indent:0.25rem;font-size:0.12rem;line-height:1.5em;color:rgb(166,166,166);padding:0.0625rem;padding-bottom:0}',
                                'section img{display:block;position:relative;width:98.5%}',
                                'section p img{}',
                                '</style>',
                                '</head>',
                                '<body class="box">',
                                '<header>',
                                '<p class="title">' + callback.title + '</p>',
                                '<p class="datetime">' + foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', callback.publish) + '</p>',
                                '</header>',
                                '<section>' + callback.content + '</section>',
                                "<script>(function(doc,win){var docEl=doc.documentElement,resizeEvt='orientationchange' in window ? 'orientationchange' : 'resize',recalc=function(){var clientWidth = docEl.clientWidth;if (!clientWidth) return;docEl.style.fontSize=100*(clientWidth/320)+'px';};if(!doc.addEventListener)return;win.addEventListener(resizeEvt, recalc,false);doc.addEventListener('DOMContentLoaded',recalc,false);})(document, window);</script>",
                                '</body>',
                                '</html>'
                            ].join('')
                        })];
                case 3:
                    if (!(String(req.native.path).indexOf('detailArticle') === -1)) return [3, 6];
                    return [4, foundation_1.schema.article.findById("1#" + parameters.articleID + "#" + parameters.articleLang)];
                case 4:
                    callback = _a.sent();
                    if (foundation_1.utils.empty(callback)) {
                        return [2, foundation_1.render({ code: 2019, msg: 'Invalid Parameters' })];
                    }
                    return [4, foundation_1.log.article(req, parameters.articleID)];
                case 5:
                    _a.sent();
                    return [2, foundation_1.render({
                            code: 200, msg: '', data: {
                                articleID: callback.articleID || '',
                                articleLang: callback.articleLang || 'cn',
                                title: callback.title || '',
                                subtitle: callback.subtitle || '',
                                articleType: callback.articleType || '',
                                authors: callback.authors || '',
                                linkURL: callback.linkURL || '',
                                thumb: callback.thumb || '',
                                keywords: callback.keywords || '',
                                description: callback.description || '',
                                content: callback.content || '',
                                orderNumber: callback.orderNumber || 0,
                                hitNumber: callback.hitNumber || 0,
                                publish: foundation_1.utils.formatDate('YYYY-MM-DD HH:mm:ss', callback.publish)
                            }
                        })];
                case 6: return [2, foundation_1.render({ code: 200, msg: '' })];
            }
        });
    });
}
exports["default"] = detailArticle;
