// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 查看用户简历状态
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "hasFulltime": true, // 是否已填写全职简历 非空 其中：TRUE表示已填写简历 FALSE表示未填写简历
//                      "fulltimeComplete": 75, // 全职简历完整度 Number 非空 单位：百分比
//                      "fulltimeRealname": "杨清", // 全职简历真实姓名 String 非空
//                      "fulltimeImg": "", // 全职简历用户头像 String 非空
//                      "fulltimePrivacy": true, // 全职简历显示状态 Boolean 非空 其中：TRUE表示简历显示 FALSE表示简历隐藏
//                      "hasParttime": true, // 是否已填写兼职简历 非空 其中：TRUE表示已填写简历 FALSE表示未填写简历
//                      "parttimeComplete": 75, // 兼职简历完整度 Number 非空 单位：百分比
//                      "parttimeRealname": "杨清", // 兼职简历真实姓名 String 非空
//                      "parttimeImg": "", // 兼职简历用户头像 String 非空
//                      "parttimePrivacy": true, // 兼职简历显示状态 Boolean 非空 其中：TRUE表示简历显示 FALSE表示简历隐藏
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

export default async function statusResume(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        let member = await schema.member.findById(parameters.openID)
        if (utils.empty(member)) {
                return render({ code: 2101, msg: 'Invalid User Information' })
        }

        let fulltime = await schema.resume.findFulltime(parameters.openID)
        let parttime = await schema.resume.findParttime(parameters.openID)

        return render({
                code: 200, msg: '', data: {
                        hasFulltime: utils.empty((fulltime || {}).realname) === false,
                        fulltimeComplete: fulltime.resumeComplete || 0,
                        fulltimeRealname: fulltime.realname || '',
                        fulltimeImg: fulltime.img || member.img || '',
                        fulltimePrivacy: !fulltime.resumeHidden,
                        hasParttime: utils.empty((parttime || {}).realname) === false,
                        parttimeComplete: parttime.resumeComplete || 0,
                        parttimeRealname: parttime.realname || '',
                        parttimeImg: parttime.img || member.img || '',
                        parttimePrivacy: !parttime.resumeHidden
                }
        })
}
