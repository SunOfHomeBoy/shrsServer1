// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 企业用户招聘详细信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 企业用户OpenID加密字符串 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "openID": "7N2Q3YjJhYWQ5YWE3ZjQ3MTc5MDA3ZjFkZTg5NTFkM2M32", // 公司OpenID加密字符串 String 非空
//                      "enterpriseName": "百度", // 公司名称 String 非空
//                      "enterpriseLogo": "xxxxxx", // 公司Logo图标 String 可空
//                      "enterpriseAttr": "民企", // 公司性质 String 可空
//                      "enterprisePersons": "100-999", // 公司规模 String 可空
//                      "enterpriseHomepage": "xxx", // 公司网站 String 可空
//                      "enterpriseAddress": "xxx", // 详细地址 String 可空
//                      "enterpriseIndustry": [ // 所属行业 Array 可空
//                              "教育/培训/院校"
//                       ],
//                      "enterpriseDescription": "xxx", // 公司描述 String 可空
//                      "enterpriseRecruit": [{ // 招聘岗位 Array 可空
//                              "workID": "xxxxxx", // 岗位招聘ID String 非空
//                              "workName": "傻逼", // 岗位名称 String 非空
//                              "money": 0, // 工资待遇 Number 默认值：0 其中：<br> 1表示1000元/月以下 2表示1000-2000元/月 3表示2000-4000元/月 <br> 4表示4000-6000元/月 5表示6000-8000元/月 6表示8000-10000元/月 <br> 7表示10000元-15000元/月 8表示15000-25000元/月 9表示25000-35000元/月 <br> 10表示35000-50000元/月 11表示50000-100000元/月 12表示100000元/月以上
//                              "officetime": 8, // 上班时间 Number 可空
//                              "welfare": ["五险一金"], // 福利待遇 Array 可空
//                              "address": "xxx", // 上班地点 String 可空
//                              "description": "xxx", // 岗位描述及要求 String 非空
//                              "submitTime": "2018-01-01", // 岗位发布时间 String 非空
//                              "updateTime": "2018-01-01" // 岗位更新时间 String 非空
//                      }]
//              }
//      }
//
// 错误代码:
//      {
//              2018: "Invalid Member Information" // 无效的用户信息
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function detailEnterprise(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        let document: any = await schema.enterprise.findById(parameters.openID)
        if (!document) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        let recruitments = await schema.recruitment.allRecruit(parameters.openID)
        return render({
                code: 200, msg: '', data: {
                        openID: utils.openIDEncode(document.openID),
                        enterpriseName: document.name || '',
                        enterpriseLogo: document.logo || '',
                        enterpriseAttr: document.attr || '',
                        enterprisePersons: document.persons || '',
                        enterpriseHomepage: document.homepage || '',
                        enterpriseAddress: document.address || '',
                        enterpriseIndustry: document.industry || [],
                        enterpriseDescription: String(document.description || '').replace(/^\n/, '　　').replace(/\n/g, '\n\n　　'),
                        enterpriseRecruit: utils.forEach(recruitments, (e: any): any => {
                                return {
                                        workID: e._id,
                                        workName: e.workName,
                                        money: e.money,
                                        officetime: e.officetime,
                                        welfare: e.welfare,
                                        address: e.address,
                                        description: e.description,
                                        submitTime: utils.formatDate('YYYY-MM-DD HH:mm:ss', e.submitTime),
                                        updateTime: utils.formatDate('YYYY-MM-DD HH:mm:ss', e.updateTime)
                                }
                        })
                }
        })
}