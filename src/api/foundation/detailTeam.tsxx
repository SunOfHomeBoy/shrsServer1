// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 组建团队详细信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "teamID": "3725bebe-9c9b-407e-bf32-6e59c816f06c" // 组建团队ID String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串,
//              "data": {
//                      "teamID": "xxxxxx", // 组建团队ID String 非空
//                      "teamCompany": "谷歌+阿里他爸", // 单位名称 String 非空
//                      "teamNumber": "1000以上", // 需求人数 String 非空
//                      "teanPlace": "天堂", // 用人地点 String 非空
//                      "teamDate": "2018年", // 用人时间 String 非空
//                      "teamBudget": "10亿美元", // 项目预算 String 非空
//                      "teamConnect": "18565898295", // 联系方式 String 非空
//                      "teamEmail": "boss@facebook.com", // 联系邮箱 String 可空
//                      "teamComment": "xxx-xxx", // 备注 String 可空
//                      "teamStatus": false, // 组建团队状态 Boolean 非空 默认值：FALSE 其中：TRUE表示已处理 FALSE表示待处理
//                      "teamSubmit": "2018-01-20 00:00:00" // 提交时间 String 非空
//              }
//      }
//
// 错误代码：
//      {
//              2019: 'Invalid Parameters // 无效的参数数据'
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function detailTeam(req: request, res: response, parameters: any): Promise<IResult> {
        let callback = await schema.team.findById(parameters.teamID)

        if (utils.empty(callback)) {
                return render({ code: 2019, msg: '' })
        }

        return render({
                code: 200, msg: '', data: {
                        teamID: callback._id,
                        teamCompany: callback.teamCompany || '',
                        teamNumber: callback.teamNumber || '',
                        teamPlace: callback.teamPlace || '',
                        teamDate: callback.teamDate || '',
                        teamBudget: callback.teamBudget || '',
                        teamConnect: callback.teamConnect || '',
                        teamEmail: callback.teamEmail || '',
                        teamComment: callback.teamComment || '',
                        teamStatus: callback.teamStatus || false,
                        submitTime: utils.formatDate('YYYY-MM-DD HH:mm:ss', callback.submitTime)
                }
        })
}