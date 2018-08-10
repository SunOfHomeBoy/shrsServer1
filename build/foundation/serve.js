"use strict";
exports.__esModule = true;
var express = require("express");
var http = require("http");
var path = require("path");
var pm = require("pm");
var setting_1 = require("../config/setting");
var serve = (function () {
    function serve(configures) {
        this.configures = configures;
        this.configures = configures || {};
        this.configures.mappings = {};
        for (var _i = 0, _a = this.configures.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            this.configures.mappings[route.path] = route;
        }
    }
    serve.prototype.httpd = function () {
        var _this = this;
        http.createServer(this.api()).listen(setting_1["default"].port, function () {
            console.log(_this.configures.name + ' running on port ' + setting_1["default"].port);
        });
    };
    serve.prototype.master = function (rootPath) {
        var master = pm.createMaster({
            pidfile: path.join(setting_1["default"].pathTmpdir, this.configures.name + '.pid')
        });
        console.log(path.join(rootPath, this.configures.name + '-worker.js'));
        master.register(this.configures.name, path.join(rootPath, this.configures.name + '-worker.js'), {
            listen: setting_1["default"].masters,
            addr: process.env.NODE_ENV === 'production' ? '127.0.0.1' : '0.0.0.0'
        });
        master.dispatch();
    };
    serve.prototype.worker = function () {
        var worker = http.createServer(this.api());
        pm.createWorker().ready(function (socket, port) {
            worker.emit('connection', socket);
        });
    };
    serve.prototype.api = function () {
        var app = express();
        var configures = this.configures;
        app.set('env', process.env.NODE_ENV || 'development');
        app.set('port', configures.port || setting_1["default"].port);
        app.use('/', function (req, res, next) {
            res.end('good');
        });
        return app;
    };
    return serve;
}());
exports["default"] = serve;
