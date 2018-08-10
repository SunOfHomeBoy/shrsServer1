// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 执行账号返利操作
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "orderID": "18020668496004", // 订单编号 String 非空
//              "rebateStatus": true // 返利状态 Boolean 非空 其中：TRUE表示是 FALSE表示否
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// 错误代码：
//      {
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function beginOrder(req: request, res: response, parameters: any): Promise<IResult> {
        let orderInfo = await schema.order.findById(parameters.orderID)

        if (utils.empty(orderInfo) === false && orderInfo.orderRebate && parameters.rebateStatus) {
                let memberInfo = await schema.member.findById(orderInfo.openID)

                let rebateByRebate = await schema.account.findById(orderInfo.orderID + '#' + orderInfo.orderComment)
                let rebateByResume = await schema.account.findById(orderInfo.orderID + '#' + orderInfo.orderComment + 'D')

                if (utils.empty(rebateByRebate) === false && !rebateByRebate.enable) {
                        let memberRebate = await schema.member.findById(rebateByRebate.openID)
                        memberRebate.money0 = Number((memberRebate.money0 || 0) + rebateByRebate.money)

                        if (memberInfo.openID === memberRebate.openID) {
                                memberInfo.money0 = memberRebate.money0
                        }

                        await schema.member.save(memberRebate)

                        rebateByRebate.enable = true
                        await schema.account.save(rebateByRebate)

                        memberInfo.rebateStatus = false
                }

                if (utils.empty(rebateByResume) === false && !rebateByResume.enable) {
                        let memberResume = await schema.member.findById(rebateByResume.openID)
                        memberResume.money0 = (memberResume.money0 || 0) + rebateByResume.money
                        await schema.member.save(memberResume)

                        rebateByResume.enable = true
                        await schema.account.save(rebateByResume)
                }

                await schema.member.save(memberInfo)
        }

        orderInfo.orderRebate = false
        orderInfo.orderReaded = true
        await schema.order.save(orderInfo)

        return render({ code: 200, msg: '' })
}
