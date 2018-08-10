// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 全部自定义类型页面（简体中文版本）
//
// 调用权限: API_PURVIEW_ADMINS
//
// 参数说明:
//      {
//              ... // 此接口不需要参数
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "articleMark": "ABOUT", // 唯一标识符 String 非空 其中：ABOUT表示关于我们 TEAM表示组建团队
//                      "title": "关于我们" // 页面标题 String 非空
//              }]
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        return render({ code: 200, msg: '' })
}
