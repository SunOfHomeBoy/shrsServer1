// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 搜索用户信息列表
//
// 调用权限: API_PURVIEW_ADMINS
//
// 参数说明:
//      {
//              "queryType": 0, // 关键词搜索类型 Number 可空 默认值：0 其中：0表示全部 1表示用户名/真实姓名 2表示手机号码 3表示电子邮箱
//              "queryData": "xxx", // 关键词搜索数据 String 可空
//              "signinPublish": 0, // 登录时间 Number 可空 其中：0表示全部 1表示今天发布 3表示最近三天 7表示最近七天 15表示最近半月 30表示最近一月
//              "statusIDCard": 0, // 实名认证状态 Number 可空 其中：0表示全部 1表示已实名认证 2表示未实名认证
//              "enable": 0 // 账号状态 Number 可空 其中：0表示全部 1表示启用账号 2表示禁止账号
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 10, // 每页极限 Number 可空 默认值：10
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "total": 51, // 数据总数 Number 非空
//                      "pages": 6,  // 分页总数 Number 非空
//                      "begin": 1,  // 分页页码 Number 非空
//                      "limit": 10, // 每页极限 Number 非空
//                      "items": [{
//                              "openID": "3725bebe-9c9b-407e-bf32-6e59c816f06c", // 用户OpenID加密字符串 String 非空
//                              "username": "hjboss", // 用户昵称 String 非空
//                              "realname": "杨清", // 真实姓名 String 非空
//                              "mobileArea": "86", // 手机号码区号 String 非空
//                              "mobile": "18565898293", // 手机号码 String 非空
//                              "sex": 0, // 用户性别 可空 默认值：第一份简历所填性别 其中：0表示无效选项 1表示男性 2表示女性
//                              "email": "boss@facebook.com", // 电子邮箱 String 非空
//                              "statusEmail": false, // 电子邮箱认证状态 Boolean 非空 其中：TRUE表示已认证 FALSE表示未认证
//                              "statusIDCard": false, // 实名身份认证状态 Boolean 非空 其中：TRUE表示已认证 FALSE表示未认证
//                              "statusMobile": true, // 手机号码认证状态 Boolean 非空 其中：TRUE表示已认证 FALSE 表示未认证
//                              "bandWechat": "xxx", // 微信第三方账号绑定 String 非空 默认值：空字符串 即尚未绑定
//                              "bandTencent": "xxx", // 腾讯第三方账号绑定 String 非空 默认值：空字符串 即尚未绑定
//                              "registerTime": "2017-12-01 12:00:00", // 账号注册时间 String 非空
//                              "lastTime": "2017-12-03 12:00:00" // 最近登录时间 String 非空
//                              "enable": true // 账号状态 Boolean 非空 其中：TRUE表示启用账号 FALSE表示禁用账号
//                      }]
//              }
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        return render({ code: 200, msg: '' })
}