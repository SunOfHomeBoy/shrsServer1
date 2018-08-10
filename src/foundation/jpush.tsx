// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义极光推送常用操作
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as jPushSDK from 'jpush-sdk'
import schema from './schema'
import utils from './utils'

export default class jpush {
        protected static readonly appKey: string = '0ac1fb9a735e270273a901fe'
        protected static readonly masterSecret: string = 'e152ef75c974d5962d6859e8'

        public static send(to: string, message: string, parameters: any) {
                try {
                        jPushSDK.buildClient(jpush.appKey, jpush.masterSecret)
                                .push()
                                .setPlatform('ios', 'android')
                                .setAudience(jPushSDK.registration_id(to))
                                .setNotification(message)
                                .setMessage(message, null, null, parameters.extras || {})
                                .setOptions(null, 60)
                                .send((err: Error, res: any) => {
                                        if (utils.empty(err)) {
                                                schema.message.push({
                                                        noticeType: parameters.noticeType,
                                                        mobileArea: parameters.memberTo.mobileArea,
                                                        mobile: parameters.memberTo.mobile,
                                                        messageData: { message, res }
                                                })
                                        }
                                })
                } catch (e) { }
        }
}