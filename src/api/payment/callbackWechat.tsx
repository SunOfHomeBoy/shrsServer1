// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 微信支付回调接口
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMIN <Passing/>
//
// 参数说明:
//      {
//              ... // 此接口不需要参数
//      }
//
// 返回数据:
//      {
//              ... // 此接口不需要参数
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, payment } from '../../foundation'

export default async function callbackWechat(req: request, res: response, parameters: any): Promise<IResult> {
        return new Promise<IResult>(resolve => {
                Object(payment.wechat()).useWXCallback((callback: any, xreq: any, xres: any, next: any) => {
                        if (callback.return_code === 'SUCCESS' && utils.empty(callback.out_trade_no) === false) {
                                payment.callbackSuccess(callback.out_trade_no).then(() => {
                                        resolve({ code: 200, msg: '' })
                                })
                        }
                })(req.native, res.native)
        })
}
