// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 第三方账号绑定
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "bindingType": "WECHAT", // 绑定类型 String 非空 其中：WECHAT表示微信绑定 TENCENT表示腾讯绑定 VEDIO表示视频绑定
//              "bindingID": "D972DFC04B9DFD850F54C5207A43868E" // 第三方绑定OpenID 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// 错误代码：
//      {
//              2019: 'Invalid Parameters' // 无效的参数数据
//              2020: 'Save Parameters Failth' // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, vedio } from '../../foundation'

export default async function banners(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        if (utils.empty(parameters.openID) || typeof (parameters.bindingID) !== 'string') {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }

        let memberInfo = await schema.member.findById(parameters.openID)
        switch (parameters.bindingType) {
                case 'WECHAT':
                        if (utils.len(parameters.bindingID) !== 28) {
                                return render({ code: 2019, msg: 'Invalid Parameters' })
                        }
                        memberInfo.bandWechat = parameters.bindingID
                        break

                case 'TENCENT':
                        if (utils.len(parameters.bindingID) !== 32) {
                                return render({ code: 2019, msg: 'Invalid Parameters' })
                        }
                        memberInfo.bandTencent = parameters.bindingID
                        break

                case 'VEDIO':
                        if (utils.empty(memberInfo.bandVedio)) {
                                memberInfo.bandVedio = await vedio.registerMember(memberInfo.openID)
                        }
                        break

        }

        let callback = await schema.member.save(memberInfo)
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}