# Bricklayer


一、布局View （LayoutView）
1）.场景
场景相当于独立的网页
<sence bl-view-name="唯一识别名" bl-view-title="类似head.title">
</sence>

增强属性
bl-view-defalutload               	：是否默认载入，，“true”为显示，默认显示第一个sence
bl-view-showtabbar                  ：是否显示tabbar（参考tabbar章节），“false”为不显示，默认显示
bl-view-fullscreen                  ：是否全屏显示，“false”为不全屏，默认全屏

2）.章节
场景相当于网页中的一部分
<section bl-view-name="唯一识别名" bl-view-title="类似head.title">
</section>

增强属性
bl-view-fullscreen                  ：是否全屏显示，“false”为不全屏，默认全屏

3）.从服务端下载sence并应用
$.BLLoadSenceFromRemote (url,senceName,senceTitle,callback);

二、模态View (ModelView)
#bl-model-alert
#bl-model-promet
#bl-model-confirm
#bl-model-hue
<model-alert bl-view-name="唯一识别名" bl-view-title="类似head.title">
</model-alert>
增强属性:
 bl-model-title                		:Title text(Also can use HTML)
 bl-model-content			  	      	:Html content
 bl-model-btns                 		:JSON object string. e.g.
 													{
 														'ok':'Login',
 														'cancal':'Cancel',
 														'customs':['Register','Forget password?']
 													}

三、TableView 

#bl-tableview                     	:Tableview like viewcontroler.
==>Attributes:
 bl-tableview-datasource        		:Api name.
 bl-tableview-datadelegate      		:tableview 和 tablecellview 的事件管理. 
 bl-tableview-localstore        		:是否缓存数据到本地数据库，默认false
 
 bl-tableview-pagelength        		:List array length. Start with 1.
 bl-tableview-startpage				    :List array begin index.
 bl-tableview-autorefreshdata	  	:自动刷新数据
 
 
#bl-tablecellview                 	:Item in tableview, Auto create from datasource. 
#bl-tablecellview-prototype       	:Prototype of tablecellview.
==>Attributes:
 bl-identifier                  		:You can set >1 prototypes with deffrent identifier and select prototype in datadelegate.

#bl-tableview-loadmore            	:Auto create by tableview.

>>Before render
---<bl-tableview>
-----<bl-tableview-loop>
-------<bl-tableview-cellview-prototype>
-----<bl-tableview-loadmore(optional)>
>>After render
---<bl-tableview>
-----<bl-tableview-cellview-prototype(hidden)>
-----<bl-tableview-loop>
-------<bl-tableview-cellview>
-----<bl-tableview-loadmore(auto create)>

四、DetailView
bl-detailview-datasource
bl-detailview-datadelegate
*Auto enable FieldView

五、FormView
bl-form
bl-form-datasource
bl-form-submit-success					           :Call faAlert"{'title':'','desc':''}"
bl-form-submit-success-func   			       :Call function
bl-form-field                             :field name for submit
bl-form-field-validate 				           :form字段验证，支持：email、phone、password、password-repeat
bl-form-field-validate-regexp 			       :正则验证
bl-form-submit                            :submit button
bl-form-datadelegate

六、FilterView
bl-filterview
bl-filterview

七、FieldView
bl-field="fieldname"											                      	:Fill with text
%{bl-field:'fieldname'}%										                    	:Replace with (暂时停用)
bl-field-attr="{'attr_name':'attrname','attr_field':'fieldname'}"	    	:Attributes
bl-field-style="{'style_name':'stylename','style_field':'fieldname'}"  	:Styles

bl-field-htmldecode             :True or NULL. Decode html

八、ScrollView 												  :Classname:"bl-scrollview" or Nodename:"scrollview"
bl-scrollview														:Scroll View
==>Attributes:
 bl-scrollview-showscrollbar										:True or false
 bl-scrollview-enable-blance										:True or false

九、ImageView(Image Responsive)
bl-imageview 														:Classname:"bl-imageview" or Nodename:"imageview"
*Set url filter in BLConfig
==>Attributes:
 bl-imageview-fix-width											:True or false
bl-imageview-fix-height											:True or false
bl-imageview-tapshowbig											:True or false

十、View
*All view based on BLView
bl-view-radius 						:True or false
bl-view-circle 						:px or percent
bl-view-shadow 						:"small|normal|big color" 
bl-view-3dshadow 					:"color"

bl-show-sence                  		:Show target sence when cellview taped.
 bl-show-section                		:Show target section when cellview taped.
 
 
 十一、动画10.Animations
*Fix Any View
==>Attributes:
 bl-animate-effect 					:Animate name. 
 bl-animate-effect-swing				:Animate name in a string array which split with "|"
 bl-animate-delay 					:A animate delay show after frameview show
 bl-animate-delayinterval			:A animate on list item begin time since the pre item animate started.
 bl-animate-duration                 :"slow , normal(default) , fast , zing"

-----------Animate effect name-------------
##Attention seekers
flash bounce shake tada swing wobble wiggle pulse

##Flippers
flip flipInX flipOutX flipInY flipOutY

##Fading entrances
fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig

##Fading exits
fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig

##Bouncing entrances
bounceIn bounceInDown bounceInUp bounceInLeft bounceInRight

##Bouncing exits
bounceOut bounceOutDown bounceOutUp bounceOutLeft bounceOutRight

##EaseIn entrances
easeInLeft easeInRight

##EaseOut exits
easeOutLeft easeInRight

##Scaling entrances
scaleIn scaleInBig

##Scaling exits
scaleOut scaleOutBig

##Drop
dropDown dropUp

##Rotating entrances
rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight

##Rotating exits
rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight

##Lightspeed
lightSpeedIn lightSpeedOut

##Specials
hingeLeft hingeRight rollIn rollOut


