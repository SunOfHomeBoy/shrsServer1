// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 编辑组建团队
//
// 调用权限: API_PURVIEW_MEMBER
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "teamID": "3725bebe-9c9b-407e-bf32-6e59c816f06c", // 组建团队ID String 非空
//              "teamCompany": "谷歌+阿里他爸", // 单位名称 String 非空
//              "teamNumber": "1000以上", // 需求人数 String 非空
//              "teanPlace": "天堂", // 用人地点 String 非空
//              "teamDate": "2018年", // 用人时间 String 非空
//              "teamBudget": "10亿美元", // 项目预算 String 非空
//              "teamConnect": "18565898295", // 联系方式 String 非空
//              "teamEmail": "boss@facebook.com", // 联系邮箱 String 可空
//              "teamComment": "xxx-xxx" // 备注 String 可空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        return render({ code: 200, msg: '' })
}