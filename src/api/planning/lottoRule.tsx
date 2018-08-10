// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 抽奖规则设计
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
//              rule: any{}         // 抽奖规则 对应生肖
//      }

// 错误代码:
//      {
//              2018: "Invalid Member Information" // 无效的用户信息
//              2019: "Invalid Parameters" // 无效的参数数据 无效的抽奖时间 无效的抽奖次数
//      }

// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, award } from '../../foundation'

export default async function lottoRule(req: request, res: response, parameters: any): Promise<IResult> {
        let openID: String = utils.openIDDecode(parameters.openID)
        // 判断 用户信息 是否合法
        let member = await schema.member.existsByID(openID)
        if (!member) { return render({ code: 2018, msg: 'Invalid User Information' }) }

        let DateTime: Date = new Date()

        let times = award.times(DateTime)
        // 判断 前端定义规则 是否合法
        for (const i in parameters.rule) {
                if (parameters.rule[i] > 12) return render({ code: 2019, msg: 'Invalid rule number' })
        }
        // 判断 数据库规则 是否唯一
        let ruleResult = await schema.configures.find({ where: { name: 'lottoRule', 'data.periods': times.periods + 1 } })
        if (ruleResult.length >= 1) return render({ code: 2019, msg: 'Invalid rule repetition' })
        // 插入规则
        let rule = await schema.configures.insert({
                name: 'lottoRule',
                data: {
                        openID: openID,
                        periods: times.periods + 1,
                        rule: parameters.rule,
                        insertTime: DateTime
                }
        })

        return render({ code: 200, msg: 'success', data: { rule, periods: times.periods + 1 } })
}
