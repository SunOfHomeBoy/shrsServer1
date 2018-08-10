// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 消费充值订单信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import utils from '../utils'

const ORDER_PAYNMENT_DEBUG: boolean = false

class schemaOrder extends schema {
        public allPrice: number = 10 * (ORDER_PAYNMENT_DEBUG ? 1 : 100) // 简历查看原价
        public disPrice: number = 8 * (ORDER_PAYNMENT_DEBUG ? 1 : 100) // 简历打折价格
        public itvPrice: number = 15 * (ORDER_PAYNMENT_DEBUG ? 1 : 100) // 视频查看价格
        public rebate: number = 2 * (ORDER_PAYNMENT_DEBUG ? 1 : 100) // 用户返利金额（手机号码）
        public rebateExt: number = 3 * (ORDER_PAYNMENT_DEBUG ? 1 : 100) // 用户返利金额（视频通话）
        public welfare: number = 1 * (ORDER_PAYNMENT_DEBUG ? 1 : 100) // 公益基金金额
        public team: number = 1 * (ORDER_PAYNMENT_DEBUG ? 1 : 100) // 团队分享金额

        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'order',
                        schema: newSchema({
                                _id: String,
                                openID: String,       // 用户OpenID字符串 非空 索引 即member表之OpenID
                                orderID: String,      // 订单编号 可空 默认值：0 
                                orderType: Number,    // 订单类型 可空 默认值：0 其中：1表示账号充值 2表示付费查看简历之联系号码 3表示账号提现
                                orderPay: Number,     // 支付类型 可空 默认值：0 其中：1表示余额支付 2表示支付宝支付 3表示微信支付 4表示免费支付
                                orderMoney: Number,   // 订单金额 可空 默认值：0 其中：单位：分
                                orderScore: Number,   // 消费积分 可空 默认值：0
                                orderUser: String,    // 相关用户 可空 默认值：空字符串 其中：对于付费查看号码业务，即为简历拥有者OpenID字符串
                                orderSubmit: Date,    // 下单时间 可空 默认值：POSIX时间零值
                                orderUpdate: Date,    // 更新时间 可空 默认值：POSIX时间零值
                                orderStatus: Number,  // 订单状态 可空 默认值：0 其中：1表示订单已成功 2表示订单已失败 3表示订单支付中 4表示订单已取消
                                orderComment: String, // 附加信息 可空 默认值：空字符串
                                orderRebate: Boolean, // 返利状态 可空 默认值：FALSE
                                orderReaded: Boolean  // 已读状态 可空 默认值：FALSE
                        })
                }
        }

        public async New(parameters: any): Promise<boolean> {
                return this.save(utils.union(parameters, {
                        _id: parameters.orderID || utils.uuid(),
                        orderStatus: parameters.orderStatus || 3,
                        orderSubmit: parameters.orderSubmit || (new Date()),
                        orderUpdate: new Date(),
                        orderReaded: false
                }))
        }

        // 统计我查看了谁总数
        public async totalSeeWho(openID: string): Promise<number> {
                return this.count({
                        openID: openID,
                        orderType: 2,
                        orderStatus: 1,
                        orderComment: {
                                $in: ['FULLTIME', 'PARTTIME']
                        }
                })
        }

        // 统计谁查看了我总数
        public async totalLookMe(openID: string, all: boolean = true): Promise<number> {
                let filter: any = {
                        orderUser: openID,
                        orderType: 2,
                        orderStatus: 1,
                        orderComment: {
                                $in: ['FULLTIME', 'PARTTIME']
                        }
                }

                if (utils.empty(all)) {
                        filter.orderReaded = {
                                $ne: true
                        }
                }

                return this.count(filter)
        }

        // 最近简历主订单信息
        public async recent(openID: string, resumeID: string, resumeType: string): Promise<any> {
                return this.findOne({
                        where: {
                                openID: openID,
                                orderUser: resumeID,
                                orderComment: resumeType,
                                orderStatus: 1
                        },
                        order: {
                                orderSubmit: -1
                        }
                })
        }

        // 最近简历副订单信息
        public async recentSub(openID: string, resumeID: string, resumeType: string): Promise<any> {
                return await this.findOne({
                        where: {
                                openID: openID,
                                orderUser: resumeID,
                                orderComment: `${resumeType}#VIDEONEXT`,
                                orderStatus: 1
                        },
                        order: {
                                orderSubmit: -1
                        }
                })
        }

        // 最近簡歷主副訂單信息
        public async recentAny(openID: string, resumeID: string, resumeType: string): Promise<any> {
                let orderInfo = await this.recentSub(openID, resumeID, resumeType)

                if (utils.empty(orderInfo)) {
                        orderInfo = await this.recent(openID, resumeID, resumeType)
                }

                return new Promise<any>(resolve => resolve(orderInfo))
        }

        // 設置訂單已讀未讀狀態
        public async setReaded(openID: string, resumeID: string, resumeType: string, readed: boolean): Promise<any> {
                let orderInfo = await this.recent(openID, resumeID, resumeType)

                if (utils.empty(orderInfo) === false) {
                        return this.findByIdAndUpdate(orderInfo.orderID, { orderReaded: readed })
                }

                return new Promise<boolean>(resolve => resolve(false))
        }
}
export default new schemaOrder()