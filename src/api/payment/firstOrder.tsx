// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 消费类型订单状态
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "resumeID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 简历拥有者OpenID加密字符串 String 非空
//              "resumeType": "FULLTIME", // 简历类型 String 非空
//              "infoType": "MOBILE", // 信息类型 String 非空 其中：MOBILE表示手机号码 VIDEO表示视频通话
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "orderID": "18020668496004" // 订单编号 String 非空
//                      "orderRebate": false // 返利状态 Boolean 非空 其中：TRUE表示待返利 FALSE表示已返利
//                      "orderVideo": false // 视频状态 Boolean 非空：TRUE表示带视频 FALSE表示已视频
//                      "orderFrom": "xxxxxx", // 查看者视频账号 String 非空
//                      "stateForm": false, // 查看者视频绑定 Boolean 非空
//                      "onlineTo": false, // 用户在线状态 Boolean 非空 其中：TRUE表示在线 FALSE表示离线
//                      "orderTo": "xxxxxx", // 简历者视频账号 String 非空
//                      "stateTo": false, // 简历者视频绑定 Boolean 非空
//                      "onlineTo": false, // 简历者在线状态 Boolean 非空 其中：TRUE表示在线 FALSE表示离线
//                      "infoType": "MOBILE", // 信息类型 String 非空 其中：MOBILE表示手机号码 VIDEO表示视频通话
//              }
//      }
//
// 错误代码：
//      {
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, vedio } from '../../foundation'

export default async function beginOrder(req: request, res: response, parameters: any): Promise<IResult> {
        if (utils.empty(parameters.openID) || utils.empty(parameters.resumeID)) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        if (['FULLTIME', 'PARTTIME'].indexOf(parameters.resumeType) === -1) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        parameters.openID = utils.openIDDecode(parameters.openID)
        parameters.resumeID = utils.openIDDecode(parameters.resumeID)

        let infoType = 'MOBILE'
        let orderInfo = await schema.order.recent(parameters.openID, parameters.resumeID, parameters.resumeType)

        if (parameters.infoType === 'VIDEO') {
                let orderBuff = await schema.order.recentSub(parameters.openID, parameters.resumeID, parameters.resumeType)

                if (utils.empty(orderBuff) === false) {
                        orderInfo = orderBuff
                }

                infoType = orderInfo.orderMoney === schema.order.itvPrice ? 'VIDEO' : 'MOBILE'
        }

        if (utils.empty(orderInfo)) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        let memberFrom = await schema.member.findById(orderInfo.openID)
        let memberTo = await schema.member.findById(orderInfo.orderUser)
        let onlineFrom = await vedio.onlineMember(orderInfo.openID)
        let onlineTo = await vedio.onlineMember(orderInfo.orderUser)

        return render({
                code: 200, msg: '', data: {
                        orderID: orderInfo.orderID,
                        orderRebate: orderInfo.orderRebate,
                        orderVideo: orderInfo.orderRebate,
                        orderFrom: utils.formatOpenID(orderInfo.openID),
                        stateFrom: memberFrom.bandVedio || false,
                        onlineFrom: onlineFrom,
                        orderTo: utils.formatOpenID(orderInfo.orderUser),
                        stateTo: memberTo.bandVedio || false,
                        onlineTo: onlineTo,
                        infoType: infoType
                }
        })
}
