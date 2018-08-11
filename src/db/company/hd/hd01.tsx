export default {
        "openID": "0d03b8d90-3c6e-1301-99a3-4fb0e0d70715", // 格式: "0d03b8d90-3c6e-XXXX-99a3-4fb0e0d70715" 其中：XXXX同手机尾数
        "mobile": "18500001301", // 格式："1850000XXYY" 其中：XX表示区号 10表示东城区 11表示西城区 12表示朝阳区 13表示海淀区 14表示昌平区 15表示大兴区 16表示房山区 17表示丰台区 18表示通州区 YY表示区内编号
        "enterpriseName": "北京八维研修学院", // 公司名称
        "enterpriseAttr": "民营", // 公司性质
        "enterpriseLogo": "http://i1.fuimg.com/611341/7609a18199cf4f36.gif", // 公司Logo图片 用公司名称作为图片文件名上传到Public目录
        "enterprisePersons": "1000-9999", // 公司规模 不允许存在空格和汉字
        "enterpriseIndustry": "教育/培训/院校", // 所属行业 不允许存在空格
        "enterpriseHomepage": "http://www.bwie.net", // 公司网站
        "enterpriseAddress": "北京市海淀区上地软件园南路57号北京八维教育", // 详细地址
        "locationHomeX": 116.341343, // 公司坐标X轴39.974631
        "locationHomeY": 39.974631, // 公司坐标Y轴
        "localeCountry": '中国',
        "localeProvince": '北京市',
        "localeCity": '北京市',
        "localeTown": '海定区',
        //公司介绍
        "enterpriseDescription": `
北京八维集团创立于1996年，是集产业、教育、研究及人力资源服务于一体的综合性企业集团。位于中关村上地信息产业园，拥有二十万平方米独立园区。
八维教育是国内新型教育的先行者和开拓者，推出“∏型人才工程计划”，以强大的就业优势，打造中国第一就业品牌。拥有八维研修学院、八维培训中心、八维大学生实训中心等多家教育机构。教育培训领域涉及软件开发、计算机网络、动画艺术、广告艺术、环境艺术、英语及俄语翻译；教育层次包括专本科、研究生学历教育和职业教育。
作为北京地区最大的专业教育基地。八维教育拥有员工超过2000名，每年培养学生超过10000名，就业学生遍布全国。八维教育已经发展成为多层次多领域的综合性"集团军”，资产超十亿元。
`,
        "recruitments": [
                {
                        "workName": "网页设计讲师（海淀）", // 岗位名称
                        "money": 6, // 职位月薪 可空 默认值：0 其中：<br> 1表示1000元/月以下 2表示1000-2000元/月 3表示2000-4000元/月 <br> 4表示4000-6000元/月 5表示6000-8000元/月 6表示8000-10000元/月 <br> 7表示10000元-15000元/月 8表示15000-25000元/月 9表示25000-35000元/月 <br> 10表示35000-50000元/月 11表示50000-100000元/月 12表示100000元/月以上

                        // 福利待遇 可空 默认值：空数组
                        "welfare": [
                                "五险一金",
                                "绩效奖金",
                                "全勤奖",
                                "包住",
                                "餐补",
                                "带薪年假",
                                "节日福利"
                        ],
                        // 岗位描述
                        "description": `
1、熟练应用制作网页的工具Dreamweaver；
2、熟练掌握html语言；
3、熟练应用DIV+CSS排版页面；
4、熟悉js代码。
5、本科以上学历，23岁以上；
6、1-3年工作经验；
7、优秀的应届毕业生可以考虑；
8、有团队合作意识，热爱教育事业，善于沟通者优先。
`
                },
                {
                        "workName": "Java项目经理",
                        "money": 9,
                        "welfare": [
                                "五险一金",
                                "绩效奖金",
                                "餐补",
                                "带薪年假",
                                "节日福利"
                        ],
                        // 岗位描述
                        "description": `
1、进行Java课程的教授；
2、参与课程研发，课程体系完善；
3、参与java等相关软件的开发；
4、参与专业市场调研，课程开发工作。
5、计算机通信，电子等相关专业，有教学经验者优先；
6、专科以上学历，热爱教育事业；
7、3年以上java开发相关工作经验；
8、java语言基础扎实（熟悉网络编程，多线程，I/O）；
9、熟悉web编程技术（JQuery/Bootstrap/Vue一项以上，html，css，js，jsp，servlet）；
10、熟悉面向对象和设计模式，具备Spring/Hibernate/Struts2/MyBatis等开源框架应用经验；
11、熟悉Webservice CXF开发；
12、熟练掌握数据库设计（MySql，Oracle），有SQL调优能力、NoSQL使用经验者优先；
13、有Spring Cloud项目实战经验者优先；
14、熟悉APP后端接口程序的开发(有移动客户端、安卓、ios手机APP接口开发经验)；
15、熟练应用Linux，熟悉微信开发者优先；
16、有分布式后台设计开发经验，负责开发过高负载，高并发的后台分布式服务者优先。                  
`
                },
                {
                        "workName": "教官",
                        "money": 6,
                        "welfare": [
                                "五险一金",
                                "绩效奖金",
                                "全勤奖包",
                                "住餐",
                                "补带薪年",
                                "假节日福利"
                        ],
                        // 岗位描述
                        "description": `
1、24——35周岁，本科以上学历，喜欢教育行业；
2、有良好的语言表达能力及沟通能力；
3、有教育行业辅导员或班主任或助教工作经验优先；
4、负责学生日常管理工作；
5、协助学生入校手续的办理；
6、学生思想教育及与家长沟通工作；
7、学生早晚自习的监督。                                       
`
                },
                {
                        "workName": "C#语言讲师",
                        "money": 6,
                        "welfare": [
                                "五险一金",
                                "绩效奖金",
                                "全勤奖包",
                                "餐补",
                                "补带薪年",
                                "假节日福利"
                        ],
                        // 岗位描述
                        "description": `
1、编写需求分析文档，和相关软件设计文档，如设计文档、测试报告、说明手册等；
2、参与架构设计和编码，能对现有平台性能和构架进行优化和改进；
3、精通C/C++语言，精通使用Linux下C/C++开发及调式环境；
4、熟悉linux多线程，进程/线程间通讯；
5、C语言的教研工作和项目研发。
6、本科及以上学历,计算机相关专业毕业；
7、23岁以上，2年以上工作经验；
8、热爱教育行业。                                                             
`
                },
                {
                        "workName": "数据结构讲师",
                        "money": 6,
                        "welfare": [
                                "五险一金",
                                "绩效奖金",
                                "全勤奖包",
                                "餐补",
                                "补带薪年",
                                "假节日福利"
                        ],
                        // 岗位描述
                        "description": `
1、熟练掌握世面上常用数据库的1•2种数据库软件
2、精通数据结构原理、算法、模型、引擎等相关理论知识。
3、熟悉数据结构中常用的结构（数组、栈、队列、树等）
4、负责数据结构授课和相关文档的编写
5、对数据有一定的分析过滤的理解
6、对数据结构的设计、应用、编写能力有一定研究。
7、具有良好的书面和口头表达能力，善于与人沟通，逻辑思维能力
8、本科及以上学历,计算机相关专业毕业；
9、23岁以上，2年以上工作经验；
10、热爱教育行业。                                                                                 
`
                }

        ]
}