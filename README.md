Bricklayer
===================
**Table of contents**

[TOC]


#1.布局BLLayout
##1.1.场景BLSenceLayout
###1.1.1.初始化
场景相当于独立的网页。  节点名为“sence” 或节点class含“bl-sence”会被自动初始化为 BLSenceView  

例如：  
```html
<sence bl-view-name="home" bl-view-title="My home page"></sence>  
```
或例如：<br>

```html
<div class="bl-sence" bl-view-name="home" bl-view-title="My home page"></div>  
```

###1.1.2.属性
 属性名    | 是否必须    | 描述     |默认
------------- | ------------- | ------------- | -------------
bl-view-name | 是 | 唯一识别名 | 无
bl-view-title | 是 | 标题 | 无
bl-view-defalutload  | 否 |  是否默认载入，“true”为显示 | 默认显示第一个sence        	bl-view-showtabbar   | 否 |  是否显示tabbar（参考tabbar章节），“false”为不显示|默认显示     bl-view-fullscreen   | 否 |  是否全屏显示，“false”为不全屏 | 默认全屏
bl-view-scrollable   | 否 |  是否使用滚动视图，“false”为不使用 | 默认使用

###1.1.3.方法

 方法名    | 描述     | 参数
------------- | ------------- | -------------
$.BLLoadSenceFromRemote|从服务端端下载场景|(url地址,senceName场景名,senceTitle标题,callback回调)
$.BLShowSence | 显示场景 | (view name)


##1.2.片段BLSectionLayout
###1.2.1.初始化
 片段相当于网页中的一部分，必须置于场景（BLSenceView）之中。节点名为“section” 或节点class含“bl-section”会被自动初始化为 BLSectionView 。
 
例如：  
```html
<section bl-view-name="my_profile" bl-view-title="My profile"></section>
```
 
###1.2.2.属性

属性名    | 是否必须    | 描述     |默认
------------- | ------------- | ------------- | -------------
bl-view-name | 是 | 唯一识别名 | 无
bl-view-title | 是 | 标题 | 无
bl-view-defalutload  | 否 |  是否默认载入，“true”为显示 | 默认显示第一个sence        	bl-view-showtabbar   | 否 |  是否显示tabbar（参考tabbar章节），“false”为不显示|默认显示     bl-view-fullscreen   | 否 |  是否全屏显示，“false”为不全屏 | 默认全屏
bl-view-scrollable   | 否 |  是否使用滚动视图，“false”为不使用 | 默认使用

###1.2.3.方法

 方法名    | 描述     | 参数
------------- | ------------- | -------------
$.BLLoadSectionFromRemote|从服务端端下载场景|(url地址,sectionName片段名,senceName目标场景名,callback回调)
$.BLShowSection | 显示片段 | (view name)

##1.3.比例分割BLPercentLayout
###1.3.1.初始化
###1.3.2.属性
###1.3.3.方法

##1.4.滚动ScrollLayout									  

Classname:"bl-scrollview" or Nodename:"scrollview"<br>
*bl-scrollview														:Scroll View<br>
  ==>Attributes:<br>
  *bl-scrollview-showscrollbar										:True or false<br>
  *bl-scrollview-enable-blance										:True or false<br>

#2.模态BLModel

```html
<model-alert bl-view-name="唯一识别名" bl-view-title="类似head.title"></model-alert>
```
  
  属性:<br>
  *bl-model-title                		:Title text(Also can use HTML)<br>
  *bl-model-content			  	      	:Html content<br>
  *bl-model-btns                 		:JSON object string.
  e.g.
```javascript
{
	'ok':'Login',
	'cancal':'Cancel',
	'customs':['Register','Forget password?']
}
```


##2.1.blModelAlert
###2.1.1.初始化
###2.1.2.属性
###2.1.3.方法
##2.2.blModelPromet
###2.2.1.初始化
###2.2.2.属性
###2.2.3.方法
##2.3.blModelConfirm
###2.3.1.初始化
###2.3.2.属性
###2.3.3.方法
##2.4.blModelHue
###2.4.1.初始化
###2.4.2.属性
###2.4.3.方法

#3.视图控件BLView
##3.1.列表BLTableView
###3.1.1.初始化

列表型数据视图，主节点。节点名为“bltableview” 或节点class含“bl-tableview”会被自动初始化为 BLTableView

 1. bl-tablecellview
Item in tableview, Auto create from datasource. 
 2. bl-tablecellview-prototype       	
Prototype of tablecellview.
  
  ==>Attributes:<br>
  **bl-identifier** . You can set >1 prototypes with deffrent identifier and select prototype in delegate.

Prototype 如何工作?

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
  
 3. bl-tableview-loadmore
Auto create by tableview.



###3.1.2.属性

属性名    | 是否必须    | 描述     |默认
------------- | ------------- | ------------- | -------------
bl-tableview-datasource | 否 |Api name | 无
bl-tableview-delegate   | 否 |tableview 和 tablecellview 的事件管理 | 无
bl-tableview-localstore | 否 |是否缓存数据到本地数据库 |false
bl-tableview-pagelength | 否 |每页显示数量  | 10
bl-tableview-startpage  | 否 |起始页页码 | 1
bl-tableview-autorefreshdata | 否 | 自动刷新数据，值为秒 | 否（0）


###3.1.3.代理方法

方法  | 描述
------------- | -------------
  config               | 配置
  setQueryPrams        | 在API请求前，设置请求参数
  farmatDataFields     | 在获取到数据后，格式化数据
  cellOnTap            | 当点击一个cellview
  cellOnHold           | 当长按一个cellview
  cellOnSwipeLeft      | 当向左划一个cellview
  cellOnSwipeRight     | 当向右划一个cellview



##3.2.列表项BLTableCellView
###3.2.1.初始化
###3.2.2.属性
###3.2.3.方法
##3.3.网格BLGridView
###3.3.1.初始化
###3.3.2.属性
###3.3.3.方法
##3.4.网格项BLGridCellView
###3.4.1.初始化
###3.4.2.属性
###3.4.3.方法
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
<back> \< back </back>  
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
*bl-form-submit-success					           :Call faAlert"{'title':'','desc':''}"<br>
*bl-form-submit-success-func   			       :Call function<br>
*bl-form-field                             :field name for submit<br>
*bl-form-field-validate 				           :form字段验证，支持：email、phone、password、password-repeat<br>
*bl-form-field-validate-regexp 			       :正则验证<br>
*bl-form-submit                            :submit button<br>
*bl-form-delegate<br>

###代理方法Delegate method
方法  | 描述
------------- | -------------
  config               | 配置
  setQueryPrams        | 在API请求前，设置请求参数
  afterSubmit          | 请求完成，获取返回数据

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

#4.数据与接口API
##4.1.参数传递
##4.2.服务端配置
##4.3.客户端配置


#5.动画Animations
##5.1.应用

 Attributes:<br>
  *bl-animate-effect 					:Animate name. <br>
  *bl-animate-effect-swing				:Animate name in a string array which split with "|"<br>
  *bl-animate-delay 					:A animate delay show after frameview show<br>
  *bl-animate-delayinterval			:A animate on list item begin time since the pre item animate started.<br>
  *bl-animate-duration                 :"slow , normal(default) , fast , zing"<br>

##5.2.*动画附录

###Attention seekers<br><br>
  flash bounce shake tada swing wobble wiggle pulse

###Flippers<br>
  flip flipInX flipOutX flipInY flipOutY

###Fading entrances<br>
  fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig

###Fading exits<br>
  fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig

###Bouncing entrances<br>
  bounceIn bounceInDown bounceInUp bounceInLeft bounceInRight

###Bouncing exits<br><br>
  bounceOut bounceOutDown bounceOutUp bounceOutLeft bounceOutRight

###EaseIn entrances<br>
  easeInLeft easeInRight

###EaseOut exits<br>
  easeOutLeft easeInRight

###Scaling entrances<br>
  scaleIn scaleInBig

###Scaling exits<br>
  scaleOut scaleOutBig

###Drop<br>
  dropDown dropUp

###Rotating entrances<br>
  rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight

###Rotating exits<br>
  rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight

###Lightspeed<br>
  lightSpeedIn lightSpeedOut

###Specials<br>
  hingeLeft hingeRight rollIn rollOut

#6.Install

#7.临时

*bl-view-radius 						:True or false<br>
*bl-view-circle 						:px or percent<br>
*bl-view-shadow 						:"small|normal|big color" <br>
*bl-view-3dshadow 					:"color"<br><br>

*bl-show-sence                  		:Show target sence when cellview taped.<br>
*bl-show-section                		:Show target section when cellview taped.<br>

