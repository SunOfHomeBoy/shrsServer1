// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 抽奖规则及抽奖资格
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
//              member: Boolean,    // 用户信息是否合法
//              periods: number,    // 抽奖期数
//              rule: any{}         // 抽奖规则 对应生肖
//              winners: any{}      // 中奖用户信息
//      }

// 错误代码:
//      {
//              2018: "Invalid Member Information" // 无效的用户信息
//              2019: "Invalid Parameters" // 无效的参数数据 无效的抽奖时间 无效的抽奖次数
//      }

// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, award } from '../../foundation'

export default async function lottoQuery(req: request, res: response, parameters: any): Promise<IResult> {
        let openID: String = utils.openIDDecode(parameters.openID)

        let member = await schema.member.existsByID(openID)
        if (!member) { return render({ code: 2018, msg: 'Invalid User Information' }) }

        let times = award.times(new Date())

        let onlyRule = await award.onlyRule(times)

        let winners = await award.winners(times)

        return render({ code: onlyRule.code, msg: onlyRule.msg, data: { member, periods: times.periods, rule: onlyRule.rule, winners } })
}
