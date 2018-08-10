"use strict";
exports.__esModule = true;
var foundation_1 = require("./foundation");
var api_1 = require("./api");
exports["default"] = new foundation_1.serve({
    name: 'webservices',
    routes: api_1["default"]
});
