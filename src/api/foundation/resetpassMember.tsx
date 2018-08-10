// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 找回用户密码
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "resetStep": "FIRST", // 找回密码步骤 String 非空 其中：FIRST表示第一步骤 SECOND表示第二步骤
//              "mobileArea": "86", // 手机号码国家代码 String 可空 默认值：86
//              "mobile": "18565898296", // 用户注册手机号码 String 非空
//              "captcha": "123456", // 短信验证码输入值 String 非空
//              "encrypt": "xxxxxx", // 短信验证码加密文 String 非空
//              "password": "1qaz2wsx", // 注册密码 String 非空
//              "confirm": "1qaz2wsx", // 确认密码 String 非空
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
//              2002: "Password contains at least 6 characters" // 账号密码必须不少于六位
//              2003: "Password must contain uppercase characters" // 账号密码必须包含大写字母
//              2004: "Password must contain lowercase characters" // 账号密码必须包含小写字母
//              2005: "Password must contain numeric characters" // 账号密码必须包含数字
//              2006: "Password and Re-enter password must be consistent" // 账号密码必须和确认密码一致
//              2007: "Please enter the correct verification code" // 请填写正确的短信验证码
//              2013: "Given account has not been registered" // 给定账号尚未注册
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, sms } from '../../foundation'

export default async function resetpassMember(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '')

        if (parameters.resetStep !== 'FIRST' && parameters.resetStep !== 'SECOND') {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        if (sms.check(parameters.captcha, parameters.encrypt) === false) {
                return render({ code: 2007, msg: 'Please enter the correct verification code' })
        }

        let memberInfo = await schema.member.findOneByMobile(parameters.mobile, parameters.mobileArea)
        if (utils.empty(memberInfo)) {
                return render({ code: 2013, msg: 'Given account has not been registered' })
        }

        if (parameters.resetStep === 'FIRST') {
                return render({ code: 200, msg: '' })
        }

        if (utils.empty(parameters.password) || typeof (parameters.password) !== 'string' || parameters.password.length < 6) {
                return render({ code: 2003, msg: 'Password contains at least 6 characters' })
        }

        if (/[A-Z]/.test(parameters.password) === false) {
                return render({ code: 2003, msg: 'Password contains at least 6 characters' })
        }

        if (/[a-z]/.test(parameters.password) === false) {
                return render({ code: 2004, msg: 'Password must contain uppercase characters' })
        }

        if (/[0-9]/.test(parameters.password) === false) {
                return render({ code: 2005, msg: 'Password must contain numeric characters' })
        }

        if (parameters.password !== parameters.confirm) {
                return render({ code: 2006, msg: 'Password and Re-enter password must be consistent' })
        }

        memberInfo.password = utils.cryptoPassword(parameters.password)
        let callback = await schema.member.save(memberInfo)
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}