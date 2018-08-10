// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义文档数据库数据模型的连接对象
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import * as mongoose from 'mongoose'
import connect from '../config/mongodb'

mongoose.connect(`mongodb://${connect.host}:${connect.port}/${connect.data}`, {
        useMongoClient: true
})

export default mongoose