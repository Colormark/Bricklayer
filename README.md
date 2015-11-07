Bricklayer
===================

#Featrues

	*浏览速度快，页面切换无需等到   
	*自动将服务端的数据展现在前端   
	*支持列表原型，数据按原型展示  
	*支持前进后退  
	*支持模块化载入页面  
	*快速实现动画效果  
	*自动根据图片在设备上显示的尺寸请求图片  


#Table of contents  

###[BLView](https://github.com/Colormark/Bricklayer/blob/master/BLView.md "Document") 
###[BLLayout](https://github.com/Colormark/Bricklayer/blob/master/BLLayout.md "Document")  
###[BLGadget](https://github.com/Colormark/Bricklayer/blob/master/BLGadget.md "Document")
###[BLModel](https://github.com/Colormark/Bricklayer/blob/master/BLModel.md "Document")  
###[BLData](https://github.com/Colormark/Bricklayer/blob/master/BLData.md "Document")  
###[BLAnimation](https://github.com/Colormark/Bricklayer/blob/master/BLAnimation.md "Document")    
	
#Install

#Plan







#4.数据与接口API
##4.1.参数传递
##4.2.服务端配置

###4.2.1

datasourceMetaName配置，其名称在客户端的BLConfig对象中配置

名称  | 描述
------------- | -------------
  data_object_name                | 数据对象名 ，default "data"
  loop_array_name        | 循环数组名  ，BLTableView only
  loop_array_primary_key_field_name    | 循环数组主键名（每个数据必须唯一），LTableView only
  

##4.3.客户端配置

在BLConfig对象中配置  

名称  | 描述
------------- | -------------
  apiUrl                | 接口地址
  datasourceName        | 接口名
  datasourceMetaName    | 数据返回中，数据结构描述的key名



#临时

*bl-view-radius 						:True or false<br>
*bl-view-circle 						:px or percent<br>
*bl-view-shadow 						:"small|normal|big color" <br>
*bl-view-3dshadow 					:"color"<br><br>

*bl-show-sence                  		:Show target sence when cellview taped.<br>
*bl-show-section                		:Show target section when cellview taped.<br>


#配置  
```javascript
var BLConfig={
		"developmentMode":true,
		"showPrototypeCellView":false,
		"apiUrl":"api.php",
		"apiName":"apiname",
		"datasourceMetaName":"fields_desc",

		"imgX":function(src,width){
			src=src+"?&w="+width;
			return src;
		},
		
		"pagination":{
			"currentPageName":"page",
			"pageLengthName":"page_name",
			"pageLengthDefault":10,
			"startPageDefault":1
		}
	};

```

