// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户设置/取消收藏文章
//
// 调用权限: API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "articleID": "20171102759933" // 文章全局ID String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": true // 已操作状态 Boolean 非空 其中：TRUE表示已收藏 FALSE表示已取消
//      }
//
// 错误代码：
//      {
//              2019: 'Invalid Parameters' // 无效的参数数据
//              2020: 'Save Parameters Failth' // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function setCollection(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        if (utils.empty(parameters.openID) || utils.empty(parameters.articleID)) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        let collection = await schema.relation.findById(`COLLECT#${parameters.openID}#${parameters.articleID}`)
        if (utils.empty(collection) === false) {
                collection.relStatus = (collection.relStatus === false)
        } else {
                collection = {
                        _id: `COLLECT#${parameters.openID}#${parameters.articleID}`,
                        openID: parameters.openID,
                        relType: 'COLLECT',
                        relDest: parameters.articleID,
                        relTime: new Date(),
                        relStatus: true
                }
        }

        let callback = await schema.relation.save(collection)
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failt' })
        }

        return render({ code: 200, msg: '', data: collection.relStatus })
}