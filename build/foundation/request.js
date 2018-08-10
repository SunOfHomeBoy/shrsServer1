"use strict";
exports.__esModule = true;
var request = (function () {
    function request(native) {
        this.native = native;
    }
    request.prototype.GET = function (name, def) {
        if (this.native.query) {
            if (!name) {
                return this.native.query;
            }
            return this.native.query[name] || def;
        }
        return null;
    };
    request.prototype.POST = function (name, def) {
        if (this.native.body) {
            if (!name) {
                return this.native.body;
            }
            return this.native.body[name] || def;
        }
        return null;
    };
    request.prototype.REQUEST = function (name, def) {
        return this.POST(name) || this.GET(name) || def;
    };
    request.prototype.COOKIE = function (name, def) {
        if (this.native.cookies) {
            if (!name) {
                return this.native.cookies;
            }
            return this.native.cookies[name] || def;
        }
        return null;
    };
    request.prototype.SESSION = function (name, def) {
        if (this.native.session) {
            if (!name) {
                return this.native.session;
            }
            return this.native.session[name] || def;
        }
        return null;
    };
    request.prototype.getHeader = function (field, def) {
        if (!field) {
            return this.native.headers;
        }
        return this.native.header(field) || def;
    };
    request.prototype.language = function (headers) {
        headers = headers || this.getHeader('accept-languag', '');
        return headers.split(';')[0].split(',')[0];
    };
    request.prototype.method = function () {
        return String(this.native.method).toUpperCase();
    };
    request.prototype.platform = function () {
        var userAgent = this.getHeader('user-agent', '').toLowerCase();
        var platforms = [
            {
                sign: 'windows',
                name: 'Windows'
            },
            {
                sign: 'mac',
                name: 'Mac'
            },
            {
                sign: 'micromessenger',
                name: 'Wechat'
            },
            {
                sign: 'ipad',
                name: 'iPad'
            },
            {
                sign: 'iphone',
                name: 'iPhone'
            },
            {
                sign: 'android',
                name: 'Android'
            },
            {
                sign: 'mobile',
                name: 'Mobile'
            },
            {
                sign: 'linux',
                name: 'Linux'
            }
        ];
        for (var _i = 0, platforms_1 = platforms; _i < platforms_1.length; _i++) {
            var platform = platforms_1[_i];
            if (userAgent.indexOf(platform.sign) !== -1) {
                return platform.name;
            }
        }
        return 'Default';
    };
    request.prototype.IPAddress = function () {
        return this.native.header('x-forwarded-for') || this.native.ip;
    };
    request.prototype.timezone = function () {
        return parseFloat(this.REQUEST('timezone') || this.COOKIE('timezone') || '8.0');
    };
    request.prototype.accessToken = function () {
        return this.REQUEST('accessToken') || this.COOKIE('accessToken') || '';
    };
    request.prototype.appID = function () {
        return this.REQUEST('appid') || '';
    };
    return request;
}());
exports["default"] = request;
