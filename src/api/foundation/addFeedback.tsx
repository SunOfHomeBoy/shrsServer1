// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 添加用户反馈
//
// 调用权限: API_PURVIEW_MEMBERS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "content": "xxx-xxx-..." // 页面内容 String 非空
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
//              2019: 'Invalid Parameters' // 无效的参数数据
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function addFeedback(req: request, res: response, parameters: any): Promise<IResult> {
        if (utils.empty(parameters.openID) || utils.empty(parameters.content)) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        await schema.comment.insert({
                openID: utils.openIDDecode(parameters.openID),
                commentType: 'FEEDBACK',
                commentMessage: parameters.content
        })
        return render({ code: 200, msg: '' })
}