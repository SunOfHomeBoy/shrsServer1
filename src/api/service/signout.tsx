// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户账号安全退出
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "tokenID": "5bd80cd7-5c17-41e8-93d0-7ed1f35cd556" // 会话令牌 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "" // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, token } from '../../foundation'

export default function signout(req: request, res: response, parameters: any): Promise<IResult> {
        // 由于令牌算法更换故无实质业务
        return render({ code: 200, msg: '' })
}