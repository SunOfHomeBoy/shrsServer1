// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义服务器端接口应用服务器及其运行模式
//
// @authors hjboss <hongjiangproject@gmail.com> 2017-12 $$
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as fileStreamRotator from 'file-stream-rotator'
import * as fs from 'fs'
import * as http from 'http'
import * as morgan from 'morgan'
import * as multiparty from 'connect-multiparty'
import * as path from 'path'
import * as pm from 'pm'
import log from './log'
import payment from './payment'
import request from './request'
import response, { IResult, render } from './response'
import token from './token'
import * as pureview from './purview'

import utils from './utils'
import dev from './dev'
import appid from '../config/appid'
import setting from '../config/setting'
import upload from '../api/imgUpload/upload';

export default class serve {
        constructor(private configures: any) {
                this.configures = configures || {}
                this.configures.mappings = {} // 路由映射

                for (let route of this.configures.routes) {
                        this.configures.mappings[route.path] = route // 遍历路由配置列表 映射进表
                }
        }

        // 创建单实例的HTTP应用服务器
        public httpd() {
                http.createServer(this.api()).listen(setting.port, () => {
                        console.log(this.configures.name + ' running on port ' + setting.port)
                })
        }

        // 创建Master-Worker模式应用服务器之Master进程
        public master(rootPath: string) {
                let master = pm.createMaster({
                        pidfile: path.join(setting.pathTmpdir, this.configures.name + '.pid')
                })
                master.register(this.configures.name, path.join(rootPath, this.configures.name + '-worker.js'), {
                        listen: setting.masters,
                        addr: process.env.NODE_ENV === 'production' ? '127.0.0.1' : '0.0.0.0'
                })
                master.dispatch()
        }

        // 创建Master-Worker模式应用服务器之Worker脚本
        public worker() {
                let worker = http.createServer(this.api())
                pm.createWorker().ready((socket: any, port: any) => {
                        worker.emit('connection', socket)
                })
        }

        private api(): express.Express {
                let app = express()
                let configures = this.configures

                app.set('env', process.env.NODE_ENV || 'development')
                app.set('port', configures.port || setting.port)

                app.use(compression())
                app.use('/public', express.static(setting.pathPublic))
                app.use('/assets', express.static(setting.pathAssets))
                app.use(bodyParser.json({ limit: '50mb' }))
                app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
                app.use(cookieParser())
                app.use(session({
                        secret: 'shrs',
                        name: 'shrsID',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
                        cookie: {
                                // domain: '192.168.0.191:8081',
                                httpOnly: true,
                                // maxAge: 1800000
                        },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
                        resave: false,
                        saveUninitialized: true,
                }))

                //支持文件系统级日志消息
                let logdir = path.join(setting.pathTmpdir, configures.name || 'default')
                fs.existsSync(setting.pathTmpdir) || fs.mkdirSync(setting.pathTmpdir)
                fs.existsSync(logdir) || fs.mkdirSync(logdir)
                if (process.env.NODE_ENV !== 'production') {
                        console.log("use combined");
                        app.use(morgan('combined'))
                } else {
                        console.log("use log");
                        let options = {
                                stream: fileStreamRotator.getStream({
                                        date_format: 'YYYYMMDD',
                                        filename: path.join(logdir, configures.name + '-%DATE%.log'),
                                        frequency: 'daily',
                                        verbose: false
                                })
                        }

                        app.use(morgan('combined', options))
                }

                if (process.env.NODE_ENV !== 'production') {
                        app.use('/development', (req: express.Request, res: express.Response, next: any) => {
                                res.header('Content-Type', 'text/html;charset=utf-8')
                                res.end(dev.render({ pathinfo: req.path }))
                        })
                }

                app.use('/service/upload/imgUpload', multiparty(), (req: express.Request, res: express.Response, next: any) => {
                        upload(req, res, next).then((callback) => {
                                console.log(callback)
                                res.header('charset', 'utf8')
                                res.header('Content-Type', 'application/json')
                                res.status(callback.code < 1000 ? callback.code : 200).end(JSON.stringify(callback))
                        })
                     
                })

                app.use((req: express.Request, res: express.Response, next: any) => {
                        let requestData = new request(req)
                        let responseData = new response(res)

                        let accessToken = requestData.REQUEST('accessToken') || requestData.COOKIE('accessToken') || ''
                        let timezone = parseFloat(requestData.REQUEST('timezone', '8.0'))
                        let appID = requestData.REQUEST('appid')
                        let parameters = utils.jsonDecode(requestData.REQUEST('parameters'))
                        let controller = configures.mappings[req.path]

                        // console.log("controller::", controller);

                        if (!controller || !controller.component) {
                                return responseData.apiNotFound()
                        }

                        if (/^\/api\//i.test(req.path) === false) {
                                return controller.component(requestData, responseData, parameters).then((callback: IResult) => {
                                        switch (callback.code) {
                                                case 403:
                                                        return responseData.errorPermission()

                                                case 404:
                                                        return responseData.errorNotFound()

                                                default:
                                                        return responseData.renderHTML(callback.data, callback.code)
                                        }
                                }, (err: Error) => {
                                        if (process.env.NODE_ENV !== 'production') {
                                                console.log(err)
                                        }

                                        responseData.errorInternalServer()
                                })
                        }

                        if (controller.method !== 'GET' && utils.empty(requestData.POST())) {
                                return responseData.apiPermission()
                        }

                        // console.log("session::", requestData.SESSION());
                     
                        let url = requestData.getHeader("Origin");
                        responseData.setHeader('Access-Control-Allow-Origin', url)
                        responseData.setHeader('Access-Control-Allow-Methods', 'POST')
                        responseData.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')
                        responseData.setHeader("Access-Control-ALLOW-Credentials", "true") // 跨域设置cookie

                        if (!requestData.SESSION().user && controller.auth > 1) {
                                console.log(111111);
                                res.setHeader('Set-Cookie', ['user=true;path=/;max-age=0;', 'access=0;path=/;max-age=0;']);
                                responseData.renderJSON({code: 403, msg: 'do not have permission'})
                        }

                        log.api(requestData)
                        controller.component(requestData, responseData, parameters).then((callback: IResult) => {
                                responseData.renderJSON(callback)
                        }, (err: Error) => {
                                if (process.env.NODE_ENV !== 'production') {
                                        console.log(err)
                                }
                                console.log(err);
                                responseData.apiInternalServer()
                        })
                })

                return app
        }
}