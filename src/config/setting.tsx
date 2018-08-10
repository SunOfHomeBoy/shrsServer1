// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义应用服务器的主机、端口、Master-Worker模式和相关目录
//
// @authors hjboss <hongjiangproject@gmail.com> 2017-12 $$
import * as path from 'path'

export default {
        debug: false,
        port: 10007,
        masters: [10007, 10009, 10016, 10025, 10041],
        pathAssets: path.join(__dirname, '../../assets'),
        pathConfig: process.env.NODE_ENV !== 'production'
                ? path.join(__dirname, '../../etc')
                : '/mnt/www/etc',
        pathPublic: process.env.NODE_ENV !== 'production'
                ? path.join(__dirname, '../../public')
                : '/mnt/www/PUBLIC',
        pathTmpdir: process.env.NODE_ENV !== 'production'
                ? path.join(__dirname, '../../tmp')
                : '/mnt/www/tmp'
}