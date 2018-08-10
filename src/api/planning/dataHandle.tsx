// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 数据处理（检查多个注册手机号码的简历完整度且统计相关项）
//
// 调用权限:  API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 管理员OpenID加密字符串 String 非空
//              "data": "" // 按规范要求的手机号码 Number 非空 每个数据独占一行 以回车结尾
//      }
// 
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "count": {
//                              "a": 1, // 提交有效数据总和(非空行即有效数据) Number 非空
//                              "b": 2, // 有效手机号码总和(通过正则匹配数据) Number 非空
//                              "c": 2, // 简历合格手机号码(符合检查标准数据) Number 非空
//                              "d": 2, // 格式错误数据总和(格式错误的有效数据) Number 非空 
//                              "e": 2, // 尚未注册数据总和(该手机号码尚未注册) Number 非空
//                              "f": 2, // 仅全职简历不合格() Number 非空
//                              "g": 2, // 仅全职简历不合格() Number 非空
//                              "h": 2 // 全部简历皆不合格()  Number 非空
//                      }, 
//                      "allMobile": [{
//                         "mobile": "7417417474741",  // 返回处理过后的手机号码 String 非空
//                         "typeCode": "B", // 类型信息 String 非空 其中: A：注册信息合格 B:"手机号码格式错误" C:"尚未注册" D:"全职简历不合格" E:"仅兼职不合格" F:"简历皆不合格"
//                      }]
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
import { json } from 'express';

export default async function dataHandle(req: request, res: response, parameters: any): Promise<IResult> {
        fs.writeFileSync(path.join('/mnt/d/Project', `/req.json`), "json(req)", 'utf-8')

        if (utils.empty(parameters.data)) { return render({ code: 2019, msg: 'Invalid Parameters' }) }

        let val: string[] = String(parameters.data)
                .replace(/\r\n/g, '\n')
                .replace(/\r/g, '\n')
                .split('\n')
        let count: any = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 }
        let allMobile: any[] = []

        for (let i of val) {
                let regMobile = i.replace(/(^\s*)|(\s*$)/g, "")
                if (regMobile.length !== 0) {
                        let userTest = {
                                mobile: regMobile,
                                typeCode: '',
                                result: ''
                        }
                        count.a++
                        if (!utils.isMobileChina(regMobile)) {
                                userTest.typeCode = 'B'
                                userTest.result = '手机号码格式错误'
                                count.d++
                        } else {
                                count.b++
                                // 通过手机号查询用户信息
                                let member: any = await schema.member.findOneByMobile(regMobile, '86')
                                if (utils.empty(member)) {
                                        userTest.typeCode = 'C'
                                        userTest.result = '手机号码尚未注册'
                                        count.e++
                                } else {
                                        let fulltime = await schema.resume.findFulltime(member.openID)
                                        let parttime = await schema.resume.findParttime(member.openID)
                                        let fr = fulltime.resumeComplete || 0, pr = parttime.resumeComplete || 0
                                        if (fr < 80 && pr < 80) {
                                                userTest.typeCode = 'F'
                                                userTest.result = '两种简历均不合格'
                                                count.h++
                                        } else if (fr < 80 && pr > 80) {
                                                userTest.typeCode = 'D'
                                                userTest.result = '全职简历不合格'
                                                count.f++
                                        } else if (fr > 80 && pr < 80) {
                                                userTest.typeCode = 'E'
                                                userTest.result = '兼职简历不合格'
                                                count.g++
                                        } else if (fr > 80 && pr > 80) {
                                                userTest.typeCode = 'A'
                                                userTest.result = '注册信息合格'
                                                count.c++
                                        }
                                }
                        }
                        if (userTest.mobile !== '') allMobile.push(userTest)
                }
        }

        return render({ code: 200, msg: '', data: { count, allMobile } })
}