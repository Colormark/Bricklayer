#The Product

### Mobile Only

只为Mobile Web APP开发服务，移除一切多余.


### Streamlined user experience

Native APP 级的操作体验， 场景切换无需等待，立点立达.  
完美支持内容进场动画效果和场景过渡效果.


### Developed rapidly

前后端开发分离，HTML开发和Javascript开发分离.  
支持展示原型，可将数据按原型自动格式化.  


### Security & Robust 

模仿iOS架构及开发思维，更适合移动开发.  
代码严谨，定制便捷.  



#Specifications  

1. Components
1.1. [BLView 视图](https://github.com/Colormark/Bricklayer/wiki/BLView)
1.1.1. 命名规则
1.1.2. 样式增强

1.2. [Layout 布局](https://github.com/Colormark/Bricklayer/wiki/BLLayout)
1.2.1. BLSenceView
1.2.2. BLSectionView
1.2.3. BLFlexView
1.2.4. BLScrollView

1.3. [Widgets Web组件](https://github.com/Colormark/Bricklayer/wiki/BLGadget)
1.3.1. BLTableView
1.3.2. BLGridView
1.3.3. BLDetailView
1.3.4. BLFormView
1.3.5. BLFilterView
1.3.6. BLTabbarView
1.3.7. BLNavgationView

1.4. [Model 模态窗口](https://github.com/Colormark/Bricklayer/wiki/BLModel)
1.4.1. BLAlertView
1.4.2. BLPrometView
1.4.3. BLConfirmView
1.4.4. BLHueView

1.5. [Media 媒体](https://github.com/Colormark/Bricklayer/wiki/BLMedia)
1.5.1. BLImageView
1.5.2. BLVideoView

1.6. [BLData 数据](https://github.com/Colormark/Bricklayer/wiki/BLData)
1.6.1. 客户端及服务端配置
1.6.2. 参数传递
1.6.3. 本地数据存储

1.7. [BLAnimation 动画](https://github.com/Colormark/Bricklayer/wiki/BLAnimation)
1.7.1. 场景过渡动画
1.7.2. DOM进场动画
1.7.3. 支持的动画附录

2. Plugin
2.1. 自适应图像
2.2. 手势识别
2.2. Canvas精灵
	
#Install

## Require

* 按bricklayer推荐的的HTML文档结构模型初始化HTML文件. 参考
* 引用jQuery文件
* 引用bricklayer.js或bricklayer.min.js
* 引用bricklayer.css或bricklayer.min.css

## Metadata description in respone data 

所有的API返回数据，必须配置datasourceMeta，datasourceMeta name在客户端的BLConfig中配置

名称  | 描述
------------- | -------------
data_object_name                     | 数据对象名 ，default "data"
loop_array_name                      | 循环数组名  ，BLTableView only
loop_array_primary_key_field_name    | 循环数组主键名（每个数据必须唯一），LTableView only
  

## Site config  

在任意js文件中配置Javascript BLConfig对象.

名称  | 描述
------------- | -------------
developmentMode       | 开发中模式，默认否
datasourceMetaName    | 结构描述对象名，对应API Respone 的JSON对象
apiUrl                | 接口地址，可以是相对地址
apiName               | 接口名
pagination            | 默认分页配置
parseAJAXErrorCode    | 函数类型. 传入ajax error code，用于同一处理
imgX                  | 函数类型. 传入图片和图片展示需要的宽度，在此处理新地址的拼接

-----------------------------
e.g.
```javascript
var BLConfig={
		"developmentMode":true,
		"apiUrl":"api.php",
		"apiName":"apiname",
		"datasourceMetaName":"fields_desc",

		"imgX":function(src,width){
			src=src+"?&w="+width;
			return src;
		},

		"parseAJAXErrorCode":function(data){
			//在这里配置所有的错误跳转页面
			var code = data["error"]["code"];
			if(code == 401){
				$.BLShowSence("login");
				return false;
			}else{
				return true;
			}
		},

		"pagination":{
			"currentPageName":"page",
			"pageLengthName":"page_size",
			"pageLengthDefault":10,
			"startPageDefault":1
		}
	};

```

#Bug feedback & Requests

### Bug feedback

You are welcome to [submit bug report]https://github.com/Colormark/Bricklayer/issues) to Our team.

To explain your problems clearly, we suggest that you provide a demonstration when you give us feedback.

### Submit Request

User can submit your requests through Issue system or leave us message on our official website. Any request that match our product concepts will be considered.


## Code Contribution

You are welcome to join our debugging team! You are also very welcome to share the Web components you explored by “Fork” this item and submit request afterwards.

# Referenced & Used Open-source Projects
License](https://github.com/Semantic-Org/Semantic-UI/blob/master/LICENSE.md))
* [FastClick](https://github.com/ftlabs/fastclick) ([MIT
License](https://github.com/ftlabs/fastclick/blob/master/LICENSE))
* [screenfull.js](https://github.com/sindresorhus/screenfull.js) ([MIT
License](https://github.com/sindresorhus/screenfull.js/blob/gh-pages/license))

There might be some missing and we will keep updating.

### Developed with Open Source Licensed [WebStorm](http://www.jetbrains.com/webstorm/)

<a href="http://www.jetbrains.com/webstorm/" target="_blank">
<img src="http://ww1.sinaimg.cn/large/005yyi5Jjw1elpp6svs2eg30k004i3ye.gif" width="240" />
</a>

