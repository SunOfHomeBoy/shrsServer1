// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 管理员基本信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import utils from '../utils'

class schemaAdministrator extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'administrator',
                        schema: newSchema({
                                _id: String,
                                openID: String,     // 管理员OpenID字符串 非空 索引 格式：a + UUID随机字符串
                                username: String,   // 管理员账号 非空 索引 全局唯一性
                                password: String,   // 管理员密码加密字符串 非空 算法：sha256( md5( 待加密密码 ) + 给定随机字符串 )
                                groupID: String,    // 管理员权限类型 非空 默认值：空字符串
                                realname: String,   // 真实姓名 可空 默认值：空字符串
                                mobile: String,     // 联系方式 可空 默认值：空字符串
                                address: String,    // 联系地址 可空 默认值：空字符串
                                department: String, // 所属部门及其职位 可空 默认值：空字符串
                                registerIP: String, // 注册管理员所在地IP 可空 默认值：空字符串
                                registerTime: Date, // 注册管理员时间戳值 可空 默认值：POSIX时间零值
                                loginIP: String,    // 当前登录所在地IP 可空 默认值：空字符串
                                loginTime: Date,    // 当前登录所在时间戳 可空 默认值：POSIX时间零值
                                lastIP: String,     // 最近一次登录所在地IP 可空 默认值：空字符串
                                lastTime: Date,     // 最近一次登录时间戳 可空 默认值：POSIX时间零值
                                enable: Boolean     // 管理员账号是否有效 非空 默认值：TRUE
                        })
                }
        }

        public async New(parameters: any): Promise<boolean> {
                if (utils.empty(parameters.username) || utils.empty(parameters.password) || utils.empty(parameters.groupID)) {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                let document: any = {
                        openID: parameters.openID || utils.NewOpenID(),
                        username: parameters.username,
                        password: utils.cryptoPassword(parameters.password),
                        groupID: parameters.groupID,
                        realname: '',
                        mobile: '',
                        address: '',
                        department: '',
                        registerIP: parameters.registerIP || '127.0.0.1',
                        registerTime: new Date(),
                        loginIP: '127.0.0.1',
                        loginTime: new Date(),
                        lastIP: '127.0.0.1',
                        lastTime: new Date(),
                        enable: true
                }
                document._id = document.openID
                return this.save(document)
        }
}

export default new schemaAdministrator()