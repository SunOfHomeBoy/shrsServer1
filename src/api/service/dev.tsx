// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 局域网开发专用接口
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
// 
// 参数说明：
//      {
//              "type": "",
//              "data": ""
//      }
//
// 返回数据：
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, token } from '../../foundation'

export default async function realname(req: request, res: response, parameters: any): Promise<IResult> {
        switch (parameters.type) {
                case 'clear':
                        let memberInfo = await schema.member.findOneByMobile(parameters.data, '86')

                        if (utils.empty(memberInfo)) {
                                return render({ code: 200, msg: '给定手机号码不存在' })
                        }

                        memberInfo.mobile = 'TEST' + memberInfo.mobile
                        memberInfo.save()
                        return render({ code: 200, msg: '手机号码清除成功' })

                case 'openIDEncode':
                        return render({ code: 200, msg: 'OpenID加密成功', data: utils.openIDEncode(parameters.data) })

                case 'openIDDecode':
                        return render({ code: 200, msg: 'OpenID解密成功', data: utils.openIDDecode(parameters.data) })

                case 'tokenid':
                        return render({ code: 200, msg: '', data: token.NewDefault() })

        }

        return render({ code: 200, msg: '' })
}
