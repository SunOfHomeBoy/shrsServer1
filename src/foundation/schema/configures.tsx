// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 自定义型配置项数据模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'
import utils from '../utils'

class schemaConfigures extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'configures',
                        schema: newSchema({
                                _id: String,
                                name: String, // 配置项名称 非空 索引
                                data: Mixed   // 配置项数据 可空 默认值：空字符串
                        })
                }
        }

        // 安全设置自定义性配置项
        public async set(configures: any = {}): Promise<boolean> {
                if (configures._id && !configures.name) {
                        configures.name = configures._id
                }

                if (!configures._id && configures.name) {
                        configures._id = configures.name
                }

                return this.save(configures)
        }

        // 返回给定名称的简单类型配置项数据
        public async itemOne(key: string): Promise<any> {
                let document: any = {}
                let callback = await this.findById(key)

                if (utils.empty(callback) === false) {
                        document = callback.data
                }

                return new Promise<any>(resolve => resolve(document))
        }

        // 返回给定名称的复合类型配置项数据
        public async itemAll(key: string): Promise<any[]> {
                let document: any[] = []
                let callback = await this.findById(key)

                if (callback && callback.data instanceof Array) {
                        let ids = utils.forEach(callback.data, id => `${key}#${id}`)
                        document = await this.findByIds(...ids)

                        for (let i = 0; i < document.length; i++) {
                                let id = document[i]._id
                                document[i] = document[i].data
                                document[i].id = id
                        }
                }

                return new Promise<any[]>(resolve => resolve(document))
        }
}
export default new schemaConfigures()