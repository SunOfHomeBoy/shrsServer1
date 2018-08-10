// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义抽奖活动的常用方法
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$

import * as path from 'path'
import { request, /* response, IResult, render, */ utils, schema, log } from './index'

export default class award {
        public static readonly startTime: number = new Date(2018, 2, 10).getTime()

        public static times(DateTime: Date): any {
                let periods: number = Math.floor((DateTime.getTime() - this.startTime) / 604800000) + 1
                let curWeek: number = DateTime.getDay()
                let curHours: number = DateTime.getHours()
                return { periods, curWeek, curHours }
        }// 生成期数、星期、小时

        public static RandomNumBoth(Min: number, Max: number): number {
                let Range = Max - Min
                let Rand = Math.random()
                let num = Min + Math.round(Rand * Range) //四舍五入
                return num
        }

        public static async zodiac(winNum: number, rule: any[], periods: number, curTime: number): Promise<any> {
                let lottoZodiac: number

                switch (winNum) {
                        case 1:
                                lottoZodiac = rule[0].data.rule.a
                                break;
                        case 2:
                                lottoZodiac = rule[0].data.rule.b
                                break;
                        case 3:
                                lottoZodiac = rule[0].data.rule.c
                                break;
                        case 4:
                                lottoZodiac = rule[0].data.rule.d
                                break;
                        case 5:
                                lottoZodiac = rule[0].data.rule.e
                                break;
                        default:
                                lottoZodiac = 201
                                break;
                }

                let oneCallback = await schema.record.find({
                        where: { recordType: 'winningUser', 'recordData.award': 1, 'recordData.periods': periods }
                })

                let twoCallback = await schema.record.find({
                        where: { recordType: 'winningUser', 'recordData.award': 2, 'recordData.periods': periods }
                })

                let threeCallback = await schema.record.find({
                        where: { recordType: 'winningUser', 'recordData.award': 3, 'recordData.periods': periods }
                })

                let fourCallback = await schema.record.find({
                        where: { recordType: 'winningUser', 'recordData.award': 4, 'recordData.periods': periods }
                })

                let fiveCallback = await schema.record.find({
                        where: { recordType: 'winningUser', 'recordData.award': 5, 'recordData.periods': periods }
                })

                if (curTime >= 8 && curTime < 12) {
                        if (oneCallback.length >= 1) winNum = -1
                        if (twoCallback.length >= 1) winNum = -1
                }
                else if (curTime >= 12 && curTime < 18) {
                        if (oneCallback.length >= 2) winNum = -2
                        if (twoCallback.length >= 2) winNum = -2
                }
                else if (curTime >= 18 && curTime < 22) {
                        if (oneCallback.length >= 3) winNum = -3
                        if (twoCallback.length >= 3) winNum = -3
                }

                return { winNum, lottoZodiac }
        }// 判断生肖

        public static async logical(DateTime: Date, openID: string, req: request): Promise<any> {
                let times: any = this.times(DateTime)
                let winNum: number = this.RandomNumBoth(1, 10)

                let rule = await this.onlyRule(times)
                if (!rule.rule || rule.rule.length > 1) return { code: 2019, message: 'Invalid rule' }


                let data = await this.zodiac(winNum, rule.rule, times.periods, times.curHours)
                if (data["lottoZodiac"] !== 201) {
                        let prizewinning = await schema.record.insert({
                                _id: openID, // 防止用户重复中奖
                                recordType: "winningUser",
                                recordDest: times.periods,
                                recordTime: DateTime,
                                recordData: {
                                        userOpenID: openID,
                                        award: winNum,
                                        periods: times.periods,
                                        zodiac: data.lottoZodiac
                                }
                        })
                        if (!prizewinning) {
                                data.winNum = 0
                                data.lottoZodiac = 0
                        }
                }

                let allDraw = {
                        openID: openID,
                        drawResult: data.winNum,
                        drawTime: DateTime,
                        data: { periods: times.periods }
                }
                let allLoto = await schema.allDraw.find({ where: { openID: allDraw.openID, 'data.periods': times.periods } })
                if (allLoto.length !== 0) return { code: 2019, message: 'Invalid lotto num' }

                let callback = await schema.allDraw.insert(allDraw)

                data["callback"] = callback

                let logResult = await log.lotto(req, allDraw)
                return { code: 200, message: 'success', data }
        }// 插入中奖信息

        public static async winners(times: any): Promise<any> {
                // let times = this.times(DateTime)
                let winners: any[] = await schema.record.find({
                        where: { recordType: 'winningUser', recordDest: times.periods, 'recordData.award': { $lt: 5, $gt: 0 } },
                        fields: { recordData: true }
                })
                // 添加必要信息
                for (const item of winners) {
                        let winUserInfo: any = await schema.member.find({
                                where: { openID: item["recordData"]["userOpenID"] },
                                fields: { realname: true, sex: 1, mobile: 1, localeProvince: 1, localeCity: 1, localeTown: 1, address: 1 }
                        })
                        item.recordData["UserInfo"] = winUserInfo
                }
                return winners
        }// 获取中奖用户信息

        public static async onlyRule(times: any): Promise<any> {
                let rule = await schema.configures.find({
                        where: { name: 'lottoRule', 'data.periods': times.periods },
                        fields: { name: true, data: 1 }
                })

                if (rule.length > 1) return { code: 2019, msg: 'Invalid rule repetition' }
                if (utils.empty(rule)) return { code: 2019, msg: 'Invalid empty rule' }
                return { code: 200, rule }
        }// 判断 数据库规则 是否唯一

}