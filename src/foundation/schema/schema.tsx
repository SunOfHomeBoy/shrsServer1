// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义文档数据库数据模型的常用操作
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import mongodb from '../mongodb'
import * as uuid from 'uuid'

export let Mixed = mongodb.Schema.Types.Mixed
export let newSchema = (configures: any) => new mongodb.Schema(configures)
export interface ISchema extends mongodb.Schema { }
export interface schemaQuery {
        where?: any,
        order?: any,
        skip?: number,
        limit?: number,
        begin?: number,
        fields?: any
}

export abstract class schema {
        protected model: mongodb.Model<any>
        protected abstract init(): { name: string, schema: ISchema }
        constructor() { let init = this.init(); this.model = mongodb.model(init.name, init.schema) }

        // 统计符合筛选条件的数据总数
        public async count(filter: any = {}): Promise<number> {
                return new Promise<number>(resolve => {
                        this.model.count(filter || {}, (err: Error, callback: number) => {
                                resolve(callback || 0)
                        })
                })
        }

        // 返回符合筛选条件的文档数据
        public async find(filter: schemaQuery = {}): Promise<any[]> {
                return new Promise<any[]>(resolve => {
                        this.model
                                .find(filter.where || {})
                                .sort(filter.order || { _id: -1 })
                                .skip(filter.skip || 0)
                                .limit(filter.limit || 1024)
                                .select(filter.fields || [])
                                .exec((err: Error, callback: any[]) => {
                                        resolve(callback || [])
                                })
                })
        }

        // 返回符合筛选条件的文档数据键值对
        public async findMap(filter: schemaQuery = {}): Promise<any> {
                let document: any = {}

                let callback = await this.find(filter)
                for (let c of callback) {
                        document[c._id] = c
                }

                return new Promise<any>(resolve => resolve(document))
        }

        // 返回符合筛选条件的第一个文档数据
        public async findOne(filter: schemaQuery = {}): Promise<any> {
                return new Promise<any>(resolve => {
                        this.model
                                .findOne(filter.where || {})
                                .sort(filter.order || { _id: -1 })
                                .skip(filter.skip || 0)
                                .select(filter.fields || [])
                                .exec((err: Error, callback: any) => {
                                        resolve(callback || {})
                                })
                })
        }

        // 更新符合筛选条件的第一个文档数据
        public async findOneAndUpdate(filter: any, document: any): Promise<any> {
                return new Promise<any>(resolve => {
                        this.model.findOneAndUpdate(filter, document, (err: Error, callback: any) => {
                                resolve(callback || {})
                        })
                })
        }

        // 删除符合筛选条件的第一个文档数据
        public async findOneAndRemove(filter: any): Promise<boolean> {
                return new Promise<any>(resolve => {
                        this.model.findOneAndRemove(filter, (err: Error, callback: any) => {
                                resolve(callback || {})
                        })
                })
        }

        // 返回给定主键值的一个数据
        public async findById(id: string | number | object): Promise<any> {
                return new Promise<any>(resolve => {
                        this.model.findById(id, (err: Error, callback: any) => {
                                resolve(callback || {})
                        })
                })
        }

        // 返回给定主键值的一组数据
        public async findByIds(...ids: any[]): Promise<any[]> {
                let buffers: any[] = []

                for (let id of ids) {
                        let data = await this.findById(id)

                        if (Object.keys(data).length !== 0) {
                                buffers.push(data)
                        }
                }

                return new Promise<any[]>(resolve => resolve(buffers))
        }

        // 返回给定主键值的一组数据键值对
        public async findMapByIds(...ids: any[]): Promise<any> {
                let document: any = {}

                let callback = await this.findByIds(...ids)
                for (let c of callback) {
                        document[c._id] = c
                }

                return new Promise<any>(resolve => resolve(document))
        }

        // 更新给定主键值的文档数据
        public async findByIdAndUpdate(id: string | number | object, document: any): Promise<any> {
                return new Promise<any>(resolve => {
                        this.model.findByIdAndUpdate(id, document, (err: Error, callback: any) => {
                                resolve(callback || {})
                        })
                })
        }

        // 删除给定主键值的文档数据
        public async findByIdAndRemove(id: string | number | object): Promise<any> {
                return new Promise<any>(resolve => {
                        this.model.findByIdAndRemove(id, (err: Error, callback: any) => {
                                resolve(callback || {})
                        })
                })
        }

        // 分页查询给定筛选条件的文档数据
        public async findPage(filter: schemaQuery = {}): Promise<any> {
                filter.limit = filter.limit || 10
                filter.begin = filter.begin >= 1 ? filter.begin : 1
                filter.skip = (filter.begin - 1) * filter.limit

                let document: any = {
                        total: 0,
                        pages: 0,
                        limit: filter.limit,
                        begin: filter.begin || 1,
                        items: []
                }

                document.total = await this.count(filter.where)
                document.pages = Number(Math.ceil(document.total / document.limit))
                document.items = await this.find(filter)

                return new Promise<any>(resolve => resolve(document))
        }

        // 判断给定筛选条件的文档数据已经存在
        public async exists(filter: any): Promise<boolean> {
                return new Promise<boolean>(resolve => {
                        this.model.findOne(filter).select('_id').exec((err: Error, callback: any) => {
                                resolve(callback !== null)
                        })
                })
        }

        // 判断给定主键值的文档数据已经存在
        public async existsByID(id: string | number | object): Promise<boolean> {
                return new Promise<boolean>(resolve => {
                        this.model.findById(id).select('_id').exec((err: Error, callback: any) => {
                                resolve(callback !== null)
                        })
                })
        }

        // 添加一个或者多个文档数据
        public async insert(...documents: any[]): Promise<boolean> {
                return new Promise<boolean>(resolve => {
                        for (let i = 0; i < documents.length; i++) {
                                if (!documents[i]._id) {
                                        documents[i]._id = uuid.v4()
                                }
                        }

                        this.model.insertMany(documents, (err: Error, callback: any) => {
                                resolve(Object.keys(callback || {}).length !== 0)
                        })
                })
        }

        // 存储一个有效主键值的文档数据
        public async save(document: any): Promise<boolean> {
                if (!document._id) {
                        return this.insert(document)
                }

                let exists = await this.existsByID(document._id)
                if (!exists) {
                        return this.insert(document)
                }

                let callback = await this.findByIdAndUpdate(document._id, document)
                return new Promise<boolean>(resolve => resolve(Object.keys(callback).length !== 0))
        }

        // 更新符合给定筛选条件的文档数据
        public async update(filter: any, document: any): Promise<number> {
                return new Promise<number>(resolve => {
                        this.model.update(filter, { $set: document }, { multi: true }, (err: Error, callback: any) => {
                                resolve(callback.nModified || 0)
                        })
                })
        }

        // 更新符合给定筛选条件的第一个文档数据
        public async updateOne(filter: any, document: any): Promise<number> {
                return new Promise<number>(resolve => {
                        this.model.update(filter, { $set: document }, { multi: false }, (err: Error, callback: any) => {
                                resolve(callback.nModified || 0)
                        })
                })
        }

        // 删除符合给定筛选条件的文档数据
        public async remove(filter: any): Promise<boolean> {
                if (filter === null || JSON.stringify(filter) === '{}') {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                return new Promise<boolean>(resolve => {
                        this.model.remove(filter, (err: Error) => {
                                resolve(err === null)
                        })
                })
        }
}