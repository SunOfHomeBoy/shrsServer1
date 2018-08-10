// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 国家省市区县查询
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "region": "中国-湖南省" // 所查询地区名称 String 非空
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [
//                      "长沙市",
//                      "株洲市",
//                      ......
//              ]
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function region(req: request, res: response, parameters: any): Promise<IResult> {
        let region = utils.empty(parameters.region) ? 'regions' : 'regions#' + parameters.region

        let document = []
        let callback = await schema.configures.itemOne(region)
        if (callback instanceof Array) {
                document = callback
        }

        return render({ code: 200, msg: '', data: document })
}