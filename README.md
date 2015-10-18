# Bricklayer


#一、布局View （LayoutView）
------
##1）.场景
  场景相当于独立的网页<br>
  <sence bl-view-name="唯一识别名" bl-view-title="类似head.title"><br>
  </sence><br>

  增强属性<br>
  *bl-view-defalutload               	：是否默认载入，，“true”为显示，默认显示第一个sence<br>
  *bl-view-showtabbar                  ：是否显示tabbar（参考tabbar章节），“false”为不显示，默认显示<br>
  *bl-view-fullscreen                  ：是否全屏显示，“false”为不全屏，默认全屏<br>

##2）.章节
  场景相当于网页中的一部分<br><br>
  <section bl-view-name="唯一识别名" bl-view-title="类似head.title"><br>
  </section><br>

  增强属性<br>
  *bl-view-fullscreen                  ：是否全屏显示，“false”为不全屏，默认全屏<br>
  *bl-view-scrollable                  ：是否使用滚动视图，“false”为不使用，默认使用<br>

##3）.从服务端下载sence并应用
  $.BLLoadSenceFromRemote (url,senceName,senceTitle,callback);<br>

#二、视图（BLView,BL*View)
------
##1).模态View (ModelView)
  *bl-model-alert<br>
  *bl-model-promet<br><br>
  *bl-model-confirm<br>
  *bl-model-hue<br>
  <model-alert bl-view-name="唯一识别名" bl-view-title="类似head.title"><br>
  </model-alert><br>
  
  增强属性:<br><br>
  *bl-model-title                		:Title text(Also can use HTML)<br>
  *bl-model-content			  	      	:Html content<br>
  *bl-model-btns                 		:JSON object string.
  e.g.
  ` ``javascript
  {
 		'ok':'Login',
 		'cancal':'Cancel',
 		'customs':['Register','Forget password?']
 	}
 	` ``

##2).TableView 
*Node：bl-tableview                     	:Tableview like viewcontroler.<br>
  ==>Attributes:<br>
  *bl-tableview-datasource        		:Api name.<br>
  *bl-tableview-delegate      		:tableview 和 tablecellview 的事件管理. <br>
  *bl-tableview-localstore        		:是否缓存数据到本地数据库，默认false<br>
 <br>
  *bl-tableview-pagelength        		:List array length. Start with 1.<br>
  *bl-tableview-startpage				    :List array begin index.<br>
  *bl-tableview-autorefreshdata	  	:自动刷新数据<br>
 
 
*Node：bl-tablecellview                 	:Item in tableview, Auto create from datasource. <br>
*Node：bl-tablecellview-prototype       	:Prototype of tablecellview.<br>
  ==>Attributes:<br>
  bl-identifier                  		:You can set >1 prototypes with deffrent identifier and select prototype in delegate.<br>

*Node：bl-tableview-loadmore            	:Auto create by tableview.<br>

  >Before render
  >><bl-tableview>
  >>><bl-tableview-loop>
  >>>><bl-tableview-cellview-prototype>
  >>><bl-tableview-loadmore(optional)>
  <br>
  >After render
  >><bl-tableview><br>
  >>><bl-tableview-cellview-prototype(hidden)><br>
  >>><bl-tableview-loop><br>
  >>>><bl-tableview-cellview><br>
  >>><bl-tableview-loadmore(auto create)><br>
  
  <h2>代理方法Delegate method</h2>
  方法  | 描述
------------- | -------------
  config               | 配置
  setQueryPrams        | 在API请求前，设置请求参数
  farmatDataFields     | 在获取到数据后，格式化数据
  cellOnTap            | 当点击一个cellview
  cellOnHold           | 当长按一个cellview
  cellOnSwipeLeft      | 当向左划一个cellview
  cellOnSwipeRight     | 当向右划一个cellview


##3).DetailView
*bl-detailview-datasource<br>
*bl-detailview-delegate<br>
-Auto enable FieldView<br>

<h2>代理方法Delegate method</h2>
方法  | 描述
------------- | -------------
  config               | 配置
  farmatDataFields     | 在获取到数据后，格式化数据

<h3>样例</h3>  
` ``javascript
 $.BLDetailviewDelegate("article.detail","farmatDataFields",function(data){
	data["article_title"]="New:"+data["article_title"];
	console.dir(data);
	return data;
});
` ``

<h3>另外一种写法</h3> 
` ``javascript
  $.BLDetailviewDelegate("article.detail",{
	"farmatDataFields":function(data){
		console.dir(data);
		return data;
	}
});
` ``

##4).FormView
*bl-form<br>
*bl-form-datasource<br>
*bl-form-submit-success					           :Call faAlert"{'title':'','desc':''}"<br>
*bl-form-submit-success-func   			       :Call function<br>
*bl-form-field                             :field name for submit<br>
*bl-form-field-validate 				           :form字段验证，支持：email、phone、password、password-repeat<br>
*bl-form-field-validate-regexp 			       :正则验证<br>
*bl-form-submit                            :submit button<br>
*bl-form-delegate<br>

<h2>代理方法Delegate method</h2>
方法  | 描述
------------- | -------------
  config               | 配置
  setQueryPrams        | 在API请求前，设置请求参数
  afterSubmit          | 请求完成，获取返回数据

##5).FilterView
*bl-filterview<br>
*bl-filterview<br>

##6).FieldView
*bl-field="fieldname"											                      	:Fill with text<br>
*%{bl-field:'fieldname'}%										                    	:Replace with (暂时停用)<br>
*bl-field-attr="{'attr_name':'attrname','attr_field':'fieldname'}"	    	:Attributes<br>
*bl-field-style="{'style_name':'stylename','style_field':'fieldname'}"  	:Styles<br>
  
*bl-field-htmldecode             :True or NULL. Decode html<br>

##7).ScrollView 												  :Classname:"bl-scrollview" or Nodename:"scrollview"<br>
*bl-scrollview														:Scroll View<br>
  ==>Attributes:<br>
  *bl-scrollview-showscrollbar										:True or false<br>
  *bl-scrollview-enable-blance										:True or false<br>

##8).ImageView(Image Responsive)
*bl-imageview 														:Classname:"bl-imageview" or Nodename:"imageview"<br>
-Set url filter in BLConfig<br>
  ==>Attributes:<br>
  *bl-imageview-fix-width											:True or false<br>
  *bl-imageview-fix-height											:True or false<br>
  *bl-imageview-tapshowbig											:True or false<br>

##9).base View 通用
*bl-view-radius 						:True or false<br>
*bl-view-circle 						:px or percent<br>
*bl-view-shadow 						:"small|normal|big color" <br>
*bl-view-3dshadow 					:"color"<br><br>

*bl-show-sence                  		:Show target sence when cellview taped.<br>
*bl-show-section                		:Show target section when cellview taped.<br>
 
 
#三、动画 (Animations)
------
-Fix Any View
  Attributes:<br>
  *bl-animate-effect 					:Animate name. <br>
  *bl-animate-effect-swing				:Animate name in a string array which split with "|"<br>
  *bl-animate-delay 					:A animate delay show after frameview show<br>
  *bl-animate-delayinterval			:A animate on list item begin time since the pre item animate started.<br>
  *bl-animate-duration                 :"slow , normal(default) , fast , zing"<br>
  
  Animate effect name
  
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


