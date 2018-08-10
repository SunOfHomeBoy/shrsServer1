// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 删除默认技能标签
//
// 调用权限: API_PURVIEW_ADMINS <Passing/>
//
// 参数说明:
//      {
//              "skill": "傻逼" // 技能标签关键词
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

export default async function delSkill(req: request, res: response, parameters: any): Promise<IResult> {
        let document = await schema.configures.itemOne('SKILL')

        if (utils.empty(parameters.skill) === false && document.indexOf(parameters.skill) !== -1) {
                let skillBuf = []

                for (let item of document) {
                        if (item !== parameters.skill) {
                                skillBuf.push(item)
                        }
                }

                await schema.configures.set({ name: 'SKILL', data: skillBuf })
        }

        return render({ code: 200, msg: 'SKILL', })
}