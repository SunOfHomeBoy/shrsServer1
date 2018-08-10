// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 查询我查看谁记录
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "resumeType": "FULLTIME" // 简历类型 String 非空 其中：ALL表示全部 FULLTIME表示全职简历 PARTTIME表示兼职简历 ALL表示全职或者兼职
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
//                              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 简历拥有者OpenID加密字符串 String 非空
//                              "resumeType": "FULLTIME", // 简历类型 String 非空
//                              "img": '', // 简历拥有者头像 String 可空
//                              "sex": 1, // 用户性别 Number 非空 其中：1表示男性 2表示女性
//                              "realname": "杨清", // 真实姓名 String 非空
//                              "mobile": "185****8295", // 手机号码加密字符串 String 非空
//                              “mobileArea": "86", // 手机号码国家代码 String 非空
//                              "localeCountry": "中国", // 现居所在地国家 可空 默认值：中国
//                              "localeProvince": "北京市", // 现居所在地省份 可空 默认值：空字符串
//                              "localeCity": "北京市", // 现居所在地城市 可空 默认值：空字符串
//                              "localeTown": "通州区", // 现居所在地镇县 可空 默认值：空字符串
//                              "skill": [ "You are 2B" ], // 擅长技能 可空 默认值：空数组
//                              "signature": "", // 自我评价 可空 默认值：空字符串
//                              "submitDate": "2017-12-12 00:00:00" // 查看日期
//                              "locationX": xx.xxxx // 实时坐标X轴 可空
//                              "locationY": xx.xxxx // 实时坐标Y轴 可空
//                              "distance": 0 // 和搜索坐标之距离 可空 默认值：0 单位：米
//                      }]
//              }]
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function mwOrder(req: request, res: response, parameters: any): Promise<IResult> {
        let filter: any = {
                where: {
                        openID: utils.openIDDecode(parameters.openID),
                        orderType: 2,
                        orderStatus: 1
                },
                order: {
                        orderSubmit: -1,
                        orderID: -1
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 10
        }

        if (parameters.resumeType === 'FULLTIME' || parameters.resumeType === 'PARTTIME') {
                filter.where.orderComment = parameters.resumeType
        } else {
                filter.where.orderComment = {
                        $in: ['FULLTIME', 'PARTTIME']
                }
        }

        let document = await schema.order.findPage(filter)
        if (document.items instanceof Array && document.items.length > 0) {
                let ids: string[] = []
                for (let item of document.items) {
                        let key: string = `${item.orderUser}#${item.orderComment}`
                        if (ids.indexOf(key) === -1) {
                                ids.push(key)
                        }
                }

                let resumes = await schema.resume.findMapByIds(...ids)
                let buffers = utils.forEach(document.items, (e: any): any => {
                        let resume = resumes[`${e.orderUser}#${e.orderComment}`] || {}
                        resume.submitDate = utils.formatDate('YYYY-MM-DD HH:mm:ss', e.orderSubmit)
                        return resume
                })
                document.items = schema.resume.formatResumes(buffers, {
                        fields: ['submitDate'],
                        locationX: parameters.locationX,
                        locationY: parameters.locationY
                })
        }

        return render({ code: 200, msg: '', data: document })
}