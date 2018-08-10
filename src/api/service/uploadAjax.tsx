// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义跨设备服务器端接口 之 用户图片文件上传（Web前端版）
//
// 调用权限: API_PURVIEW_COMMON | API_PURVIEW_MEMBER | API_PURVIEW_ADMINS
//
// 参数说明:
//      {
//      }
//
// 返回数据:
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：若状态代码是200，则返回空字符串
//              "data": "http:\/\/i2.cfimg.com/611341/c69b534d645c1d55.png" // 上传图片地址
//      }
// 
// 错误代码:
//      {
//              2015: 'Upload Format Invalid' // 上传文件格式尚未支持
//              2016: 'Upload Size too Large' // 上传文件尺寸超过限制
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import uploadAjax from './upload'
export default uploadAjax