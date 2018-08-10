// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 移动客户端版本号
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "deviceType": "ANDROID" // 设备类型 String 非空 其中：ANDROID表示安卓设备 IOS表示苹果设备
//      }
// 
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": "1.0.0"
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'
import { setting } from '../../config'
import * as path from 'path'
import * as fs from 'fs'

export default async function version(req: request, res: response, parameters: any): Promise<IResult> {
        let versionNum: string = '1.0.0'
        let versionCfg: string = path.join(setting.pathConfig, `${parameters.deviceType}.version`)

        if (fs.existsSync(versionCfg) !== false) {
                let buffer = await utils.jsonLoad(versionCfg)

                if (utils.empty(versionCfg) === false) {
                        versionNum = buffer.version
                }
        }

        return render({ code: 200, msg: '', data: versionNum })
}