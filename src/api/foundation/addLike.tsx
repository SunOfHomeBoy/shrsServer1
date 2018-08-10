// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户点赞简历信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "resumeID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 简历拥有者OpenID加密字符串 String 非空
//              "resumeType": "FULLTIME" // 简历类型 String 其中：FULLTIME表示全职简历 PARTTIME表示兼职简历
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "likes": 1000, // 简历者最新点赞数 Number 非空
//                      "status": false // 用户点赞状态 Boolean 其中：TRUE表示用户首次点赞 FALSE表示用户重复点赞
//              }
//      }
//
// 错误代码:
//      {
//              2019: 'Invalid Parameters' // 无效的参数数据
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'
import order from '../../foundation/schema/order';

export default async function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)
        parameters.resumeID = utils.openIDDecode(parameters.resumeID)

        let orderInfo = await schema.order.recentAny(parameters.openID, parameters.resumeID, parameters.resumeType)
        if (utils.empty(orderInfo) === false) {
                let likeInfo = await schema.relation.getLike(parameters.openID, parameters.resumeID, parameters.resumeType, orderInfo.orderID)

                if (utils.empty(likeInfo)) {
                        await schema.resume.findByIdAndUpdate(`${parameters.resumeID}#${parameters.resumeType}`, { resumeAt: { $inc: 1 } })
                        await schema.relation.setLike(parameters.openID, parameters.resumeID, parameters.resumeType, orderInfo.orderID)
                }

                let resumeInfo = await schema.resume.findById(`${parameters.resumeID}#${parameters.resumeType}`)
                return render({ code: 200, msg: '', data: { likes: resumeInfo.resumeAt || 0, status: utils.empty(likeInfo) } })
        }

        return render({ code: 2019, msg: 'Invalid Parameters' })
}