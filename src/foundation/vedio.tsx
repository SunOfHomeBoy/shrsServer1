// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义视频请求类函数
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as fs from 'fs'
import * as path from 'path'
import * as request from 'request'
import utils from './utils'
import { setting } from '../config'

export default class vedio {
        public static readonly orgName: string = '1169180327177665'
        public static readonly appName: string = 'jingdianyixian'
        public static readonly clientID: string = 'YXA60TaMwDGoEeiXB--hZWNm8w'
        public static readonly clientSecret: string = 'YXA6jVWh9I2-Zie2l3gBi29Bp5NxXmo'
        public static readonly tmpFile: string = path.join(setting.pathTmpdir, 'access_token.vedio')
        public static readonly expiresIn: number = 604800000
        public static readonly customPass: string = 'Jdyx12345678'

        public static async token(): Promise<string> {
                return new Promise<string>(resolve => {
                        request({
                                method: 'POST',
                                url: `http://a1.easemob.com/${vedio.orgName}/${vedio.appName}/token`,
                                headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                        'grant_type': 'client_credentials',
                                        'client_id': vedio.clientID,
                                        'client_secret': vedio.clientSecret
                                })
                        }, (err: Error, response: any, callback: any) => {
                                if (!err && response.statusCode == 200) {
                                        let tmp = utils.jsonDecode(callback)

                                        if (utils.empty(tmp.access_token) === false) {
                                                tmp.expires_start = utils.time()
                                                utils.jsonDump(vedio.tmpFile, tmp)

                                                return resolve(tmp.access_token)
                                        }
                                }

                                return resolve(null)
                        })
                })
        }

        public static async callback(fn: (access_token: string) => Promise<any>): Promise<any> {
                if (fs.existsSync(vedio.tmpFile) === false) {
                        let access_token = await vedio.token()
                        return fn(access_token)
                }

                let tmp = utils.jsonLoad(vedio.tmpFile)
                if (!tmp.enexpires_start || utils.time() - tmp.expires_start >= vedio.expiresIn) {
                        let access_token = await vedio.token()
                        return fn(access_token)
                }

                return fn(tmp.access_token)
        }

        public static async registerMember(openID: string): Promise<any> {
                return vedio.callback((access_token: string): Promise<any> => {
                        return new Promise<any>(resolve => {
                                request({
                                        method: 'POST',
                                        url: `http://a1.easemob.com/${vedio.orgName}/${vedio.appName}/users`,
                                        headers: {
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json',
                                                'Authorization': 'Bearer ' + access_token
                                        },
                                        body: JSON.stringify({
                                                username: utils.formatOpenID(openID),
                                                password: vedio.customPass
                                        })
                                }, (err: Error, response: any, callback: any) => {
                                        if (!err && response.statusCode == 200) {
                                                return resolve(true)
                                        }

                                        return resolve(false)
                                })
                        })
                })
        }

        public static async onlineMember(openID: string): Promise<any> {
                return vedio.callback((access_token: string): Promise<any> => {
                        let account = utils.formatOpenID(openID)
                        return new Promise<any>(resolve => {
                                request({
                                        method: 'GET',
                                        url: `http://a1.easemob.com/${vedio.orgName}/${vedio.appName}/users/${account}/status`,
                                        headers: {
                                                'Content-Type': 'application/json',
                                                'Accept': 'application/json',
                                                'Authorization': 'Bearer ' + access_token
                                        }
                                }, (err: Error, response: any, callback: any) => {
                                        if (!err && response.statusCode == 200) {
                                                let tmp = utils.jsonDecode(callback)
                                                return resolve(tmp.data[account] !== 'offline')
                                        }

                                        return resolve(false)
                                })
                        })
                })
        }
}