// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户收藏文章列表
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 10, // 每页极限 Number 可空 默认值：10
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "total": 51, // 数据总数 Number 非空
//                      "pages": 6,  // 分页总数 Number 非空
//                      "begin": 1,  // 分页页码 Number 非空
//                      "limit": 10, // 每页极限 Number 非空
//                      "items": [{
//                              "articleID": "20171102759933", // 文章全局ID String 非空
//                              "articleType": "xxx", // 文章分类 String 非空
//                              "title": "星期一催至有：香港打工仔就算有情緒病都唔畀得公司知", // 文章主标题 String 非空
//                              "thumb": "http:\/\/www.xxx.com/xxx.png", // 文章缩略图 String 非空
//                              "publish": "2018-01-20", // 发布日期 String 非空
//                              "description": "香港打工仔工時長，壓力大，加上人工同樓價永遠唔成正比" // 文章摘要 String 非空
//                      }]
//              }
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function searchCollection(req: request, res: response, parameters: any): Promise<IResult> {
        let filter: any = {
                where: {
                        openID: utils.openIDDecode(parameters.openID),
                        relStatus: true
                },
                order: {
                        relTime: -1
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 10
        }

        let document = await schema.relation.findPage(filter)
        if (document.items instanceof Array && document.items.length > 0) {
                let ids = utils.forEach(document.items, e => `1#${e.relDest}#cn`)
                let articles = await schema.article.findByIds(...ids)

                document.items = utils.forEach(articles, (e: any): any => {
                        return {
                                articleID: e.articleID,
                                articleType: e.articleType,
                                title: e.title,
                                thumb: e.thumb,
                                publish: utils.formatDate('YYYY-MM-DD', e.publish),
                                description: e.description
                        }
                })
        }

        return render({ code: 200, msg: '', data: document })
}