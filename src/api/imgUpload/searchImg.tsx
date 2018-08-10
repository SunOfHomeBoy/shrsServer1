// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 搜索图片
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "imgMode": 1 || 2, // 图片模型 非空/重要 默认值：1 其中：1表示荣誉证书 2表示团队风采
//              "imgItem": "imgItemName", // 图片模型下子类型 可空 默认值：空字符串
//              "Publish": 0, // 发布时间 Number 可空 其中：0表示全部 1表示今天发布 3表示最近三天 7表示最近七天 15表示最近半月 30表示最近一月
//              "begin": 1, // 分页页码 Number 可空 默认值：1
//              "limit": 30, // 每页极限 Number 可空 默认值：30
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": [{
//                      "total": 51, // 数据总数 Number 非空
//                      "pages": 6,  // 分页总数 Number 非空
//                      "begin": 1,  // 分页页码 Number 非空
//                      "limit": 30, // 每页极限 Number 非空
//                      "items": [{
//                              "ImgID": "20171102759933", // 文章全局ID String 非空
//                              "ImgType": "xxx", // 文章分类 String 非空
//                              "title": "星期一催至有：香港打工仔就算有情緒病都唔畀得公司知", // 文章主标题 String 非空
//                              "thumb": "http:\/\/www.xxx.com/xxx.png", // 文章缩略图 String 非空
//                              "publish": "2018-01-20", // 发布日期 String 非空
//                              "description": "香港打工仔工時長，壓力大，加上人工同樓價永遠唔成正比" // 文章摘要 String 非空
//                      }]
//              }]
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function searchImg(req: request, res: response, parameters: any): Promise<IResult> {
        let filter: any = {
                where: {
                        imgMode: parameters.imgMode || 2,
                        imgItem: parameters.imgItem || '',
                        enable: true
                },
                order: {
                        imgID: -1
                },
                begin: parameters.begin || 1,
                limit: parameters.limit || 30
        }

        if (parameters.imgPublish) {
                filter.where.publish = {
                        $gt: utils.beforeToday(parameters.imgPublish)
                }
        }
        // console.log("filter:::", filter);
        let document = await schema.imgs.findPage(filter)
        // console.log(document);
        document.items = utils.forEach(document.items, (e: any): any => {
                // console.log("document.items:::", e);
                return {
                        imgID: e.imgID,
                        imgMode: e.imgMode,
                        imgItem: e.imgItem,
                        title: e.title,
                        linkURL: e.linkURL,
                        publish: utils.formatDate('YYYY-MM-DD', e.publish),
                        description: e.description
                }
        })
        return render({ code: 200, msg: '', data: document })
}