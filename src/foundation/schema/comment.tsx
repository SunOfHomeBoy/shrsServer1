// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 用户回帖数据模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'

class schemaComment extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'comment',
                        schema: newSchema({
                                _id: String,
                                openID: String,         // 用户OpenID 非空 索引 即member表之OpenID
                                commentType: String,    // 用户回帖类型 非空 默认值：空字符串 其中：REPLY表示评论简历 FEEDBACK表示用户反馈
                                commentDest: String,    // 用户所回帖子 可空 默认值：空字符串
                                commentPID: String,     // 上一级回帖ID 可空 默认值：空字符串
                                commentMessage: String, // 用户回帖内容 非空 默认值：空字符串
                                commentAt: Number,      // 回帖被赞总数 可空 默认值：0
                                commentUpdate: Date,    // 回帖提交时间 可空 默认值：POSIX时间零值
                                commentStatus: Boolean  // 回帖显示状态 可空 默认值：TRUE 其中：TRUE表示显示 FALSE表示隐藏
                        })
                }
        }
}
export default new schemaComment()