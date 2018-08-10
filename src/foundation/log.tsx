// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义日志消息数据的常用操作
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import request from './request'
import { schema, ISchema, Mixed, newSchema } from './schema/schema'
import schemaResume from './schema/resume'
import utils from './utils'
import token from './token'
import appid from '../config/appid'

class schemaLog extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'log' + utils.formatDate('YYYYMM'),
                        schema: newSchema({
                                _id: String,
                                openID: String,
                                recordType: String,
                                recordClient: String,
                                recordTime: Date,
                                recordDest: String,
                                recordComment: String,
                                recordData: Mixed
                        })
                }
        }

        private async New(req: request, schema: string, configures: any = {}): Promise<boolean> {
                let document = {
                        _id: utils.uuid(),
                        openID: configures.openID || req.OpenID,
                        recordType: schema.toUpperCase(),
                        recordClient: 'Default',
                        recordTime: new Date(),
                        recordDest: configures.dest,
                        recordComment: configures.comment || '',
                        recordData: configures.data || {}
                }

                for (let deviceType in appid) {
                        if (req.appID() === Object(appid)[deviceType]) {
                                document.recordClient = deviceType

                                if (document.recordClient === 'PC') {
                                        document.recordClient = req.platform()
                                }

                                break
                        }
                }

                return this.save(document)
        }

        // 记录管理员操作日志
        public async administrator(req: request, comment: string): Promise<boolean> {
                return this.New(req, 'administrator', { dest: req.native.path, comment: comment })
        }

        // 记录个人用户登录日志
        public async signin(req: request, mobile: string, parameters: any): Promise<boolean> {
                return this.New(req, 'signin', { dest: req.IPAddress(), comment: mobile, data: parameters })
        }

        // 记录服务器端接口调用日志
        public async api(req: request): Promise<boolean> {
                let accessToken = req.accessToken()

                if (utils.empty(accessToken) === false) {
                        await schemaResume.updateOnline(token.openID(accessToken))
                }

                return this.New(req, 'api', {
                        dest: req.native.path,
                        comment: req.getHeader('user-agent'),
                        data: req.IPAddress()
                })
        }

        // 记录全职简历浏览日志
        public async fulltime(req: request, resumeID: string, parameters?: any): Promise<boolean> {
                return this.New(req, 'fulltime', { dest: resumeID, data: parameters })
        }

        // 记录兼职简历浏览日志
        public async parttime(req: request, resumeID: string, parameters?: any): Promise<boolean> {
                return this.New(req, 'parttime', { dest: resumeID, data: parameters })
        }

        // 新闻类型文章浏览日志
        public async article(req: request, articleID: string): Promise<boolean> {
                return this.New(req, 'article', { dest: articleID })
        }

        // 抽奖活动访问日志
        public async lotto(req: request, lotoData: any): Promise<boolean> {
                return this.New(req, 'lotto', {})
        }
}

export default new schemaLog()