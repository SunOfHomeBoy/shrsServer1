// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义公共短信发送服务及其验证码检测
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as request from 'request'
import * as qs from 'querystring'
import * as sdk from '@alicloud/sms-sdk'
import utils from './utils'
import third from '../config/third'
import setting from '../config/setting'
import password from '../config/password'

export default class sms {
        public static readonly accessKeyID: string = 'LTAIDOA6SND0jwdO'
        public static readonly secretAccessKey: string = '3r3VhrD0iycoHDbYZnO6ed7oOWRONP'

        // 返回一个六位随机数字型验证码
        public static NewCode(): string {
                let caches: string[] = []

                for (let item of utils.uuid().split('')) {
                        if ('0123456789'.indexOf(item) !== -1 && caches.length < 6) {
                                caches.push(item)
                        }
                }

                if (caches.length < 6) {
                        for (let i = 0; i < 6 - caches.length; i++) {
                                caches.push((Math.random() * 9).toString())
                        }
                }

                return caches.join('')
        }

        // 返回给定验证码的加密字符串
        public static encrypt(code: string): string {
                return utils.md5(code + '#' + password.offset)
        }

        // 判断给定的验证码和其加密文是否配对
        public static check(code: string, encrypt: string): boolean {
                return utils.empty(code) === false && sms.encrypt(code) === encrypt
        }

        // 将给定的手机号码发送给定模板的短信消息
        public static async send(mobile: string, mobileArea: string, smsType: string, code: string): Promise<any> {
                return new Promise<any>(resolve => {
                        let parameters: any = {
                                PhoneNumbers: mobile,
                                SignName: '京典一线',
                                TemplateParam: utils.jsonEncode({
                                        no: code
                                }),
                                TemplateCode: ''
                        }

                        switch (smsType) {
                                case 'SIGNIN':
                                        parameters.TemplateCode = 'SMS_123292193'
                                        break

                                case 'SIGNUP':
                                        parameters.TemplateCode = 'SMS_123292192'
                                        break

                                case 'RESETPASSWORD':
                                        parameters.TemplateCode = 'SMS_129747057'
                        }

                        new sdk({
                                accessKeyId: sms.accessKeyID,
                                secretAccessKey: sms.secretAccessKey
                        }).sendSMS(parameters).then((callback: any) => {
                                return resolve(callback.Code === 'OK')
                        })
                })
        }

        /*
        private static async sendV0(mobile: string, mobileArea: string, smsType: string, code: string): Promise<any> {
                return new Promise<any>(resolve => {
                        let parameters: any = {
                                ParamString: utils.jsonEncode({
                                        no: code
                                }),
                                RecNum: mobile,
                                SignName: '京典一线',
                                TemplateCode: ''
                        }

                        switch (smsType) {
                                case 'SIGNIN':
                                        parameters.TemplateCode = 'SMS_108975007'
                                        break

                                case 'SIGNUP':
                                        parameters.TemplateCode = 'SMS_108950006'
                                        break

                                case 'RESETPASSWORD':
                                        parameters.TemplateCode = 'SMS_129747057'
                                        break
                        }

                        request({
                                url: 'http://sms.market.alicloudapi.com/singleSendSms?' + qs.stringify(parameters),
                                method: 'GET',
                                headers: {
                                        Authorization: 'APPCODE ' + third.appCode
                                }
                        }, (err: Error, response: any, callback: any) => {
                                if (!err && response.statusCode == 200) {
                                        let result = utils.jsonDecode(callback)

                                        if (result.success) {
                                                return resolve(true)
                                        }

                                        return resolve(result.message)
                                }

                                return resolve(err)
                        })
                })
        }
        */
}
