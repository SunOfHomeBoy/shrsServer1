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
var mongodb_1 = require("../mongodb");
var uuid = require("uuid");
exports.Mixed = mongodb_1["default"].Schema.Types.Mixed;
exports.newSchema = function (configures) { return new mongodb_1["default"].Schema(configures); };
var schema = (function () {
    function schema() {
        var init = this.init();
        this.model = mongodb_1["default"].model(init.name, init.schema);
    }
    schema.prototype.count = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.count(filter || {}, function (err, callback) {
                            resolve(callback || 0);
                        });
                    })];
            });
        });
    };
    schema.prototype.find = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model
                            .find(filter.where || {})
                            .sort(filter.order || { _id: -1 })
                            .skip(filter.skip || 0)
                            .limit(filter.limit || 1024)
                            .select(filter.fields || [])
                            .exec(function (err, callback) {
                            resolve(callback || []);
                        });
                    })];
            });
        });
    };
    schema.prototype.findMap = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var document, callback, _i, callback_1, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document = {};
                        return [4, this.find(filter)];
                    case 1:
                        callback = _a.sent();
                        for (_i = 0, callback_1 = callback; _i < callback_1.length; _i++) {
                            c = callback_1[_i];
                            document[c._id] = c;
                        }
                        return [2, new Promise(function (resolve) { return resolve(document); })];
                }
            });
        });
    };
    schema.prototype.findOne = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model
                            .findOne(filter.where || {})
                            .sort(filter.order || { _id: -1 })
                            .skip(filter.skip || 0)
                            .select(filter.fields || [])
                            .exec(function (err, callback) {
                            resolve(callback || {});
                        });
                    })];
            });
        });
    };
    schema.prototype.findOneAndUpdate = function (filter, document) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.findOneAndUpdate(filter, document, function (err, callback) {
                            resolve(callback || {});
                        });
                    })];
            });
        });
    };
    schema.prototype.findOneAndRemove = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.findOneAndRemove(filter, function (err, callback) {
                            resolve(callback || {});
                        });
                    })];
            });
        });
    };
    schema.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.findById(id, function (err, callback) {
                            resolve(callback || {});
                        });
                    })];
            });
        });
    };
    schema.prototype.findByIds = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var buffers, _a, ids_1, id, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        buffers = [];
                        _a = 0, ids_1 = ids;
                        _b.label = 1;
                    case 1:
                        if (!(_a < ids_1.length)) return [3, 4];
                        id = ids_1[_a];
                        return [4, this.findById(id)];
                    case 2:
                        data = _b.sent();
                        if (Object.keys(data).length !== 0) {
                            buffers.push(data);
                        }
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3, 1];
                    case 4: return [2, new Promise(function (resolve) { return resolve(buffers); })];
                }
            });
        });
    };
    schema.prototype.findMapByIds = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var document, callback, _a, callback_2, c;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        document = {};
                        return [4, this.findByIds.apply(this, ids)];
                    case 1:
                        callback = _b.sent();
                        for (_a = 0, callback_2 = callback; _a < callback_2.length; _a++) {
                            c = callback_2[_a];
                            document[c._id] = c;
                        }
                        return [2, new Promise(function (resolve) { return resolve(document); })];
                }
            });
        });
    };
    schema.prototype.findByIdAndUpdate = function (id, document) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.findByIdAndUpdate(id, document, function (err, callback) {
                            resolve(callback || {});
                        });
                    })];
            });
        });
    };
    schema.prototype.findByIdAndRemove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.findByIdAndRemove(id, function (err, callback) {
                            resolve(callback || {});
                        });
                    })];
            });
        });
    };
    schema.prototype.findPage = function (filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var document, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        filter.limit = filter.limit || 10;
                        filter.begin = filter.begin >= 1 ? filter.begin : 1;
                        filter.skip = (filter.begin - 1) * filter.limit;
                        document = {
                            total: 0,
                            pages: 0,
                            limit: filter.limit,
                            begin: filter.begin || 1,
                            items: []
                        };
                        _a = document;
                        return [4, this.count(filter.where)];
                    case 1:
                        _a.total = _c.sent();
                        document.pages = Number(Math.ceil(document.total / document.limit));
                        _b = document;
                        return [4, this.find(filter)];
                    case 2:
                        _b.items = _c.sent();
                        return [2, new Promise(function (resolve) { return resolve(document); })];
                }
            });
        });
    };
    schema.prototype.exists = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.findOne(filter).select('_id').exec(function (err, callback) {
                            resolve(callback !== null);
                        });
                    })];
            });
        });
    };
    schema.prototype.existsByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.findById(id).select('_id').exec(function (err, callback) {
                            resolve(callback !== null);
                        });
                    })];
            });
        });
    };
    schema.prototype.insert = function () {
        var documents = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            documents[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        for (var i = 0; i < documents.length; i++) {
                            if (!documents[i]._id) {
                                documents[i]._id = uuid.v4();
                            }
                        }
                        _this.model.insertMany(documents, function (err, callback) {
                            resolve(Object.keys(callback || {}).length !== 0);
                        });
                    })];
            });
        });
    };
    schema.prototype.save = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, callback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!document._id) {
                            return [2, this.insert(document)];
                        }
                        return [4, this.existsByID(document._id)];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            return [2, this.insert(document)];
                        }
                        return [4, this.findByIdAndUpdate(document._id, document)];
                    case 2:
                        callback = _a.sent();
                        return [2, new Promise(function (resolve) { return resolve(Object.keys(callback).length !== 0); })];
                }
            });
        });
    };
    schema.prototype.update = function (filter, document) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.update(filter, { $set: document }, { multi: true }, function (err, callback) {
                            resolve(callback.nModified || 0);
                        });
                    })];
            });
        });
    };
    schema.prototype.updateOne = function (filter, document) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        _this.model.update(filter, { $set: document }, { multi: false }, function (err, callback) {
                            resolve(callback.nModified || 0);
                        });
                    })];
            });
        });
    };
    schema.prototype.remove = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (filter === null || JSON.stringify(filter) === '{}') {
                    return [2, new Promise(function (resolve) { return resolve(false); })];
                }
                return [2, new Promise(function (resolve) {
                        _this.model.remove(filter, function (err) {
                            resolve(err === null);
                        });
                    })];
            });
        });
    };
    return schema;
}());
exports.schema = schema;
