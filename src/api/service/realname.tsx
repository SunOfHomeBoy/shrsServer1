// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户身份实名认证
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
// 
// 参数说明：
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "realname": "杨清", // 真实姓名 String 非空
//              "idcardNumber": "43310119880402xxxx", // 身份证号码 String 非空
//              "idcardSex": 1, // 用户性别 Number 非空 其中：1表示男性 2表示女性
//      }
//
// 返回数据：
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// 错误代码：
//      {
//              2014: "Invalid Member Information" // 用户信息无效
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'
import { third, setting } from '../../config'
import * as httpClient from 'request'

const debugPrivate: boolean = setting.debug
export default async function realname(req: request, res: response, parameters: any): Promise<IResult> {
        if (utils.empty(parameters.openID) || utils.empty(parameters.realname) || utils.empty(parameters.idcardNumber)) {
                return render({ code: 2014, msg: 'Invalid Member Information' })
        }

        let callback = await check(parameters.realname, parameters.idcardNumber)
        if (utils.empty(callback)) {
                return render({ code: 2014, msg: 'Invalid Member Information with realname' })
        }

        parameters.openID = utils.openIDDecode(parameters.openID)
        parameters.idcardSex = callback.sex === '男' ? 1 : 2

        await schema.member.findByIdAndUpdate(parameters.openID, {
                realname: parameters.realname,
                sex: parameters.idcardSex,
                idcardNumber: parameters.idcardNumber,
                idcardSex: parameters.idcardSex,
                idcardAddress: callback.address,
                statusIDCard: true
        })
        for (let resumeType of ['FULLTIME', "PARTTIME"]) {
                await schema.resume.saveResume({
                        openID: parameters.openID,
                        resumeType: resumeType,
                        realname: parameters.realname,
                        sex: parameters.idcardSex,
                        idcardNumber: parameters.idcardNumber,
                        statusIDCard: true
                })
        }

        return render({ code: 200, msg: '' })

        async function check(realname: string, idcardNumber: string): Promise<any> {
                return new Promise<any>(resolve => {
                        if (debugPrivate) {
                                return resolve({
                                        sex: parameters.idcardSex === 1 ? '男' : '女',
                                        address: ''
                                })
                        }
                        httpClient({
                                url: `http://idcard.market.alicloudapi.com/lianzhuo/idcard?cardno=${idcardNumber}&name=` + encodeURI(realname),
                                method: 'GET',
                                headers: {
                                        Authorization: 'APPCODE ' + third.appCode
                                }
                        }, (err: Error, res: any, callback: any) => {
                                if (!err && res.statusCode === 200) {
                                        let result = utils.jsonDecode(callback)

                                        if (utils.empty(result.data) === false && result.resp.code === 0) {
                                                return resolve(result.data)
                                        }
                                }

                                resolve(null)
                        })
                })
        }
}