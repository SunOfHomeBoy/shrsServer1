// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 公共邮件发送服务
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER 
//
// 参数说明:
//      {
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
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, sms } from '../../foundation'

export default async function sendSMS(req: request, res: response, parameters: any): Promise<IResult> {
        return render({ code: 200, msg: '' })
}
