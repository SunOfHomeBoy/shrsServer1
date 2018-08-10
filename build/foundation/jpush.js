"use strict";
exports.__esModule = true;
var jPushSDK = require("jpush-sdk");
var schema_1 = require("./schema");
var utils_1 = require("./utils");
var jpush = (function () {
    function jpush() {
    }
    jpush.send = function (to, message, parameters) {
        try {
            jPushSDK.buildClient(jpush.appKey, jpush.masterSecret)
                .push()
                .setPlatform('ios', 'android')
                .setAudience(jPushSDK.registration_id(to))
                .setNotification(message)
                .setMessage(message, null, null, parameters.extras || {})
                .setOptions(null, 60)
                .send(function (err, res) {
                if (utils_1["default"].empty(err)) {
                    schema_1["default"].message.push({
                        noticeType: parameters.noticeType,
                        mobileArea: parameters.memberTo.mobileArea,
                        mobile: parameters.memberTo.mobile,
                        messageData: { message: message, res: res }
                    });
                }
            });
        }
        catch (e) { }
    };
    jpush.appKey = '0ac1fb9a735e270273a901fe';
    jpush.masterSecret = 'e152ef75c974d5962d6859e8';
    return jpush;
}());
exports["default"] = jpush;
