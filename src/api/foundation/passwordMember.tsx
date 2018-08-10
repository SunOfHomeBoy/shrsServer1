// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 账号修改密码
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "oldPassword": "1qaz2wsx", // 旧密码 String 非空
//              "newPassword": "2wsxzaq1", // 新密码 String 非空
//              "confirmPass": "2wsxzaq1" // 再次确认密码 String 非空
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
//              2002: "Password contains at least 6 characters" // 账号密码必须不少于六位
//              2003: "Password must contain uppercase characters" // 账号密码必须包含大写字母
//              2004: "Password must contain lowercase characters" // 账号密码必须包含小写字母
//              2005: "Password must contain numeric characters" // 账号密码必须包含数字母
//              2006: "Password and Re-enter password must be consistent" // 账号密码必须和确密码一致
//              2018: "Invalid Member Information" // 无效的用户信息
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function passwordMember(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        if (utils.empty(parameters.oldPassword) || utils.empty(parameters.newPassword) || utils.empty(parameters.confirmPass)) {
                return render({ code: 2002, msg: 'Password contains at least 6 characters' })
        }

        if (parameters.newPassword !== parameters.confirmPass) {
                return render({ code: 2006, msg: 'Password and Re-enter password must be consistent' })
        }

        if (/[A-Z]/.test(parameters.newPassword) === false) {
                return render({ code: 2003, msg: 'Password must contain uppercase characters' })
        }

        if (/[a-z]/.test(parameters.newPassword) === false) {
                return render({ code: 2004, msg: 'Password must contain lowercase characters' })
        }

        if (/[0-9]/.test(parameters.newPassword) === false) {
                return render({ code: 2005, msg: 'Password must contain numeric characters' })
        }

        let memberInfo = await schema.member.findById(parameters.openID)
        if (utils.empty(memberInfo)) {
                return render({ code: 2018, msg: 'Invalid Member Information' })
        }

        let cryptoPassword = utils.cryptoPassword(parameters.oldPassword)
        if (cryptoPassword !== memberInfo.password) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        memberInfo.password = utils.cryptoPassword(parameters.newPassword)
        let callback = await schema.member.save(memberInfo)
        if (!callback) {
                return render({ code: 2020, msg: '' })
        }

        return render({ code: 200, msg: '' })
}