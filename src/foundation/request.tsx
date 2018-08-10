// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义 HTTP 协议请求的常用函数
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as express from 'express'

export default class request {
        public OpenID: string

        constructor(public native: express.Request) { }

        // 返回给定名称的 GET 请求参数
        public GET(name?: string, def?: any): any {
                if (this.native.query) {
                        if (!name) {
                                return this.native.query
                        }

                        return this.native.query[name] || def
                }

                return null
        }

        // 返回给定名称的 POST 请求参数
        public POST(name?: string, def?: any): any {
                if (this.native.body) {
                        if (!name) {
                                return this.native.body
                        }

                        return this.native.body[name] || def
                }

                return null
        }

        // 返回给定名称的 GET 或者 POST 请求参数
        public REQUEST(name: string, def?: any): any {
                return this.POST(name) || this.GET(name) || def
        }

        // 返回给定名称的 GOOKIE 参数
        public COOKIE(name?: string, def?: any): any {
                if (this.native.cookies) {
                        if (!name) {
                                return this.native.cookies
                        }

                        return this.native.cookies[name] || def
                }

                return null
        }

        // 返回给定名称的 SESSION 参数
        public SESSION(name?: string, def?: any): any {
                if (this.native.session) {
                        if (!name) {
                                return this.native.session
                        }

                        return this.native.session[name] || def
                }

                return null
        }

        // 返回给定字段的头信息项
        public getHeader(field?: string, def?: any): any {
                if (!field) {
                        return this.native.headers
                }

                return this.native.header(field) || def
        }

        // 返回当前语言代码
        public language(headers?: string): string {
                headers = headers || this.getHeader('accept-languag', '')
                return headers.split(';') [0].split(',') [0]
        }

        // 返回当前请求类型
        public method(): String {
                return String(this.native.method).toUpperCase()
        }

        // 返回当前客户端的操作系统平台
        public platform(): string {
                let userAgent = this.getHeader('user-agent', '').toLowerCase()
                let platforms = [
                        {
                                sign: 'windows',
                                name: 'Windows'
                        },
                        {
                                sign: 'mac',
                                name: 'Mac'
                        },
                        {
                                sign: 'micromessenger',
                                name: 'Wechat'
                        },
                        {
                                sign: 'ipad',
                                name: 'iPad'
                        },
                        {
                                sign: 'iphone',
                                name: 'iPhone'
                        },
                        {
                                sign: 'android',
                                name: 'Android'
                        },
                        {
                                sign: 'mobile',
                                name: 'Mobile'
                        },
                        {
                                sign: 'linux',
                                name: 'Linux'
                        }
                ]

                for (let platform of platforms) {
                        if (userAgent.indexOf(platform.sign) !== -1) {
                                return platform.name
                        }
                }

                return 'Default'
        }

        // 返回当前客户端的真实 IP 地址
        public IPAddress(): string {
                return this.native.header('x-forwarded-for') || this.native.ip
        }

        // 获取客户端提交的时区参数
        public timezone(): number {
                return parseFloat(this.REQUEST('timezone') || this.COOKIE('timezone') || '8.0')
        }

        // 获取客户端提交的 Token 参数
        public accessToken(): string {
                return this.REQUEST('accessToken') || this.COOKIE('accessToken') || ''
        }

        // 获取客户端的应用 ID
        public appID(): string {
                return this.REQUEST('appid') || ''
        }
}