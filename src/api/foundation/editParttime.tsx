// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 编辑兼职简历信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "locationHomeX": 116.663947, // 联系地址的地图坐标X轴 String 可空 注意：在移动端若address非空则此项非空
//              "locationHomeY": 39.913999, // 联系地址的地图坐标Y轴 String 可空 注意：在移动端若address非空则此项非空
//              ... // <a href="./tSchema.html#resume">详见其他字段</a>
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// 错误代码:
//      {
//              2018: "Invalid Member Information" // 无效的用户信息
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function editParttime(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)
        parameters.resumeType = 'PARTTIME'

        let member = await schema.member.existsByID(parameters.openID)
        if (!member) {
                return render({ code: 2018, msg: 'Invalid Member Information' })
        }

        let callback = await schema.resume.saveResume(parameters)
        if (!callback) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}