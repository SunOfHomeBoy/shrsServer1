// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 查询组建团队列表
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空 注意：若管理员OpenID即满足查询添加的所有数据
//              "teamPublish": 0, // 发布时间 Number 可空 其中：0表示全部 1表示今天发布 3表示最近三天 7表示最近七天 15表示最近半月 30表示最近一月
//              "teamStatus": 0, // 组建状态 Number 可空 其中：0表示全部 1表示待处理 2表示已处理
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 10 // 每页极限 Number 可空 默认值：10
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "total": 51, // 数据总数 Number 非空
//                      "pages": 6,  // 分页总数 Number 非空
//                      "begin": 1,  // 分页页码 Number 非空
//                      "limit": 10, // 每页极限 Number 非空
//                      "items": [{
//                              "teamID": "xxxxxx", // 组建团队ID String 非空
//                              "teamCompany": "谷歌+阿里他爸", // 单位名称 String 非空
//                              "teamNumber": "1000以上", // 需求人数 String 非空
//                              "teamPlace": "天堂", // 用人地点 String 非空
//                              "teamDate": "2018年", // 用人时间 String 非空
//                              "teamBudget": "10亿美元", // 项目预算 String 非空
//                              "teamConnect": "18565898295", // 联系方式 String 非空
//                              "teamEmail": "boss@facebook.com", // 联系邮箱 String 可空
//                              "teamComment": "xxx-xxx", // 备注 String 可空
//                              "teamStatus": false, // 组建团队状态 Boolean 非空 默认值：FALSE 其中：TRUE表示已处理 FALSE表示待处理
//                              "teamSubmit": "2018-01-20 00:00:00" // 提交时间 String 非空
//                      }]
//              }]
//      }
//
// 错误代码:
//      {
//              2019: 'Invalid Parameters' // 无效的参数数据
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function searchTeam(req: request, res: response, parameters: any): Promise<IResult> {
        if (utils.empty(parameters.openID)) {
                return render({ code: 2019, msg: '' })
        }

        let openID: string = utils.openIDDecode(parameters.openID)
        let filter: any = {
                where: {},
                order: {
                        submitTime: -1
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 10
        }

        if (/^[0-9]$/.test(openID.substr(0, 1))) {
                filter.where.openID = openID
        }

        if (utils.empty(parameters.teamPublish) === false) {
                filter.where.submitTime = {
                        $gt: utils.beforeToday(parameters.teamPublish)
                }
        }

        if (utils.empty(parameters.teamStatus) === false) {
                filter.where.teamStatus = (parameters.teamStatus === 2)
        }

        let document: any = await schema.team.findPage(filter)
        document.items = utils.forEach(document.items, e => {
                return {
                        teamID: e._id,
                        teamCompany: e.teamCompany || '',
                        teamNumber: e.teamNumber || '',
                        teamPlace: e.teamPlace || '',
                        teamDate: e.teamDate || '',
                        teamBudget: e.teamBudget || '',
                        teamConnect: e.teamConnect || '',
                        teamEmail: e.teamEmail || '',
                        teamComment: e.teamComment || '',
                        teamStatus: e.teamStatus || false,
                        teamSubmit: utils.formatDate('YYYY-MM-DD HH:mm:ss', e.submitTime)
                }
        })

        return render({ code: 200, msg: '', data: document })
}