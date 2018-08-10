// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 设置用户支付密码
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "oldPassword": "012345", // 旧支付密码 String 非空 注意：若第一次设置支付密码该项可空
//              "newPassword": "123456", // 新支付密码 String 非空
//              "confirmPass": "123456" // 再次确认支付密码 String 非空
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
//              2018: "Invalid Member Information" // 无效的用户信息
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function paypassMember(req: request, res: response, parameters: any): Promise<IResult> {
        if (/^[0-9]{6}$/i.test(parameters.newPassword) === false || parameters.newPassword !== parameters.confirmPass) {
                return render({ code: 2019, msg: 'Invalid Parameters 0' })
        }

        let memberInfo = await schema.member.findById(utils.openIDDecode(parameters.openID))
        if (utils.empty(memberInfo)) {
                return render({ code: 2018, msg: 'Invalid Member Information' })
        }

        if (memberInfo.passwordPay && memberInfo.passwordPay !== utils.cryptoPassword(String(parameters.oldPassword))) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        memberInfo.passwordPay = utils.cryptoPassword(parameters.newPassword)
        let callback = await schema.member.save(memberInfo)
        if (!callback) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}