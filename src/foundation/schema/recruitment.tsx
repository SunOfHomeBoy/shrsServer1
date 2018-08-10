// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 工作招聘信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import * as uuid from 'uuid'
import { open } from 'fs';

class schemaRecruitment extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'recruitment',
                        schema: newSchema({
                                _id: String,
                                openID: String,             // 公司OpenID字符串 非空 索引 即enterprise表之OpenID
                                company: String,            // 公司名称 非空
                                workName: String,           // 岗位名称 非空
                                money: Number,              // 职位月薪 可空 默认值：0 其中：<br> 1表示1000元/月以下 2表示1000-2000元/月 3表示2000-4000元/月 <br> 4表示4000-6000元/月 5表示6000-8000元/月 6表示8000-10000元/月 <br> 7表示10000元-15000元/月 8表示15000-25000元/月 9表示25000-35000元/月 <br> 10表示35000-50000元/月 11表示50000-100000元/月 12表示100000元/月以上
                                officetime: Number,         // 上班时间 可空 单位：小时
                                welfare: Array,             // 福利待遇 可空 默认值：空数组
                                address: String,            // 上班地详细地址 可空
                                description: String,        // 岗位叙述 可空
                                localeCountry: String,      // 上班所在地国家 可空 默认值：中国
                                localeProvince: String,     // 上班所在地省份 可空
                                localeCity: String,         // 上班所在地城市 可空
                                localeTown: String,         // 上班所在地镇县 可空
                                submitTime: Date,           // 发布时间 Date 可空
                                updateTime: Date,           // 更新时间 Date 可空
                                locationHome: {             // 上班地地理坐标 可空 默认值：空数组
                                        type: Array,        //
                                        index: '2dsphere'   //
                                },
                                enable: Boolean             // 招聘信息是否有效 Boolean 默认值：TRUE
                        })
                }
        }

        // 安全创建一个招聘信息
        public async New(parameters: any): Promise<any> {
                if (!parameters.openID) {
                        return new Promise<any>(resolve => resolve(false))
                }

                let document: any = {
                        _id: parameters._id || uuid.v4(),
                        openID: parameters.openID,
                        company: parameters.company || '',
                        workName: parameters.workName || '',
                        money: parameters.money || 0,
                        officetime: parameters.officetime || 8,
                        welfare: parameters.welfare || [],
                        address: parameters.address || '',
                        description: parameters.description || '',
                        localeCountry: parameters.localeCountry || '中国',
                        localeProvince: parameters.localeProvince || '',
                        localeCity: parameters.localeCity || '',
                        localeTown: parameters.localeTown || '',
                        submitTime: parameters.submitTime || (new Date()),
                        updateTime: new Date(),
                        locationHome: [],
                        enable: true
                }

                if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                        document.locationHome = [parameters.locationHomeX, parameters.locationHomeY]
                }

                let callback = await this.save(document)
                if (!callback) {
                        return new Promise<any>(resolve => resolve(false))
                }

                return new Promise<any>(resolve => resolve(document))
        }

        // 设置企业用户之岗位名称列表
        public async setEnterpriseRecruit(openID: string): Promise<any[]> {
                let recruits: any[] = []
                let callback = await this.allRecruit(openID)

                if (callback instanceof Array && callback.length !== 0) {
                        for (let item of callback) {
                                if (item.workName && recruits.indexOf(item.workName) === -1) {
                                        recruits.push(item.workName)
                                }
                        }
                }

                return new Promise<any[]>(resolve => resolve(recruits))
        }

        // 获取企业用户之招聘岗位
        public async allRecruit(openID: string, enable: boolean = true): Promise<any[]> {
                return this.find({ where: { openID, enable }, order: { updateTime: -1 } })
        }
}

export default new schemaRecruitment()