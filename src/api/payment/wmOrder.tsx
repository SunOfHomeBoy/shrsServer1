// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 查询谁查看我记录
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 10 // 每页极限 Number 可空 默认值：10
//              "locationX": xx.xxxx, // 搜索坐标X轴 Number 可空
//              "locationY": xx.xxxx, // 搜索坐标Y轴 Number 可空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "total": 51, // 查询数据总量 Number 非空
//                      "pages": 6, // 数据分页总数 Number 非空
//                      "limit": 10, // 每页数据极限 Number 非空
//                      "begin": 1, // 当前分页页码 Number 非空
//                      "items": [{
//                              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//                              "username": "傻逼", // 昵称 String 可空
//                              "realname": "杨清", // 姓名 String 可空
//                              "sex": 0, // 性别 Number 可空 其中：1表示男性 2表示女性
//                              "img": "xxx", // 头像 String 可空
//                              "mobile": "135xxxx8888", // 手机号码安全格式 String 可空
//                              "mobileArea": "86", // 手机号码国家代码 String 可空
//                              "address": "xxx", // 联系地址 String 可空
//                              "isEnterprise": false, // 企业用户 Boolean 非空 其中：TRUE表示企业用户 FALSE表示个人用户
//                              "enterpriseName": "百度", // 企业名称 String 可空
//                              "enterpriseAttr": "独资", // 企业属性 String 可空
//                              "enterpriseLogo": "xxx", // 企业Logo String 可空
//                              "enterpriseAddress": "xxx", // 企业地址 String 可空
//                              "submitDate": "2017-12-12 00:00:00", // 查看日期
//                              "locationX": xx.xxxx, // 实时坐标X轴 可空
//                              "locationY": xx.xxxx, // 实时坐标Y轴 可空
//                              "distance": 0, // 和搜索坐标之距离 可空 默认值：0 单位：米
//                              "orderID": "xxxx", // 相关订单编号 可空 默认值：空字符串
//                              "readed": false // 已读状态 可空 默认值：FALSE 其中：TRUE表示已读 FALSE表示未读
//                              "resumeType": "FULLTIME" // 简历类型 可空 默认值：空字符串 其中：FULLTIME表示全职简历 PARTTIME表示兼职简历
//                      }]
//              }]
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function wmOrder(req: request, res: response, parameters: any): Promise<IResult> {
        let filter: any = {
                where: {
                        orderUser: utils.openIDDecode(parameters.openID),
                        orderType: 2,
                        orderStatus: 1,
                        orderComment: {
                                $in: ['FULLTIME', 'PARTTIME']
                        }
                },
                order: {
                        orderSubmit: -1,
                        orderID: -1
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 10
        }

        let document = await schema.order.findPage(filter)
        if (document.items instanceof Array && document.items.length > 0) {
                let ids = []
                for (let item of document.items) {
                        if (ids.indexOf(item.openID) === -1) {
                                ids.push(item.openID)
                        }
                }

                let members = await schema.member.findMapByIds(...ids)
                let enterprises = await schema.enterprise.findMapByIds(...ids)

                let items: any = []
                for (let item of document.items) {
                        let member = members[item.openID] || {}
                        let enterprise = enterprises[item.openID] || {}

                        items.push({
                                openID: utils.openIDEncode(item.openID),
                                username: member.username || '',
                                realname: member.realname || '',
                                sex: member.sex || 0,
                                img: member.img || '',
                                mobile: utils.formatMobile(member.mobile),
                                mobileArea: member.mobileArea || '86',
                                address: member.address || '',
                                isEnterprise: member.isEnterprise || false,
                                enterpriseName: enterprise.name || '',
                                enterpriseAttr: enterprise.attr || '',
                                enterpriseLogo: enterprise.logo || '',
                                enterpriseAddress: enterprise.address || '',
                                submitDate: utils.formatDate('YYYY-MM-DD HH:mm:ss', item.orderSubmit),
                                locationX: (member.location || [])[0] || 0,
                                locationY: (member.location || [])[1] || 0,
                                distance: utils.gcDistance(
                                        (member.location || [])[0] || 0,
                                        (member.location || [])[1] || 0,
                                        parameters.locationX,
                                        parameters.locationY
                                ),
                                orderID: item.orderID || '',
                                readed: item.orderReaded || false,
                                resumeType: item.orderComment || ''
                        })
                }
                document.items = items
        }

        return render({ code: 200, msg: '', data: document })
}
