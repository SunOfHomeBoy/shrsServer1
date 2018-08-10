// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 获取用户相关金额信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "money": 0, // 用户现有金额总数 Number 非空 单位：分
//                      "score": 0, // 用户现有免费次数 Number 非空 单位：次
//                      "price": 0, // 查看手机优惠价格 Number 非空 单位：分
//                      "vedio": 0, // 查看手机视频价格 Number 非空 单位：分
//                      "passwordPay": true // 支付密码状态 Boolean 非空 其中：TRUE表示已经设置 FALSE表示尚未设置
//              }
//      }
//
// 错误代码：
//      {
//              2018: "Invalid Member Information" // 无效的参数数据
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, payment } from '../../foundation'

export default async function initOrder(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        let memberInfo = await schema.member.findById(parameters.openID)
        if (utils.empty(memberInfo)) {
                return render({ code: 2018, msg: 'Invalid Member Information' })
        }

        return render({
                code: 200, msg: '', data: {
                        money: memberInfo.money0 || 0,
                        score: memberInfo.score0 || 0,
                        price: memberInfo.rebateStatus ? schema.order.disPrice : schema.order.allPrice,
                        vedio: schema.order.itvPrice,
                        passwordPay: utils.empty(memberInfo.passwordPay) === false
                }
        })
}