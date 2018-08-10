// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 个人企业用户安全注册
//
// 调用权限: API_PURVIEW_COMMON <Passing/>
//
// 参数说明:
//      {
//              "username": "hr" // 企业用户管理员账号 String 可空 仅对registerType=enterprise有效
//              "password": "1qaz2wsx", // 注册密码 String 非空
//              "confirm": "1qaz2wsx", // 确认密码 String 非空
//      }
// 
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "tokenID": "5bd80cd7-5c17-41e8-93d0-7ed1f35cd556", // 会话令牌 String 非空
//                      "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//                      "username": "xxxxxx", // 账号名称 String 可空
//              }
//      }
//
// 错误代码:
//      {
//              2006: "Password and Re-enter password must be consistent" // 账号密码必须和确认密码一致
//              2012: "Account Registered Failth // 账号注册失败"
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2017-12 $$
import { request, response, IResult, render, utils, schema, token, purview } from '../../foundation'

export default async function signup(req: request, res: response, parameters: any): Promise<IResult> {
        if (parameters.password !== parameters.confirm) {
                return render({ code: 2006, msg: 'Password and Re-enter password must be consistent' })
        }

        parameters.registerIP = req.IPAddress()
        parameters.signinIP = parameters.registerIP

        let callback: any = await schema.member.New(parameters)

        if (utils.empty(callback)) return render({ code: 2012, msg: 'Account Registered Failth' })
        

        let document: any = {
                tokenID: token.New(purview.API_PURVIEW_ADMINS, callback.openID),
                openID: utils.openIDEncode(callback.openID),
                username: callback.username || '',
        }
        return render({ code: 200, msg: '', data: document })
}