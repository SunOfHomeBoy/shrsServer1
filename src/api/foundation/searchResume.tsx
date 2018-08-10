// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 搜索简历信息列表
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "searchType": "CITY", // 搜索类型 String 非空 其中：CITY表示城市搜索 POSITION表示坐标搜索
//              "resumeType": "ALL", // 简历类型 String 可空 其中：ALL表示全职兼职简历 FULLTIME表示全职简历 PARTTIME表示兼职简历
//              "keyword": "Python", // 搜索关键词 String 可空
//              "sex": 0, // 搜索性别 Number 可空 默认值：0 其中：0表示全部 1表示男性 2表示女性
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
//                              "openID": "7N2Q3YjJhYWQ5YWE3ZjQ3MTc5MDA3ZjFkZTg5NTFkM2M32", // 简历拥有者OpenID加密字符串 String 非空
//                              "resumeType": "FULLTIME", // 简历类型 String 非空 其中：FULLTIME表示全职简历 PARTTIME表示兼职简历
//                              "img": "http://i2.fuimg.com/611341/42fd4338017523e0.jpg", // 头像图片 String 可空
//                              "sex": 2, // 性别 Number 可空 其中：1表示男性 2表示女性
//                              "username": "", // 用户昵称 String 可空
//                              "realname": "孙玉娥", // 真实姓名 String 可空
//                              "mobileArea": "86", // 手机号码国家代码 String 可空 默认值：86
//                              "mobile": "180****3556", // 手机号码安全格式化 String 非空
//                              "localeCountry": "中国", // 现居所在地国家 可空 默认值：中国
//                              "localeProvince": "北京市", // 现居所在地省份 可空 默认值：空字符串
//                              "localeCity": "北京市", // 现居所在地城市 可空 默认值：空字符串
//                              "localeTown": "西城区", // 现居所在地镇县 可空 默认值：空字符串
//                              "expectCountry": "中国", // 期望工作地点之国家 可空 默认值：中国
//                              "expectProvince": "北京市", // 期望工作地点之省份 可空 默认值：可空字符串
//                              "expectCity": "北京市", // 期望工作地点之城市 可空 默认值：空字符串
//                              "expectTown": "西城区", // 期望工作地点之镇县 可空 默认值：空字符串
//                              "expectWork": "傻逼", // 期望工作 默认值：空字符串
//                              "expectMoney": 0, // 期望工资 默认值：0 其中：0表示面谈 <br> 1表示1000元/月以下 2表示1000-2000元/月 3表示2000-4000元/月 <br> 4表示4000-6000元/月 5表示6000-8000元/月 6表示8000-10000元/月 <br> 7表示10000元-15000元/月 8表示15000-25000元/月 9表示25000-35000元/月 <br> 10表示35000-50000元/月 11表示50000-100000元/月 12表示100000元/月以
//                              "skill": [ // 擅长技能 可空 默认值：空数组
//                                      "良好协调沟通能力",
//                                      "适应力强",
//                                      "反应快",
//                                      "积极",
//                                      "灵活"
//                              ],
//                              "servicePrice": 10000, // 服务价格 可空 默认值：0 单位：分
//                              "signature": "热情随和。不怕脏不怕累。", // 自我评价 可空 默认值：空字符串
//                              "workYear": 2, // 最高工作年限 可空 默认值：0
//                              "goodAt": "", // 专业擅长 可空 默认值：空字符串
//                              "locationX": xx.xxxx, // 实时坐标X轴 可空
//                              "locationY": xx.xxxx, // 实时坐标Y轴 可空
//                              "distance": 4193, // 和搜索坐标之距离 可空 默认值：0 单位：米
//                              "resumeAt": 0 // 点赞数 默认值：0,
//                              "onlineStatus": false, // 在線狀態 其中：TRUE表示在線 FALSE表示離線
//                      }]
//              }
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function searchResume(req: request, res: response, parameters: any): Promise<IResult> {
        let filter: any = {
                where: {
                        $and: [
                                {
                                        resumeHidden: false
                                },
                                {
                                        location: {
                                                $ne: [0, 0]
                                        }
                                },
                                {
                                        resumeComplete: {
                                                $gte: 60
                                        }
                                }
                        ]
                },
                order: {
                        onlineTime: -1,
                        resumeUpdate: -1
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 10
        }

        if (parameters.resumeType && parameters.resumeType !== 'ALL') {
                filter.where.$and.push({
                        resumeType: parameters.resumeType
                })
        }

        if (parameters.sex === 1 || parameters.sex === 2) {
                filter.where.$and.push({
                        sex: parameters.sex
                })
        }

        if (utils.empty(parameters.keyword) === false) {
                if (parameters.resumeType === 'FULLTIME') {
                        filter.where.$and.push({
                                $or: [
                                        {
                                                expectWork: {
                                                        $regex: new RegExp(parameters.keyword, 'i')
                                                }
                                        },
                                        {
                                                realname: {
                                                        $regex: new RegExp(String(parameters.keyword.split('').join('*')), 'i')
                                                }
                                        }
                                ]
                        })

                } else if (parameters.resumeType === 'PARTTIME') {
                        filter.where.$and.push({
                                $or: [
                                        {
                                                skill: {
                                                        $elemMatch: {
                                                                $regex: new RegExp(parameters.keyword, 'i')
                                                        }
                                                }
                                        },
                                        {
                                                realname: {
                                                        $regex: new RegExp(String(parameters.keyword.split('').join('*')), 'i')
                                                }
                                        }
                                ]
                        })

                } else if (parameters.resumeType === 'ALL') {
                        filter.where.$and.push({
                                $or: [
                                        {
                                                expectWork: {
                                                        $regex: new RegExp(parameters.keyword, 'i')
                                                }
                                        },
                                        {
                                                skill: {
                                                        $elemMatch: {
                                                                $regex: new RegExp(parameters.keyword, 'i')
                                                        }
                                                }
                                        },
                                        {
                                                realname: {
                                                        $regex: new RegExp(String(parameters.keyword.split('').join('*')), 'i')
                                                }
                                        }
                                ]
                        })
                }
        }

        if (parameters.searchType === 'POSITION' && typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                filter.where.$and.push({
                        location: {
                                $near: {
                                        $geometry: {
                                                type: "Point",
                                                coordinates: [parameters.locationX, parameters.locationY],
                                        }
                                }
                        }
                })
        } else if (parameters.localeCountry && parameters.localeProvince && parameters.localeCity && parameters.localeTown) {
                filter.where.$and.push({
                        $or: [{
                                localeCountry: parameters.localeCountry,
                                localeProvince: parameters.localeProvince,
                                localeCity: parameters.localeCity,
                                localeTown: parameters.localeTown
                        }, {
                                expectCountry: parameters.localeCountry,
                                expectProvince: parameters.localeProvince,
                                expectCity: parameters.localeCity,
                                expectTown: parameters.localeTown
                        }]
                })
        }

        let document = await schema.resume.findPage(filter)
        let items = schema.resume.formatResumes(document.items, parameters)
        let random = utils.random(items.length)

        document.items = new Array(items.length)
        if (items.length > 0) {
                for (let i = 0; i < items.length; i++) {
                        let j = (i + random) % items.length

                        document.items[j] = items[i]
                }
        }

        return render({ code: 200, msg: '', data: document })
}
