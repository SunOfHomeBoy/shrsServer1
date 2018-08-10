// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义服务器端接口应用服务器之 Master-Worker 模型服务器的 Master 脚本
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import apiServe from './webservices'
apiServe.master(__dirname)