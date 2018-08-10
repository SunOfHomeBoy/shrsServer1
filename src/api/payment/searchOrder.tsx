// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 查询我的充值记录
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空 注意：若管理员OpenID即满足查询添加的所有数据
//              "orderType": 1, // 订单类型 Number 非空 其中：1表示账号充值 2表示购买号码
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 10 // 每页极限 Number 可空 默认值：10
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "total": 51, // 查询数据总量 Number 非空
//                      "pages": 6, // 数据分页总数 Number 非空
//                      "limit": 10, // 每页数据极限 Number 非空
//                      "begin": 1, // 当前分页页码 Number 非空
//                      "items": [{
//                              "orderID": "18020668496002",
//                              "orderPay": 1, // 支付类型 Number 非空 其中：1表示余额支付 2表示支付宝支付 3表示微信支付
//                              "orderMoney": 0, // 订单金额 Number 非空 单位：分
//                              "orderSubmit": "2017-12-12 00:00:00", // 订单时间 String 非空
//                              "orderStatus": 1, // 订单状态 Number 非空 其中：1表示订单成功
//                      }]
//              }]
//      }
//
// 错误代码:
//      {
//              2019: 'Invalid Parameters' // 无效的参数数据
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function searchOrder(req: request, res: response, parameters: any): Promise<IResult> {
        if (utils.empty(parameters.openID)) {
                return render({ code: 2019, msg: '' })
        }

        let openID: string = utils.openIDDecode(parameters.openID)
        let filter: any = {
                where: {
                        orderType: parameters.orderType || 1,
                        orderStatus: 1
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 10
        }

        if (/^[0-9]$/.test(openID.substr(0, 1))) {
                filter.where.openID = openID
        }

        let document: any = await schema.order.findPage(filter)
        document.items = utils.forEach(document.items, (e: any): any => {
                return {
                        orderID: e.orderID,
                        orderPay: e.orderPay,
                        orderMoney: e.orderMoney,
                        orderSubmit: utils.formatDate('YYYY-MM-DD HH:mm:ss', e.orderSubmit),
                        orderStatus: e.orderStatus || 1
                }
        })

        return render({ code: 200, msg: '', data: document })
}