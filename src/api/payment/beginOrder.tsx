// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 开始订单支付信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "orderType": "RECHANGE", // 订单类型 String 非空 其中：RECHANGE表示用户充值 FULLTIME表示全职简历 PARTTIME表示兼职简历 TIXIAN表示用户提现
//              "orderPay": "WECHAT", // 支付类型 String 非空 其中：WECHAT表示微信支付 ALIPAY表示支付宝支付 SYSTEM表示余额支付 FREE表示免费次数
//              "orderMoney": 0, // 订单金额 Number 可空 单位：分 注意：仅对用户的充值和提现有效
//              "resumeID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 简历用户ID 注意：仅对查看简历有效
//              "passwordPay": "000000", // 支付密码 String 注意：仅对支付模式SYSTEM有效
//              "infoType": "MOBILE", // 信息类型 String 非空 其中：MOBILE表示购买手机号码 VIDEOFIRST表示首次购买视频 VIDEONEXT表示再次购买视频
//              "deviceType": "DEFAULT", // 客户端设备类型 String 非空 其中：DEFAULT表示默认客户端 MOBILE表示移动设备
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "appid": "wx1686de51d47fd645", // 微信支付应用ID String 非空
//                      "partnerid": "1497710522", // 微信支付商家ID String 非空
//                      "prepayid": "wx2018022809175664247bc9f20033082514", // 微信支预支付ID String 非空
//                      "noncestr": "SVupVD8jRqKpttOO", // 微信支付随机字符串 String 非空
//                      "timestamp": 1519780674, // 微信支付时间戳 Number 非空
//                      "sign": "193CEE57A5A80C6F249AB0456E459B74", // 微信支付签名 String 非空
//                      "qrcode": "xxxxxx" // 微信支付二维码图片 String 可空
//                      "orderid": "xxxxx" // 微信支付商家订单号 String 可空
//              }
//      }
//
// 错误代码：
//      {
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failt" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, payment } from '../../foundation'
import { wxpay } from '../../config'

const wechatQRCode: string = 'http://paysdk.weixin.qq.com/example/qrcode.php?data='

export default async function beginOrder(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        if (utils.empty(parameters.openID) || utils.empty(parameters.orderPay)) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        if (['RECHANGE', 'FULLTIME', 'PARTTIME', 'TIXIAN'].indexOf(parameters.orderType) === -1) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        if (parameters.orderType === 'RECHANGE' || parameters.orderType === 'TIXIAN') {
                if (utils.empty(parameters.orderMoney)) {
                        return render({ code: 2019, msg: 'Invalid Parameters' })
                }
        }

        if (parameters.orderType === 'FULLTIME' || parameters.orderType === 'PARTTIME') {
                if (utils.empty(parameters.resumeID)) {
                        return render({ code: 2019, msg: 'Invalid Parameters' })
                }
        }

        if (['WECHAT', 'ALIPAY', 'SYSTEM', 'FREE'].indexOf(parameters.orderPay) === -1) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        // 构建订单支付信息
        let orderInformation: any = {
                openID: parameters.openID,
                orderID: utils.NewOrderID(),
                orderType: 0,
                orderPay: 0,
                orderMoney: 0,
                orderScore: 0,
                orderUser: '',
                orderStatus: 3,
                orderComment: '',
                orderRebate: false
        }

        parameters.resumeID = utils.openIDDecode(parameters.resumeID)
        let memberInfo = await schema.member.findById(parameters.openID)

        switch (parameters.orderType) {
                case 'RECHANGE':
                        orderInformation.orderType = 1
                        orderInformation.orderMoney = parameters.orderMoney
                        parameters.orderProduct = '账号充值'
                        break

                case 'TIXIAN':
                        orderInformation.orderType = 3
                        orderInformation.orderMoney = parameters.orderMoney
                        parameters.orderProduct = ''
                        break

                case 'FULLTIME':
                        orderInformation.orderType = 2
                        orderInformation.orderMoney = memberInfo.rebateStatus ? schema.order.disPrice : schema.order.allPrice
                        orderInformation.orderUser = parameters.resumeID
                        orderInformation.orderComment = 'FULLTIME'
                        orderInformation.orderRebate = true
                        memberInfo.rebateStatus = false
                        parameters.orderProduct = '信息服务费'

                        if (parameters.infoType === 'VIDEOFIRST' || parameters.infoType === 'VIDEONEXT') {
                                orderInformation.orderMoney = schema.order.itvPrice

                                if (parameters.infoType === 'VIDEONEXT') {
                                        orderInformation.orderComment = 'FULLTIME#VIDEONEXT'
                                }
                        }
                        break

                case 'PARTTIME':
                        orderInformation.orderType = 2
                        orderInformation.orderMoney = memberInfo.rebateStatus ? schema.order.disPrice : schema.order.allPrice
                        orderInformation.orderUser = parameters.resumeID
                        orderInformation.orderComment = 'PARTTIME'
                        orderInformation.orderRebate = true
                        memberInfo.rebateStatus = false
                        parameters.orderProduct = '信息服务费'

                        if (parameters.infoType === 'VIDEOFIRST' || parameters.infoType === 'VIDEONEXT') {
                                orderInformation.orderMoney = schema.order.itvPrice

                                if (parameters.infoType === 'VIDEONEXT') {
                                        orderInformation.orderComment = 'PARTTIME#VIDEONEXT'
                                }
                        }
                        break
        }

        switch (parameters.orderPay) {
                case 'FREE':
                        if (memberInfo.score0 <= 0) {
                                return render({ code: 2019, msg: 'Invalid Parameters' })
                        }

                        orderInformation.orderPay = 4
                        orderInformation.orderStatus = 1
                        memberInfo.score0 = memberInfo.score0 - 1

                        if (parameters.infoType === 'MOBILE' || parameters.infoType === 'VIDEOFIRST') {
                                await payment.rebateByAccount(memberInfo, orderInformation)
                        }
                        break

                case 'SYSTEM':
                        if (memberInfo.money0 <= orderInformation.orderMoney) {
                                return render({ code: 2019, msg: 'Invalid Parameters' })
                        }

                        if (utils.empty(memberInfo.passwordPay) || utils.len(parameters.passwordPay) !== 6) {
                                return render({ code: 2019, msg: 'Invalid Parameters' })
                        }

                        if (utils.cryptoPassword(parameters.passwordPay) !== memberInfo.passwordPay) {
                                return render({ code: 2019, msg: 'Invalid Parameters' })
                        }

                        orderInformation.orderPay = 4
                        orderInformation.orderStatus = 1
                        memberInfo.money0 = memberInfo.money0 - orderInformation.orderMoney

                        if (parameters.infoType === 'MOBILE' || parameters.infoType === 'VIDEOFIRST') {
                                await schema.account.consume(orderInformation)
                                await payment.rebateByAccount(memberInfo, orderInformation)
                        }
                        break

                case 'WECHAT':
                        orderInformation.orderPay = 3
                        break

                case 'ALIPAY':
                        orderInformation.orderPay = 2
                        break
        }

        await schema.member.save(memberInfo)
        await schema.order.New(orderInformation)
        return new Promise<IResult>(resolve => {
                switch (parameters.orderPay) {
                        case 'FREE':
                                return resolve({ code: 200, msg: '' })

                        case 'SYSTEM':
                                return resolve({ code: 200, msg: '' })

                        case 'WECHAT':
                                return payment.wechat().createUnifiedOrder({
                                        body: parameters.orderProduct,
                                        out_trade_no: orderInformation.orderID,
                                        total_fee: orderInformation.orderMoney,
                                        notify_url: wxpay.notify_url,
                                        trade_type: parameters.deviceType === 'MOBILE' ? 'APP' : 'NATIVE'
                                }, (err, callback) => {
                                        callback = callback || {}

                                        if (callback.return_code !== 'SUCCESS') {
                                                return resolve({ code: 200, msg: callback.return_msg })
                                        }

                                        let timestamp = Math.ceil(new Date().getTime() / 1000)
                                        return resolve({
                                                code: 200, msg: '', data: {
                                                        appid: callback.appid,
                                                        partnerid: callback.mch_id,
                                                        prepayid: callback.prepay_id,
                                                        noncestr: callback.nonce_str,
                                                        timestamp: timestamp,
                                                        qrcode: wechatQRCode + callback.code_url,
                                                        orderid: orderInformation.orderID,
                                                        sign: utils.md5([
                                                                'appid=' + callback.appid,
                                                                'noncestr=' + callback.nonce_str,
                                                                'package=Sign=WXPay',
                                                                'partnerid=' + callback.mch_id,
                                                                'prepayid=' + callback.prepay_id,
                                                                'timestamp=' + timestamp,
                                                                'key=' + wxpay.apiKey
                                                        ].join('&')).toUpperCase()
                                                }
                                        })
                                })

                        case 'ALIPAY':
                                break
                }
        })
}