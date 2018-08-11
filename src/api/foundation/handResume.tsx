// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户投递简历
//
// 调用权限: API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "workID": "b0525bea-448a-427b-9624-aaaef1ef3263" // 招聘岗位ID String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": true // 投简历状态 Boolean 其中：TRUE表示投简历成功 FALSE表示三十天内已重复提交
//      }
//
// 错误代码：
//      {
//              2019: 'Invalid Parameters' // 无效的参数数据
//              2020: 'Save Parameters Failth' // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function handResume(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        if (utils.empty(parameters.openID) || utils.empty(parameters.workID)) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        let recruit = await await schema.relation.findById(`RESUME#${parameters.openID}#${parameters.workID}`)
        if (utils.empty(recruit) === false && utils.dateDifference(new Date(), recruit.relTime) <= 30) {
                return render({ code: 200, msg: '', data: false })

        } else if (utils.empty(recruit) === false) {
                recruit.relTime = new Date()

        } else {
                recruit = {
                        _id: `RESUME#${parameters.openID}#${parameters.workID}`,
                        openID: parameters.openID,
                        relType: 'RESUME',
                        relDest: parameters.workID,
                        relTime: new Date(),
                        relStatus: true,
                        relComment: ''
                }
        }

        let callback = await schema.relation.save(recruit)
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failt' })
        }

        return render({ code: 200, msg: '', data: true })
}