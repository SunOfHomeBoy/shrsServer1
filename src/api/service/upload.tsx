// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户图片文件上传（移动设备版）
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "contentType": "PNG", // 上传文件格式类型 String 非空 其中：PNG、JPG、JPEG、GIF是有效选项值
//              "contentData": "xxxx" // 上传文件字节流之BASE64编码字符串 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": "http:\/\/i2.cfimg.com/611341/c69b534d645c1d55.png" // 上传图片地址
//      }
// 
// 错误代码:
//      {
//              2016: 'Upload Format Invalid' // 上传文件格式尚未支持
//              2017: 'Upload Size too Large' // 上传文件尺寸超过限制
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'
import { setting, cdn } from '../../config'
import * as needle from 'needle'
import * as path from 'path'
import * as fs from 'fs'

export default async function upload(req: request, res: response, parameters: any): Promise<IResult> {
        // 移动设备版图片上传
        if (String(req.native.path).indexOf('/api/service/upload') !== -1) {
                let buffers = new Buffer(parameters.contentData, 'base64')

                if (['PNG', 'JPG', 'JPEG', 'GIF'].indexOf(parameters.contentType) === -1) {
                        return render({ code: 2016, msg: 'Upload Format Invalid' })
                }

                if (buffers.length >= 4194304) {
                        return render({ code: 2017, msg: 'Upload Size too Large' })
                }

                let targetName = new Buffer(utils.md5(String(buffers))).toString('base64').replace(/=/, '')
                let targetSuff = String(parameters.contentType).toLowerCase()
                let targetDist = path.join(setting.pathPublic, utils.formatDate('YYYYMM'), `${targetName}.${targetSuff}`)

                let callback = await writeCDNFile(targetDist, buffers, parameters.contentType)
                if (!callback.success) {
                        return render({ code: 200, msg: '', data: targetDist.replace(setting.pathPublic, '/public') })
                }

                return render({ code: 200, msg: '', data: callback.uri })
        }

        // Web前端版图片上传
        else if (String(req.native.path).indexOf('/service/ajax/upload') !== -1) {

        }

        return render({ code: 200, msg: '' })

        async function writeCDNFile(targetDist: string, buffers: Buffer, contentType: string): Promise<any> {
                return new Promise<any>(resolve => {
                        let targetPath = path.dirname(targetDist)
                        let targetFile = path.basename(targetDist)

                        fs.existsSync(setting.pathPublic) || fs.mkdirSync(setting.pathPublic)
                        fs.existsSync(targetPath) || fs.mkdirSync(targetPath)

                        fs.writeFile(targetDist, buffers, (err: Error) => {
                                if (err) {
                                        return resolve({ success: false, msg: err.message })
                                }

                                needle.post('http://up.imgapi.com/', {
                                        file: {
                                                file: targetDist,
                                                content_type: 'image/' + contentType.toLowerCase()
                                        },
                                        Token: cdn.token,
                                        aid: cdn.aid,
                                        deadline: Math.floor(Date.now() / 1000) + 60,
                                        from: 'file',
                                        httptype: 1
                                }, { multipart: true }, (err: Error, callback: any) => {
                                        if (err) {
                                                return resolve({ success: false, msg: err.message })
                                        }

                                        let result = utils.jsonDecode(callback.body || '')
                                        if (result.err) {
                                                return resolve({ success: false, msg: result.info })
                                        }

                                        return resolve({ success: true, uri: result.linkurl, name: targetFile })
                                })
                        })
                })
        }
}