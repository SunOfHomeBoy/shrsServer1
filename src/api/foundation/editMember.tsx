// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 编辑用户基本信息
//
// 调用权限: API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": "3MjFiODU4Mjg0Zjc2NTQ3MjVhZDZhYzk0NjcxMWVlZjFi9", // 用户OpenID加密字符串 String 非空
//              "username": "hjboss", // 用户昵称 String 可空
//              "realname": "杨清", // 真实姓名 String 可空
//              "headerImg": "http:\/\/www.xxx.com/xxx.png", // 用户头像 String 可空
//              "sex": 0, // 用户性别 Number 可空 其中：1表示男性 2表示女"
//              "address": "xxx-xxx-...", // 联系地址 String 可空
//              "birthdayYear": 2000, // 出生日年份 Number 可空
//              "birthdayMonth": 1, // 出生日月份 Number 可空
//              "birthdayDay": 1, // 出生日日期 Number 可空
//              "localeCountry": "中国", // 现居所在地国家 String 可空 默认值：中国
//              "localeProvince": "湖南省", // 现居所在地省份 String 可空
//              "localeCity": "长沙市", // 现居所在地城市 String 可空
//              "localeTown": "望城区", // 现居所在地镇县 String 可空
//              "backgroundImg": "http:\/\/www.xxx.com/xxx.png", // 背景图片
//              "signature": "自我介绍", // 自我介绍 String 可空
//              "locationHomeX": 116.663947, // 联系地址的地图坐标X轴 String 可空 注意：在移动端若address非空则此项非空
//              "locationHomeY": 39.913999, // 联系地址的地图坐标Y轴 String 可空 注意：在移动端若address非空则此项非空
//              "locationX": 116.663947, // 用户实时坐标X轴 String 可空
//              "locationY": 39.913999, // 用户实时坐标Y轴 String 可空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// 错误代码:
//      {
//              2018: "Invalid Member Information" // 无效的用户信息
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function editMember(req: request, res: response, parameters: any): Promise<IResult> {
        parameters.openID = utils.openIDDecode(parameters.openID)

        let memberInfo = await schema.member.findById(parameters.openID)
        if (utils.empty(memberInfo)) {
                return render({ code: 2018, msg: 'Invalid Member Information' })
        }

        memberInfo.username = parameters.username || memberInfo.username || ''
        memberInfo.realname = parameters.realname || memberInfo.realname || ''
        memberInfo.img = parameters.headerImg || memberInfo.img || ''
        memberInfo.sex = parameters.sex || memberInfo.sex || 0
        memberInfo.address = parameters.address || memberInfo.address || ''
        memberInfo.birthdayYear = parameters.birthdayYear || memberInfo.birthdayYear || 0
        memberInfo.birthdayMonth = parameters.birthdayMonth || memberInfo.birthdayMonth || 0
        memberInfo.birthdayDay = parameters.birthdayDay || memberInfo.birthdayDay || 0
        memberInfo.localeCountry = parameters.localeCountry || memberInfo.localeCountry || '中国'
        memberInfo.localeProvince = parameters.localeProvince || memberInfo.localeProvince || ''
        memberInfo.localeCity = parameters.localeCity || memberInfo.localeCity || ''
        memberInfo.localeTown = parameters.localeTown || memberInfo.localeTown || ''
        memberInfo.backgroundImg = parameters.backgroundImg || memberInfo.backgroundImg || ''
        memberInfo.signature = parameters.signature || memberInfo.signature || ''

        if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                memberInfo.locationHome = [parameters.locationHomeX, parameters.locationHomeY]
        }

        if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                memberInfo.location = [parameters.locationX, parameters.locationY]
                await schema.resume.saveLocation(parameters.openID, parameters.locationX, parameters.locationY)
        }

        let callback = await schema.member.save(memberInfo)
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}