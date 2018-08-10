// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 京典一线网络技术（北京）有限公司 京典一线人才资源库 服务器端RESTFul接口
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
//
/// <reference path="./webservices.d.tsx" />
import { serve } from './foundation'
import api from './api'

export default new serve({
        name: 'webservices',
        routes: api
})