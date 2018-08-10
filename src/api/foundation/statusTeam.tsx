// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 已处理组建团队需求
//
// 调用权限: API_PURVIEW_ADMINS
//
// 参数说明:
//      {
//              "teamID": "3725bebe-9c9b-407e-bf32-6e59c816f06c", // 组建团队ID String 非空
//              "teamStatus": false // 组建状态 Boolean 非空 其中：TRUE表示已处理 FALSE表示待处理
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        return render({ code: 200, msg: '' })
}