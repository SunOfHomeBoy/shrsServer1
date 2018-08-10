// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 点赞用户
//
// 调用权限:  API_PURVIEW_MEMBER <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 管理员OpenID加密字符串 String 非空
//              "year": "", // 年份
//              "month": "", // 月份
//      }
// 
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      [{top21}], // 获取点赞最多21名用户 包含头像信息 性别
//                      periods, // 哪年 哪月
//              }
//      }

// 错误代码:
//      {
//              2019: "Invalid Parameters" // 无效的参数数据
//      }

// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'
import * as fs from 'fs'
import * as path from 'path'
import { json } from 'express'
import * as moment from 'moment'


export default async function dataHandle(req: request, res: response, parameters: any): Promise<IResult> {
        // let openID: string = utils.openIDDecode(parameters.openID)
        // let member = await schema.member.existsByID(openID)
        // if (!member) return render({ code: 2018, msg: 'Invalid User Information' })

        let { tn, ty, tr } = parameters.start

        let { cn, cy, cr, ch, cm, cs, cms } = parameters.cur
        // console.log(cn, cy, cr);

        let strTime = new Date(tn, ty - 1, tr)

        let curTime = new Date(cn, cy - 1, cr)

        let periods = utils.getWeek(curTime)
        console.log(periods);

        return render({ code: 200, msg: '', data: { periods } })
}