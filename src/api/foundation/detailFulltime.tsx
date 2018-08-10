// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 全职简历详细信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "resumeID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 简历拥有者OpenID加密字符串 String 非空
//              "resumeStep": "ALL" // 简历步骤 String 可空 默认值：ALL 其中：ALL表示所有信息 FIRST表示编辑个人信息 SECOND表示编辑简历信息
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 简历拥有者OpenID加密字符串 String 非空
//                      "unsafe": false, // 非安全模式 Boolean 非空 其中：TRUE表示非安全模式即待购买号码 FALSE表示安全模式即查询所有信息
//                      "infoType": "MOBILE", // 购买模式 String 非空 其中：MOBILE表示购买手机 VEDIO表示购买视频 注意：仅限安全模式查看他人
//                      "onlineStatus": true, // 實時在線狀態 Boolean
//                      ... // <a href="./tSchema.html#resume">详见其他字段</a>
//              }
//      }
//
// 错误代码:
//      {
//              2018: "Invalid Member Information" // 无效的用户信息
//              2019: "Invalid Parameters" // 无效的参数数据
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, log } from '../../foundation'

export default async function detailFulltime(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.resumeID = parameters.resumeID || parameters.openID
        parameters.openID = utils.openIDDecode(parameters.openID)
        parameters.resumeID = utils.openIDDecode(parameters.resumeID)

        let document: any = await schema.resume.findFulltime(parameters.resumeID)
        if (!document) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }
        document.onlineStatus = await schema.resume.onlineStatusRealtime(document.openID)

        // 其他人查看简历信息
        if (parameters.openID !== parameters.resumeID) {
                /*if (document.resumeHidden) {
                        return render({ code: 2019, msg: 'Invalid Parameters' })
                }*/

                // 判断购买记录是否过期
                let orderSafe = await schema.resume.checkSafe(parameters.openID, parameters.resumeID, 'FULLTIME')

                if (orderSafe) {
                        return render({ code: 200, msg: '', data: schema.resume.formatFulltime(document, 'SAFE', orderSafe) })
                }

                await log.fulltime(req, parameters.resumeID, parameters)
                return render({ code: 200, msg: '', data: schema.resume.formatFulltime(document, 'UNSAFE') })
        }

        // 自己查看自己简历信息
        let member = await schema.member.existsByID(parameters.openID)
        if (!member) {
                return render({ code: 2018, msg: 'Invalid User Information' })
        }

        return render({ code: 200, msg: '', data: schema.resume.formatFulltime(document, parameters.resumeStep) })
}