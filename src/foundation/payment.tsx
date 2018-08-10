// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义余额支付、微信支付、支付宝支付及其相关订单操作
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as WechatPayment from 'node-wxpay'
import schema from './schema'
import utils from './utils'
import { alipay, wxpay } from '../config'
import order from './schema/order';

const welfareOpenID: string = 'w00000000-0000-0000-0000-000000000000' // 公益账号OpenID

export default class Payment {
        public static wechat(): any {
                return new WechatPayment({
                        appid: wxpay.appid,
                        mch_id: wxpay.mch_id,
                        partner_key: wxpay.apiKey
                })
        }

        public static async callbackSuccess(out_trade_no: string): Promise<boolean> {
                let orderInfo = await schema.order.findById(out_trade_no)

                if (utils.empty(orderInfo)) {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                let memberInfo = await schema.member.findById(orderInfo.openID)
                switch (orderInfo.orderType) {
                        case 1:
                                if (orderInfo.orderStatus !== 1) {
                                        memberInfo.money0 = memberInfo.money0 + orderInfo.orderMoney
                                        await schema.member.save(memberInfo)
                                }

                                let a = await schema.account.rechange(orderInfo)
                                break

                        case 2:
                                memberInfo.rebateStatus = true
                                await schema.member.save(memberInfo)

                                if (orderInfo.orderComment === 'FULLTIME' || orderInfo.orderComment === 'PARTTIME') {
                                        await this.rebateByAccount(memberInfo, orderInfo)
                                }
                                break

                        case 3:
                                break
                }
                orderInfo.orderStatus = 1
                await schema.order.save(orderInfo)

                return new Promise<boolean>(resolve => resolve(true))
        }

        public static async rebateByAccount(memberInfo: any, orderInfo: any): Promise<boolean> {
                let isVedio = orderInfo.orderMoney === order.itvPrice
                await schema.account.rebateByRebate(memberInfo.rebate, orderInfo.orderID, orderInfo.orderComment, isVedio)
                await schema.account.rebateByResume(orderInfo.orderUser, orderInfo.orderID, orderInfo.orderComment, isVedio)
                await schema.account.rebateByShare(welfareOpenID, orderInfo.orderID)
                return new Promise<boolean>(resolve => resolve(true))
        }
}
