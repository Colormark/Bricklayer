#The Product

### Mobile Only

只为Mobile Web APP开发服务，移除一切多余.
支持iOS、安卓的绝大部分常规机型

### Streamlined user experience

Native APP 级的操作体验， 场景切换无需等待，立点立达.  (using pushState + xhr)  
完美支持内容进场动画效果和场景过渡效果.
每个页面都有一个URL地址，可以被直接打开和分享.

### Developed rapidly

前后端开发分离，HTML开发和Javascript开发分离.  
支持“原型”的开发方式，可将数据按原型自动格式化.  


### Security & Robust 

模仿iOS架构及开发思维，更适合移动开发.  
代码严谨，定制便捷.  

#开发状态及更新 V 0.1.2
1. <h3>修复</h3>
      1.重写了参数传递机制 
      1.增加了list item应对不同点击状况
      1.修补了3D动画在一些设备上页面初始化时产生的bug
      1.健壮了form表单的支持

1. <h3>后续目标</h3>
      1.Sence的滚动条状态支持 
      1.支持Section Url
      1.完善起始页

#Specifications  

1. <h3>Components</h3>
   1. <h4>[BLView 视图](https://github.com/Colormark/Bricklayer/wiki/BLView)</h4>
      1. 命名规则  
      1. 样式增强  
   1. <h4>[Layout 布局](https://github.com/Colormark/Bricklayer/wiki/BLLayout)</h4>
      1. BLSenceView 场景  
      1. BLSectionView 碎片  
      1. [BLFlexView - 伸缩布局](https://github.com/Colormark/Bricklayer/wiki/BLFlexView)  
      1. BLScrollView 滚动  
   1. <h4>[Widgets Web组件](https://github.com/Colormark/Bricklayer/wiki/BLGadget)</h4>
      1. BLTableView 列表/表格  
      1. <del>BLStackView</del> BLCardView 卡片 - Arranges views linearly 继承自TableView [new]
      1. BLWaterFlowView  瀑布式 [new] 别名（CollectionView）
      1. BLGridView 网格  
      1. BLDetailView 详情页  
      1. BLFormView 表单  
      1. BLSearchView 搜索  
      1. BLTabbarView 选项卡  
      1. BLNavgationView 导航  
   1. <h4>[Model 模态窗口](https://github.com/Colormark/Bricklayer/wiki/BLModel)</h4>
      1. BLAlertView  
      1. BLPrometView  
      1. BLConfirmView  
      1. BLHueView  
   1. <h4>[Media 媒体](https://github.com/Colormark/Bricklayer/wiki/BLMedia)</h4>
      1. BLImageView  
      1. BLVideoView  
   1. <h4>[BLData 数据](https://github.com/Colormark/Bricklayer/wiki/BLData)</h4>
      1. 客户端及服务端配置  
      1. 参数传递  
      1. 本地数据存储  
   1. <h4>[BLAnimation 动画](https://github.com/Colormark/Bricklayer/wiki/BLAnimation)</h4>
      1. 场景过渡动画  
      1. DOM进场动画  
      1. 支持的动画附录  
1. <h3>Plugins</h3>
   1. <h4>自适应图像</h4>
   1. <h4>手势识别</h4>
   1. <h4>Canvas精灵</h4>

==========================

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

#Get Start

### 创建一个Sence
e.g.
```html
<sence bl-view-name="demo" bl-view-title="Stack View Demo">

</sence>

```

### 创建一个table View
e.g.
```html
<sence bl-view-name="demo" bl-view-title="Stack View Demo">
	<tableView bl-tableview-datasource="article.list">    //接口名
		<div class="bl-tableview-loop">		      //循环容器
	        	<!-- Prototype cell -->
	        	<div class="bl-tableview-cellview-prototype bl-view-radius-sm"    //创建一个原型
	                        bl-tableview-cellview-cellIdentifier ="@default"	  //设置ID
	        		bl-show-sence="article.detail"                            //点击cell展开的VC
	        		bl-animate-delayinterval="150"                            //动画，依次出现的时间间隔
	        		bl-animate-effect-swing="flipInY|flipInX">                //依次从左和右边出现动画
	        		<div bl-field = "article_title"></div>                    //自动将接口返回的数据中得article_title格式化并展示在这个
	        	</div>
	        	<!-- Prototype end -->
	        </div>
	</tableView>
</sence>
```

### 设置DataDelegate

添加DataDelegate
```html
<tableView bl-tableview-datasource="article.list" bl-tableview-delegate="article.list"> 

```

实现DataDelegate
```javascript
$.BLTableviewDelegate("article.list","farmatDataFields",function(data){
	data["article_title"]=data["article_title"]+"...";
	return data;
});

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

