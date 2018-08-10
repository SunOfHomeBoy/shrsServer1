"use strict";
exports.__esModule = true;
var path = require("path");
exports["default"] = {
    debug: false,
    port: 10007,
    masters: [10007, 10009, 10016, 10025, 10041],
    pathAssets: path.join(__dirname, '../../assets'),
    pathConfig: process.env.NODE_ENV !== 'production'
        ? path.join(__dirname, '../../etc')
        : '/mnt/www/etc',
    pathPublic: process.env.NODE_ENV !== 'production'
        ? path.join(__dirname, '../../public')
        : '/mnt/www/PUBLIC',
    pathTmpdir: process.env.NODE_ENV !== 'production'
        ? path.join(__dirname, '../../tmp')
        : '/mnt/www/tmp'
};
