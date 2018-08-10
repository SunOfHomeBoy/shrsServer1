// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 APP最新版本下载地址（移动设备版）
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              // 此处是特殊接口
//      }
//
// 返回数据:
//      {
//              // ......
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'
import { setting } from '../../config'
import * as path from 'path'
import * as fs from 'fs'

export default async function download(req: request, res: response, parameters: any): Promise<IResult> {
        let versionCfg: string = path.join(setting.pathConfig, 'ANDROID.version')
        let address: string = ''

        if (fs.existsSync(versionCfg) !== false) {
                let buffer = await utils.jsonLoad(versionCfg)

                if (utils.empty(versionCfg) === false) {
                        res.redirect(buffer.address)
                }
        }

        return render({ code: 200, msg: '', data: address })
}