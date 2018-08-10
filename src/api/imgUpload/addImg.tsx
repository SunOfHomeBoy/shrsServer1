// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 添加图片URL
//
// 调用权限: API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "openID": String,         // 管理员OpenID字符串 非空 默认值：空字符串
//              "imgID": String,          // 图片全局ID 可空 索引 默认值：空字符串 算法：( gmmktime() - 1505620805 ) % 1000000
//              "imgMode": Number,        // 图片模型 非空 默认值：0 其中：1表示荣誉证书 2表示团队风采
//              "imgItem": String,        // 图片模型下子类型 非空空 默认值：空字符串
//              "title": String,          // 图片主标题 非空 默认值：空字符串
//              "linkURL": String,        // 图片URL 非空 默认值：空字符串
//              "authors": String,        // 图片作者 可空 默认值：空字符串
//              "description": String,    // 图片摘要 可空 默认值：空字符串
//              "orderNumber": Number,    // 图片排序权重 可空 默认值：0
//              "publish": Date,          // 图片发布时间 可空 默认值：POSIX时间零值
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// 错误代码:
//      {
//              2019: "Invalid Parameters" // 无效的参数数据
//              2020: "Save Parameters Failth" // 存储数据失败
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function addImg(req: request, res: response, parameters: any): Promise<IResult> {
        console.log("parameters:", parameters)
        if (utils.empty(parameters.title)) {
                return render({ code: 2019, msg: 'Invalid Parameters title' })
        }

        let callback = await schema.imgs.saveImg(parameters)
        console.log(callback)
        if (utils.empty(callback)) {
                return render({ code: 2020, msg: 'Save Parameters Failth' })
        }

        return render({ code: 200, msg: '' })
}