// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 获取给定自定义页面
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "articleMark": "ABOUT", // 自定义型页面标识符 String 非空 其中：ABOUT表示关于我们 TEAM表示组建团队
//              "articleLang": "cn" // 语言版本 String 非空 其中：cn表示简体中文 zh表示繁体中文 en表示英文
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "title": "北大台湾博士生想加入共产党", // 文章标题 String 非空
//                      “content": "xxxxxx" // 文章内容 String 非空
//              }
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function custom(req: request, res: response, parameters: any): Promise<IResult> {
        let document: any = await schema.article.findById(`2#${parameters.articleMark}#${parameters.articleLang}`)
        return render({ code: 200, msg: '', data: { title: document.title, content: document.content } })
}