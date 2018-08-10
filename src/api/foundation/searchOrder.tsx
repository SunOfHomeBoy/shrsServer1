// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 充值消费订单记录
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "orderType": 1, // 订单类型 Number 其中：1表示账号充值 2表示付费购买联系方式
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 10, // 每页极限 Number 可空 默认值：10
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "total": 51, // 数据总数 Number 非空
//                      "pages": 6,  // 分页总数 Number 非空
//                      "begin": 1,  // 分页页码 Number 非空
//                      "limit": 10, // 每页极限 Number 非空
//                      "items": [{
//                              "orderID": "20171102759933", // 订单编号 String 非空
//                              "orderPay": 1, // 支付类型 Number 非空 其中：1表示余额支付 2表示支付宝支付 3表示微信支付
//                              "orderMoney": 0, // 订单金额 Number 非空 单位：分
//                              "orderSubmit": "2017-12-12 00:00:00", // 订单时间 String 非空 
//                              "orderStatus": 1 // 订单状态 Number 非空 其中：1表示订单成功 2表示订单失败 3表示订单支付中 4表示订单已取消
//                      }]
//              }
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        return render({ code: 200, msg: '' })
}