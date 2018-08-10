// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 个人用户基本信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "vedio": "Bxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // 用户视频账号 String 可空 默认值：空字符串
//              "items": "mobile|username|realname|fulltime" // 选择返回字段 String 可空 默认值：空字符串
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//                      "mobileArea": "86", // 手机号码国家区号 String 可空
//                      "mobile": "185****8295", // 手机号码安全格式 String 可空
//                      "username": "hjboss", // 用户昵称 String 可空
//                      "realname": "杨清", // 真实姓名 String 可空
//                      "headerImg": "http:\/\/www.xxx.com/xxx.png", // 用户头像 String 可空
//                      "passwordPay": false, // 是否設置支付密碼 Boolean 可空
//                      "sex": 0, // 用户性别 Number 可空 其中：1表示男性 2表示女性
//                      "isEnterprise": false, // 是否企业用户 Boolean 可空
//                      "signature": "xxx-xxx-...", // 用户签名 String 可空
//                      "birthdayYear": 2000, // 出生日年份 Number 可空
//                      "birthdayMonth": 1, // 出生日月份 Number 可空
//                      "birthdayDay": 1, // 出生日日期 Number 可空
//                      "workYears": 0, // 工作经验 Number 可空 
//                      "education": 0, // 教育程度 Number 可空 其中： <br> 1表示高中以下 2表示高中 3表示大专 4表示本科 5表示硕士 6表示博士
//                      "idcardNumber": "43310119880402xxxx", // 身份证号码 String 可空
//                      "email": "xxx@facebook.com", // 电子邮箱 String 可空
//                      "backgroundImg": "http:\/\/www.xxx.com/xxx.pmg", // 背景图片 String 可空
//                      "localeCountry": "中国", // 现居所在地国家 String 可空 默认值：中国
//                      "localeProvince": "湖南省", // 现居所在地省份 String 可空
//                      "localeCity": "长沙市", // 现居所在地城市 String 可空
//                      "localeTown": "望城区", // 现居所在地镇县 String 可空
//                      "address": "xxx-xxx-...", // 联系地址 String 可空
//                      "locationHome": [116.663947, 39.913999], // 联系地址的地图坐标 Array 可空
//                      "registerIP": "xxx.xxx.xxx.xxx", // 用户注册地IP String 可空
//                      "registerTime": "2017-12-01 12:00:00", // 用户注册时间 String 可空
//                      "lastIP": "xxx.xxx.xxx.xxx", // 最近登录地IP String 可空
//                      "lastTime": "2017-12-03 12:00:00", // 最近登录时间 String 可空
//                      "deviceID": "xxx-xxx-xxx" // 移动设备号 String 可空
//                      "statusEmail": false, // 电子邮箱认证状态 Boolean 可空 其中：TRUE表示已认证 FALSE表示未认证
//                      "statusIDCard": false, // 实名身份认证状态 Boolean 可空 其中：TRUE表示已认证 FALSE表示未认证
//                      "statusMobile": true, // 手机号码认证状态 Boolean 可空 其中：TRUE表示已认证 FALSE 表示未认证
//                      "bandWechat": true, // 微信绑定状态 Boolean 可空 其中：TRUE表示已经绑定 FALSE表示尚未绑定
//                      "bandTencent": true, // 腾讯绑定状态 Boolean 可空 其中：TRUE表示已经绑定 FALSE表示尚未绑定
//                      "money": 0, // 账号余额 Number 可空 单位：分
//                      "score": 0, // 免费查看次数 Number 可空 单位：次
//                      "seeWho": 0, // 我查看了谁之总数 Number 可空
//                      "lookMe": 0, // 谁查看了我之总数 Number 可空
//                      "unreadLookMe": 0, // 谁查看了我之未读总数 Number 可空
//                      "bandVedio": false, // 视频绑定状态 Boolean 可空 其中：TRUE表示已经绑定 FALSE表示尚未绑定
//                      "infoVedio": "xxxx" // 视频账号信息 String
//                      "fulltime": { 
//                              "resumeUpdate": "2017-12-12 00:00:00", // 简历更新时间 String 非空
//                              "resumeComplete": 75, // 简历完成度 Number 非空
//                              "expectCountry": "中国", // 期望工作地点之国家 String 非空
//                              "expectProvince": "北京市", // 期望工作地点之省份 String 非空
//                              "expectCity":"北京市", // 期望工作地点之城市 String 非空
//                              "expectTown":"通州区", // 期望工作地点之镇县 String 非空
//                              "skill":[ "You are SB" ], // 服务技能 String 可空 默认值：空数组
//                              "signature":"xxxxxx" // 自我评价 String 可空
//                      },
//                      "parttime": {
//                              "resumeUpdate": "2017-12-12 00:00:00", // 简历更新时间 String 非空
//                              "resumeComplete": 75, // 简历完成度 Number 非空
//                              "localeCountry": "中国", // 现居所在地之国家 String 非空
//                              "localeProvince": "北京市", // 现居所在地之省份 String 非空
//                              "localeCity":"北京市", // 现居所在地之城市 String 非空
//                              "localeTown":"通州区", // 现居所在地之镇县 String 非空
//                              "skill":[ "You are SB" ], // 服务技能 String 可空 默认值：空数组
//                              "signature":"xxxxxx" // 自我评价 String 可空
//                      }
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

export default async function detailMember(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)
        parameters.items = utils.empty(parameters.items) === false ? String(parameters.items).split('|') : []

        if (utils.empty(parameters.vedio) === false && utils.len(parameters.vedio) === 34) {
                let v = String(parameters.vedio).split('')

                parameters.openID = [
                        [v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9]].join(''),
                        [v[10], v[11], v[12], v[13]].join(''),
                        [v[14], v[15], v[16], v[17]].join(''),
                        [v[18], v[19], v[20], v[21]].join(''),
                        [v[22], v[23], v[24], v[25], v[26], v[27], v[28], v[29], v[30], v[31], v[32], v[33]].join('')
                ].join('-')
        }

        let member = await schema.member.findById(parameters.openID)
        if (Object.keys(member).length === 0) {
                return render({ code: 2018, msg: 'Invalid Member Information' })
        }

        let document: any = {
                openID: utils.openIDEncode(parameters.openID)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('mobileArea') !== -1) {
                document.mobileArea = member.mobileArea || '86'
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('mobile') !== -1) {
                document.mobile = utils.empty(member.mobile) === false ? utils.formatMobile(member.mobile) : ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('username') !== -1) {
                document.username = member.username || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('realname') !== -1) {
                document.realname = member.realname || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('headerImg') !== -1) {
                document.headerImg = member.img || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('passwordPay') !== -1) {
                document.passwordPay = !utils.empty(member.passwordPay)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('sex') !== -1) {
                document.sex = member.sex || 0
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('isEnterprise') !== -1) {
                document.isEnterprise = member.isEnterprise || false
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('signature') !== -1) {
                document.signature = member.signature || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('birthdayYear') !== -1) {
                document.birthdayYear = member.birthdayYear || 0
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('birthdayMonth') !== -1) {
                document.birthdayMonth = member.birthdayMonth || 0
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('birthdayDay') !== -1) {
                document.birthdayDay = member.birthdayDay || 0
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('workYears') !== -1) {
                document.workYears = member.workYears || 0
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('education') !== -1) {
                document.education = member.education || 0
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('idcardNumber') !== -1) {
                document.idcardNumber = utils.formatIDCard(member.idcardNumber || '')
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('email') !== -1) {
                document.email = member.email || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('backgroundImg') !== -1) {
                document.backgroundImg = member.backgroundImg || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('localeCountry') !== -1) {
                document.localeCountry = member.localeCountry || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('localeCity') !== -1) {
                document.localeCity = member.localeCity || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('localeTown') !== -1) {
                document.localeTown = member.localeTown || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('address') !== -1) {
                document.address = member.address || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('locationHome') !== -1) {
                document.locationHome = member.locationHome || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('registerIP') !== -1) {
                document.registerIP = member.registerIP || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('registerTime') !== -1) {
                document.registerTime = utils.formatDate('YYYY-MM-DD HH:mm:ss', member.registerTime)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('lastIP') !== -1) {
                document.lastIP = member.lastIP || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('lastTime') !== -1) {
                document.lastTime = utils.formatDate('YYYY-MM-DD HH:mm:ss', member.lastTime)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('deviceID') !== -1) {
                document.deviceID = member.deviceID || ''
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('statusEmail') !== -1) {
                document.statusEmail = member.statusEmail || false
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('statusIDCard') !== -1) {
                document.statusIDCard = member.statusIDCard || false
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('statusMobile') !== -1) {
                document.statusMobile = member.statusMobile || true
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('bandWechat') !== -1) {
                document.bandWechat = utils.empty(member.bandWechat) === false
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('bandTencent') !== -1) {
                document.bandTencent = utils.empty(member.bandTencent) === false
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('money') !== -1) {
                document.money = member.money0 || 0
        }

        if (utils.empty(parameters.item) || parameters.item.indexOf('score') !== -1) {
                document.score = member.score0 || 0
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('seeWho') !== -1) {
                document.seeWho = await schema.order.totalSeeWho(parameters.openID)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('lookMe') !== -1) {
                document.lookMe = await schema.order.totalLookMe(parameters.openID)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('unreadLookMe') !== -1) {
                document.unreadLookMe = await schema.order.totalLookMe(parameters.openID, false)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('bandVedio') !== -1) {
                document.bandVedio = member.bandVedio || false
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('infoVedio') !== -1) {
                document.infoVedio = utils.formatOpenID(member.openID)
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('fulltime') !== -1) {
                document.fulltime = {}

                if (!member.isEnterprise) {
                        let fulltime = await schema.resume.findFulltime(member.openID)
                        document.fulltime = {
                                resumeUpdate: utils.formatDate('YYYY-MM-DD HH:mm:ss', fulltime.resumeUpdate),
                                resumeComplete: fulltime.resumeComplete || 0,
                                expectCountry: fulltime.expectCountry || '中国',
                                expectProvince: fulltime.expectProvince || '',
                                expectCity: fulltime.expectCity || '',
                                expectTown: fulltime.expectTown || '',
                                skill: fulltime.skill || [],
                                signature: fulltime.signature || '',
                                expectWork: fulltime.expectWork || ''
                        }
                }
        }

        if (utils.empty(parameters.items) || parameters.items.indexOf('parttime') !== -1) {
                document.parttime = {}

                if (!member.isEnterprise) {
                        let parttime = await schema.resume.findParttime(member.openID)
                        document.parttime = {
                                resumeUpdate: utils.formatDate('YYYY-MM-DD HH:mm:ss', parttime.resumeUpdate),
                                resumeComplete: parttime.resumeComplete || 0,
                                localeCountry: parttime.localeCountry || '中国',
                                localeProvince: parttime.localeProvince || '',
                                localeCity: parttime.localeCity || '',
                                localeTown: parttime.localeTown || '',
                                skill: parttime.skill || [],
                                signature: parttime.signature || ''
                        }
                }
        }

        return render({ code: 200, msg: '', data: document })
}