// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 普通用户习惯统计模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'

class schemaRecord extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'record',
                        schema: newSchema({
                                _id: String,
                                recordType: String, // 统计类型 可空 默认值：空字符串 其中：待定
                                recordDest: String, // 统计目标 可空 默认值：空字符串
                                recordTime: String, // 统计日期 可空 默认值：空字符串
                                recordData: Mixed   // 统计数据 可空 默认值：空字符串
                        })
                }
        }
}
export default new schemaRecord()