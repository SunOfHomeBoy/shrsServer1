// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义 Token 令牌的常用方法
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as pureview from './purview'
import setting from '../config/token'

export default class token {
        // 创建一个给定的用户和权限的令牌字符串
        public static New(purview: number, openID: string): string {
                return new Buffer([
                        setting.prefix,
                        String(openID).replace(/-/g, ''),
                        purview,
                        (new Date().getTime() + setting.expire).toString(16)
                ].join('')).toString('base64')
        }

        public static NewDefault(): string {
                return token.New(
                        pureview.API_PURVIEW_COMMON | pureview.API_PURVIEW_MEMBER | pureview.API_PURVIEW_ADMINS,
                        '000000000-0000-0000-0000-000000000000'
                )
        }

        // 判断一个给定的令牌字符串在给定的权限范围内是否有效
        public static valid(accessToken: string, purview: number): boolean {
                if (!accessToken) {
                        return (pureview.API_PURVIEW_COMMON & purview) !== 0
                }

                let decrypted = new Buffer(accessToken, 'base64').toString().replace(setting.prefix, '')
                if (new Date().getTime() <= Number('0x' + decrypted.substring(34))) {
                        if ((Number(decrypted.substr(33, 1)) & purview) !== 0) {
                                return true
                        }
                }

                return false
        }

        // 获取给定的令牌字符串所包含的OpenID字符串
        public static openID(accessToken: string): string {
                let v = new Buffer(accessToken, 'base64').toString().substr(5, 34).split('')
                return [
                        [v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9]].join(''),
                        [v[10], v[11], v[12], v[13]].join(''),
                        [v[14], v[15], v[16], v[17]].join(''),
                        [v[18], v[19], v[20], v[21]].join(''),
                        [v[22], v[23], v[24], v[25], v[26], v[27], v[28], v[29], v[30], v[31], v[32], v[33]].join('')
                ].join('-')
        }

}
