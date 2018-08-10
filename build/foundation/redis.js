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
var ioredis = require("ioredis");
var redis_1 = require("../config/redis");
var redis = (function () {
    function redis() {
    }
    redis.instance = function () {
        if (!redis.cluster) {
            redis.cluster = new ioredis({ host: redis_1["default"].host, port: redis_1["default"].port, db: redis_1["default"].data });
        }
        return redis.cluster;
    };
    redis.command = function (shell, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var cluster = redis.instance();
                        cluster[shell].apply(cluster, args).then(function (callback) {
                            resolve(fn(callback));
                        });
                    })];
            });
        });
    };
    redis.expire = function (key, seconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('expire', function (callback) { return callback === 1; }, key, seconds)];
            });
        });
    };
    redis.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('get', function (callback) { return callback || ''; }, key)];
            });
        });
    };
    redis.set = function (key, member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('set', function (callback) { return callback === 'OK'; }, key, member)];
            });
        });
    };
    redis.getBuffer = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('getBuffer', function (callback) { return callback || new Buffer(''); }, key)];
            });
        });
    };
    redis.setBuffer = function (key, member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('set', function (callback) { return callback === 'OK'; }, key, member)];
            });
        });
    };
    redis.getHash = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('hgetall', function (callback) { return callback || {}; }, key)];
            });
        });
    };
    redis.setHash = function (key, member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('hmset', function (callback) { return callback === 'OK'; }, key, member)];
            });
        });
    };
    redis.popList = function (key, first) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command(first
                        ? 'lpop'
                        : 'rpop', function (callback) { return callback; }, key)];
            });
        });
    };
    redis.pushList = function (key) {
        var member = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            member[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command.apply(redis, ['lpush', function (callback) { return callback || 0; }, key].concat(member))];
            });
        });
    };
    redis.addSet = function (key) {
        var member = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            member[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command.apply(redis, ['sadd', function (callback) { return callback || 0; }, key].concat(member))];
            });
        });
    };
    redis.remSet = function (key) {
        var member = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            member[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command.apply(redis, ['srem', function (callback) { return callback || 0; }, key].concat(member))];
            });
        });
    };
    redis.getSet = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command('smembers', function (callback) { return callback || []; }, key)];
            });
        });
    };
    redis.delKeys = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, redis.command.apply(redis, ['del', function (callback) { return callback || 0; }].concat(keys))];
            });
        });
    };
    redis.cluster = null;
    return redis;
}());
exports["default"] = redis;
