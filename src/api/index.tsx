// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义服务器端接口路由及其权限
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { purview } from '../foundation'
// import banners from './service/banners'
import addArticle from './article/addArticle';
import delArticle from './article/delArticle';
import detArticle from './article/detailArticle';
import searchArticle from './article/searchArticle';

import imgUpload from './imgUpload/upload'
import addImg from './imgUpload/addImg'
import addImgList from './imgUpload/addImgList'
import delImg from './imgUpload/delImg'
import delImgList from './imgUpload/delImgList'
import searchImg from './imgUpload/searchImg'
import searchImgList from './imgUpload/searchImgList'

import signin from './configer/signin';
import signup from './configer/signup';


export default [
        // 管理账号类接口
        {
                path: '/api/signin',
                component: signin,
                auth: purview.API_PURVIEW_COMMON || purview.API_PURVIEW_ADMINS || purview.API_PURVIEW_MEMBER
        }, // 登录
        {
                path: '/api/signup',
                component: signup,
                auth: purview.API_PURVIEW_COMMON
        }, // 注册

        // 文章接口:
        {
                path: '/api/article/addArticle',
                component: addArticle,
                auth: purview.API_PURVIEW_ADMINS
        }, // 添加/编辑 文章
        {
                path: '/api/article/delArticle',
                component: delArticle,
                auth: purview.API_PURVIEW_ADMINS
        }, // 删除 文章
        {
                path: '/api/article/detArticle',
                component: detArticle,
                auth: purview.API_PURVIEW_COMMON
        }, // 获取 文章 详情
        {
                path: '/api/article/searchArticle',
                component: searchArticle,
                auth: purview.API_PURVIEW_COMMON
        }, // 搜索 文章

        // 图片接口:
        {
                path: '/service/upload/imgUpload',
                component: imgUpload,
                auth: purview.API_PURVIEW_ADMINS
        }, // 图片上传
        {
                path: '/api/addImg',
                component: addImg,
                auth: purview.API_PURVIEW_ADMINS
        }, // 增加图片
        {
                path: '/api/addImgList',
                component: addImgList,
                auth: purview.API_PURVIEW_ADMINS
        }, // 增加图片列表
        {
                path: '/api/delImg',
                component: delImg,
                auth: purview.API_PURVIEW_ADMINS
        }, // 删除图片
        {
                path: '/api/delImgList',
                component: delImgList,
                auth: purview.API_PURVIEW_ADMINS
        }, // 删除图片列表
        {
                path: '/api/searchImg',
                component: searchImg,
                auth: purview.API_PURVIEW_COMMON
        }, // 查询图片
        {
                path: '/api/searchImgList',
                component: searchImgList,
                auth: purview.API_PURVIEW_COMMON
        } // 查询图片列表
]