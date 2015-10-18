# Bricklayer


#一、布局View （LayoutView）
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

##3）.从服务端下载sence并应用
  $.BLLoadSenceFromRemote (url,senceName,senceTitle,callback);<br>

#二、模态View (ModelView)
  *-bl-model-alert<br>
  *-bl-model-promet<br><br>
  *-bl-model-confirm<br>
  *-bl-model-hue<br>
  <model-alert bl-view-name="唯一识别名" bl-view-title="类似head.title"><br>
  </model-alert><br>
  
  增强属性:<br><br>
  *bl-model-title                		:Title text(Also can use HTML)<br>
  *bl-model-content			  	      	:Html content<br>
  *bl-model-btns                 		:JSON object string. e.g.<br>
  	{<br><br>
 														'ok':'Login',<br>
 														'cancal':'Cancel',<br>
 														'customs':['Register','Forget password?']<br>
 													}<br>

#三、TableView 
*Node：bl-tableview                     	:Tableview like viewcontroler.<br>
  ==>Attributes:<br>
  *bl-tableview-datasource        		:Api name.<br>
  *bl-tableview-datadelegate      		:tableview 和 tablecellview 的事件管理. <br>
  *bl-tableview-localstore        		:是否缓存数据到本地数据库，默认false<br>
 <br>
  *bl-tableview-pagelength        		:List array length. Start with 1.<br>
  *bl-tableview-startpage				    :List array begin index.<br>
  *bl-tableview-autorefreshdata	  	:自动刷新数据<br>
 
 
*Node：bl-tablecellview                 	:Item in tableview, Auto create from datasource. <br>
*Node：bl-tablecellview-prototype       	:Prototype of tablecellview.<br>
  ==>Attributes:<br>
  bl-identifier                  		:You can set >1 prototypes with deffrent identifier and select prototype in datadelegate.<br>

*Node：bl-tableview-loadmore            	:Auto create by tableview.<br>

  >Before render<br>
  ` ``>><bl-tableview><br>
  ` ``>>><bl-tableview-loop><br>
  ` ``>>>><bl-tableview-cellview-prototype><br>
  ` ``>>><bl-tableview-loadmore(optional)><br>
  >After render<br>
  ` ``>><bl-tableview><br>
  ` ``>>><bl-tableview-cellview-prototype(hidden)><br>
  ` ``>>><bl-tableview-loop><br>
  ` ``>>>><bl-tableview-cellview><br>
  ` ``>>><bl-tableview-loadmore(auto create)><br>

#四、DetailView
*bl-detailview-datasource<br>
*bl-detailview-datadelegate<br>
-Auto enable FieldView<br>

#五、FormView
*bl-form<br>
*bl-form-datasource<br>
*bl-form-submit-success					           :Call faAlert"{'title':'','desc':''}"<br>
*bl-form-submit-success-func   			       :Call function<br>
*bl-form-field                             :field name for submit<br>
*bl-form-field-validate 				           :form字段验证，支持：email、phone、password、password-repeat<br>
*bl-form-field-validate-regexp 			       :正则验证<br>
*bl-form-submit                            :submit button<br>
*bl-form-datadelegate<br>

#六、FilterView
*bl-filterview<br>
*bl-filterview<br>

#七、FieldView
*bl-field="fieldname"											                      	:Fill with text<br>
*%{bl-field:'fieldname'}%										                    	:Replace with (暂时停用)<br>
*bl-field-attr="{'attr_name':'attrname','attr_field':'fieldname'}"	    	:Attributes<br>
*bl-field-style="{'style_name':'stylename','style_field':'fieldname'}"  	:Styles<br>
  
*bl-field-htmldecode             :True or NULL. Decode html<br>

#八、ScrollView 												  :Classname:"bl-scrollview" or Nodename:"scrollview"<br>
*bl-scrollview														:Scroll View<br>
  ==>Attributes:<br>
  *bl-scrollview-showscrollbar										:True or false<br>
  *bl-scrollview-enable-blance										:True or false<br>

#九、ImageView(Image Responsive)
*bl-imageview 														:Classname:"bl-imageview" or Nodename:"imageview"<br>
-Set url filter in BLConfig<br>
  ==>Attributes:<br>
  *bl-imageview-fix-width											:True or false<br>
  *bl-imageview-fix-height											:True or false<br>
  *bl-imageview-tapshowbig											:True or false<br>

#十、View
-All view based on BLView<br>
*bl-view-radius 						:True or false<br>
*bl-view-circle 						:px or percent<br>
*bl-view-shadow 						:"small|normal|big color" <br>
*bl-view-3dshadow 					:"color"<br><br>

bl-show-sence                  		:Show target sence when cellview taped.<br>
 bl-show-section                		:Show target section when cellview taped.<br>
 
 
#十一、动画 Animations
-Fix Any View
  Attributes:<br>
  *bl-animate-effect 					:Animate name. <br>
  *bl-animate-effect-swing				:Animate name in a string array which split with "|"<br>
  *bl-animate-delay 					:A animate delay show after frameview show<br>
  *bl-animate-delayinterval			:A animate on list item begin time since the pre item animate started.<br>
  *bl-animate-duration                 :"slow , normal(default) , fast , zing"<br>
  
  -----------Animate effect name-------------
  ------
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


