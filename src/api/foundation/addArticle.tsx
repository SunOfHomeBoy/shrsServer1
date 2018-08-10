// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 添加新闻文章（简体中文版本）
//
// 调用权限: API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 管理员OpenID加密字符串 String 非空
//              "title": "朝公开15号试射视频：首次从移动发射平台直接发射", // 新闻文章主标题 String 非空
//              "subtitle": "新闻文章副标题", // 文章副标题 String 非空
//              "articleType": "xxx", // 文章分类 String 非空
//              "authors": "作者姓名", // 作者姓名 String 可空
//              "linkURL": "http:\/\/www.xxx.com/xxx.html", // 文章来源 String 可空
//              "thumb": "http:\/\/www.xxx.com/xxx.png", // 文章缩略图 String 可空
//              "keywords": "军事 朝鲜", // 关键词 String 可空
//              "description": "xxx-yyy", // 文章摘要 String 可空
//              "content": "xxx-xxx-...", // 文章内容 String 可空
//              "orderNumber": 0, // 文章加权排序 Number 可空
//              "hitNumber": 0 // 文章浏览量 Number 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// 错误代码:
//      {
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        if (utils.empty(parameters.title)) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        let callback = await schema.article.saveArticle(parameters)
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}