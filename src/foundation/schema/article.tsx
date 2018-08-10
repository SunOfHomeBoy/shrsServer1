// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 文章页面信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import utils from '../utils'
import { language } from '../../config'

class schemaArticle extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'article',
                        schema: newSchema({
                                _id: String,
                                openID: String,      // 管理员OpenID字符串 非空 默认值：空字符串
                                articleID: String,   // 文章全局ID 非空 索引 默认值：空字符串 算法：（ gmmktime() - 1505620805 ) % 1000000
                                articleMode: String, // 文章模型 非空 默认值：空字符串
                                articleMark: String, // 页面型文章标识符 可空 默认值：空字符串
                                articleLang: String, // 文章语言版本 可空 默认值：cn 即简体中文
                                articleType: String, // 新闻型文章类型 可空 默认值：空字符串
                                title: String,       // 文章主标题 非空 默认值：空字符串
                                subtitle: String,    // 文章副标题 可空 默认值：空字符串
                                authors: String,     // 文章作者 可空 默认值：空字符串
                                linkURL: String,     // 文章来源 可空 默认值：空字符串
                                thumb: String,       // 文章缩略图 可空 默认值：空字符串
                                keywords: String,    // 文章关键词 可空 默认值：空字符串
                                description: String, // 文章摘要 可空 默认值：空字符串
                                content: String,     // 文章正文内容 可空 默认值：空字符串
                                orderNumber: Number, // 文章排序权重 可空 默认值：0
                                hitNumber: Number,   // 文章点击量 可空 默认值：0
                                publish: Date,       // 文章发布时间 可空 默认值：POSIX时间零值
                                enable: Boolean      // 文章是否有效 可空 默认值：TRUE
                        })
                }
        }

        // 安全地添加或者编辑文章信息
        protected async saveSafe(configures: { _id: string }): Promise<boolean> {
                let parameters: any = configures
                let document: any = await this.findById(configures._id)

                document._id = configures._id
                document.openID = parameters.openID || document.openID || ''
                document.articleID = parameters.articleID || document.articleID || ''
                document.articleMode = parameters.articleMode || document.articleMode || ''
                document.articleMark = parameters.articleMark || document.articleMark || ''
                document.articleLang = parameters.articleLang || document.articleLang || 'cn'
                document.articleType = parameters.articleType || document.articleType || ''
                document.title = parameters.title || document.title || ''
                document.subtitle = parameters.subtitle || document.subtitle || ''
                document.authors = parameters.authors || document.authors || '四海日盛'
                document.linkURL = parameters.linkURL || document.linkURL || ''
                document.thumb = parameters.thumb || document.thumb || ''
                document.keywords = parameters.keywords || document.keywords || ''
                document.description = parameters.description || document.description || ''
                document.content = parameters.content || document.content || ''
                document.orderNumber = parameters.orderNumber || document.orderNumber || 0
                document.hitNumber = parameters.hitNumber || document.hitNumber || 0
                document.publish = parameters.publish || document.publish || (new Date())

                if (typeof (parameters.enable) === 'boolean') {
                        document.enable = parameters.enable
                } else if (typeof (document.enable) === 'undefined') {
                        document.enable = true
                }

                return this.save(document)
        }


        // 添加或者编辑新闻型文章
        public async saveArticle(parameters: any): Promise<boolean> {
                parameters.articleID = parameters.articleID || utils.NewArticleID()
                // parameters.articleLang = parameters.articleLang || 'cn'
                parameters.articleMode = parameters.articleMode || ''
                parameters._id = [
                        parameters.articleID,
                        parameters.articleLang || 'cn'
                ].join('#')

                return this.saveSafe(parameters)
        }

        // 添加或者编辑自定义型文章
        public async saveCustom(parameters: any): Promise<boolean> {
                parameters.articleMark = String(parameters.articleMark || 'DEFAULT').toUpperCase()
                // parameters.articleLang = parameters.articleLang || 'cn'
                parameters.articleMode = parameters.articleMode || ''
                parameters._id = [
                        parameters.articleMode,
                        parameters.articleMark,
                        parameters.articleLang
                ].join('#')

                return this.saveSafe(parameters)
        }
}

export default new schemaArticle()