// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义文档数据库的连接主机、端口和数据库名称
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
export default {
        host: '192.168.0.196',
        port: 17280,
        data: 'shrs' + (process.env.NODE_ENV !== 'development' ? '' : '_RELEASE')
}