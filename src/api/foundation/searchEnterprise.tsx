// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 搜索公司岗位信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "searchType": "CITY", // 搜索类型 String 非空 其中：CITY表示城市搜索 POSITION表示坐标搜索
//              "keyword": "Python", // 搜索关键词 String 可空
//              "locationX": xx.xxxx, // 搜索坐标X轴 Number 可空 注意：仅对坐标搜索有效
//              "locationY": xx.xxxx, // 搜索坐标Y轴 Number 可空 注意：仅对坐标搜索有效
//              "localeCountry": "中国", // 搜索目标地之国家 String 可空 默认值：中国 注意：仅对城市搜索有效
//              "localeProvince": "北京市", // 搜索目标地之省份 String 可空 注意：仅对城市搜索有效
//              "localeCity": "北京市", // 搜索目标地之城市 String 可空 注意：仅对城市搜索有效
//              "localeTown": "北京市", // 搜索目标地之镇县 String 可空 注意：仅对城市搜索有效
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 10, // 每页极限 Number 可空 默认值：10
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "total": 51, // 数据总数 Number 非空
//                      "pages": 6,  // 分页总数 Number 非空
//                      "begin": 1,  // 分页页码 Number 非空
//                      "limit": 10, // 每页极限 Number 非空
//                      "items": [{
//                              "openID": "7N2Q3YjJhYWQ5YWE3ZjQ3MTc5MDA3ZjFkZTg5NTFkM2M32", // 公司OpenID加密字符串 String 非空
//                              "enterpriseName": "百度", // 公司名称 String 非空
//                              "enterpriseLogo": "xxxxxx", // 公司Logo图标 String 可空
//                              "enterpriseAttr": "民企", // 公司性质 String 可空
//                              "enterprisePersons": "100-999", // 公司规模 String 可空
//                              "enterpriseHomepage": "xxx", // 公司网站 String 可空
//                              "enterpriseAddress": "xxx", // 详细地址 String 可空
//                              "enterpriseIndustry": [ // 所属行业 Array 可空
//                                      "教育/培训/院校"
//                              ],
//                              "enterpriseWelfare": [ "五险一金" ], // 福利待遇 Array 可空
//                              "enterpriseRecruit": [ // 招聘岗位 Array 可空
//                                      "中医体检师",
//                                      "别墅管家"
//                              ],
//                              "localeCountry": "中国", // 公司所在地之国家 String 非空
//                              "localeProvince": "北京市", // 公司所在地之省份 String 非空
//                              "localeCity": "北京市", // 公司所在地之城市 String 非空
//                              "localeTown": "东城区", // 公司所在地之镇县 String 非空
//                              "locationHomeX": xx.xxxx // 公司坐标X轴 可空
//                              "locationHomeY": xx.xxxx // 公司坐标Y轴 可空
//                              "distance": 4193 // 和搜索坐标之距离 可空 默认值：0 单位：米
//                      }]
//              }
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function searchEnterprise(req: request, res: response, parameters: any): Promise<IResult> {
        let filter: any = {
                where: {
                        $and: [
                                {
                                        enable: true
                                }
                        ]
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 10
        }

        if (utils.empty(parameters.keyword) === false) {
                filter.where.$and.push({
                        $or: [{
                                name: {
                                        $regex: new RegExp(parameters.keyword, 'i')
                                }
                        }, {
                                recruit: {
                                        $elemMatch: {
                                                $regex: new RegExp(parameters.keyword, 'i')
                                        }
                                }
                        }]
                })
        }

        if (parameters.searchType === 'POSITION' && typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                filter.where.$and.push({
                        locationHome: {
                                $near: {
                                        $geometry: {
                                                type: "Point",
                                                coordinates: [parameters.locationX, parameters.locationY]
                                        }
                                }
                        }
                })
        } else if (parameters.localeCountry && parameters.localeProvince && parameters.localeCity && parameters.localeTown) {
                filter.where.$and.push({
                        localeCountry: parameters.localeCountry,
                        localeProvince: parameters.localeProvince,
                        localeCity: parameters.localeCity,
                        localeTown: parameters.localeTown
                })
        }

        let document = await schema.enterprise.findPage(filter)
        document.items = utils.forEach(document.items, (e: any): any => {
                return {
                        openID: utils.openIDEncode(e.openID),
                        enterpriseName: e.name || '',
                        enterpriseLogo: e.logo || '',
                        enterpriseAttr: e.attr || '',
                        enterprisePersons: e.persons || '',
                        enterpriseHomepage: e.homepage || '',
                        enterpriseAddress: e.address || '',
                        enterpriseIndustry: e.industry || [],
                        enterpriseRecruit: e.recruit || [],
                        enterpriseWelfare: e.wekfare || [],
                        localeCountry: e.localeCountry,
                        localeProvince: e.localeProvince,
                        localeCity: e.localeCity,
                        localeTown: e.localeTown,
                        locationHomeX: (e.locationHome || [])[0] || 0,
                        locationHomeY: (e.locationHome || [])[1] || 0,
                        distance: utils.gcDistance(
                                (e.locationHome || [])[0] || 0,
                                (e.locationHome || [])[1] || 0,
                                parameters.locationX,
                                parameters.locationY
                        ) || 0
                }
        })

        return render({ code: 200, msg: '', data: document })
}