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
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST')
        res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')
        console.log("req:", req)
        console.log("res:", res);
        console.log("par:", parameters);

        return render({ code: 200, msg: "200" })
}