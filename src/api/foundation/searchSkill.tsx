// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 最常用的用户自定义技能标签
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
//                      "skill": "傻逼", // 标签名称 String 非空
//                      "weight": 10000 // 标签引用数（累计总数） Number 非空
//                      "w12": 1000, // 标签引用数（最近十二月份） Number 非空
//                      "w00": 1000, // 标签引用数（当前月份） Number 非空
//                      "w01": 1000, // 标签引用数（前01个月） Number 非空
//                      "w02": 1000, // 标签引用数（前02个月） Number 非空
//                      "w03": 1000, // 标签引用数（前03个月） Number 非空
//                      "w04": 1000, // 标签引用数（前04个月） Number 非空
//                      "w05": 1000, // 标签引用数（前05个月） Number 非空
//                      "w06": 1000, // 标签引用数（前06个月） Number 非空
//                      "w07": 1000, // 标签引用数（前07个月） Number 非空
//                      "w08": 1000, // 标签引用数（前08个月） Number 非空
//                      "w09": 1000, // 标签引用数（前09个月） Number 非空
//                      "w10": 1000, // 标签引用数（前10个月） Number 非空
//                      "w11": 1000, // 标签引用数（前11个月） Number 非空
//              }]
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        return render({ code: 200, msg: '' })
}