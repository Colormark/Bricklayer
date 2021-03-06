
#3.视图控件BLView

##3.1.BLTableView
###3.1.1.Summary

列表型数据视图，主节点。节点名为“bltableview” 或节点class含“bl-tableview”会被自动初始化为 BLTableView


###3.1.2.Protocols & Propertys

Attribute Name    | Necessary | Sumary  | Default
------------- | ------------- | ------------- | -------------
bl-tableview-datasource | 否 |协议。数据来源，Api name | 无
bl-tableview-delegate   | 否 |协议。代理，tableview 和 tablecellview 的事件管理 | 无
bl-tableview-localstore | 否 |是否缓存数据到本地数据库 |false
bl-tableview-pagelength | 否 |每页显示数量  | 10
bl-tableview-startpage  | 否 |起始页页码 | 1
bl-tableview-autorefreshdata | 否 | 自动刷新数据，值为秒 | 否（0）
***new***     bl-tableview-groupby    | 否 | 按参数值分组    | 无
***new***     bl-tableview-showloadmore    | 否 | 布尔，是否显示loadmore    | true

###3.1.3.Delegate  

Method  | Sumary | Parameter 
------------- | ------------- | -------------
  config               | 配置  | 无
  setQueryPrams        | 在API请求前，设置请求参数 |  暂不可用
  farmatDataFields     | 在获取到数据后，格式化数据 | Item Data数据, DOM子项(jQuery DOM)
  cellOnTap            | 当点击一个cellview | DOM子项(jQuery DOM)
  cellOnHold           | 当长按一个cellview | DOM子项(jQuery DOM)DOM子项(jQuery DOM)DOM子项(jQuery DOM)
  cellOnSwipeLeft      | 当向左划一个cellview | DOM子项(jQuery DOM)DOM子项(jQuery DOM)
  cellOnSwipeRight     | 当向右划一个cellview |  DOM子项(jQuery DOM)


###3.1.4.列表子项BLTableCellView
####3.1.4.1.初始化
####3.1.4.2.属性
####3.1.4.3.方法

###3.1.5. 加载更多bl-tableview-loadmore  
####3.1.5.1.初始化

列表型数据视图，主节点。节点名为“bltableview” 或节点class含“bl-tableview”会被自动初始化为 BLTableView
Parent node "bl-tableview" 

###3.1.6. BLTablecellview
###3.1.6.1. Summary  
 Item in tableview, Auto create from datasource. 
 __bl-tablecellview-prototype__       	
Prototype of tablecellview.
  
==>Attributes:<br>
  **bl-identifier** . You can set >1 prototypes with deffrent identifier and select prototype in delegate.

###3.1.6.2.Prototype 如何工作?

**Before render**
>bl-tableview
>>bl-tableview-loop
>>>bl-tableview-cellview-prototype
>>bl-tableview-loadmore(optional)

**After render**
>bl-tableview
>>bl-tableview-cellview-prototype(hidden)
>>bl-tableview-loop
>>>bl-tableview-cellview
>>bl-tableview-loadmore(auto create)



##3.3.网格BLGridView
###3.3.1.初始化
###3.3.2.属性
###3.3.3.方法
###3.3.4.[子项]网格项BLGridCellView
###3.3.4.1.初始化
###3.3.4.2.属性
###3.3.4.3.方法



##3.5.标签栏BLTabbarView
###3.5.1.初始化

节点名为“tabbar” 或节点class含“bl-tabbar”会被自动初始化为 BLTabbarView  

  例如：  
```html
<tabbar bl-view-name="tabbar"></tabbar>  
```
  或例如：<br>

```html
<div class="bl-tabbar" bl-view-name="tabbar"></div>  
```

###3.5.2.属性

属性名    | 是否必须    | 描述     |默认
------------- | ------------- | ------------- | -------------
bl-view-name | 是 | 唯一识别名 | 无
bl-tabbar-selected-class  | 否 |  激活的item的class | 无
bl-tabbar-range-class   | 否 | 显示相关场景时显示的class | 无
bl-tabbar-outrange-class   | 否 |  非激活item的class | 无
bl-tabbar-selected-img-tinycolor  | 否 |  激活的item的图片着色 | 无
bl-tabbar-range--img-tinycolor   | 否 | 显示相关场景时图片着色 | 无
bl-tabbar-outrange--img-tinycolor   | 否 |  非激活item的图片着色 | 无

###3.5.3.方法

```javascript
$.BLTabbarView.show ("effect name"); 
```
  
```javascript
$.BLTabbarView.hide ("effect name"); 
```


##3.6.标签栏子项BLTabbarItemView
###3.6.1.初始化

 BLTabbarView的项节点，框架会自动根据子项的数量均分宽度  
  注意：第一版只支持一个TabbarView

###3.6.2.属性

属性名    | 是否必须    | 描述     |默认
------------- | ------------- | ------------- | -------------
bl-tabbaritem-selected-array  | 是 |  那些场景激活bl-tabbar-selected-class，多个用“\|”隔开 |无 
bl-tabbaritem-range-array  | 是 |  那些场景激活bl-tabbar-range-class，多个用“\|”隔开 |无 

###3.6.3.方法
##3.7.导航条BLNavgationView
###3.7.1.初始化

  节点名为“nav” 或节点class含“bl-nav”会被自动初始化为 BLNavgationView  
  sence切换时自动应用堆栈。  

  例如：  
```html
<nav bl-view-name="nav name"></nav>  
```
  或例如：<br>

```html
<div class="bl-nav" bl-view-name="nav name"></div>  
```


###3.7.2.属性

属性名    | 是否必须    | 描述     |默认
------------- | ------------- | ------------- | -------------
bl-view-name | 否 | 唯一识别名 | 无

###3.7.3.方法
##3.8.导航条子项BLNavgationItemView
###3.8.1.初始化

注意：目前只支持三个子项，且必须有三个，可以内容为空。  
第一个和第三个会被固定宽度，而第二个自适应宽度。

1. **navitem**
  navitem为nav子项，内容需自定义  

2. **back 后退**
  back继承自navitem  
  节点名为“back” 或节点class含“bl-back”会被自动初始化后退按钮  
  当无后退堆栈内容,将回到主界面

  例如：  
```html
<back> < back </back>  
```

3. **home 回到主界面（第一次被加载的页面）**
  homr继承自navitem  
  节点名为“home” 或节点class含“bl-home”会被自动初始化home按钮  

例如：  
```html
<home> home </home> 
```

4.**navtitle 标题**
  navtitle继承自navitem  
  节点名为“navtitle” 或节点class含“bl-navtitle”会被自动初始化标题栏  
  navtitle除了应用title的样式，并无其他特殊

  例如：  
```html
<navtitle> Welcome </navtitle> 
```
 

###3.8.2.属性
###3.8.3.方法

##3.9.详细视图BLDetailView

###初始化


###属性

*bl-detailview-datasource<br>
*bl-detailview-delegate<br>
-Auto enable FieldView

####代理方法Delegate method###
方法  | 描述
------------- | -------------
  config               | 配置
  farmatDataFields     | 在获取到数据后，格式化数据

<h3>样例</h3>  
```javascript
 $.BLDetailviewDelegate("article.detail","farmatDataFields",function(data){
	data["article_title"]="New:"+data["article_title"];
	console.dir(data);
	return data;
});
```

<h3>另外一种写法</h3> 
```javascript
  $.BLDetailviewDelegate("article.detail",{
	"farmatDataFields":function(data){
		console.dir(data);
		return data;
	}
});
```

##3.10.表单BLFormView
  自动表单处理及提交
###初始化
  节点名为“blform” 或节点class含“bl-form”会被自动初始化为 BLFormView 

###属性
*bl-form-datasource

*bl-form-submit-success

```html
<form .. bl-form-submit-success="{'title':'','desc':''}" ..>
```

*bl-form-field                             :field name for submit(input select ...)
*bl-form-textfield                         :field name for submit(div span ...)

*bl-form-field-validate <br>				           
form字段验证，支持：email、phone、password、password-repeat<br>

*bl-form-field-validate-regexp 		   :正则验证<br>
*bl-form-submit                            :submit button<br>
*bl-form-delegate


###代理方法Delegate method
方法  | 描述
------------- | -------------
  config               | 配置
   setQueryPrams        | 在API请求前，设置请求参数 |  暂不可用
  validateBeforeSubmit        | 暂不可用 （formView,submitBtn）。在API请求前，校验form参数，注意如需停止提交请返回false
  afterSubmit          | （reponseData,formView）。请求完成，获取返回数据
  

##3.11.FilterView
*bl-filterview<br>
*bl-filterview<br>

##3.12.FieldView
*bl-field="fieldname"											                      	:Fill with text<br>
*%{bl-field:'fieldname'}%										                    	:Replace with (暂时停用)<br>
*bl-field-attr="{'attr_name':'attrname','attr_field':'fieldname'}"	    	:Attributes<br>
*bl-field-style="{'style_name':'stylename','style_field':'fieldname'}"  	:Styles<br>
  
*bl-field-htmldecode             :True or NULL. Decode html<br>

##3.13.ImageView(Image Responsive)
*bl-imageview 														:Classname:"bl-imageview" or Nodename:"imageview"<br>
-Set url filter in BLConfig<br>
  ==>Attributes:<br>
  *bl-imageview-fix-width											:True or false<br>
  *bl-imageview-fix-height											:True or false<br>
  *bl-imageview-tapshowbig											:True or false<br>
