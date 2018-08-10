// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 点赞关注关系信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'

class schemaRelation extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'relation',
                        schema: newSchema({
                                _id: String,
                                openID: String,     // 个人用户OpenID字符串 非空 索引 即member表之OpenID 
                                relType: String,    // 关系类型 可空 默认值：空字符串 其中：LIKE表示点赞 FOLLOW表示关注 COLLECT表示收藏 RESUME表示投简历
                                relDest: String,    // 关系目标 可空 默认值：空字符串
                                relTime: Date,      // 创建时间 可空 默认值：POSIX时间零值
                                relStatus: Boolean, // 关系状态 可空 默认值：TRUE 其中：TRUE表示关系有效 FALSE表示关系无效
                                relComment: Mixed  // 附加数据 可空 默认值：空字符串
                        })
                }
        }

        // 获取给定简历点赞信息
        public async getLike(openID: string, resumeID: string, resumeType: string, orderID: string): Promise<any> {
                return this.findOne({
                        where: {
                                openID: openID,
                                relType: 'LIKE',
                                relDest: `${resumeID}#${resumeType.toUpperCase()}`,
                                relStatus: true,
                                relComment: orderID
                        }
                })
        }

        // 点赞给定简历信息
        public async setLike(openID: string, resumeID: string, resumeType: string, orderID: string): Promise<boolean> {
                if (!openID || !resumeID || !resumeType || !orderID) {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                return this.insert({
                        openID: openID,
                        relType: 'LIKE',
                        relDest: `${resumeID}#${resumeType.toUpperCase()}`,
                        relTime: new Date(),
                        relStatus: true,
                        relComment: orderID
                })
        }
}
export default new schemaRelation()