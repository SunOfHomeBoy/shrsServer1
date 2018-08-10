"use strict";
exports.__esModule = true;
var foundation_1 = require("../foundation");
var addArticle_1 = require("./article/addArticle");
var delArticle_1 = require("./article/delArticle");
var detailArticle_1 = require("./article/detailArticle");
var searchArticle_1 = require("./article/searchArticle");
var upload_1 = require("./imgUpload/upload");
var addImg_1 = require("./imgUpload/addImg");
var addImgList_1 = require("./imgUpload/addImgList");
var delImg_1 = require("./imgUpload/delImg");
var delImgList_1 = require("./imgUpload/delImgList");
var searchImg_1 = require("./imgUpload/searchImg");
var searchImgList_1 = require("./imgUpload/searchImgList");
var signin_1 = require("./configer/signin");
var signup_1 = require("./configer/signup");
exports["default"] = [
    {
        path: '/api/signin',
        component: signin_1["default"],
        auth: foundation_1.purview.API_PURVIEW_COMMON || foundation_1.purview.API_PURVIEW_ADMINS || foundation_1.purview.API_PURVIEW_MEMBER
    },
    {
        path: '/api/signup',
        component: signup_1["default"],
        auth: foundation_1.purview.API_PURVIEW_COMMON
    },
    {
        path: '/api/article/addArticle',
        component: addArticle_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/article/delArticle',
        component: delArticle_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/article/detArticle',
        component: detailArticle_1["default"],
        auth: foundation_1.purview.API_PURVIEW_COMMON
    },
    {
        path: '/api/article/searchArticle',
        component: searchArticle_1["default"],
        auth: foundation_1.purview.API_PURVIEW_COMMON
    },
    {
        path: '/service/upload/imgUpload',
        component: upload_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/addImg',
        component: addImg_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/addImgList',
        component: addImgList_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/delImg',
        component: delImg_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/delImgList',
        component: delImgList_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/searchImg',
        component: searchImg_1["default"],
        auth: foundation_1.purview.API_PURVIEW_COMMON
    },
    {
        path: '/api/searchImgList',
        component: searchImgList_1["default"],
        auth: foundation_1.purview.API_PURVIEW_COMMON
    }
];
