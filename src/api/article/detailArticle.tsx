// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 新闻文章详细信息
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "articleID": "20171102759933", // 文章全局ID String 非空
//              "articleLang": "cn" // 语言版本 String 非空 其中：cn表示简体中文 zh表示繁体中文 en表示英语
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": {
//                      "articleID": "20171102759933", // 文章全局ID String 非空
//                      "articleLang": "cn", // 语言版本 String 非空 其中：cn表示简体中文 zh表示繁体中文 en表示英语
//                      "title": "朝公开15号试射视频：首次从移动发射平台直接发射", // 新闻文章主标题 String 非空
//                      "subtitle": "新闻文章副标题", // 文章副标题 String 非空
//                      "articleType": "xxx", // 文章分类 String 非空
//                      "authors": "作者姓名", // 作者姓名 String 可空
//                      "linkURL": "http:\/\/www.xxx.com/xxx.html", // 文章来源 String 可空
//                      "thumb": "http:\/\/www.xxx.com/xxx.png", // 文章缩略图 String 可空
//                      "keywords": "军事 朝鲜", // 关键词 String 可空
//                      "description": "xxx-yyy", // 文章摘要 String 可空
//                      "content": "xxx-xxx-...", // 文章内容 String 可空
//                      "orderNumber": 0, // 文章加权排序 Number 可空
//                      "hitNumber": 0 // 文章浏览量 Number 非空
//                      "publish": "xxxx-xx-xx xx:xx:xx" // 发布时间 String 非空
//              }
//      }
//
// 错误代码：
//      {
//              2019: 'Invalid Parameters // 无效的参数数据
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema, log } from '../../foundation'

export default async function detailArticle(req: request, res: response, parameters: any): Promise<IResult> {
        let articleLang = parameters.articleLang || 'cn'

        console.log(`${parameters.articleID}#${articleLang}`);

        let callback = await schema.article.findById(`${parameters.articleID}#${articleLang}`)

        console.log("callback", callback);
        
        if (utils.empty(callback)) {
                return render({ code: 2019, msg: 'Invalid Parameters' })
        }
        console.log(callback);
        await log.article(req, parameters.articleID)
        return render({
                code: 200, msg: '', data: {
                        articleID: callback.articleID || '',
                        articleLang: callback.articleLang || 'cn',
                        title: callback.title || '',
                        subtitle: callback.subtitle || '',
                        articleMode: callback.articleMode || '',
                        articleType: callback.articleType || '',
                        authors: callback.authors || '',
                        linkURL: callback.linkURL || '',
                        thumb: callback.thumb || '',
                        keywords: callback.keywords || '',
                        description: callback.description || '',
                        content: callback.content || '',
                        orderNumber: callback.orderNumber || 0,
                        hitNumber: callback.hitNumber || 0,
                        publish: utils.formatDate('YYYY-MM-DD HH:mm:ss', callback.publish)
                }
        })
}