// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 删除新闻文章（所有语言版本）
//
// 调用权限: API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "articleID": "20171102759933", // 文章全局ID String 非空
//              "enable": false // 文章状态 Boolean 非空 默认值：false 其中：TRUE表示恢复 FALSE表示删除
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

export default async function delArticle(req: request, res: response, parameters: any): Promise<IResult> {
        await schema.article.update({ articleID: parameters.articleID }, { enable: parameters.enable || false })
        return render({ code: 200, msg: '' })
}