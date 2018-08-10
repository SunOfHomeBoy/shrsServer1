// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 获取横幅广告图片
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "deviceType": "DEFAULT", // 设备类型 String 可空 其中：DEFAULT表示桌面版本 MOBILE表示移动版本
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "show": true, // 显示状态 Boolean 非空
//                      "sort": 0, // 排序加权 Number 非空
//                      "href": "", // 链接地址 String 非空
//                      "type": "DEFAULT", // 广告模型 String 非空
//                      "from": "MOBILE", // 终端设备 String 非空 其中：MOBILE表示
//                      "img": { // 图片地址 
//                              "en": "http://i4.fuimg.com/611341/e13f83141ca38d5f.jpg",
//                              "zh": "http://i4.fuimg.com/611341/e13f83141ca38d5f.jpg",
//                              "cn": "http://i4.fuimg.com/611341/e13f83141ca38d5f.jpg"
//                      },
//                      "id": "BANNERS#100006" // 内部ID String 非空
//              }]
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function banners(req: request, res: response, parameters: any): Promise<IResult> {
        let document: any[] = []

        let callback = await schema.configures.itemAll('BANNERS')
        for (let item of callback) {
                if (utils.empty(item.show) === false) {
                        if (item.from === parameters.deviceType) {
                                document.push(item)
                        }
                }
        }

        return render({ code: 200, msg: '', data: utils.sortDESC(document, (o: any): number => Number(o.sort)) })
}