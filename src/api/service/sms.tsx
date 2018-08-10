// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 公共短信发送服务
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "smsType": "SIGNUP", // 短信发送类型 String 非空 其中：SIGNIN表示登录验证码 SIGNUP表示注册验证码 RESETPASSWORD表示找回密码验证码
//              "mobile": "13538384384", // 手机号码（不包含国家代码） String 非空
//              "mobileArea": "86" // 手机号码国家代码 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": "a86fae90b2e254aa5b90b445a512fdc6" // 短信验证码加密文
//      }
//
// 错误代码:
//      {
//              2001: "Invalid parameters mobile/mobileArea/ChinaMobile" // 请填写正确的手机号码
//              2009: "Message send too often later" // 短信发送过于频繁请稍后
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, sms } from '../../foundation'
import { mobileArea } from '../../config'

export default async function sendSMS(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '')

        if (!Object(mobileArea)[parameters.mobileArea]) {
                return render({ code: 2001, msg: 'Invalid parameters mobileArea' })
        }

        if (utils.isMobileISO(parameters.mobile) === false) {
                return render({ code: 2001, msg: 'Invalid parameters mobile' })
        }

        if (parameters.mobileArea === '86' && utils.isMobileChina(parameters.mobile) === false) {
                return render({ code: 2001, msg: 'Invalid Parameters Chinese Mobile' })
        }

        if (['SIGNIN', 'SIGNUP', 'RESETPASSWORD'].indexOf(parameters.smsType) === -1) {
                return render({ code: 200, msg: '' })
        }

        // 发送短信消息且记录其日志
        parameters.randomCode = sms.NewCode()
        parameters.messageBegin = new Date()
        parameters.messageData = await sms.send(parameters.mobile, parameters.mobileArea, parameters.smsType, parameters.randomCode)
        parameters.messageFinish = new Date()
        schema.message.sms(parameters)

        if (!parameters.messageData || typeof (parameters.messageData) !== 'boolean') {
                return render({ code: 2009, msg: 'Message send too often later' })
        }

        return render({ code: 200, msg: '', data: sms.encrypt(parameters.randomCode) })
}