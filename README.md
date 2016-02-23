Tuku - 图酷
-----------

![headImg] [1]

Tuku是一个定位于个人自用的小型图床程序。采用七牛作为储存空间，不占用服务器储存空间。

需求
----
* Node.js运行环境 （>= v4.3.1)
* Mongodb 运行环境
* 七牛账户（[官网] [2]）



安装
----
1. 克隆本仓库到本地
2. 执行 `npm install`
3. 编辑 `conf.sample.json` 并重命名为`conf.json`

conf.json 配置指南
------------------
配置文件内容如下：
```javascript
{
	"qiniu":{
		"accessKey" : "",       //你的七牛access_key
		"secretKey" : "",       //你的七牛secret_key
		"bucketName" : "",      //你的七牛Bucket（空间）名称
		"httpsAddress" : "",    //七牛绑定的https地址。如没有，请填写绑定的http地址！！
		"httpAddress":"",       //七牛绑定的http地址。
		"thumbnail":"!h500"     //缩略图标示符，详情请见：http://developer.qiniu.com/docs/v6/api/overview/fop/fop/fop.html
	},
	"siteMeta":{
		"title":"",             //站点标题
		"keyWords":"",          //站点关键词
		"description":"",       //站点描述
		"icon":"",              //站点图标
		"siteAddress" : "",     //站点地址。将用于接受七牛回调，请填写一个公网可以访问的地址！！
		"thumbnailReferer":[""] //使用缩略图的地址，来源为该数组中地址的请求都会加上缩略图标示符。
	},
	"db":{
		"host":"",              //Mongodb服务器地址 格式为：host:port
		"dbName":"",            //数据库名称
		"userName":"",          //数据库用户名
		"passwd":""             //数据库密码
	}
}

```




运行
----
* `npm start`
* 可配合`Supervisor`等工具实现后台持久运行








[1]: https://tat.pics/v/1456213694491%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7_2016-02-23_%E4%B8%8B%E5%8D%883.46.38__2_.png
[2]: http://qiniu.com

