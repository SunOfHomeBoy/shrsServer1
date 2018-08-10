"use strict";
exports.__esModule = true;
var pureview = require("./purview");
var token_1 = require("../config/token");
var token = (function () {
    function token() {
    }
    token.New = function (purview, openID) {
        return new Buffer([
            token_1["default"].prefix,
            String(openID).replace(/-/g, ''),
            purview,
            (new Date().getTime() + token_1["default"].expire).toString(16)
        ].join('')).toString('base64');
    };
    token.NewDefault = function () {
        return token.New(pureview.API_PURVIEW_COMMON | pureview.API_PURVIEW_MEMBER | pureview.API_PURVIEW_ADMINS, '000000000-0000-0000-0000-000000000000');
    };
    token.valid = function (accessToken, purview) {
        if (!accessToken) {
            return (pureview.API_PURVIEW_COMMON & purview) !== 0;
        }
        var decrypted = new Buffer(accessToken, 'base64').toString().replace(token_1["default"].prefix, '');
        if (new Date().getTime() <= Number('0x' + decrypted.substring(34))) {
            if ((Number(decrypted.substr(33, 1)) & purview) !== 0) {
                return true;
            }
        }
        return false;
    };
    token.openID = function (accessToken) {
        var v = new Buffer(accessToken, 'base64').toString().substr(5, 34).split('');
        return [
            [v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9]].join(''),
            [v[10], v[11], v[12], v[13]].join(''),
            [v[14], v[15], v[16], v[17]].join(''),
            [v[18], v[19], v[20], v[21]].join(''),
            [v[22], v[23], v[24], v[25], v[26], v[27], v[28], v[29], v[30], v[31], v[32], v[33]].join('')
        ].join('-');
    };
    return token;
}());
exports["default"] = token;
