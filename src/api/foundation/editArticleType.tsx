// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 编辑新闻分类
//
// 调用权限: API_PURVIEW_ADMINS
//
// 参数说明:
//      {
//              "sign": "01", // 唯一标识符 String 非空
//              "cn": "京典头条", // 简体中文版名称
//              "zh": "京典頭條", // 繁体中文版名称
//              "en": "Headlines" // 英语版名称
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