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
        // 移动设备版H5文章详细页面
        if (String(req.native.path).indexOf('cmsid') !== -1) {
                let callback = await schema.article.findById('1#' + req.GET('s') + '#cn')

                if (utils.empty(callback)) {
                        return render({ code: 404, msg: '' })
                }

                await log.article(req, callback.articleID)
                return render({
                        code: 200, msg: '', data: [
                                '<!DOCTYPE html>',
                                '<html>',
                                '<head>',
                                '<meta charset="utf-8"/>',
                                '<meta name="viewport" content="width=320,maximum-scale=1.3,user-scalable=no">',
                                '<style type="text/css">',
                                '*{margin:0;padding:0;text-decoration:none;list-style:none}',
                                '.box{padding-left:0.1rem;padding-right:0.1rem}',
                                'header{font-size:0.14rem;padding:0.18rem 0 0.12rem 0.12rem}',
                                '.title{color:rgb(0,119,181)}',
                                '.datetime{color:rgb(178,178,178);margin-top:0.12rem;font-size:0.12rem}',
                                'section{width:100%;overflow-x:hidden;padding-bottom:0.125rem}',
                                'section p{text-indent:0.25rem;font-size:0.12rem;line-height:1.5em;color:rgb(166,166,166);padding:0.0625rem;padding-bottom:0}',
                                'section img{display:block;position:relative;width:98.5%}',
                                'section p img{}',
                                '</style>',
                                '</head>',
                                '<body class="box">',
                                '<header>',
                                '<p class="title">' + callback.title + '</p>',
                                '<p class="datetime">' + utils.formatDate('YYYY-MM-DD HH:mm:ss', callback.publish) + '</p>',
                                '</header>',
                                '<section>' + callback.content + '</section>',
                                `<script>(function(doc,win){var docEl=doc.documentElement,resizeEvt='orientationchange' in window ? 'orientationchange' : 'resize',recalc=function(){var clientWidth = docEl.clientWidth;if (!clientWidth) return;docEl.style.fontSize=100*(clientWidth/320)+'px';};if(!doc.addEventListener)return;win.addEventListener(resizeEvt, recalc,false);doc.addEventListener('DOMContentLoaded',recalc,false);})(document, window);</script>`,
                                '</body>',
                                '</html>'
                        ].join('')
                })
        }

        else if (String(req.native.path).indexOf('detailArticle') === -1) {
                let callback = await schema.article.findById(`1#${parameters.articleID}#${parameters.articleLang}`)

                if (utils.empty(callback)) {
                        return render({ code: 2019, msg: 'Invalid Parameters' })
                }

                await log.article(req, parameters.articleID)
                return render({
                        code: 200, msg: '', data: {
                                articleID: callback.articleID || '',
                                articleLang: callback.articleLang || 'cn',
                                title: callback.title || '',
                                subtitle: callback.subtitle || '',
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

        return render({ code: 200, msg: '' })
}