// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 企业用户基本信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import schemaMember from './member'

class schemaEnterprise extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'enterprise',
                        schema: newSchema({
                                _id: String,
                                openID: String,      // 企业用户OpenID字符串 非空 索引 格式：手机号码尾数 + UUID字符串
                                name: String,        // 企业名称 非空 默认值：空字符串
                                type: Number,        // 企业类型 非空 默认值：0 其中：1表示企业 2表示政府 3表示组织
                                attr: String,        // 企业属性 可空 默认值：空字符串
                                identify: Array,     // 企业证书图片 可空 默认值：空数组
                                industry: Array,     // 所属行业 可空 默认值：空数组
                                nation: String,      // 所属国家 可空 默认值：空字符串
                                persons: String,     // 人数规模 可空 默认值：0
                                address: String,     // 详细地址 可空 默认值：空字符串
                                logo: String,        // Logo图片 可空 默认值：空字符串
                                connect: String,     // 联系方式 可空 默认值：空字符串
                                description: String, // 企业简介 可空 默认值：空字符串
                                begin: String,       // 创办时间 可空 默认值：空字符串
                                zipcode: String,     // 邮政编码 可空 默认值：空字符串
                                email: String,       // 企业邮箱 可空 默认值：空字符串
                                homepage: String,    // 企业主页 可空 默认值：空字符串
                                qrcode: String,      // 二维码图片 可空 默认值：空字符串
                                recruit: Array,      // 招聘岗位 可空 默认值：空数组
                                welfare: Array,      // 福利待遇 可空 默认值：空数组 
                                hidden: Boolean,     // 隐藏联系方式 可空 默认值：FALSE 其中：TRUE表示隐藏联系方式 FALSE表示公开联系方式
                                status: Boolean,     // 企业认证状态 可空 默认值：FALSE 其中：TRUE表示企业认证已通过 FALSE表示企业认证未通过
                                localeCountry: String,   // 现居所在地国家 可空 默认值：中国
                                localeProvince: String,  // 现居所在地省份 可空 默认值：空字符串
                                localeCity: String,      // 现居所在地城市 可空 默认值：空字符串
                                localeTown: String,      // 现居所在地镇县 可空 默认值：空字符串
                                locationHome: {          // 居住地理坐标 可空 默认值：空数组
                                        type: Array,        //
                                        index: '2dsphere'   //
                                },
                                enable: Boolean      // 账号是否有效 可空 默认值：TRUE
                        })
                }
        }

        // 检测给定组织名称的企业用户是否已经被注册
        public async existsByName(name: string, enable: boolean = true): Promise<boolean> {
                return this.exists({ name, enable })
        }

        // 基于给定的基本信息注册企业信息
        public async New(parameters: any): Promise<any> {
                let memberInfo = await schemaMember.New(parameters)

                if (!memberInfo) {
                        return new Promise<any>(resolve => resolve(false))
                }

                if (typeof (parameters.enterpriseIndustry) === 'string') {
                        parameters.enterpriseIndustry = [
                                parameters.enterpriseIndustry
                        ]
                }

                let document: any = {
                        openID: memberInfo.openID,
                        name: parameters.enterpriseName,
                        type: parameters.enterpriseType || 1,
                        attr: parameters.enterpriseAttr || '',
                        identify: parameters.enterpriseIdentify || [],
                        industry: parameters.enterpriseIndustry || [],
                        nation: parameters.enterpriseNation || '中国',
                        persons: parameters.enterprisePersons || '',
                        address: parameters.enterpriseAddress || '',
                        logo: parameters.enterpriseLogo || '',
                        connect: parameters.enterpriseConnect || '',
                        description: parameters.enterpriseDescription || '',
                        begin: parameters.enterpriseBegin || '',
                        homepage: parameters.enterpriseHomepage || '',
                        zipcode: parameters.enterpriseZipcode || '',
                        email: parameters.enterpriseEmail || '',
                        recruit: parameters.enterpriseRrecruit || [],
                        welfare: parameters.enterpriseWelfare || [],
                        localeCountry: parameters.localeCountry || '',
                        localeProvince: parameters.localeProvince || '',
                        localeCity: parameters.localeCity || '',
                        localeTown: parameters.localeTown || '',
                        locationHome: [],
                        hidden: false,
                        status: false,
                        enable: true
                }
                document._id = document.openID

                if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                        document.locationHome = [parameters.locationHomeX, parameters.locationHomeY]
                }

                let callback = await this.save(document)
                if (!callback) {
                        schemaMember.findByIdAndRemove(memberInfo.openID)
                        return new Promise<any>(resolve => resolve(false))
                }

                return new Promise<any>(resolve => resolve(memberInfo))
        }
}
export default new schemaEnterprise()