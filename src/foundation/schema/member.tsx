// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 个人企业用户公共信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'
import utils from '../utils'
import { business } from '../../config'
import video from '../vedio'
import vedio from '../vedio';

class schemaMember extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'member',
                        schema: newSchema({
                                _id: String,
                                openID: String,          // 用户OpenID字符串 非空 索引 格式：手机号码尾数 + UUID字符串
                                password: String,        // 用户注册密码加密字符串 非空 算法：sha256( md5(未加密密码) + 给定随机字符串 )
                                username: String,        // 用户账号 可空 默认值：第一份简历所填姓名 仅用于非正式场合显示
                                registerIP: String,      // 用户注册所在地IP 可空 默认值：空字符串
                                registerTime: Date,      // 用户注册时间 可空 默认值：POSIX时间零值
                                signinIP: String,        // 当前登录所在地IP 可空 默认值：空字符串
                                signinTime: Date,        // 当前登录时间 可空 默认值：POSIX时间零值
                                lastIP: String,          // 最近登录所在地IP 可空 默认值：空字符串
                                lastTime: Date,          // 最近登录时间 可空 默认值：POSIX时间零值
                                enable: Boolean          // 用户帐号是否有效 可空 默认值：TRUE 其中：TRUE表示帐号有效 FALSE表示帐号无效
                        })
                }
        }

        // 检测给定的手机号码及其区号是否已经被注册
        public async existsByMobile(mobile: string, mobileArea: string, enable: boolean = true): Promise<boolean> {
                return this.exists({ mobile, mobileArea, enable })
        }

        // 获取给定的手机号码及其区号的用户基本信息
        public async findOneByMobile(mobile: string, mobileArea: string, enable: boolean = true): Promise<any> {
                return this.findOne({
                        where: {
                                mobile, mobileArea, enable
                        }
                })
        }

        // 基于给定的基本信息注册用户信息
        public async New(parameters: any): Promise<any> {
              

                let document: any = {
                        openID: parameters.openID || utils.NewOpenID(encodeURIComponent(parameters.user)),
                        password: utils.cryptoPassword(parameters.password),
                        username: parameters.username || parameters.nickname || '',
                        registerIP: parameters.registerIP || '127.0.0.1',
                        registerTime: new Date(),
                        signinIP: parameters.signinIP || '127.0.0.1',
                        signinTime: new Date(),
                        lastIP: parameters.lastIP || '127.0.0.1',
                        lastTime: new Date(),
                        enable: true
                }
                document._id = document.openID

                let callback = await this.save(document)
                if (utils.empty(callback)) {
                        return new Promise<any>(resolve => resolve(false))
                }

                return new Promise<any>(resolve => resolve(document))
        }

        // 基于用户简历信息设置其相关数据项
        public async updateByResume(parameters: any, member: any): Promise<any> {
                let document: any = {}

                if (parameters.realname && parameters.realname !== member.realname) {
                        document.realname = parameters.realname
                }

                if (parameters.realname) {
                        document.username = parameters.realname
                }

                if (parameters.sex) {
                        document.sex = parameters.sex
                }

                if (typeof (parameters.img) === 'string' && parameters.img) {
                        document.img = parameters.img
                }

                if (parameters.mobile) {
                        document.mobile = parameters.mobile
                        document.mobileArea = parameters.mobileArea || '86'
                }

                if (parameters.birthday) {
                        let date = new Date(parameters.birthday)

                        document.birthdayYear = date.getFullYear()
                        document.birthdayMonth = date.getMonth() + 1
                        document.birthdayDay = date.getDate()
                }

                if (parameters.localeCountry && parameters.localeProvince && parameters.localeCity && parameters.localeTown) {
                        document.localeCountry = parameters.localeCountry
                        document.localeProvince = parameters.localeProvince
                        document.localeCity = parameters.localeCity
                        document.localeTown = parameters.localeTown
                }

                if (parameters.email) {
                        document.email = parameters.email
                        document.statusEmail = false
                }

                return this.findByIdAndUpdate(parameters.openID, document)
        }
}
export default new schemaMember()