// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义 API 接口返回值和常用响应方法
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as express from 'express'

export interface IResult {
        code: number
        msg: string
        data?: any
}

// 返回 API 接口函数之响应返回值
export async function 
render(document: IResult): Promise<IResult> {
        return new Promise<IResult>(resolve => resolve(document))
}

// 定义 HTTP 协议响应类
export default class response {
        constructor(public native: express.Response) { }

        // 服务器端 URI 跳转
        public redirect(uri: string) {
                this.native.redirect(uri, 301)
        }

        // 设置响应之头信息项
        public setHeader(field: string, value: string) {
                this.native.header(field, value)
        }

        // 响应给定的文本字符串
        public renderString(str: string, status?: number) {
                this.native.header('charset', 'utf8')
                this.native.header('Content-Type', 'text/plain')
                this.native.status(status || 200).end(str)
        }

        // 响应给定的 HTML 代码字符串
        public renderHTML(html: string, status?: number) {
                this.native.header('charset', 'utf8')
                this.native.header('Content-Type', 'text/html')
                this.native.status(status || 200).end(html)
        }

        // 响应给定的 JSON 数据
        public renderJSON(document: any) {
                this.native.header('charset', 'utf8')
                this.native.header('Content-Type', 'application/json')
                this.native.status(document.code < 1000 ? document.code : 200).end(JSON.stringify(document))
        }

        // 错误 50x 之接口返回值
        public async apiInternalServer() {
                this.renderJSON({ code: 500, msg: 'Internal Server Error' })
        }

        // 错误 404 之接口返回值
        public apiNotFound() {
                this.renderJSON({ code: 404, msg: 'Not Found' })
        }

        // 错误 403 之接口返回值
        public apiPermission() {
                return this.renderJSON({ code: 403, msg: 'Permission Denied' })
        }

        // 默认的错误页面模板
        public errorGeneric(status: number, code: string) {
                this.renderHTML([
                        '<html>',
                        '<head><title>' + code + '</title></head>',
                        '<body bgcolor="white">',
                        '<center><h1>' + code + '</h1></center>',
                        '<hr><center>Tengine/2.2.0</center>',
                        '</body>',
                        '</html>'
                ].join(''))
        }

        // 默认的错误 50x 页面
        public errorInternalServer() {
                this.errorGeneric(500, '500 Internal Server Error')
        }

        // 默认的错误 404 页面
        public errorNotFound() {
                this.errorGeneric(404, '404 Not Found')
        }

        // 默认的错误 403 页面
        public errorPermission() {
                this.errorGeneric(403, '403 Permission Denied')
        }
}