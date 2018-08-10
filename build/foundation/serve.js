"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var express = require("express");
var session = require("express-session");
var fileStreamRotator = require("file-stream-rotator");
var fs = require("fs");
var http = require("http");
var morgan = require("morgan");
var multiparty = require("connect-multiparty");
var path = require("path");
var pm = require("pm");
var log_1 = require("./log");
var request_1 = require("./request");
var response_1 = require("./response");
var utils_1 = require("./utils");
var dev_1 = require("./dev");
var setting_1 = require("../config/setting");
var upload_1 = require("../api/imgUpload/upload");
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
        app.use(compression());
        app.use('/public', express.static(setting_1["default"].pathPublic));
        app.use('/assets', express.static(setting_1["default"].pathAssets));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        app.use(cookieParser());
        app.use(session({
            secret: 'shrs',
            name: 'shrsID',
            cookie: {
                httpOnly: true
            },
            resave: false,
            saveUninitialized: true
        }));
        var logdir = path.join(setting_1["default"].pathTmpdir, configures.name || 'default');
        fs.existsSync(setting_1["default"].pathTmpdir) || fs.mkdirSync(setting_1["default"].pathTmpdir);
        fs.existsSync(logdir) || fs.mkdirSync(logdir);
        if (process.env.NODE_ENV !== 'production') {
            console.log("use combined");
            app.use(morgan('combined'));
        }
        else {
            console.log("use log");
            var options = {
                stream: fileStreamRotator.getStream({
                    date_format: 'YYYYMMDD',
                    filename: path.join(logdir, configures.name + '-%DATE%.log'),
                    frequency: 'daily',
                    verbose: false
                })
            };
            app.use(morgan('combined', options));
        }
        if (process.env.NODE_ENV !== 'production') {
            app.use('/development', function (req, res, next) {
                res.header('Content-Type', 'text/html;charset=utf-8');
                res.end(dev_1["default"].render({ pathinfo: req.path }));
            });
        }
        app.use('/service/upload/imgUpload', multiparty(), function (req, res, next) {
            upload_1["default"](req, res, next).then(function (callback) {
                console.log(callback);
                res.header('charset', 'utf8');
                res.header('Content-Type', 'application/json');
                res.status(callback.code < 1000 ? callback.code : 200).end(JSON.stringify(callback));
            });
        });
        app.use(function (req, res, next) {
            var requestData = new request_1["default"](req);
            var responseData = new response_1["default"](res);
            var accessToken = requestData.REQUEST('accessToken') || requestData.COOKIE('accessToken') || '';
            var timezone = parseFloat(requestData.REQUEST('timezone', '8.0'));
            var appID = requestData.REQUEST('appid');
            var parameters = utils_1["default"].jsonDecode(requestData.REQUEST('parameters'));
            var controller = configures.mappings[req.path];
            if (!controller || !controller.component) {
                return responseData.apiNotFound();
            }
            if (/^\/api\//i.test(req.path) === false) {
                return controller.component(requestData, responseData, parameters).then(function (callback) {
                    switch (callback.code) {
                        case 403:
                            return responseData.errorPermission();
                        case 404:
                            return responseData.errorNotFound();
                        default:
                            return responseData.renderHTML(callback.data, callback.code);
                    }
                }, function (err) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(err);
                    }
                    responseData.errorInternalServer();
                });
            }
            if (controller.method !== 'GET' && utils_1["default"].empty(requestData.POST())) {
                return responseData.apiPermission();
            }
            var url = requestData.getHeader("Origin");
            responseData.setHeader('Access-Control-Allow-Origin', url);
            responseData.setHeader('Access-Control-Allow-Methods', 'POST');
            responseData.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
            responseData.setHeader("Access-Control-ALLOW-Credentials", "true");
            if (!requestData.SESSION().user && controller.auth > 1) {
                console.log(111111);
                res.setHeader('Set-Cookie', ['user=true;path=/;max-age=0;', 'access=0;path=/;max-age=0;']);
                responseData.renderJSON({ code: 403, msg: 'do not have permission' });
            }
            log_1["default"].api(requestData);
            controller.component(requestData, responseData, parameters).then(function (callback) {
                responseData.renderJSON(callback);
            }, function (err) {
                if (process.env.NODE_ENV !== 'production') {
                    console.log(err);
                }
                console.log(err);
                responseData.apiInternalServer();
            });
        });
        return app;
    };
    return serve;
}());
exports["default"] = serve;
