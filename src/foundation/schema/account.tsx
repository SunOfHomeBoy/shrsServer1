// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 金额账目记录表
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import order from './order'
import utils from '../utils'

class schemaAccount extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'account',
                        schema: newSchema({
                                _id: String,
                                openID: String,     // 用户OpenID字符串 非空 索引 即member表之主键
                                orderID: String,    // 金额相关订单号 非空
                                money: Number,      // 进账或者出账金额 非空 单位：分
                                income: Boolean,    // 进账或者出账 非空 其中：TRUE表示进账 FLASE表示出账
                                afrom: String,      // 金额类型 非空 RECHANG表示账号充值 TIXIAN表示用户提现 FULLTIME表示查看全职 FULLTIMED表示被查看全职 PARTTIM表示查看兼职 PARTTIMED表示被查看兼职 SHARE表示共享金额 CONSUME表示消费金额
                                atime: Date,        // 记录时间 非空 默认值：POSIX时间零值
                                enable: Boolean     // 记录状态 非空
                        })
                }
        }

        protected async New(openID: string, orderID: string, money: number, income: boolean, afrom: string, enable: boolean): Promise<boolean> {
                if (['RECHANGE', 'TIXIAN', 'FULLTIME', 'FULLTIMED', 'PARTTIME', 'PARTTIMED', 'SHARE', 'CONSUME'].indexOf(afrom) === -1) {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                return this.save({
                        _id: orderID + '#' + afrom,
                        openID: openID,
                        orderID: orderID,
                        money: money,
                        income: income,
                        afrom: afrom,
                        atime: new Date(),
                        enable: enable
                })
        }

        // 用户充值金额记录
        public async rechange(orderInfo: any): Promise<boolean> {
                return this.New(orderInfo.openID, orderInfo.orderID, orderInfo.orderMoney, true, 'RECHANGE', true)
        }

        // 查看号码返利者之返利金额记录
        public async rebateByRebate(rebateID: string, orderID: string, resumeType: string, isVedio: boolean): Promise<boolean> {
                if (!rebateID) {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                return this.New(rebateID, orderID, isVedio ? order.rebateExt : order.rebate, true, resumeType, false)
        }

        // 查看号码简历者之返利金额记录
        public async rebateByResume(resumeID: string, orderID: string, resumeType: string, isVedio: boolean): Promise<boolean> {
                return this.New(resumeID, orderID, isVedio ? order.rebateExt : order.rebate, true, resumeType + 'D', false)
        }

        public async rebateByShare(openID: string, orderID: string): Promise<boolean> {
                return this.New(openID, orderID, order.welfare, true, 'SHARE', true)
        }

        public async consume(orderInfo: any): Promise<boolean> {
                return this.New(orderInfo.openID, orderInfo.orderID, orderInfo.orderMoney, false, 'CONSUME', true)
        }
}

export default new schemaAccount()