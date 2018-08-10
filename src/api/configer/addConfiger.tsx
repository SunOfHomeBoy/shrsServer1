// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义shrs服务器端接口 之 添加/修改contact配置
//
// 调用权限: API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "_id": "配置名称" // 配置名关键词
//              "name": "配置名称" // 配置名关键词
//              "data": "配置项目" // 配置项详情
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { request, response, IResult, render, utils, schema } from '../../foundation'

export default async function addArticle(req: request, res: response, parameters: any): Promise<IResult> {
        let document = await schema.configures.itemOne('SKILL')

        if (utils.empty(parameters.skill) === false && document.indexOf(parameters.skill) === -1) {
                document.push(parameters.skill)
                await schema.configures.set({ name: 'SKILL', data: document })
        }

        return render({ code: 200, msg: '' })
}