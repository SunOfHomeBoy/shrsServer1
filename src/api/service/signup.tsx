// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 个人企业用户安全注册
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "registerType": "PERSON", // 用户注册类型 String 非空 其中：PERSON表示个人用户 ENTERPRISE表示企业用户
//              "mobileArea": "86", // 手机号码的国家代码 String 非空 默认值：86
//              "mobile": "18565898295", // 手机号码（不包含国家代码） String 非空
//              "password": "1qaz2wsx", // 注册密码 String 非空
//              "confirm": "1qaz2wsx", // 确认密码 String 非空
//              "captcha": "123456", // 短信验证码输入值 String 非空
//              "encrypt": "xxxxxx", // 短信验证码加密文 String 非空
//              "enterpriseType": 1, // 企业类型 Number 可空 其中：1表示企业 2表示政府 3表示组织 仅对registerType=enterprise有效
//              "enterpriseName": "京典一线网络技术（北京）有限公司", // 企业名称 String 可空 仅对registerType=enterprise有效\
//              "username": "hr" // 企业用户管理员账号 String 可空 仅对registerType=enterprise有效
//              "wechatID": "xxxxxx", // 微信OpenID String 可空 注意：28位字符串
//              "tencentID": "xxxxx", // 腾讯OpenID String 可空 注意：32位字符串
//              "nickname": "xxxxxx", // 第三方账号绑定之昵称 String 可空 仅对第三方账号绑定有效
//              "sex": 0, // 第三方账号绑定之性别 String 可空 其中：1表示男性 2表示女性 仅对第三方账号绑定有效
//              "headerImg": "xxxxxx", // 第三方账号绑定之头像 String 可空 仅对第三方账号绑定有效
//              "deviceID": "xxxxxx", // 移动端设备ID String 非空
//              "locationX": xx.xxxx, // 实时定位坐标X轴 Number 非空
//              "locationY": xx.xxxx  // 实时定位坐标Y轴 Number 非空
//      }
// 
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "tokenID": "5bd80cd7-5c17-41e8-93d0-7ed1f35cd556", // 会话令牌 String 非空
//                      "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//                      "isEnterprise": false, // 是否企业用户 Boolean 非空 其中：TRUE是企业用户 FALSE是个人用户
//                      "username": "xxxxxx", // 账号名称 String 可空
//                      "realname": "杨清", // 真实姓名 String 可空
//                      "mobile": "185****8295", // 加密手机号码 String 可空
//                      "headerImg": "", // 用户头像图片 String 可空
//                      "backgroundImg": "", // 用户中心背景图片 String 可空
//                      "rebate": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 返利账号OpenID加密字符串
//                      "bandVedio": false, // 视频绑定状态 Boolean 可空 其中：TRUE表示已经绑定 FALSE表示尚未绑定
//                      "infoVedio": "xxxx" // 视频账号信息 String
//              }
//      }
//
// 错误代码:
//      {
//              2001： "Invalid parameters mobile/mobileArea/ChinaMobile" // 请填写正确的手机号码
//              2002: "Password contains at least 6 characters" // 账号密码必须不少于六位
//              2003: "Password must contain uppercase characters" // 账号密码必须包含大写字母
//              2004: "Password must contain lowercase characters" // 账号密码必须包含小写字母
//              2005: "Password must contain numeric characters" // 账号密码必须包含数字
//              2006: "Password and Re-enter password must be consistent" // 账号密码必须和确认密码一致
//              2007: "Please enter the correct verification code" // 请填写正确的短信验证码
//              2010: "Given mobile has been registered" // 手机号码已经被注册
//              2011: "Given enterprise has been registered" // 企业名称已经被注册
//              2012: "Account Registered Failth // 账号注册失败"
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2017-12 $$
import { request, response, IResult, render, utils, schema, sms, token, purview } from '../../foundation'
import { mobileArea, setting } from '../../config'

// 调试模式即支持注册内置账号
const debugPrivate: boolean = setting.debug

export default async function signup(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '')

        if (!Object(mobileArea)[parameters.mobileArea]) {
                return render({ code: 2001, msg: 'Invalid parameters mobileArea' })
        }

        if (utils.isMobileISO(parameters.mobile) === false) {
                return render({ code: 2001, msg: 'Invalid parameters mobile' })
        }

        if (utils.isMobileChina(parameters.mobile) === false) {
                return render({ code: 2001, msg: 'Invalid parameters Chinese mobile' })
        }

        if (utils.empty(parameters.password) || typeof (parameters.password) !== 'string' || parameters.password.length < 6) {
                return render({ code: 2003, msg: 'Password contains at least 6 characters' })
        }

        /*if (/[A-Z]/.test(parameters.password) === false) {
                return render({ code: 2003, msg: 'Password contains at least 6 characters' })
        }

        if (/[a-z]/.test(parameters.password) === false) {
                return render({ code: 2004, msg: 'Password must contain uppercase characters' })
        }

        if (/[0-9]/.test(parameters.password) === false) {
                return render({ code: 2005, msg: 'Password must contain numeric characters' })
        }*/

        if (parameters.password !== parameters.confirm) {
                return render({ code: 2006, msg: 'Password and Re-enter password must be consistent' })
        }

        if (!parameters.captcha || !parameters.encrypt || sms.encrypt(parameters.captcha) !== parameters.encrypt) {
                if (debugPrivate === false) {
                        return render({ code: 2007, msg: 'Please enter the correct verification code' })
                }
        }

        // 检测给定手机号码及其区号是否已经被注册
        let existsMobile = await schema.member.existsByMobile(parameters.mobile, parameters.mobileArea)
        if (existsMobile) {
                return render({ code: 2010, msg: 'Given mobile has been registered' })
        }

        // 针对企业用户检测给定的公司名称是否被注册
        if (parameters.registerType === 'ENTERPRISE') {
                let existsEnterprise = await schema.enterprise.existsByName(parameters.enterpriseName)

                if (existsEnterprise) {
                        return render({ code: 2011, msg: 'Given enterprise has been registered' })
                }
        }

        let callback: any = {}
        parameters.registerIP = req.IPAddress()
        parameters.signinIP = parameters.registerIP
        parameters.role = 0

        switch (parameters.registerType) {
                case 'PERSON':
                        if (debugPrivate) {
                                parameters.role = 1
                        }
                        callback = await schema.member.New(parameters)
                        break

                case 'ENTERPRISE':
                        callback = await schema.enterprise.New(parameters)
                        break
        }

        if (utils.empty(callback)) {
                return render({ code: 2012, msg: 'Account Registered Failth' })
        }

        let document: any = {
                tokenID: token.New(purview.API_PURVIEW_MEMBER, callback.openID),
                openID: utils.openIDEncode(callback.openID),
                isEnterprise: parameters.registerType === 'ENTERPRISE',
                username: callback.username || '',
                realname: callback.realname || '',
                mobile: utils.formatMobile(parameters.mobile),
                headerImg: callback.img || '',
                backgroundImg: callback.backgroundImg || '',
                rebate: callback.rebate ? utils.openIDEncode(callback.rebate) : '',
                bandVedio: callback.bandVedio || false,
                infoVedio: utils.formatOpenID(callback.openID)
        }
        return render({ code: 200, msg: '', data: document })
}