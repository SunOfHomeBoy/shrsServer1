"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var mongodb_1 = require("../config/mongodb");
mongoose.connect("mongodb://" + mongodb_1["default"].host + ":" + mongodb_1["default"].port + "/" + mongodb_1["default"].data, {
    useMongoClient: true
});
exports["default"] = mongoose;
