# shrsServer
四海日盛官网数据库设计

## 网站数据分析
  根据网站导航，暂分为八个部分
+ 首页：内容 // (待定)
+ 内容列表[list Card]：[{card:'', item:[{url:'', name:''}]}]  // (添加的意义不大，优先级靠后)
+ 走进四海：公司介绍: article + img; 荣誉证书: img; // (此项包含一篇介绍文章与若干荣誉证书文章)
+ 服务项目：图文列表：img + title + introduce; 子页面：article;
+ 施工案例：图片列表：img; 子页面：article;
+ 团队风采：图片列表：img;
+ 新闻中心：文章列表：date + title + introduce; 子页面：article;
+ 联系我们：{字段信息}

## 数据类型分析
  绝大部分为：图片静态资源链接、介绍性说明文字、文章
### 静态图片资源链接


### 文字介绍及文章


## 接口分析
### 前端
  前端页面基本全部为数据展示页面，只需`查询`数据库数据即可；

### 后台
  后台页面需要对`数据库数据`实现基本`增删改查`.
  结合实际业务量 可以 对 相似功能接口进行合并
  
  接口/数据库 两种分法：

  1.按业务类型分
    各业务类型 单独实现`增删改查`功能

  2.数据类型分
    文章、图片

## 源码分析
### request/response
  因封装代理关系，调用原生接口，须加 `native` 字段。
  ````
  export default class response {
    constructor(public native: express.Response) { }

    // 服务器端 URI 跳转
    public redirect(uri: string) {
      this.native.redirect(uri, 301)
    }
  }

  export default class request {
    constructor(public native: express.Request) { }

    // 返回给定名称的 GET 请求参数
    public GET(name?: string, def?: any): any {
      if (this.native.query) {
        if (!name) {
          return this.native.query
        }

        return this.native.query[name] || def
      }

      return null
    }
  }
  ````  
