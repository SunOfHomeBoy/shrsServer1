// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 全职兼职简历信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema } from './schema'
import schemaKeywords from './keywords'
import schemaMember from './member'
import schemaOrder from './order'
import utils from '../utils'
import vedio from '../vedio'

const maxSafeTimespan: number = 604800000
class schemaResume extends schema {
        protected readonly onlineTimeinterval: number = 300000

        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'resume',
                        schema: newSchema({
                                _id: String,
                                openID: String,          // 个人用户OpenID字符串 非空 索引 即member表之OpenID 
                                resumeType: String,      // 简历类型 可空 默认值：FULLTIME 其中：FULLTIME表示全职简历 PARTTIME表示兼职简历
                                resumeComplete: Number,  // 简历完整程度 可空 默认值：0 单位：百分比
                                resumeHidden: Boolean,   // 简历隐藏状态 可空 默认值：TRUE 其中：TURE表示全职简历隐藏 FALSE表示全职简历公开
                                resumeViews: Number,     // 简历浏览总量 可空 默认值：0
                                resumeVMonth: Number,    // 简历最近三十天浏览量 可空 默认值：0
                                resumeAt: Number,        // 简历点赞总量 可空 默认值：0
                                resumeComment: Number,   // 简历评论总量 可空 默认值：0
                                resumeFollows: Number,   // 简历关注总量 可空 默认值：0
                                resumeScore: Number,     // 简历平均得分 可空 默认值：0
                                resumeGrade: Number,     // 简历内部等级 可空 默认值：0
                                resumeName: String,      // 简历名称 可空 默认值：空字符串
                                resumeTop: Number,       // 简历置顶权重 可空 默认值：0 其中：0表示简历未置顶
                                resumeTBTime: Date,      // 简历置顶开始时间 可空 默认值：POSIX时间零值
                                resumeTETime: Date,      // 简历置顶结束时间 可空 默认值：POSIX时间零值
                                resumeWeight: Number,    // 简历排序权重 可空 默认值：0 其中：0表示简历未加权
                                resumeWBTime: Date,      // 简历加权排序开始时间 可空 默认值：POSIX时间零值
                                resumeWETime: Date,      // 简历加权排序结束时间 可空 默认值：POSIX时间零值
                                resumeUpdate: Date,      // 简历更新时间 可空 默认值：POSIX时间零值
                                realname: String,        // 真正姓名 可空 默认值：空字符串
                                sex: Number,             // 用户性别 可空 默认值：0 其中：1表示男性 2表示女性
                                img: String,             // 用户头像 可空 默认值：空字符串
                                birthdayYear: Number,    // 出生日年份 可空 默认值：0
                                birthdayMonth: Number,   // 出生日月份 可空 默认值：0 其中：01-12是值有效范围
                                birthdayDay: Number,     // 出生日日期 可空 默认值：0 其中：01-31是值有效范围
                                localeCountry: String,   // 现居所在地国家 可空 默认值：中国
                                localeProvince: String,  // 现居所在地省份 可空 默认值：空字符串
                                localeCity: String,      // 现居所在地城市 可空 默认值：空字符串
                                localeTown: String,      // 现居所在地镇县 可空 默认值：空字符串
                                mobile: String,          // 注册号码（不包含国家代码） 非空 索引 纯数字字符串须正则检测 
                                mobileArea: String,      // 注册号码的国家代码 非空 索引 默认值：86 即中国大陆区
                                email: String,           // 电子邮箱 可空 默认值：空字符串
                                address: String,         // 联系地址 可空 默认值：空字符串
                                idcardNumber: String,    // 身份证号 可空 默认值：字数组
                                statusIDCard: Boolean,   // 实名认证状态 可空 默认值：FALSE
                                signature: String,       // 自我评价 可空 默认值：空字符串
                                picture: Array,          // 用户照片 可空 默认值：空数组
                                honor: Array,            // 荣誉证书 可空 默认值：空数组
                                skill: {                 // 擅长技能 可空 默认值：空数组
                                        type: Array,     //
                                        index: true      //
                                },
                                educationGrade: Number,  // 最高教育程度 可空 默认值：0 其中：1表示高中以下 2表示高中 3表示大专 4表示本科 5表示硕士 6表示博士
                                educationMajor: String,  // 最高教育学科 可空 默认值：空字符串
                                workYear: Number,        // 最高工作年限 可空 默认值：0
                                expectCountry: String,   // 期望工作地点之国家 可空 默认值：中国
                                expectProvince: String,  // 期望工作地点之省份 可空 默认值：空字符串
                                expectCity: String,      // 期望工作地点之城市 可空 默认值：空字符串
                                expectTown: String,      // 期望工作地点之镇县 可空 默认值：空字符串
                                expectDirection: String, // 期望从事行业 可空 默认值：空字符串
                                expectWork: String,      // 期望工作 默认值：空字符串
                                expectMoney: Number,     // 期望工资 默认值：0 其中：0表示面谈 <br> 1表示1000元/月以下 2表示1000-2000元/月 3表示2000-4000元/月 <br> 4表示4000-6000元/月 5表示6000-8000元/月 6表示8000-10000元/月 <br> 7表示10000元-15000元/月 8表示15000-25000元/月 9表示25000-35000元/月 <br> 10表示35000-50000元/月 11表示50000-100000元/月 12表示100000元/月以上
                                expectStatus: Number,    // 工作状态 可空 默认值：0 其中：1表示离职随时到岗 2表示在职月内到岗 3表示在职考虑机会 4表示在职暂不考虑
                                works: [                 // 全职简历工作经历表
                                        {
                                                workName: String,        // 职业名称 可空 默认值：空字符串
                                                workCompany: String,     // 公司名称 可空 默认值：空字符串
                                                workBYear: Number,       // 开始时间之年份 可空 默认值：0
                                                workBMonth: Number,      // 开始时间之月份 可空 默认值：0
                                                workFYear: Number,       // 结束时间之年份 可空 默认值：0
                                                workFMonth: Number,      // 结束时间之月份 可空 默认值：0
                                                workMoney: Number,       // 职位月薪 可空 默认值：0 其中：<br> 1表示1000元/月以下 2表示1000-2000元/月 3表示2000-4000元/月 <br> 4表示4000-6000元/月 5表示6000-8000元/月 6表示8000-10000元/月 <br> 7表示10000元-15000元/月 8表示15000-25000元/月 9表示25000-35000元/月 <br> 10表示35000-50000元/月 11表示50000-100000元/月 12表示100000元/月以上
                                                workDescription: String, // 工作内容 可空 默认值：空字符串
                                        }
                                ],
                                educations: [                                // 全职简历教育经历
                                        {
                                                educationSchool: String,     // 学校名称 可空 默认值：空字符串
                                                educationMajor: String,      // 教育专业 可空 默认值：空字符串
                                                educationGrade: Number,      // 教育学历 可空 默认值：0 其中：1表示高中以下 2表示高中 3表示大专 4表示本科 5表示硕士 6表示博士
                                                educationBYear: Number,      // 入学时间之年份 可空 默认值：0
                                                educationBMonth: Number,     // 入学时间之月份 可空 默认值：0
                                                educationFYear: Number,      // 毕业时间之年份 可空 默认值：0
                                                educationFMonth: Number,     // 毕业时间之月份 可空 默认值：0
                                                educationDescription: String // 在校经历 可空 默认值：空字符串
                                        }
                                ],
                                trains: [                                // 全职简历培训经历表
                                        {
                                                trainName: String,        // 培训單位 可空 默认值：空字符串
                                                trainJob: String,         // 培训专业 可空 默认值：空字符串
                                                trainBYear: Number,       // 培训时间之开始年份 可空 默认值：0
                                                trainBMonth: Number,      // 培训时间之开始月份 可空 默认值：0
                                                trainFYear: Number,       // 培训时间之结束年份 可空 默认值：0
                                                trainFMonth: Number,      // 培训时间之结束月份 可空 默认值：0
                                                trainDescription: String, // 培训内容 可空 默认值：空字符串
                                        }
                                ],
                                timeMonday: Array,          // 服务时间（星期一）可空 默认值：空数组 其中：<br>01表示00：00-01：00 02表示01：00-02：00 03表示02：00-03：00 04表示03：00-04：00 <br> 05表示04：00-05：00 06表示05：00-06：00 07表示06：00-07：00 08表示07：00-08：00 <br> 09表示08：00-09：00 10表示09：00-10：00 11表示10：00-11：00 12表示11：00-12：00 <br/>13表示12：00-13：00 14表示13：00-14：00 15表示14：00-15：00 16表示15：00-16：00 <br> 17表示16：00-17：00 18表示17：00-18：00 19表示18：00-19：00 20表示19：00-20：00 <br>21表示20：00-21：00 22表示21：00-22：00 23表示22：00-23：00 24表示23：00-24：00
                                timeTuesday: Array,         // 服务时间（星期二）可空 默认值：空数组 同上
                                timeWednesday: Array,       // 服务时间（星期三）可空 默认值：空数组 同上
                                timeThursday: Array,        // 服务时间（星期四）可空 默认值：空数组 同上
                                timeFriday: Array,          // 服务时间（星期五）可空 默认值：空数组 同上
                                timeSaturday: Array,        // 服务时间（星期六）可空 默认值：空数组 同上
                                timeSunday: Array,          // 服务时间（星期天）可空 默认值：空数组 同上
                                serviceType: Number,        // 服务方式 可空 默认值：0 其中：1表示在线服务 2表示线下服务
                                servicePrice: Number,       // 服务价格 可空 默认值：0 注意：所有金额计算皆以 分/单位 作为基本单位 
                                serviceUnit: String,        // 服务价格单位 可空 默认值：小时
                                serviceDescription: String, // 服务描述 可空 默认值：空字符串
                                goodAt: String,             // 专业擅长 可空 默认值：空字符串
                                location: {                 // 实时地理坐标 可空 默认值：空数组
                                        type: Array,        // 
                                        index: '2dsphere'   //
                                },
                                locationHome: {             // 居住地理坐标 可空 默认值：空数组
                                        type: Array,        //
                                        index: '2dsphere'   //
                                },
                                onlineTime: Number          // 最近在線時間 可空 默認值：0 單位：毫秒
                        })
                }
        }

        // 存储用户简历信息
        public async saveResume(parameters: any): Promise<boolean> {
                if (String(parameters.openID).length !== 37 || ['FULLTIME', 'PARTTIME'].indexOf(parameters.resumeType) === -1) {
                        return new Promise<boolean>(resolve => resolve(false))
                }

                let id = parameters.openID + '#' + parameters.resumeType
                let document: any = await this.findById(id)
                let member: any = await schemaMember.findById(parameters.openID)

                document._id = document._id || id
                document.openID = document.openID || parameters.openID
                document.resumeType = document.resumeType || parameters.resumeType

                // 设置简历公共内置属性
                document.resumeComplete = parameters.resumeComplete || document.resumeComplete || 0
                document.resumeViews = parameters.resumeViews || document.resumeViews || 0
                document.resumeVMonth = parameters.resumeVMonth || document.resumeVMonth || 0
                document.resumeAt = parameters.resumeAt || document.resumeAt || 0
                document.resumeComment = parameters.resumeComment || document.resumeComment || 0
                document.resumeFollows = parameters.resumeFollows || document.resumeFollows || 0
                document.resumeScore = parameters.resumeScore || document.resumeScore || 0
                document.resumeGrade = parameters.resumeGrade || document.resumeGrade || 0
                document.resumeName = parameters.resumeName || document.resumeName || ''
                document.resumeTop = parameters.resumeTop || document.resumeTop || 0
                document.resumeTBTime = parameters.resumeTBTime || document.resumeTBTime || new Date(0)
                document.resumeTETime = parameters.resumeTETime || document.resumeTETime || new Date(0)
                document.resumeWeight = parameters.resumeWeight || document.resumeWeight || 0
                document.resumeWBTime = parameters.resumeWBTime || document.resumeWBTime || new Date(0)
                document.resumeWETime = parameters.resumeWETime || document.resumeWETime || new Date(0)
                document.resumeUpdate = new Date()

                // 设置简历公共业务属性
                document.realname = parameters.realname || document.realname || ''
                document.sex = document.sex || 0
                if (parameters.sex === 1 || parameters.sex === 2) {
                        document.sex = parameters.sex
                }
                if (parameters.sex === '1' || parameters.sex === '2') {
                        document.sex = parseInt(parameters.sex)
                }

                document.img = parameters.img || document.img || ''
                document.birthdayYear = parameters.birthdayYear || document.birthdayYear || 0
                document.birthdayMonth = parameters.birthdayMonth || document.birthdayMonth || 0
                document.birthdayDay = parameters.birthdayDay || document.birthdayDay || 0
                if (/^\d{4}-\d{2}$/i.test(parameters.birthday) || /^\d{4}-\d{2}-\d{2}$/i.test(parameters.birthday)) {
                        let bufDate = new Date(parameters.birthday)

                        document.birthdayYear = bufDate.getFullYear()
                        document.birthdayMonth = bufDate.getMonth() + 1
                        document.birthdayDay = bufDate.getDate()
                }
                document.localeCountry = parameters.localeCountry || document.localeCountry || ''
                document.localeProvince = parameters.localeProvince || document.localeProvince || ''
                document.localeCity = parameters.localeCity || document.localeCity || ''
                document.localeTown = parameters.localeTown || document.localeTown || ''
                document.address = parameters.address || document.address || ''
                document.mobile = parameters.mobile || document.mobile || ''
                document.mobileArea = parameters.mobileArea || document.mobileArea || '86'
                document.mobileArea = String(document.mobileArea).replace('+', '')
                document.email = parameters.email || document.email || ''
                document.idcardNumber = parameters.idcardNumber || document.idcardNumber || ''
                document.statusIDCard = parameters.statusIDCard || document.statusIDCard || false
                document.picture = parameters.picture || document.picture || []

                if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                        document.location = [parameters.locationX, parameters.locationY]
                }

                if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                        document.locationHome = [parameters.locationHomeX, parameters.locationHomeY]
                }

                // 设置全职简历业务属性
                if (document.resumeType === 'FULLTIME') {
                        document.expectCountry = parameters.expectCountry || document.expectCountry || ''
                        document.expectProvince = parameters.expectProvince || document.expectProvince || ''
                        document.expectCity = parameters.expectCity || document.expectCity || ''
                        document.expectTown = parameters.expectTown || document.expectTown || ''
                        document.expectDirection = parameters.expectDirection || document.expectDirection || ''
                        document.expectWork = parameters.expectWork || document.expectWork || ''
                        document.expectMoney = parameters.expectMoney || document.expectMoney || 0
                        document.expectStatus = parameters.expectStatus || document.expectStatus || 0

                        document.skill = document.skill || []
                        if (parameters.skill instanceof Array) {
                                document.skill = parameters.skill
                        }
                        document.signature = parameters.signature || document.signature || ''

                        document.honor = document.honor || []
                        if (parameters.honor instanceof Array) {
                                document.honor = parameters.honor
                        }

                        // 设置全职简历工作经历及其相关项
                        document.works = document.works || []
                        if (utils.empty(parameters) === false && parameters.works instanceof Array) {
                                document.works = []

                                let maxYear = 0
                                let minYear = 3000

                                for (let buf of parameters.works) {
                                        let item = {
                                                workName: buf.workName || '',
                                                workCompany: buf.workCompany || '',
                                                workBYear: buf.workBYear || 0,
                                                workBMonth: buf.workBMonth || 0,
                                                workFYear: buf.workFYear || 0,
                                                workFMonth: buf.workFMonth || 0,
                                                workMoney: buf.workMoney || 0,
                                                workDescription: buf.workDescription
                                        }

                                        let begins = buf.workBegins || ''
                                        let finish = buf.workFinish || ''

                                        if (/^\d{4}-\d{2}$/.test(begins) || /^\d{4}-\d{2}-\d{2}$/.test(begins)) {
                                                let bufDate = new Date(buf.workBegins)

                                                item.workBYear = bufDate.getFullYear()
                                                item.workBMonth = bufDate.getMonth() + 1
                                        }

                                        if (/^\d{4}-\d{2}$/.test(finish) || /^\d{4}-\d{2}-\d{2}$/.test(finish)) {
                                                let bufDate = new Date(buf.workFinish)

                                                item.workFYear = bufDate.getFullYear()
                                                item.workFMonth = bufDate.getMonth() + 1
                                        }

                                        if (maxYear < item.workFYear) {
                                                maxYear = item.workFYear
                                        }

                                        if (minYear > item.workBYear) {
                                                minYear = item.workBYear
                                        }

                                        document.works.push(item)
                                }

                                document.workYear = maxYear - minYear + 1
                                if (document.workYear < 0) {
                                        document.workYear = 0
                                }
                        }

                        // 设置全职简历教育经历及其相关项
                        document.educations = document.educations || []
                        if (parameters.educations && parameters.educations instanceof Array) {
                                document.educations = []

                                let maxGrade = 0
                                let maxMajor = ''

                                for (let buf of parameters.educations) {
                                        let item = {
                                                educationSchool: buf.educationSchool || '',
                                                educationMajor: buf.educationMajor || '',
                                                educationGrade: buf.educationGrade || 0,
                                                educationBYear: buf.educationBYear || 0,
                                                educationBMonth: buf.educationBMonth || 0,
                                                educationFYear: buf.educationFYear || 0,
                                                educationFMonth: buf.educationFMonth || 0,
                                                educationDescription: buf.educationDescription || ''
                                        }

                                        let begins = buf.educationBegins || ''
                                        let finish = buf.educationFinish || ''

                                        if (/^\d{4}-\d{2}$/.test(begins) || /^\d{4}-\d{2}-\d{2}$/.test(begins)) {
                                                let bufDate = new Date(buf.educationBegins)

                                                item.educationBYear = bufDate.getFullYear()
                                                item.educationBMonth = bufDate.getMonth() + 1
                                        }

                                        if (/^\d{4}-\d{2}/.test(finish) || /^\d{4}-\d{2}-\d{2}$/.test(finish)) {
                                                let bufDate = new Date(buf.educationFinish)

                                                item.educationFYear = bufDate.getFullYear()
                                                item.educationFMonth = bufDate.getMonth() + 1
                                        }

                                        if (maxGrade < item.educationGrade) {
                                                maxGrade = item.educationGrade
                                                maxMajor = item.educationMajor
                                        }

                                        document.educations.push(item)
                                }

                                document.educationGrade = maxGrade
                                document.educationMajor = maxMajor
                        }

                        // 设置全职简历培训经历
                        document.trains = document.trains || []
                        if (parameters.trains && parameters.trains instanceof Array) {
                                document.trains = []

                                for (let buf of parameters.trains) {
                                        let item = {
                                                trainName: buf.trainName || '',
                                                trainJob: buf.trainJob || '',
                                                trainBYear: buf.trainBYear || 0,
                                                trainBMonth: buf.trainBMonth || 0,
                                                trainFYear: buf.trainFYear || 0,
                                                trainFMonth: buf.trainFMonth || 0,
                                                trainDescription: buf.trainDescription || ''
                                        }

                                        let begins = buf.trainBegins || ''
                                        let finish = buf.trainFinish || ''

                                        if (/^\d{4}-\d{2}$/.test(begins) || /^\d{4}-\d{2}-\d{2}$/.test(begins)) {
                                                let bufDate = new Date(buf.trainBegins)

                                                item.trainBYear = bufDate.getFullYear()
                                                item.trainBMonth = bufDate.getMonth() + 1
                                        }

                                        if (/^\d{4}-\d{2}/.test(finish) || /^\d{4}-\d{2}-\d{2}$/.test(finish)) {
                                                let bufDate = new Date(buf.trainFinish)

                                                item.trainFYear = bufDate.getFullYear()
                                                item.trainFMonth = bufDate.getMonth() + 1
                                        }

                                        document.trains.push(item)
                                }
                        }
                }

                // 设置兼职简历业务属性
                if (document.resumeType === 'PARTTIME') {
                        for (let key of ['timeMonday', 'timeTuesday', 'timeWednesday', 'timeThursday', 'timeFriday', 'timeSaturday', 'timeSunday']) {
                                if (utils.empty(document[key])) {
                                        document[key] = []
                                }

                                if (parameters[key] instanceof Array) {
                                        document[key] = parameters[key]
                                }
                        }

                        document.skill = parameters.skill || document.skill || []
                        document.serviceType = parameters.serviceType || document.serviceType || 0
                        document.servicePrice = parameters.servicePrice || document.servicePrice || 0
                        document.serviceUnit = parameters.serviceUnit || document.serviceUnit || '小时'
                        document.serviceDescription = parameters.serviceDescription || document.serviceDescription || ''
                        document.goodAt = parameters.goodAt || document.goodAt || ''
                }

                // 计算简历完整程度
                let resumeComplete = 0
                let resumeFields = {
                        FULLTIME: [
                                'realname', 'sex', 'img', 'birthdayYear', 'localeProvince', 'address', 'mobile', 'idcardNumber',
                                'expectProvince', 'expectDirection', 'expectWork', 'expectMoney', 'expectStatus',
                                'skill', 'signature', 'honor', 'works', 'educations', 'trains'
                        ],
                        PARTTIME: [
                                'realname', 'sex', 'img', 'birthdayYear', 'localeProvince', 'address', 'mobile', 'idcardNumber',
                                'timeMonday', 'timeTuesday', 'timeWednesday', 'timeThursday', 'timeFriday', 'timeSaturday', 'timeSunday',
                                'skill', 'serviceType', 'servicePrice', 'serviceUnit', 'serviceDescription', 'goodAt'
                        ]
                }
                for (let key of resumeFields[parameters.resumeType]) {
                        if (utils.empty(document[key]) === false) {
                                resumeComplete = resumeComplete + 1
                        }
                }
                document.resumeComplete = Math.ceil((resumeComplete * 100) / resumeFields[parameters.resumeType].length)

                // 设置简历公开隐藏状态
                if (typeof (parameters.resumeHidden) === 'undefined') {
                        document.resumeHidden = document.resumeComplete >= 60 ? false : true
                } else if (typeof (parameters.resumeHidden) === 'boolean') {
                        document.resumeHidden = parameters.resumeHidden
                }

                // 设置简历信息、用户相关信息及关键词统计
                schemaMember.updateByResume(parameters, member)
                schemaKeywords.signSkills(document.skill)

                return this.save(document)
        }

        // 存储实时定位坐标
        public async saveLocation(openID: string, locationX: number, locationY: number) {
                await this.saveResume({ openID, resumeType: 'FULLTIME', locationX, locationY, resumeHidden: 0 })
                await this.saveResume({ openID, resumeType: 'PARTTIME', locationX, locationY, resumeHidden: 0 })
        }

        // 获取给定用户的全职简历信息
        public async findFulltime(openID: string): Promise<any> {
                return this.findById(`${openID}#FULLTIME`)
        }

        // 获取给定用户的兼职简历信息
        public async findParttime(openID: string): Promise<any> {
                return this.findById(`${openID}#PARTTIME`)
        }

        // 判断给定用户是否有权限查看给定简历的联系方法
        public async checkSafe(openID: string, resumeID: string, resumeType: string): Promise<any> {
                let order = await schemaOrder.findOne({
                        where: {
                                openID: openID,
                                orderUser: resumeID,
                                orderType: 2,
                                orderStatus: 1,
                                orderComment: resumeType
                        }
                })

                if (Object.keys(order).length === 0) {
                        return new Promise<any>(resolve => resolve(false))
                }

                let timeCurr = new Date().getTime()
                let timeLate = new Date(order.orderSubmit).getTime()

                if (timeCurr - timeLate < maxSafeTimespan) {
                        return new Promise<any>(resolve => resolve(order))
                }

                return new Promise<any>(resolve => resolve(false))
        }

        // 简历列表数据项格式化
        public formatResumes(documents: any[], parameters: any = {}): any[] {
                return utils.forEach(documents, item => {
                        let document: any = {
                                openID: utils.openIDEncode(item.openID),
                                resumeType: item.resumeType,
                                img: item.img || '',
                                sex: item.sex || 0,
                                username: item.username || '',
                                realname: item.realname || '',
                                mobileArea: item.mobileArea || '86',
                                mobile: utils.formatMobile(item.mobile || ''),
                                localeCountry: item.localeCountry || '',
                                localeProvince: item.localeProvince || '',
                                localeCity: item.localeCity || '',
                                localeTown: item.localeTown || '',
                                expectCountry: item.expectCountry || '',
                                expectProvince: item.expectProvince || '',
                                expectCity: item.expectCity || '',
                                expectTown: item.expectTown || '',
                                expectWork: item.expectWork || '',
                                expectMoney: item.expectMoney || 0,
                                skill: item.skill || [],
                                servicePrice: item.servicePrice || 0,
                                serviceUnit: item.serviceUnit || '小时',
                                signature: item.signature || '',
                                workYear: item.workYear || 0,
                                goodAt: item.goodAt || '',
                                locationX: (item.location || [])[0] || 0,
                                locationY: (item.location || [])[1] || 0,
                                distance: 100000001,
                                resumeAt: item.resumeAt || 0,
                                onlineStatus: utils.timeInterval(item.onlineTime || 0) < this.onlineTimeinterval
                        }

                        if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                                /*if (item.resumeType === 'FULLTIME') {
                                        if (item.locationHome instanceof Array && item.locationHome.length === 2) {
                                                document.distance = utils.gcDistance(
                                                        (item.locationHome || [])[0] || 0,
                                                        (item.locationHome || [])[1] || 0,
                                                        parameters.locationX,
                                                        parameters.locationY
                                                )
                                        } else if (item.location instanceof Array && item.location.length === 2) {
                                                document.distance = utils.gcDistance(
                                                        (item.location || [])[0] || 0,
                                                        (item.location || [])[1] || 0,
                                                        parameters.locationX,
                                                        parameters.locationY
                                                )
                                        }
                                } else if (item.resumeType === 'PARTTIME') {
                                        if (item.location instanceof Array && item.location.length === 2) {
                                                document.distance = utils.gcDistance(
                                                        (item.location || [])[0] || 0,
                                                        (item.location || [])[1] || 0,
                                                        parameters.locationX,
                                                        parameters.locationY
                                                )
                                        } else if (item.locationHome instanceof Array && item.locationHome.length === 2) {
                                                document.distance = utils.gcDistance(
                                                        (item.locationHome || [])[0] || 0,
                                                        (item.locationHome || [])[1] || 0,
                                                        parameters.locationX,
                                                        parameters.locationY
                                                )
                                        }
                                }*/
                                document.distance = utils.gcDistance(
                                        (item.location || [])[0] || 0,
                                        (item.location || [])[1] || 0,
                                        parameters.locationX,
                                        parameters.locationY
                                )
                        }

                        if (parameters.fields instanceof Array) {
                                for (let field of parameters.fields) {
                                        document[field] = item[field]
                                }
                        }

                        return document
                })
        }

        // 全职简历数据项选择性格式化
        public formatFulltime(document: any, step: string, orderInfo: any = null): any {
                if (utils.empty(document) === false) {
                        document.openID = utils.openIDEncode(document.openID)
                        document.unsafe = false

                        if (orderInfo) {
                                document.infoType = orderInfo.orderMoney === schemaOrder.itvPrice
                                        ? 'VEDIO'
                                        : 'MOBILE'
                        }

                        const c1st = [
                                'openID', 'infoType', 'realname', 'sex', 'img', 'picture', 'unsafe', 'resumeAt',
                                'birthday', 'birthdayYear', 'birthdayMonth', 'birthdayDay',
                                'localeCountry', 'localeProvince', 'localeCity', 'localeTown', 'locationHome',
                                'address', 'mobile', 'mobileArea', 'email', 'idcardNumber', 'statusIDCard', 'onlineStatus'
                        ]
                        const c2nd = [
                                'openID', 'works', 'educations', 'trains', 'skill', 'honor', 'signature', 'expectWork', 'workYear',
                                'expectStatus', 'expectMoney', 'expectDirection', 'expectCountry', 'expectProvince', 'expectCity', 'expectTown'
                        ]
                        switch (step) {
                                case 'ALL':
                                        return utils.atKeys(document, [...c1st, ...c2nd])

                                case 'SAFE':
                                        return utils.atKeys(document, [...c1st, ...c2nd])

                                case 'FIRST':
                                        return utils.atKeys(document, c1st)

                                case 'SECOND':
                                        return utils.atKeys(document, c2nd)

                                case 'UNSAFE':
                                        document.unsafe = true
                                        document.mobile = utils.formatMobile(document.mobile)
                                        document.email = ''
                                        return utils.atKeys(document, [...c1st, ...c2nd])
                        }
                }

                return {}
        }

        // 兼职简历数据项选择性格式化
        public formatParttime(document: any, step: string, orderInfo: any = null): any {
                if (utils.empty(document) === false) {
                        document.openID = utils.openIDEncode(document.openID)
                        document.unsafe = false

                        if (orderInfo) {
                                document.infoType = orderInfo.orderMoney === schemaOrder.itvPrice
                                        ? 'VEDIO'
                                        : 'MOBILE'
                        }

                        const c1st = [
                                'openID', 'infoType', 'realname', 'sex', 'img', 'picture', 'unsafe', 'resumeAt',
                                'birthday', 'birthdayYear', 'birthdayMonth', 'birthdayDay',
                                'localeCountry', 'localeProvince', 'localeCity', 'localeTown', 'locationHome',
                                'address', 'mobile', 'mobileArea', 'email', 'idcardNumber', 'statusIDCard', 'onlineStatus'
                        ]
                        const c2nd = [
                                'openID', 'skill', 'serviceType', 'servicePrice', 'serviceUnit', 'goodAt', 'serviceDescription', 'unsafe',
                                'timeMonday', 'timeTuesday', 'timeWednesday', 'timeThursday', 'timeFriday', 'timeSaturday', 'timeSunday'
                        ]

                        switch (step) {
                                case 'ALL':
                                        return utils.atKeys(document, [...c1st, ...c2nd])

                                case 'SAFE':
                                        return utils.atKeys(document, [...c1st, ...c2nd])

                                case 'FIRST':
                                        return utils.atKeys(document, c1st)

                                case 'SECOND':
                                        return utils.atKeys(document, c2nd)

                                case 'UNSAFE':
                                        document.unsafe = true
                                        document.mobile = utils.formatMobile(document.mobile)
                                        document.email = ''
                                        return utils.atKeys(document, [...c1st, ...c2nd])
                        }
                }

                return {}
        }

        // 更新最近在線時間
        public updateOnline(openID: string): Promise<number> {
                return this.update({ openID: openID }, { onlineTime: utils.time() })
        }

        // 實時獲取用戶在線狀態
        public async onlineStatusRealtime(openID: string): Promise<boolean> {
                let online = await vedio.onlineMember(openID)

                if (utils.empty(online)) {
                        await this.update({ openID: openID }, { onlineTime: 0 })
                }

                return new Promise<boolean>(resolve => resolve(online))
        }

}
export default new schemaResume()