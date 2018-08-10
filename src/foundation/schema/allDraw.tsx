// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 全部用户抽奖页面统计信息
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'
import utils from '../utils'

class schemaAllDraw extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'allDraw',
                        schema: newSchema({
                                _id: String,
                                openID: String,     // OpenID字符串 非空 索引 格式：a + UUID随机字符串
                                drawResult: Number, // 中奖结果
                                drawTime: Date,     // 当前登录用户抽奖时间戳值 可空 默认值：POSIX时间零值
                                drawIP: String,     // 当前登录用户抽奖时所在地IP 可空 默认值：空字符串
                                data: Mixed,        // 配置项数据 可空 默认值：空字符串
                                enable: Boolean     // 账号是否有效 非空 默认值：TRUE
                        })
                }
        }

        public async New(parameters: any): Promise<any> {
                // if (utils.empty(parameters.mobile) || utils.empty(parameters.password)) {
                //         return new Promise<any>(resolve => resolve(false))
                // }

                let document: any = {
                        openID: parameters.openID,
                        drawResult: parameters.drawResult,
                        drawTime: parameters.drawTime,
                        address: parameters.address || '',
                        drawIP: parameters.drawIP || '',
                        data: parameters.data || {},
                        enable: true
                }

                document._id = document.openID

                let callback = await this.save(document)
                if (utils.empty(callback)) {
                        return new Promise<any>(resolve => resolve(false))
                }

                return new Promise<any>(resolve => resolve(document))
        }
}

export default new schemaAllDraw()