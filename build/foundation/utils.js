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
var crypto = require("crypto");
var fs = require("fs");
var moment = require("moment");
var uuid = require("uuid");
var request = require("request");
var utils = (function () {
    function utils() {
    }
    utils.empty = function (document) {
        switch (typeof (document)) {
            case 'undefined':
                return true;
            case 'boolean':
                return document === false;
            case 'number':
                return document === 0;
            case 'string':
                return document.length === 0;
            case 'function':
                return false;
        }
        if (document === null) {
            return true;
        }
        if (document instanceof Array) {
            return document.length === 0;
        }
        return Object.keys(document).length === 0;
    };
    utils.len = function (obj) {
        if (obj instanceof Array) {
            return Array.apply(void 0, obj).length;
        }
        if (typeof (obj) === 'object') {
            return Object(obj).keys().length;
        }
        return String(obj).length;
    };
    utils.inContains = function (obj, v) {
        for (var key in obj) {
            if (v === obj[key]) {
                return true;
            }
        }
        return false;
    };
    utils.sortASC = function (documents, fn) {
        if (!fn)
            fn = function (o) { return Number(o); };
        for (var i = 0; i < documents.length - 1; i++) {
            for (var j = 0; j < documents.length - 1 - i; j++) {
                if (fn(documents[j]) > fn(documents[j + 1])) {
                    var buf = documents[j];
                    documents[j] = documents[j + 1];
                    documents[j + 1] = buf;
                }
            }
        }
        return documents;
    };
    utils.sortDESC = function (documents, fn) {
        if (!fn)
            fn = function (o) { return Number(o); };
        for (var i = 0; i < documents.length - 1; i++) {
            for (var j = 0; j < documents.length - 1 - i; j++) {
                if (fn(documents[j]) < fn(documents[j + 1])) {
                    var e = documents[j];
                    documents[j] = documents[j + 1];
                    documents[j + 1] = e;
                }
            }
        }
        return documents;
    };
    utils.beforeToday = function (num) {
        var dt = new Date();
        if (num >= 1) {
            var td = new Date([
                dt.getFullYear(),
                dt.getMonth() + 1,
                dt.getDate()
            ].join('-'));
            td.setDate(dt.getDate() - num + 1);
            return new Date([
                dt.getFullYear(),
                dt.getMonth() + 1,
                dt.getDate()
            ].join('-'));
        }
        return dt;
    };
    utils.dateDifference = function (date1, date2) {
        return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
    };
    utils.gcDistance = function (lat1, lng1, lat2, lng2) {
        var radius = 6378137.0;
        var rad = function (num) { return (num * Math.PI) / 180.0; };
        return Math.round(Math.round((2 * radius * Math.asin(Math.sqrt(Math.pow(Math.sin((rad(lat1) - rad(lat2)) / 2), 2) +
            Math.cos(rad(lat1)) *
                Math.cos(rad(lat2)) *
                Math.pow(Math.sin((rad(lng1) - rad(lng2)) / 2), 2)))) * 10000.0) / 10000.0);
    };
    utils.isMobileISO = function (mobile) {
        return /^\d{6,11}$/i.test(mobile);
    };
    utils.isMobileChina = function (mobile) {
        return /^1(3|4|5|7|8|9)\d{9}$/i.test(mobile);
    };
    utils.isEmail = function (e) {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(e);
    };
    utils.union = function (document, dist) {
        for (var name in dist) {
            document[name] = dist[name];
        }
        return document;
    };
    utils.forEach = function (documents, fn) {
        for (var i = 0; i < documents.length; i++) {
            documents[i] = fn(documents[i]);
        }
        return documents;
    };
    utils.range = function (min, max, step) {
        if (step === void 0) { step = 1; }
        var documents = [];
        if (max < min || step <= 0) {
            return documents;
        }
        for (var buf = min; buf <= max; buf = buf + step) {
            documents.push(buf);
        }
        return documents;
    };
    utils.random = function (max, min) {
        if (min === void 0) { min = 0; }
        var range = max - min;
        if (range <= 0) {
            return Math.random();
        }
        return min + Math.round(range * Math.random());
    };
    utils.atKeys = function (document, keys, contain) {
        if (document === void 0) { document = {}; }
        if (keys === void 0) { keys = []; }
        if (contain === void 0) { contain = true; }
        var buffers = {};
        for (var key in document) {
            if (typeof (document[key]) !== 'undefined') {
                if (contain && keys.indexOf(key) !== -1) {
                    buffers[key] = document[key];
                }
                if (!contain && document[key] && keys.indexOf(key) === -1) {
                    buffers[key] = document[key];
                }
            }
        }
        return buffers;
    };
    utils.hash = function (str, code) {
        return crypto.createHash(code || 'md5').update(str).digest('hex');
    };
    utils.md5 = function (str) {
        return utils.hash(str, 'md5');
    };
    utils.sha256 = function (str) {
        return utils.hash(str, 'sha256');
    };
    utils.sha512 = function (str) {
        return utils.hash(str, 'sha512');
    };
    utils.time = function () {
        return new Date().getTime();
    };
    utils.timeInterval = function (begin, finish) {
        var timeBegin = typeof (begin) === 'number' ? begin : begin.getTime();
        var timeFinish = typeof (finish) === 'number' ? finish : (finish || new Date()).getTime();
        return Math.abs(timeFinish - timeBegin);
    };
    utils.cryptoPassword = function (password) {
        return utils.sha256(utils.md5(password) + utils.offsetPassword);
    };
    utils.uuid = function (prefix) {
        if (prefix === void 0) { prefix = ''; }
        return prefix + uuid.v4();
    };
    utils.openIDEncode = function (openID) {
        var random = new Date().getTime().toString();
        var buffer = new Buffer(String(openID).replace(/-/g, '')).toString('base64');
        return random.substr(-2, 1) + buffer.replace(/=$/, '') + random.substr(-1, 1);
    };
    utils.openIDDecode = function (openID) {
        var buffer = new Buffer(String(openID).substr(1).replace(/\d{1}$/, ''), 'base64').toString();
        return [
            buffer.substr(0, 9),
            buffer.substr(9, 4),
            buffer.substr(13, 4),
            buffer.substr(17, 4),
            buffer.substr(21)
        ].join('-');
    };
    utils.NewOpenID = function (mobile) {
        if (!mobile) {
            return utils.uuid('a');
        }
        return utils.uuid(mobile.substr(-1));
    };
    utils.formatOpenID = function (openID, prefix) {
        if (prefix === void 0) { prefix = 'B'; }
        return prefix + openID.replace(/-/g, '');
    };
    utils.NewArticleID = function () {
        var offset = (Date.now() - 1505620805000) % 1000000000;
        return utils.formatDate('YYYYMMDD') + offset.toString().substr(-6);
    };
    utils.NewOrderID = function () {
        var offset = parseInt(utils.uuid().substr(-12), 16).toString().substr(-8);
        return utils.formatDate('YYMMDD') + offset;
    };
    utils.formatDate = function (format, timestamp, timezone) {
        if (timezone === void 0) { timezone = 8.0; }
        return moment(timestamp || Date.now()).add(timezone - 8.0, 'hours').format(format || 'YYYY-MM-DD HH:mm:ss');
    };
    utils.formatMobile = function (mobile) {
        return [
            String(mobile).substring(0, 3),
            '****',
            String(mobile).substr(-4, 4)
        ].join('');
    };
    utils.formatIDCard = function (idcard) {
        return idcard.substr(0, idcard.length - 4) + '****';
    };
    utils.formatJSON = function (document) {
        return JSON.stringify(document, null, 8);
    };
    utils.consoleJSON = function (document) {
        console.log(JSON.stringify(document, null, 8));
    };
    utils.jsonEncode = function (document) {
        return JSON.stringify(document);
    };
    utils.jsonDecode = function (json, defs) {
        if (defs === void 0) { defs = {}; }
        try {
            return JSON.parse(json);
        }
        catch (err) { }
        return defs;
    };
    utils.jsonLoad = function (filename, defs) {
        if (defs === void 0) { defs = {}; }
        if (fs.existsSync(filename)) {
            try {
                var buffers = fs.readFileSync(filename);
                return utils.jsonDecode(buffers.toString().replace(/;\s$/i, ''), defs);
            }
            catch (err) { }
        }
        return defs;
    };
    utils.jsonDump = function (filename, document) {
        return fs.writeFileSync(filename, JSON.stringify(document));
    };
    utils.emitGET = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        request(uri, function (err, response, callback) {
                            if (!err && response.statusCode == 200) {
                                return resolve(callback);
                            }
                            resolve(null);
                        });
                    })];
            });
        });
    };
    utils.emitPOST = function (uri, requestData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        request({
                            url: uri,
                            form: requestData
                        }, function (err, response, callback) {
                            if (!err && response.statusCode == 200) {
                                return resolve(callback);
                            }
                            resolve(null);
                        });
                    })];
            });
        });
    };
    utils.getWeek = function (CurTime, thisTime) {
        if (thisTime === void 0) { thisTime = new Date(1970, 1, 5); }
        var thisTimeMs = thisTime.getTime();
        if (thisTimeMs < 0)
            return -1;
        var oneTimeMs = 24 * 60 * 60 * 1000;
        var thisDay = thisTime.getDay() !== 0 ? thisTime.getDay() - 1 : 6;
        var StartTime = thisTimeMs - (thisDay * oneTimeMs);
        if (CurTime.getTime() < StartTime)
            return 0;
        var periods = Math.floor((CurTime.getTime() - StartTime) / 604800000) + 1;
        return periods;
    };
    utils.offsetPassword = '64e2f797-0b07-4917-bcd9-3e34a5048ea0';
    return utils;
}());
exports["default"] = utils;
