#1.The Product

### Mobile Only

只为移动Web APP开发服务，去除一切多余.


### Mobile First

Amaze UI believes in Mobile First. Beginning with mobile phone screens, Amaze UI is extending the adaption to larger screens such as tablet and PC.



### 流畅的体验

页面切换无需等到，立点立达.  
简单实现动画效果.



### 基于iOS的架构思路

更适合移动开发.


### 开发迅速

模仿iOS，支持原型，前后端完全分类，UI、前端分离.


#2.Specifications  

* [BLView](https://github.com/Colormark/Bricklayer/blob/master/BLView.md "Document") 
* [BLLayout](https://github.com/Colormark/Bricklayer/blob/master/BLLayout.md "Document")  
* [BLGadget](https://github.com/Colormark/Bricklayer/blob/master/BLGadget.md "Document")
* [BLModel](https://github.com/Colormark/Bricklayer/blob/master/BLModel.md "Document")  
* [BLData](https://github.com/Colormark/Bricklayer/blob/master/BLData.md "Document")  
* [BLAnimation](https://github.com/Colormark/Bricklayer/blob/master/BLAnimation.md "Document")    
	
#3.Install
##3.1引用

* 按bricklayer推荐的的HTML文档结构模型初始化HTML文件. 参考
* 引用jQuery文件
* 引用bricklayer.js或bricklayer.min.js
* 引用bricklayer.css或bricklayer.min.css

##3.1服务端配置

所有的API返回数据，必须配置datasourceMeta，datasourceMeta name在客户端的BLConfig中配置

名称  | 描述
------------- | -------------
data_object_name                     | 数据对象名 ，default "data"
loop_array_name                      | 循环数组名  ，BLTableView only
loop_array_primary_key_field_name    | 循环数组主键名（每个数据必须唯一），LTableView only
  

##3.2.前端配置

设置Javascript对象BLConfig用于配置  

名称  | 描述
------------- | -------------
developmentMode       | 开发中模式，默认否
datasourceMetaName    | 结构描述对象名，对应API Respone 的JSON对象
apiUrl                | 接口地址，可以是相对地址
apiName               | 接口名
pagination            | 默认分页配置
parseAJAXErrorCode    | 函数类型. 传入ajax error code，用于同一处理
imgX                  | 函数类型. 传入图片和图片展示需要的宽度，在此处理新地址的拼接


例如
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

