// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 图片列表信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import utils from '../utils'

class schemaImgList extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'imgList',
                        schema: newSchema({
                                _id: String,
                                openID: String,         // 管理员OpenID字符串 非空 默认值：空字符串
                                imgID: String,          // 图片全局ID 非空 索引 默认值：空字符串 算法：（ gmmktime() - 1505620805 ) % 1000000
                                imgMode: Number,        // 图片模型 可空 默认值：1 其中：1表示荣誉证书 2表示团队风采
                                imgItem: String,        // 图片模型下子类型 可空 默认值：空字符串
                                title: String,          // 图片主标题 非空 默认值：空字符串
                                linkURL: String,        // 图片URL 非空 默认值：空字符串
                                authors: String,        // 图片作者 可空 默认值：空字符串
                                description: String,    // 图片摘要 可空 默认值：空字符串
                                orderNumber: Number,    // 图片排序权重 可空 默认值：0
                                publish: Date,          // 图片发布时间 可空 默认值：POSIX时间零值
                                enable: Boolean         // 图片是否有效 可空 默认值：TRUE
                        })
                }
        }
        // 安全地添加或者编辑图片信息
        protected async saveSafe(configures: { _id: string }): Promise<boolean> {
                let parameters: any = configures
                let document: any = await this.findById(configures._id)

                document._id = configures._id
                document.openID = parameters.openID || document.openID || 'serverice'
                document.imgID = parameters.imgID || document.imgID || ''
                document.imgMode = parameters.imgMode || document.imgMode || ''
                document.imgItem = parameters.imgItem || document.imgItem || ''
                document.title = parameters.title || document.title || ''
                document.linkURL = parameters.linkURL || document.linkURL || ''
                document.authors = parameters.authors || document.authors || ''
                document.description = parameters.description || document.description || ''
                document.orderNumber = parameters.orderNumber || document.orderNumber || 0
                document.publish = parameters.publish || document.publish || (new Date())

                if (typeof (parameters.enable) === 'boolean') {
                        document.enable = parameters.enable
                } else {
                        document.enable = true
                }

                return this.save(document)
        }
        // 添加或者编辑图片列表
        public async saveImg(parameters: any): Promise<boolean> {
                parameters.imgID = parameters.imgID || utils.NewArticleID()
                parameters.imgMode = parameters.imgMode || 1
                parameters._id = [
                        parameters.imgMode,
                        parameters.imgID,
                ].join('#')

                return this.saveSafe(parameters)
        }
}

export default new schemaImgList()