"use strict";
exports.__esModule = true;
exports["default"] = {
    host: process.env.NODE_ENV !== 'development' ? '127.0.0.1' : '192.168.0.196',
    port: 17280,
    data: 'shrs' + (process.env.NODE_ENV !== 'development' ? '' : '_RELEASE')
};
