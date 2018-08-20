// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 团队组建数据模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'

class schemaTeam extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'team',
                        schema: newSchema({
                                _id: String,
                                openID: String,      // 用户OpenID字符串 非空 索引 即member表之OpenID
                                submitTime: Date,  // 需求提交时间 可空 默认值：POSIX时间零值
                                teamCompany: String, // 单位名称 可空 默认值：空字符串
                                teamNumber: String,  // 需求人数 可空 默认值：空字符串
                                teamPlace: String,   // 用人地点 可空 默认值：空字符串
                                teamDate: String,    // 用人时间 可空 默认值：空字符串
                                teamBudget: String,  // 项目预算 可空 默认值：空字符串
                                teamConnect: String, // 联系方式 可空 默认值：空字符串
                                teamEmail: String,   // 联系邮箱 可空 默认值：空字符串
                                teamComment: String, // 备注内容 可空 默认值：空字符串
                                teamCost: Number,    // 收费金额 可空 默认值：0 注意：所有金额计算皆以 分 作为基本单位
                                teamStatus: Boolean  // 需求状态 可空 默认值：FALSE FALSE表示待处理 TRUE表示已处理
                        })
                }
        }
}
export default new schemaTeam()