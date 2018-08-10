// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 设置返利账号
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "mobileArea": "86", // 返利账号注册号码之国家代码 String 非空
//              "mobile": "18565892895", // 返利账号注册手机号码 String 非空
//              "captcha": "123456", // 短信验证码输入值 String 非空
//              "encrypt": "xxxxxx", // 短信验证码加密文 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9" // 返利账号OpenID加密字符串 String 非空
//      }
//
// 错误代码:
//      {
//              2007: "Please enter the correct verification code" // 请填写正确的短信验证码
//              2013: "Given account has not been registered" // 给定账号尚未注册
//              2018: "Invalid Member Information" // 无效的用户信息
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, sms } from '../../foundation'

export default async function rebateMember(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '')
        parameters.openID = utils.openIDDecode(parameters.openID)

        if (sms.check(parameters.captcha, parameters.encrypt) === false) {
                return render({ code: 2007, msg: 'Please enter the correct verification code' })
        }

        let memberInfo = await schema.member.findOneByMobile(parameters.mobile, parameters.mobileArea)
        if (utils.empty(memberInfo)) {
                return render({ code: 2013, msg: 'Given account has not been registered' })
        }

        let callback = await schema.member.findByIdAndUpdate(parameters.openID, { rebate: memberInfo })
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '', data: utils.openIDEncode(memberInfo.openID) })
}