// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 技能搜索关键词统计模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import utils from '../utils'

class schemaKeywords extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'keywords',
                        schema: newSchema({
                                _id: String,
                                name: String,     // 关键词文本 非空
                                tag: Number,      // 关键词类型 非空 其中：1表示搜索关键词 2表示技能关键词
                                total: Number,    // 关键词累计统计量 非空
                                resume: Number,   // 简历引用实时统计量 非空
                                t201801: Number,  // 关键词在2018年01月月统计量 非空 
                                t201802: Number,  // 同上
                                t201803: Number,  // 同上
                                t201804: Number,  // 同上
                                t201805: Number,  // 同上
                                t201806: Number,  // 同上
                                t201807: Number,  // 同上
                                t201808: Number,  // 同上
                                t201809: Number,  // 同上
                                t201810: Number,  // 同上
                                t201811: Number,  // 同上
                                t201812: Number,  // 同上
                                t201901: Number,  // 同上
                                t201902: Number,  // 同上
                                t201903: Number,  // 同上
                                t201904: Number,  // 同上
                                t201905: Number,  // 同上
                                t201906: Number,  // 同上
                                t201907: Number,  // 同上
                                t201908: Number,  // 同上
                                t201909: Number,  // 同上
                                t201910: Number,  // 同上
                                t201911: Number,  // 同上
                                t201912: Number,  // 同上
                                t202001: Number,  // 同上
                                t202002: Number,  // 同上
                                t202003: Number,  // 同上
                                t202004: Number,  // 同上
                                t202005: Number,  // 同上
                                t202007: Number,  // 同上
                                t202008: Number,  // 同上
                                t202009: Number,  // 同上
                                t202010: Number,  // 同上
                                t202011: Number,  // 同上
                                t202012: Number,  // 同上
                                t202101: Number,  // 同上
                                t202102: Number,  // 同上
                                t202103: Number,  // 同上
                                t202104: Number,  // 同上
                                t202105: Number,  // 同上
                                t202106: Number,  // 同上
                                t202107: Number,  // 同上
                                t202108: Number,  // 同上
                                t202109: Number,  // 同上
                                t202110: Number,  // 同上
                                t202111: Number,  // 同上
                                t202112: Number,  // 同上
                                t202201: Number,  // 同上
                                t202202: Number,  // 同上
                                t202203: Number,  // 同上
                                t202204: Number,  // 同上
                                t202205: Number,  // 同上
                                t202206: Number,  // 同上
                                t202207: Number,  // 同上
                                t202208: Number,  // 同上
                                t202209: Number,  // 同上
                                t202210: Number,  // 同上
                                t202211: Number,  // 同上
                                t202212: Number,  // 同上
                        })
                }
        }

        protected async sign(tag: number, keyword: string): Promise<boolean> {
                let name: string = keyword.toLowerCase()
                let tkey: string = 't' + utils.formatDate('YYYYMM')

                let document: any = await this.findById(`${tag}#${name}`)
                document._id = `${tag}#${name}`
                document.name = name
                document.tag = tag
                document.total = (document.total || 0) + 1
                document[tkey] = (document[tkey] || 0) + 1

                let callback = await this.save(document)
                if (utils.empty(callback)) {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                return new Promise<boolean>(resolve => resolve(true))
        }

        // 标记搜索关键词
        public async signSearch(search: string): Promise<boolean> {
                return this.sign(1, search)
        }

        // 标记技能关键词
        public async signSkills(skills: string[]): Promise<boolean> {
                for (let skill of skills) {
                        await this.sign(2, skill)
                }

                return new Promise<boolean>(resolve => resolve(true))
        }
}
export default new schemaKeywords()