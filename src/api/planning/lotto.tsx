// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户抽奖
//
// 调用权限:  API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 普通成员OpenID加密字符串 String 非空
//      }
//
// 返回数据:
//      {
//              "callback": Boolean,   // 数据是否插入成功
//              "winNum": Number       // 中奖结果 除 1-5外都为不中奖，0 为 该用户已中过奖，-1 为当期已有一名一等奖，-2 为当期已有两名一等奖, -3 本期一等奖已全部颁出
//              "lottoResult ": Number // 中奖生肖 1-12||201 十二种生效 201为没有中奖
//      }
//
// 错误代码:
//      {
//              2018: "Invalid Member Information" // 无效的用户信息(InvalidUserInformation)
//              2019: "Invalid Parameters" // 无效的参数数据(InvalidRule) 无效的抽奖时间(InvalidDrawTheTime) 无效的抽奖次数(InvalidLottoNum)
//      }

// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, award, log } from '../../foundation'


export default async function lotto(req: request, res: response, parameters: any): Promise<IResult> {
        let openID: string = utils.openIDDecode(parameters.openID)
        let member = await schema.member.existsByID(openID)
        if (!member) { return render({ code: 2018, msg: 'Invalid User Information' }) }

        let DateTime: Date = new Date()
        let times = award.times(DateTime)
        if (times.curWeek === 6 || times.curWeek === 0) {
                let lotoLogical = await award.logical(DateTime, openID, req)
                return render({ code: lotoLogical.code, msg: lotoLogical.message, data: lotoLogical.data })
        } else {
                return render({ code: 2019, msg: 'Invalid Draw the time' })
        }
}
