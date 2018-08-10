// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 推送信息
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "noticeTyp": "VEDIO_OFFLINE" // 消息类型 String 非空 其中：VEDIO_OFFLINE表示视频对话离线 VEDIO_UNSUCCESS表示在線通話未成功 
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "resumeID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 简历拥有者OpenID加密字符串 String 非空
//              "resumeType": "FULLTIME", // 简历类型 String 非空 其中：FULLTIME表示全职简历 PARTTIME表示兼职简历
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, jpush } from '../../foundation'

export default async function version(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.extras = { noticeTyp: parameters.noticeType }
        parameters.openID = utils.openIDDecode(parameters.openID)
        parameters.resumeID = utils.openIDDecode(parameters.resumeID)

        parameters.memberInfo = await schema.member.findById(parameters.openID)
        parameters.memberTo = await schema.member.findById(parameters.resumeID)
        let message = ''

        switch (parameters.noticeType) {
                case 'VEDIO_OFFLINE':
                        message = `视频电话：${parameters.memberInfo.realname}正在和您视频对话，请及时检查`
                        parameters.extras.openID = utils.openIDEncode(parameters.openID)
                        parameters.extras.vedioID = utils.formatOpenID(parameters.resumeID)
                        jpush.send(parameters.memberTo.deviceID, message, parameters)
                        await schema.order.setReaded(parameters.openID, parameters.resumeID, parameters.resumeType, false)
                        break

                case 'VEDIO_UNSUCCESS':
                        await schema.order.setReaded(parameters.openID, parameters.resumeID, parameters.resumeType, false)
                        break
        }
        return render({ code: 200, msg: '' })
}