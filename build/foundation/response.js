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
function render(document) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve) { return resolve(document); })];
        });
    });
}
exports.render = render;
var response = (function () {
    function response(native) {
        this.native = native;
    }
    response.prototype.redirect = function (uri) {
        this.native.redirect(uri, 301);
    };
    response.prototype.setHeader = function (field, value) {
        this.native.header(field, value);
    };
    response.prototype.renderString = function (str, status) {
        this.native.header('charset', 'utf8');
        this.native.header('Content-Type', 'text/plain');
        this.native.status(status || 200).end(str);
    };
    response.prototype.renderHTML = function (html, status) {
        this.native.header('charset', 'utf8');
        this.native.header('Content-Type', 'text/html');
        this.native.status(status || 200).end(html);
    };
    response.prototype.renderJSON = function (document) {
        this.native.header('charset', 'utf8');
        this.native.header('Content-Type', 'application/json');
        this.native.status(document.code < 1000 ? document.code : 200).end(JSON.stringify(document));
    };
    response.prototype.apiInternalServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.renderJSON({ code: 500, msg: 'Internal Server Error' });
                return [2];
            });
        });
    };
    response.prototype.apiNotFound = function () {
        this.renderJSON({ code: 404, msg: 'Not Found' });
    };
    response.prototype.apiPermission = function () {
        return this.renderJSON({ code: 403, msg: 'Permission Denied' });
    };
    response.prototype.errorGeneric = function (status, code) {
        this.renderHTML([
            '<html>',
            '<head><title>' + code + '</title></head>',
            '<body bgcolor="white">',
            '<center><h1>' + code + '</h1></center>',
            '<hr><center>Tengine/2.2.0</center>',
            '</body>',
            '</html>'
        ].join(''));
    };
    response.prototype.errorInternalServer = function () {
        this.errorGeneric(500, '500 Internal Server Error');
    };
    response.prototype.errorNotFound = function () {
        this.errorGeneric(404, '404 Not Found');
    };
    response.prototype.errorPermission = function () {
        this.errorGeneric(403, '403 Permission Denied');
    };
    return response;
}());
exports["default"] = response;
