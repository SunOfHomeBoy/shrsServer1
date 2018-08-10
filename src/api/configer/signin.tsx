// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 个人企业用户安全登录
//
// 调用权限: API_PURVIEW_COMMON <Passing/>
//
// 参数说明:
//      {
//              "user": "18565898295",  // 用户名 String 非空
//              "password": "xxxxxxx",  // 登录密码 String 非空
//      }
//
// 返回数据
//      {
//              "code": 200,    // 返回代码：200表示成功，20x表示错误
//              "msg": "",      // 错误消息：若状态代码是200，则返回空字符串
//              "data": {}      // 返回数据
//      }
//
// 错误代码:
//      {
//              2018："Invalid Member Information"      // 账号或者密码错误
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, log, token, purview, vedio } from '../../foundation'
import { mobileArea } from '../../config'

export default async function signin(req: request, res: response, parameters: any): Promise<IResult> {
        // first 查询 数据库 用户信息
        let username = encodeURIComponent(parameters.user)
        let password = utils.cryptoPassword(parameters.password)

        let memberInfo = await schema.member.findOne(
                { where: { username: parameters.user, password } }
        )

        // second 判断 登录后，给予 接口调用权限，并设置 Cookies
        if (!utils.empty(memberInfo)) {
                console.log("memberInfo::", memberInfo);
                let user = {
                        name: parameters.user,
                        date: Date.now()
                }
                req.SESSION()["user"] = user
                res.native.setHeader('Set-Cookie', `user=${username};path=/;max-age=1600;`);
                return render({ code: 200, msg: '', data: memberInfo })
        }

        return render({ code: 2018, msg: 'Invalid Member Information' })
}