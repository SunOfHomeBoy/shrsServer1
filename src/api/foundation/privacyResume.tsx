// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 设置简历显示或者隐藏
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "resumeType": "FULLTIME", // 简历类型 String 非空 其中：FULLTIME表示全职简历 PARTTIME表示兼职简历
//              "resumePrivacy": true // 显示状态 Boolean 非空 其中：TRUE表示简历显示 FALSE表示简历隐藏
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
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function privacyResume(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        let member = await schema.member.existsByID(parameters.openID)
        if (!member) {
                return render({ code: 2018, msg: 'Invalid Member Information' })
        }

        if (parameters.resumeType !== 'FULLTIME' && parameters.resumeType !== 'PARTTIME') {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        let document = {
                openID: parameters.openID,
                resumeType: parameters.resumeType,
                resumeHidden: parameters.resumePrivacy ? false : true
        }

        let callback = await schema.resume.saveResume(document)
        if (!callback) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}