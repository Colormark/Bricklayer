
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
bl-view-defalutload（弃用）  | 否 |  是否默认载入，“true”为显示 | 默认显示第一个sence
bl-sence-home  | 否 |  设置一个场景为首页 | 默认为第一个sence
bl-view-showtabbar   | 否 |  是否显示tabbar（参考tabbar章节），“false”为不显示|默认显示     bl-view-fullscreen   | 否 |  是否全屏显示，“false”为不全屏 | 默认全屏
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
