// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 个人企业用户安全登录
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "signinType": "MOBILE", // 登录类型 String 非空 其中:MOBILE表示手机号码登录 WECHAT表示微信第三方登录 TENCENT表示腾讯第三方登录
//              "mobileArea": "86", // 手机号码的国家代码 String 可空 默认值86
//              "mobile": "18565898295", // 手机号码（不包含国家代码）String 非空
//              "password": "1qaz2wsx", // 登录密码 String 非空
//              "wechatID": "xxxxxx", // 微信OpenID String 非空 注意：28位字符串
//              "tencentID": "xxxxx", // 腾讯OpenID String 非空 注意：32位字符串
//              "deviceID": "xxxxxx", // 移动端设备ID String 非空
//              "locationX": xx.xxxx, // 实时定位坐标X轴 Number 非空
//              "locationY": xx.xxxx  // 实时定位坐标Y轴 Number 非空
//      }
//
// 返回数据
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "tokenID": "5bd80cd7-5c17-41e8-93d0-7ed1f35cd556", // 会话令牌 String 非空
//                      "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//                      "isEnterprise": false, // 是否企业用户 Boolean 非空 其中：TRUE表示企业用户 FALSE表示个人用户
//                      "username": "xxx", // 用户昵称 String 可空
//                      "realname": "杨清", // 真实姓名 String 可空
//                      "mobile": "185***8295"， // 格式化手机号码 String 可空
//                      "headerImg": "xxx", // 用户头像图片
//                      "backgroundImg": "", // 用户中心背景图片 String 可空
//                      "rebate": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9" // 返利账号OpenID加密字符串
//                      "bandVedio": false, // 视频绑定状态 Boolean 可空 其中：TRUE表示已经绑定 FALSE表示尚未绑定
//                      "infoVedio": "xxxx" // 视频账号信息 String
//              }
//      }
//
// 错误代码:
//      {
//              2001: "Invalid parameters mobileArea" // 请填写正确的手机号码
//              2013: "Given account has not been registered" // 给定账号尚未注册
//              2014: "Not Found Third Account" // 第三方账号尚未绑定
//              2018："Invalid Member Information" // 账号或者密码错误
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, log, token, purview, vedio } from '../../foundation'
import { mobileArea } from '../../config'

export default async function signin(req: request, res: response, parameters: any): Promise<IResult> {
        if (parameters.signinType !== 'MOBILE' && parameters.signinType !== 'WECHAT' && parameters.signinType !== 'TENCENT') {
                return render({ code: 2001, msg: '' })
        }

        let memberInfo: any = {}
        switch (parameters.signinType) {
                case 'MOBILE':
                        parameters.mobileArea = String(parameters.mobileArea || '+86').replace('+', '')

                        if (!Object(mobileArea)[parameters.mobileArea]) {
                                return render({ code: 2001, msg: 'Invalid parameters mobileArea' })
                        }

                        if (utils.isMobileISO(parameters.mobile) === false) {
                                return render({ code: 2001, msg: 'Invalid parameters mobile' })
                        }

                        if (utils.empty(parameters.password) || parameters.password.length <= 5) {
                                return render({ code: 2013, msg: 'Account or Password Errors' })
                        }

                        memberInfo = await schema.member.findOneByMobile(parameters.mobile, parameters.mobileArea)

                        if (utils.empty(memberInfo)) {
                                return render({ code: 2013, msg: 'Invalid Member Information' })
                        }

                        if (utils.cryptoPassword(parameters.password) !== memberInfo.password) {
                                return render({ code: 2018, msg: 'Invalid Member Information' })
                        }

                        break

                case 'WECHAT':
                        if (String(parameters.wechatID).length !== 28) {
                                return render({ code: 2014, msg: '' })
                        }

                        memberInfo = await schema.member.findOne({ where: { bandWechat: parameters.wechatID } })
                        if (utils.empty(memberInfo)) {
                                return render({ code: 2014, msg: 'Not Found Third Account' })
                        }
                        break

                case 'TENCENT':
                        if (String(parameters.tencentID).length !== 32) {
                                return render({ code: 2014, msg: '' })
                        }

                        memberInfo = await schema.member.findOne({ where: { bandTencent: parameters.tencentID } })
                        if (utils.empty(memberInfo)) {
                                return render({ code: 2014, msg: 'Not Found Third Account' })
                        }
                        break
        }

        memberInfo.signinTimes = (new Date().getTime()) - (memberInfo.signinDate || new Date()).getTime() < 2592000000
                ? memberInfo.signinTimes + 1
                : 1
        memberInfo.signinDate = new Date()
        memberInfo.signinAll = memberInfo.signinAll + 1
        memberInfo.lastIp = memberInfo.signinIP
        memberInfo.lastTime = memberInfo.lastTime
        memberInfo.signinIP = req.IPAddress()
        memberInfo.signinTime = new Date()
        if (parameters.deviceID) {
                memberInfo.deviceID = parameters.deviceID
        }

        // 绑定视频账号
        if (utils.empty(memberInfo.bandVedio)) {
                memberInfo.bandVedio = await vedio.registerMember(memberInfo.openID)
        }

        // 设置用户及其全职兼职简历的实时坐标
        if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                memberInfo.location = [parameters.locationX, parameters.locationY]
                await schema.resume.saveLocation(memberInfo.openID, parameters.locationX, parameters.locationY)
        }

        await schema.member.save(memberInfo)
        await log.signin(req, parameters.mobile, Object.assign(parameters, { openID: memberInfo.openID }))

        let document: any = {
                tokenID: token.New(purview.API_PURVIEW_MEMBER, memberInfo.openID),
                openID: utils.openIDEncode(memberInfo.openID),
                isEnterprise: memberInfo.isEnterprise || false,
                username: memberInfo.username || '',
                realname: memberInfo.realname || '',
                mobile: utils.formatMobile(memberInfo.mobile),
                headerImg: memberInfo.img || '',
                backgroundImg: memberInfo.backgroundImg || '',
                rebate: memberInfo.rebate ? utils.openIDEncode(memberInfo.rebate) : '',
                bandVedio: memberInfo.bandVedio || false,
                infoVedio: utils.formatOpenID(memberInfo.openID)
        }
        return render({ code: 200, msg: '', data: document })
}