// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义常用实用函数
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'
import * as moment from 'moment'
import * as uuid from 'uuid'
import * as request from 'request'

export default class utils {
        public static readonly offsetPassword: string = '64e2f797-0b07-4917-bcd9-3e34a5048ea0'

        // 判断给定的对象 document 是否是空值
        public static empty(document: any): boolean {
                switch (typeof (document)) {
                        case 'undefined':
                                return true

                        case 'boolean':
                                return document === false

                        case 'number':
                                return document === 0

                        case 'string':
                                return document.length === 0

                        case 'function':
                                return false
                }

                if (document === null) {
                        return true
                }

                if (document instanceof Array) {
                        return document.length === 0
                }

                return Object.keys(document).length === 0
        }

        // 返回容器对象的长度
        public static len(obj: any): number {
                if (obj instanceof Array) {
                        return Array(...obj).length
                }

                if (typeof (obj) === 'object') {
                        return Object(obj).keys().length
                }

                return String(obj).length
        }

        // 判断给定的对象包含给定的数据
        public static inContains(obj: any, v: any): boolean {
                for (let key in obj) {
                        if (v === obj[key]) {
                                return true
                        }
                }

                return false
        }

        // 加权递增排序泛型数组
        public static sortASC(documents: any[], fn?: (o: any) => number): any[] {
                if (!fn) fn = (o: any): number => Number(o)

                for (let i = 0; i < documents.length - 1; i++) {
                        for (let j = 0; j < documents.length - 1 - i; j++) {
                                if (fn(documents[j]) > fn(documents[j + 1])) {
                                        let buf = documents[j]
                                        documents[j] = documents[j + 1]
                                        documents[j + 1] = buf
                                }
                        }
                }

                return documents
        }

        // 加权递奖排序泛型数组
        public static sortDESC(documents: any[], fn?: (o: any) => number): any[] {
                if (!fn) fn = (o: any): number => Number(o)

                for (let i = 0; i < documents.length - 1; i++) {
                        for (let j = 0; j < documents.length - 1 - i; j++) {
                                if (fn(documents[j]) < fn(documents[j + 1])) {
                                        let e = documents[j]
                                        documents[j] = documents[j + 1]
                                        documents[j + 1] = e
                                }
                        }
                }

                return documents
        }

        // 返回给定天数前的日期时间
        public static beforeToday(num: number): Date {
                let dt = new Date()

                if (num >= 1) {
                        let td = new Date([
                                dt.getFullYear(),
                                dt.getMonth() + 1,
                                dt.getDate()
                        ].join('-'))
                        td.setDate(dt.getDate() - num + 1)

                        return new Date([
                                dt.getFullYear(),
                                dt.getMonth() + 1,
                                dt.getDate()
                        ].join('-'))
                }

                return dt
        }

        // 返回两个日期之天数差
        public static dateDifference(date1: Date, date2: Date): number {
                return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
        }

        // 返回两个经纬度距离
        public static gcDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
                const radius: number = 6378137.0
                const rad = (num: number): number => (num * Math.PI) / 180.0

                return Math.round(
                        Math.round((
                                2 * radius * Math.asin(
                                        Math.sqrt(
                                                Math.pow(Math.sin((rad(lat1) - rad(lat2)) / 2), 2) +
                                                Math.cos(rad(lat1)) *
                                                Math.cos(rad(lat2)) *
                                                Math.pow(Math.sin((rad(lng1) - rad(lng2)) / 2), 2))
                                )
                        ) * 10000.0) / 10000.0
                )
        }

        // 判断国际版手机号码格式
        public static isMobileISO(mobile: string): boolean {
                return /^\d{6,11}$/i.test(mobile)
        }

        // 判断中国版手机号码格式
        public static isMobileChina(mobile: string): boolean {
                return /^1(3|4|5|7|8|9)\d{9}$/i.test(mobile)
        }

        // 判断电子邮箱格式
        public static isEmail(e: string): boolean {
                return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i.test(e)
        }

        // 将对象 dist 属性值合并到对象 document 当中
        public static union(document: any, dist: any): any {
                for (let name in dist) {
                        document[name] = dist[name]
                }

                return document
        }

        // 返回其元素依次批量格式化的数组
        public static forEach(documents: any[], fn: (e: any) => any): any[] {
                for (let i = 0; i < documents.length; i++) {
                        documents[i] = fn(documents[i])
                }

                return documents
        }

        // 返回给定范围的等差数值数组
        public static range(min: number, max: number, step: number = 1): number[] {
                let documents: number[] = []

                if (max < min || step <= 0) {
                        return documents
                }

                for (let buf = min; buf <= max; buf = buf + step) {
                        documents.push(buf)
                }

                return documents
        }

        // 生成特定区域的随机数
        public static random(max: number, min: number = 0): number {
                let range = max - min

                if (range <= 0) {
                        return Math.random()
                }

                return min + Math.round(range * Math.random())
        }

        // 返回给定下标的子对象数据
        public static atKeys(document: any = {}, keys: string[] = [], contain: boolean = true): any {
                let buffers: any = {}

                for (let key in document) {
                        if (typeof (document[key]) !== 'undefined') {
                                if (contain && keys.indexOf(key) !== -1) {
                                        buffers[key] = document[key]
                                }

                                if (!contain && document[key] && keys.indexOf(key) === -1) {
                                        buffers[key] = document[key]
                                }
                        }
                }

                return buffers
        }

        // 基础型 HASH 加密算法
        public static hash(str: string, code?: string): string {
                return crypto.createHash(code || 'md5').update(str).digest('hex')
        }

        // MD5 加密算法
        public static md5(str: string): string {
                return utils.hash(str, 'md5')
        }

        // Sha256 加密算法
        public static sha256(str: string): string {
                return utils.hash(str, 'sha256')
        }

        // Sha512 加密算法
        public static sha512(str: string): string {
                return utils.hash(str, 'sha512')
        }

        // 返回当前时间
        public static time(): number {
                return new Date().getTime()
        }

        // 返回兩個時間之差
        public static timeInterval(begin: number | Date, finish?: number | Date): number {
                let timeBegin: number = typeof (begin) === 'number' ? begin : begin.getTime()
                let timeFinish: number = typeof (finish) === 'number' ? finish : (finish || new Date()).getTime()
                return Math.abs(timeFinish - timeBegin)
        }

        // 较为安全的用户密码加密算法
        public static cryptoPassword(password: string): string {
                return utils.sha256(utils.md5(password) + utils.offsetPassword)
        }

        // 返回一个随机的 UUIDv4 字符串
        public static uuid(prefix: string = ''): string {
                return prefix + uuid.v4()
        }

        // 返回给定 OpenID 的加密字符串
        public static openIDEncode(openID: string): string {
                let random = new Date().getTime().toString()
                let buffer = new Buffer(String(openID).replace(/-/g, '')).toString('base64')
                return random.substr(-2, 1) + buffer.replace(/=$/, '') + random.substr(-1, 1)
        }

        // 返回给定加密 OpenID 的解码字符串
        public static openIDDecode(openID: string): string {
                let buffer = new Buffer(String(openID).substr(1).replace(/\d{1}$/, ''), 'base64').toString()

                return [
                        buffer.substr(0, 9),
                        buffer.substr(9, 4),
                        buffer.substr(13, 4),
                        buffer.substr(17, 4),
                        buffer.substr(21)
                ].join('-')
        }

        // 基于手机尾号创建一个 OpenID 字符串
        public static NewOpenID(mobile?: string): string {
                if (!mobile) {
                        return utils.uuid('a')
                }

                return utils.uuid(mobile.substr(-1))
        }

        // 格式化OpenID字符串
        public static formatOpenID(openID: string, prefix: string = 'B'): string {
                return prefix + openID.replace(/-/g, '')
        }

        // 创建一个全局文章 ID 字符串
        public static NewArticleID(): string {
                let offset = (Date.now() - 1505620805000) % 1000000000
                return utils.formatDate('YYYYMMDD') + offset.toString().substr(-6)
        }

        // 创建一个全局订单号
        public static NewOrderID(): string {
                let offset = parseInt(utils.uuid().substr(-12), 16).toString().substr(-8)
                return utils.formatDate('YYMMDD') + offset
        }

        // 返回一个日期时间的格式化字符串 基于北京时区作标准时区
        public static formatDate(format?: string, timestamp?: number | string | Date, timezone: number = 8.0): string {
                return moment(timestamp || Date.now()).add(timezone - 8.0, 'hours').format(format || 'YYYY-MM-DD HH:mm:ss')
        }

        // 返回安全性格式化的手机号码
        public static formatMobile(mobile: string): string {
                return [
                        String(mobile).substring(0, 3),
                        '****',
                        String(mobile).substr(-4, 4)
                ].join('')
        }

        // 返回安全格式的身份證號碼
        public static formatIDCard(idcard: string): string {
                return idcard.substr(0, idcard.length - 4) + '****'
        }

        // 返回格式化JSON字符串
        public static formatJSON(document: object): string {
                return JSON.stringify(document, null, 8)
        }

        public static consoleJSON(document: object) {
                console.log(JSON.stringify(document, null, 8))
        }

        // 将一个给定的 document 转换成 JSON 字符串
        public static jsonEncode(document: object): string {
                return JSON.stringify(document)
        }

        // 将一个给定的 JSON 字符串转换成对
        public static jsonDecode(json: string, defs: any = {}): any {
                try {
                        return JSON.parse(json)
                } catch (err) { }

                return defs
        }

        // 返回给定文件所包含的 JSON 对象
        public static jsonLoad(filename: string, defs: any = {}): any {
                if (fs.existsSync(filename)) {
                        try {
                                let buffers = fs.readFileSync(filename)
                                return utils.jsonDecode(buffers.toString().replace(/;\s$/i, ''), defs)
                        } catch (err) { }
                }

                return defs
        }

        // 将 JSON 对象存储到给定文件
        public static jsonDump(filename: string, document: object): void {
                return fs.writeFileSync(filename, JSON.stringify(document))
        }

        // 向给定 uri 发送一个 GET 请求
        public static async emitGET(uri: string): Promise<string> {
                return new Promise<string>(resolve => {
                        request(uri, (err: Error, response: any, callback: any) => {
                                if (!err && response.statusCode == 200) {
                                        return resolve(callback)
                                }

                                resolve(null)
                        })
                })
        }

        // 向给定 url 发送一个 POST 请求
        public static async emitPOST(uri: string, requestData: any): Promise<string> {
                return new Promise<string>(resolve => {
                        request({
                                url: uri,
                                form: requestData
                        }, (err: Error, response: any, callback: any) => {
                                if (!err && response.statusCode == 200) {
                                        return resolve(callback)
                                }

                                resolve(null)
                        })
                })
        }

        // 按星期 分期
        public static getWeek(CurTime: Date, thisTime: Date = new Date(1970, 1, 5)): number {
                let thisTimeMs: number = thisTime.getTime()
                if (thisTimeMs < 0) return -1

                let oneTimeMs = 24 * 60 * 60 * 1000

                let thisDay = thisTime.getDay() !== 0 ? thisTime.getDay() - 1 : 6

                let StartTime: number = thisTimeMs - (thisDay * oneTimeMs);
                if (CurTime.getTime() < StartTime) return 0

                let periods: number = Math.floor((CurTime.getTime() - StartTime) / 604800000) + 1
                return periods
        }
}