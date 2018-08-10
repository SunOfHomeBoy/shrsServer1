// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 短信邮件推送消息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'
import utils from '../utils'

class schemaMessage extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'message',
                        schema: newSchema({
                                _id: String,
                                openID: String,         // 用户OpenID字符串 非空 索引 即member表之OpenID
                                messageType: String,    // 消息发送类型 可空 默认值：空字符串 其中：SMS表示短信发送 EMAIL表示邮件发送 PUSH表示消息推送
                                messageTpl: String,     // 消息模板信息 可空 默认值：空字符串
                                messageDest: String,    // 消息目标对象 可空 默认值：空字符串
                                messageBegin: Date,     // 发送开始时间 可空 默认值：POSIX时间零值
                                messageFinish: Date,    // 发送结束时间 可空 默认值：POSIX时间零值
                                messageStatus: Boolean, // 消息发送状态 可空 默认值：FLASE 其中：TRUE表示已发送成功 FALSE表示已发送失败
                                messageData: Mixed      // 消息附加信息 可空 默认值：空字符串
                        })
                }
        }

        public async sms(parameters: any): Promise<boolean> {
                let document = {
                        _id: utils.uuid(),
                        messageType: 'SMS',
                        messageTpl: String(parameters.smsType).toUpperCase(),
                        messageDest: parameters.mobileArea + parameters.mobile,
                        messageBegin: parameters.messageBegin || new Date(),
                        messageFinish: parameters.messageFinish || new Date(),
                        messageStatus: false,
                        messageData: parameters.messageData
                }

                if (document.messageData === true) {
                        document.messageStatus = Boolean(document.messageData)
                        document.messageData = parameters.randomCode
                }

                return this.save(document)
        }

        public async push(parameters: any): Promise<boolean> {
                return this.save({
                        _id: utils.uuid(),
                        messageType: 'PUSH',
                        messageTpl: String(parameters.noticeType).toUpperCase(),
                        messageDest: parameters.mobileArea + parameters.mobile,
                        messageBegin: parameters.messageBegin || new Date(),
                        messageFinish: parameters.messageFinish || new Date(),
                        messageStatus: false,
                        messageData: parameters.messageData
                })
        }
}
export default new schemaMessage()