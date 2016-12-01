/*
 * Bricklayer -  An easy way to create your mobile web application
 * https://github.com/Colormark/Bricklayer
 *
 * Copyright (c) 2015 - Colormaker
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 0.1.15
 * Last update:  2015-11-16
 *
 */

;(function ($){
	'use strict';
	var BLTabar=false;
	//User Browse Stack
	var BLUserBrowseStack=[];
	
	//Mode
	var BLDesignMode=false;
	var BLDevelopMode=false;

	if(getQueryString("bldesignmode")){
		BLDesignMode=true;
	}

	var BLHomeSence=false;
	
	function getURLPrams(){
		var currentUrl=window.location.href; 
		var arrUrl=currentUrl.split("/"); 
		var currentPage=((arrUrl[arrUrl.length-1]).split("?"))[0];
		var bl_state=$.parseJSON(decodeURIComponent(getQueryString("bl_state")));
		return {
			"file":currentPage,
			"bl_state":bl_state
		};
	}

	var BLHistory=window.history;

	window.onpopstate=function() { 
		var history=window.history;
		var bl_state=getURLPrams().bl_state;
		if(!bl_state.sence || bl_state.sence==null){
			return;
		}else{
			BLShowSencePrepare(bl_state.sence,bl_state,false);
		}
		
	};

	function pushState(sence,title,extra_prams){
		var stateObj={"sence":sence};
		if(typeof extra_prams =="object"){
			for(var p in extra_prams){
				stateObj[p]=extra_prams[p];
			}
		}
		if(title!=null){
			document.title=title;
		}
		var stateObjStr=JSON.stringify(stateObj);
		var newSearch=addOrReplaceUrlParameter("bl_state",encodeURIComponent(stateObjStr));

		BLHistory.pushState(stateObj, title, newSearch);
	}

	function replaceState(sence,title,extra_prams){
		var stateObj={"sence":sence};
		if(typeof extra_prams =="object"){
			for(var p in extra_prams){
				stateObj[p]=extra_prams[p];
			}
		}
		if(title!=null){
			document.title=title;
		}
		var stateObjStr=JSON.stringify(stateObj);
		var newSearch=addOrReplaceUrlParameter("bl_state",encodeURIComponent(stateObjStr));

		BLHistory.replaceState(stateObj, title, newSearch);
	}

	$(function(){
		
		$(".bl-sence,sence,.bl-section,section").each(function(i){
			$(this).addClass("bl-sence-hide");
		});

		if($("tabbar,.bl-tabbar").length>0){
			BLTabar=$("tabbar,.bl-tabbar").eq(0);
		}

		//Get develop mode
		var BLMode=getQueryString("bl_mode");
		if(BLMode=="design"){
			BLDesignMode=true;
		}
		if(BLMode=="develop"){
			BLDevelopMode=true;
		}
		
		//Hide prototype
		if(!BLDesignMode){
			$(".bl-tableview-cellview-prototype").each(function(){
				var parent=$(this).parents(".bl-tableview,tableview");
				parent.prepend($(this));
				$(this).hide();
			});
		}
		
		//Sence on show
		$("*[bl-show-sence]").on("click",function(){
			
			var targetSenceName=$(this).attr("bl-show-sence");
			var sence=$("*[bl-view-name='"+targetSenceName+"']");
			
			if(sence.length==1){
				var prams={};
				if(typeof $(this).attr("bl-query-prams") != "undefined"){
					var BLCurrentDataId=0;
					if(typeof $(this).attr("bl-data-id") != "undefined"){
						BLCurrentDataId=$(this).attr("bl-data-id");
					}
					try{
						prams=eval("("+$(this).attr("bl-query-prams")+")");
					}catch(e){
						console.error("Bricklayer: Error! Invalid bl-query-prams ("+$(this).attr("bl-query-prams")+") on "+targetSenceName);
						return;
					}
				}
				
				BLShowSencePrepare(sence,prams,true);

			}else if(sence.length>1){
				console.error("Bricklayer: Error! Too much nodes("+targetSenceName+") that you want show");
				return;
			}else{
				console.error("Bricklayer: Error! Can not find node("+targetSenceName+") that you want show");
				return;
			}
			
		});
		
		//Section on show
		$("*[bl-show-section]").on("click",function(){
			var targetSectionName=$(this).attr("bl-show-section");
			var section=$("*[bl-view-name='"+targetSectionName+"']");
			if(section.length==1){
				BLShowSection(section);
			}else if(section.length>1){
				console.error("Bricklayer: Error! Too much nodes("+targetSectionName+") that you want show");
				return;
			}else{
				console.error("Bricklayer: Error! Can not find node("+targetSectionName+") that you want show");
				return;
			}
		});
		
		//Filter on click
		$(".bl-filter,filter").on("click",function(){
			$(".bl-search-window").show();
		});

		//loadmore
		$(".bl-tableview-loadmore, loadmore").on("click",function(){
			var tableviews=$(this).parents('.bl-tableview,tableview');
			var targetPageName=BLConfig["pagination"]["targetPageName"];
			var prams={};
			prams[targetPageName]=$(this).attr("bl-pagination-nextpage");
			tableviews.BLTableViewLoadData(prams);
		});

		//back
		$(".bl-back,back").on("click",function(){
			BLHistoryGoBack();
		});
	
		//When home btn click
		$(".bl-home,home").on("click",function(){
			BLHistoryGoHome();
		});


		if($('sence[bl-sence-home],.bl-sence[bl-sence-home],sence[bl-defalut-load],.bl-sence[bl-defalut-load]').length>0){
			BLHomeSence=$('sence[bl-sence-home],.bl-sence[bl-sence-home],sence[bl-defalut-load],.bl-sence[bl-defalut-load]').eq(0);
		}else{
			BLHomeSence=$("sence,.bl-sence").eq(0);
		}
		//Show home sence
		//TO DO: 需包含节点的参数设置
		var defaultLoadSenceQuery=getURLPrams().bl_state;
		BLShowSencePrepare(BLHomeSence,{},true); 
		if(defaultLoadSenceQuery != null){
			BLShowSencePrepare(defaultLoadSenceQuery.sence,defaultLoadSenceQuery,true);
		}

	});

	function BLShowSencePrepare(sence,prams,ifChangeState){
		if(typeof sence=="string"){
			var sence=$("*[bl-view-name='"+sence+"']");
		}
		if(sence.length==0 && BL.developmentMode){
			console.error("Bricklayer: Error! Can not find node(sence)");
			return;
		}
		var senceName=sence.attr("bl-view-name");
		if(typeof senceName=="undefined"){
			console.error("Bricklayer: Error! 'sence' must have attr 'bl-view-name'");
			return;
		}

		//console.log("Bricklayer:sence name - "+senceName);

		var title=document.title;
		if(typeof sence.attr("bl-view-title") != "undefined"){
			title=sence.attr("bl-view-title");
		}
		if(ifChangeState){	
			pushState(senceName,title,prams);
		}
		BLUserBrowseStack.push(senceName);

		BLShowSence(sence);
	}

	$.BLShowSence = function (senceName){
		BLShowSencePrepare(senceName,{},true);
	};
	
	function BLShowSence(sence){
		
		var prams=getURLPrams().bl_state;
				
		$(document).find("sence,.bl-sence").addClass("bl-sence-hide");
		sence.removeClass("bl-sence-hide");

		var senceName=sence.attr("bl-view-name");

		//Tabbar select
		if($("tabbar").find("tabitem[bl-show-sence='"+senceName+"']").length>0){
			$("tabbar tabitem.selected").removeClass("selected");
			$("tabbar").find("tabitem[bl-show-sence='"+senceName+"']").addClass("selected");
		}
		
		if(sence.find("section,.bl-section").length>0){
			
			if(sence.find("section:visible,.bl-section:visible").length>0){
				BLShowSection(sence.find("section:visible,.bl-section:visible").eq(0),prams);
				return;
			}
			var targetSence;
			if(sence.find("section[bl-defalut-load],.bl-section[bl-defalut-load]").length>0){
				targetSence=sence.find("section[bl-defalut-load],.bl-section[bl-defalut-load]").eq(0);
			}else{
				targetSence=sence.find("section,.bl-section").eq(0);
			}
			BLShowSection(targetSence,prams);
		}else{
			//Init sence
			BLInitPage(sence,prams);
			/*
				Show sence node
				TODO: Maybe, I can add page change effect here
			*/
			BLRenderAnimate(sence);	
		}
	}

	function BLShowSection(section,prams){
		
		if(!(section instanceof jQuery)){
			console.error("Bricklayer: Error! BLShowSence pram must be a jQuery object");
			return;
		}
		
		if(section.length==0 && BL.developmentMode){
			console.error("Bricklayer: Error! Can not find node(section)");
			return;
		}
		
		var sectionName=section.attr("bl-view-name");
		if(typeof sectionName=="undefined"){
			console.error("Bricklayer: Error! 'section' must have attr 'bl-view-name'");
			return;
		}

		section.data("bl-prams",prams);

		//Init section
		BLInitPage(section,prams);
		/*
			Show section node
			TODO: Maybe, I can add page change effect here
		*/
		var sence=section.parents("sence,.bl-sence");
		if(!(sence.is(":visible"))){
			$(document).find("sence:visible,.bl-sence:visible").addClass("bl-sence-hide");
			sence.removeClass("bl-sence-hide");
		}
		
		//TODO:need modify
		sence.find("navitem.selected").removeClass("selected");
		sence.find("navitem[bl-show-section='"+sectionName+"']").addClass("selected");
		sence.find("section:visible,.bl-section:visible").addClass("bl-sence-hide");
		section.removeClass("bl-sence-hide");

		BLRenderAnimate(section);
		
	}

	function BLInitPage(page,prams){
		/*Render page*/
		var pageName=page.attr("bl-view-name");
		
		/*Layout set*/
		//tabbar
		var ifPagelayouted=false;
		if(typeof page.attr("bl-layouted") != "undefined"){
			ifPagelayouted=true;
		}else{
			page.attr("bl-layouted",true);
		}
		
		if(BLTabar){
			var ifShowTabbar=page.attr("bl-view-showtabbar");
			if(typeof ifShowTabbar == "undefined" || ifShowTabbar=="true"){
				if(!ifPagelayouted){
					var tabbargap=$('<tabbargap></tabbargap>');
					tabbargap.css("min-height",BLTabar.height());
					page.append(tabbargap);
				}
				BLTabar.show();
			}else{
				//TODO: I can add some effect while node hiding
				BLTabar.hide();
			}
		}
		
		//int bl-tableview
		var tableviews=page.find('.bl-tableview,tableview');
		//console.dir(page);
		tableviews.each(function(){
			$(this).attr("bl-query-prams-lime",JSON.stringify(prams));
			BLLoadTableviewInt($(this));
		});
		
		//int bl-detailview
		var detailviews=page.find('.bl-detailview,detailview');
		detailviews.each(function(){
			$(this).attr("bl-query-prams-lime",JSON.stringify(prams));
			BLLoadDetailviewInt($(this));
		});
		if(page.hasClass("bl-detailview") || page.get(0).tagName.toLocaleLowerCase()=="detailview"){
			page.attr("bl-query-prams-lime",JSON.stringify(prams));
			BLLoadDetailviewInt(page);
		}
		
		//int bl-formview
		var formviews=page.find('.bl-formview,formview');
		formviews.each(function(){
			BLLoadFormviewInt($(this));
		});
		
	}

	//TODO cache page, auto update 
	function BLHistoryGoBack(){
		var page=BLUserBrowseStack[BLUserBrowseStack.length-2];
		BLUserBrowseStack=BLUserBrowseStack.slice(0,BLUserBrowseStack.length-2);
		BLHistory.go(-1)
	}

	function BLHistoryGoHome(){
		var page=BLUserBrowseStack[0];
		BLUserBrowseStack=BLUserBrowseStack.slice(0,1);
		BLShowSencePrepare(BLHomeSence,{},false);
	}
	
	function BLLoadTableviewInt(tableview){
		var datasource=tableview.attr("bl-tableview-datasource");
		if(typeof datasource =="undefined"){
			console.error("Bricklayer: Error! 'tableview' must have attr 'bl-tableview-datasource'");
			return;
		}
		
		/*Default config*/
		var config={
			"show load more":true,
			"page length":10,
			"start page":1,
			"cellview animate effect" : "none",
			"cellview animate effect delay" : 0.2,
			"auto refresh data":0,
			"allways reload data when page show": false
		};

		/*Load config from node attr*/
		if(typeof tableview.attr("bl-tableview-showloadmore") !="undefined"){
			config["show load more"]=tableview.attr("bl-tableview-showloadmore")=="true"?true:false;
		}
		if(typeof tableview.attr("bl-tableview-pagelength") !="undefined"){
			if(!isNaN(parseInt(tableview.attr("bl-tableview-pagelength")))){
				config["page length"]=parseInt(tableview.attr("bl-tableview-pagelength"));
			}
		}
		if(typeof tableview.attr("bl-tableview-startpage") !="undefined"){
			if(!isNaN(parseInt(tableview.attr("bl-tableview-startpage")))){
				config["start page"]=parseInt(tableview.attr("bl-tableview-startpage"));
			}
		}
		if(typeof tableview.attr("bl-tableview-animateeffect") !="undefined"){
			config["cellview animate effect"]=tableview.attr("bl-tableview-animateeffect");
		}
		if(typeof tableview.attr("bl-tableview-animateeffectdelay") !="undefined"){
			if(!isNaN(parseFloat(tableview.attr("bl-tableview-animateeffectdelay")))){
				config["cellview animate effect delay"]=parseFloat(tableview.attr("bl-tableview-animateeffectdelay"));
			}
		}
		if(typeof tableview.attr("bl-tableview-autorefreshdata") !="undefined"){
			if(!isNaN(parseInt(tableview.attr("bl-tableview-autorefreshdata")))){
				config["auto refresh data"]=parseInt(tableview.attr("bl-tableview-autorefreshdata"));
			}
		}
		
		/*Load config from delegate if exist*/
		var delegate=tableview.attr("bl-tableview-delegate");
		if(typeof delegate !="undefined"){
			if(!BLDelegate[delegate]){
				console.error("Bricklayer: Error! Can not find set delegate:'"+delegate+"'");
			}else{
				var delegateFn=BLDelegate[delegate];
				if(typeof delegateFn["config"] =="object"){
					for(var p in delegateFn["config"]){
						config[p]=delegateFn["config"][p];
					}
				}
				if(typeof delegateFn["setQueryPrams"] == "function"){
					$(this).data("bl-query-extra-prams",delegateFn["setQueryPrams"]($(this)));
				}
			}
		}
		
		tableview.data("bl-config",config);
		tableview.data("bl-datasource",datasource);

		if(!BLDesignMode){
			tableview.BLTableViewLoadData(datasource);
		}
		
	}

	/*
	*tableview load data
	*/
	$.fn.BLTableViewLoadData = function () {

		var tableview=$(this);
		var datasource=tableview.data("bl-datasource");

		try{
			var prams=eval("("+decodeURIComponent(getQueryString("bl_state"))+")");
		}catch(e){
			console.error("Bricklayer: Error! Invalid bl_state object on url");
			return;
		}

		if(typeof tableview.attr("bl-query-prams") !="undefined"){
			try{
				var prams=eval("("+tableview.attr("bl-query-prams")+")");
			}catch(e){
				console.error("Bricklayer: Error! Invalid bl-query-prams ("+tableview.attr("bl-query-prams")+")");
				return;
			}
		}
		if(typeof tableview.attr("bl-query-prams-lime") !="undefined"){
			try{
				var pramsLime=eval("("+tableview.attr("bl-query-prams-lime")+")");
				for(var p in pramsLime){
					prams[p]=pramsLime[p];
				}
			}catch(e){
			}
		}
		if(tableview.data("bl-query-extra-prams")){
			for(var p in tableview.data("bl-query-extra-prams")){
				prams[p]=tableview.data("bl-query-extra-prams")[p];
			}
		}

		if(BLConfig["pagination"]){
			prams[BLConfig["pagination"]["currentPageName"]]=BLConfig["pagination"]["startPageDefault"];
			prams[BLConfig["pagination"]["pageLengthName"]]=BLConfig["pagination"]["pageLengthDefault"];
		}else{
			if(!prams["page"]){prams["page"]=1;}
			if(!prams["page_size"]){prams["page_size"]=10};
		}



		BLLoadRemoteData(tableview,datasource,prams,"get",function (response,view){
			var fieldsDescName="fields_desc";
			if(BLConfig["datasourceMetaName"]){
				fieldsDescName=BLConfig["datasourceMetaName"];
			}
			if(!response[fieldsDescName]){
				console.error("Bricklayer: Error! Can not find '"+fieldsDescName+"'(set in BLConfig['datasourceMetaName']) in response data");
				return;
			}
			var fieldsDesc=response[fieldsDescName];
			var data=response[fieldsDesc["data_object_name"]];
			var tableData=data[fieldsDesc["loop_array_name"]];
			var dataIDName=fieldsDesc["loop_array_primary_key_field_name"];

			var delegateName = view.attr("bl-tableview-delegate");
			var prototypeCellView=view.find(".bl-tableview-cellview-prototype");
			if(prototypeCellView.length==0){
				console.error("Bricklayer: Error! Can not find any 'bl-tableview-cellview-prototype' at '"+view.attr("bl-tableview-datasource")+"'");
				return;
			}
			var loopArea=view.find(".bl-tableview-loop, loop");

			var groupBy=false;
			if(typeof view.attr("bl-tableview-groupby") != "undefined"){
				var prams=$.parseJSON(decodeURIComponent(getQueryString("bl_state")));
				if(prams[view.attr("bl-tableview-groupby")]){
					groupBy=prams[view.attr("bl-tableview-groupby")];
				}
			}

			loopArea.find(".bl-tableview-cellview[bl-tableview-groupby-lime!='"+groupBy+"']").remove();

			for (var i = 0; i < tableData.length; i++) {
				
				var dataID=tableData[i][dataIDName];
				if(loopArea.find("[bl-data-id='"+dataID+"']").length>0){
					console.log("dataID:"+dataID);
				}else{
					var cloneCellView=prototypeCellView.clone(true, true);
					cloneCellView.attr("bl-data-id",dataID);
					cloneCellView.removeClass("bl-tableview-cellview-prototype").addClass("bl-tableview-cellview");

					//Custom
					if(typeof delegateName!="undefined"){
						var delegateFn=BLDelegate[delegateName];
						if(typeof delegateFn["farmatDataFields"] == "function"){
							//console.log('Bricklayer:Tableview delegate :"'+delegateName+'" on "farmatDataFields" at row:' +i);
							tableData[i]=delegateFn["farmatDataFields"](tableData[i],{"row":i},cloneCellView);
						}
					}

					if(groupBy){
						cloneCellView.attr("bl-tableview-groupby-lime",groupBy)
					}
					
					cloneCellView.BLFillFields(tableData[i]);
					
					if(typeof cloneCellView.attr("bl-animate-delayinterval")!="undefined"){
						//var orderNum=loopArea.find(".bl-tableview-cellview").length;
						var orderNum=i;
						var interval=parseInt(cloneCellView.attr("bl-animate-delayinterval"));
						cloneCellView.attr("bl-animate-delay",orderNum*interval);
					}

					if(typeof cloneCellView.attr("bl-animate-effect-swing")!="undefined"){
						var swing=(cloneCellView.attr("bl-animate-effect-swing")).split("|");
						var orderNum=loopArea.find(".bl-tableview-cellview").length;
						var effectNum=orderNum%swing.length;
						cloneCellView.attr("bl-animate-effect",swing[effectNum]);
					}

					cloneCellView.show();
					loopArea.append(cloneCellView);
					
				}

				var DomLoadmore=view.find(".bl-tableview-loadmore, loadmore");

				if(DomLoadmore.length>0 && typeof BLConfig["pagination"] != "undefined"){
					if(typeof BLConfig["pagination"]["paginationMetaName"] != "undefined"){
						var paginationMetaName=BLConfig["pagination"]["paginationMetaName"];
						if(typeof fieldsDesc[paginationMetaName] != "undefined"){
							var pagination=data[fieldsDesc[paginationMetaName]];
							if(typeof pagination != "undefined"){
								if(pagination[BLConfig["pagination"]["recordCountName"]]/pagination[BLConfig["pagination"]["pageSizeName"]]>pagination[BLConfig["pagination"]["currentPageName"]]){
									DomLoadmore.attr("bl-pagination-nextpage",pagination[BLConfig["pagination"]["currentPageName"]]+1);
									DomLoadmore.show("fast");
								}else{
									DomLoadmore.hide("fast");
								}
							}else{
								console.error("Bricklayer: Error! Can not find 'pagination'("+paginationMetaName+") in response data");
								return;
							}
						}
					}else{
						console.error("Bricklayer: Error! Can not find 'paginationMetaName' at 'BLConfig[\"pagination\"]");
						return;
					}
				}
			}
			BLRenderAnimateOnce(loopArea);
		});
	};

	/*
	*Detailview render
	*/
	function BLLoadDetailviewInt(detailview){
		
		var datasource=detailview.attr("bl-detailview-datasource");
		if(typeof datasource != "undefined"){

			var prams=$.parseJSON(decodeURIComponent(getQueryString("bl_state")));
			if(typeof detailview.attr("bl-query-prams") !="undefined"){
				prams=$.parseJSON(detailview.attr("bl-query-prams"));
			}
			if(detailview.data("bl-query-extra-prams")){
				for(var p in detailview.data("bl-query-extra-prams")){
					prams[p]=detailview.data("bl-query-extra-prams")[p];
				}
			}

			BLLoadRemoteData(detailview,datasource,prams,"get",function (response,view){
				var fieldsDescName="fields_desc";
				if(BLConfig["datasourceMetaName"]){
					fieldsDescName=BLConfig["datasourceMetaName"];
				}
				if(!response[fieldsDescName]){
					console.error("Bricklayer: Error! Can not find '"+fieldsDescName+"'(set in BLConfig['datasourceMetaName']) in response data");
					return;
				}
				var fieldsDesc=response[fieldsDescName];

				var detailData=response[fieldsDesc["data_object_name"]];

				var delegateName=view.attr("bl-detailview-delegate");
				if(typeof delegateName!="undefined"){
					var delegateFn=BLDelegate[delegateName];
					if(typeof delegateFn !="undefined"){
						if(typeof delegateFn["farmatDataFields"] == "function"){
							detailData=delegateFn["farmatDataFields"](detailData);
						}
					}
				}
				view.BLFillFields(detailData);
				BLRenderAnimate(view);
			});

		}
	}

	/*
	*Formview render
	*/
	function BLLoadFormviewInt(formview){
		
		var datasource=formview.attr("bl-formview-datasource");

		if(typeof datasource == "undefined"){
			console.error("Bricklayer: Error! BLFormview must have 'bl-formview-datasource'");
			return;
		}else{

		formview.find('*[bl-formview-submit]').one("vclick",function(){

				var delegateName=formview.attr("bl-formview-delegate");
				if(typeof delegateName!="undefined"){
					var delegateFn=BLDelegate[delegateName];
					if(typeof delegateFn["validateBeforeSubmit"] == "function"){
						return delegateFn["validateBeforeSubmit"](formview,$(this));
					}
				}

				var prams=$.parseJSON(decodeURIComponent(getQueryString("bl_state")));
				formview.find("[bl-formview-field]").each(function(){
					prams[$(this).attr("bl-formview-field")]=$(this).val();
				});
				formview.find("[bl-formview-textfield]").each(function(){
					prams[$(this).attr("bl-formview-textfield")]=$(this).text();
				});

				BLLoadRemoteData(formview,datasource,prams,"post",function (response,view){
					var fieldsDescName="fields_desc";
					if(BLConfig["datasourceMetaName"]){
						fieldsDescName=BLConfig["datasourceMetaName"];
					}
					if(!response[fieldsDescName]){
						console.error("Bricklayer: Error! Can not find '"+fieldsDescName+"'(set in BLConfig['datasourceMetaName']) in response data");
						return;
					}
					var fieldsDesc=response[fieldsDescName];
					var callbackData=response[fieldsDesc["data_object_name"]];

					var delegateName=view.attr("bl-formview-delegate");
					if(typeof delegateName!="undefined"){
						var delegateFn=BLDelegate[delegateName];
						if(typeof delegateFn["afterSubmit"] == "function"){
							return delegateFn["afterSubmit"](response,view);
						}
					}

					if(typeof view.attr("bl-formview-submit-success")!="undefined"){
						var successStr=eval('('+view.attr("bl-formview-submit-success")+')');
						BLAlert(successStr.title,successStr.desc);
					}

				});
			});

			

		}
	}

	/*
	*Fieldview render
	*/
	$.fn.BLFillFields = function(data){
		var view=$(this);
		
		view.find("*[bl-field]").each(function(){
			var fieldView=$(this);
			var field=fieldView.attr("bl-field");
			if(data[field]){
				fieldView.html(data[field]);
			}else{
				//console.warn("Bricklayer: warnning! Can not find field ("+field+") in response data");
			}
		});
		
		view.find("*[bl-field-style]").each(function(){
			var fieldView=$(this);
			var setObjStr=fieldView.attr("bl-field-style");
			try{
				var setObj=eval("("+setObjStr+")");
			}catch(e){
				console.error("Bricklayer: Error! Invalid bl-field-style ("+setObjStr+")");
				return;
			}
			for(var i=0;i<setObj.length;i++){
				var style_name=setObj[i]["style_name"].toLocaleLowerCase().replace(/[]/g,"");
				if( style_name == "background-image"){
					fieldView.css(style_name,'url('+data[setObj[i]["style_field"]]+')');
				}else if(style_name =="TO DO: FIND MORE"){//TO DO
					
				}else{
					fieldView.css(style_name,data[setObj[i]["style_field"]]);
				}
			}
		});

		if(typeof view.attr("bl-field-style") != "undefined"){
			var setObjStr=view.attr("bl-field-style");
			try{
				var setObj=eval("("+setObjStr+")");
			}catch(e){
				console.error("Bricklayer: Error! Invalid bl-field-style ("+setObjStr+")");
				return;
			}
			for(var i=0;i<setObj.length;i++){
				var style_name=setObj[i]["style_name"].toLocaleLowerCase().replace(/[]/g,"");
				if( style_name == "background-image"){
					view.css(style_name,'url('+data[setObj[i]["style_field"]]+')');
				}else if(style_name =="TO DO: FIND MORE"){//TO DO
					
				}else{
					view.css(style_name,data[setObj[i]["style_field"]]);
				}
			}
		}

		view.find("*[bl-field-attr]").each(function(){
			var fieldView=$(this);
			var setObjStr=fieldView.attr("bl-field-attr");
			try{
				var setObj=eval("("+setObjStr+")");
			}catch(e){
				console.error("Bricklayer: Error! Invalid bl-field-attr ("+setObjStr+")");
				return;
			}
			for(var i=0;i<setObj.length;i++){
				var attr_name=setObj[i]["attr_name"].toLocaleLowerCase().replace(/[]/g,"");
				fieldView.attr(attr_name,data[setObj[i]["attr_field"]]);
			}
		});
		if(typeof view.attr("bl-field-attr") != "undefined"){
			var setObjStr=view.attr("bl-field-attr");
			try{
				var setObj=eval("("+setObjStr+")");
			}catch(e){
				console.error("Bricklayer: Error! Invalid bl-field-attr ("+setObjStr+")");
				return;
			}
			for(var i=0;i<setObj.length;i++){
				var attr_name=setObj[i]["attr_name"].toLocaleLowerCase().replace(/[]/g,"");
				console.log(attr_name+";"+data[setObj[i]["style_field"]])
				view.attr(attr_name,data[setObj[i]["attr_field"]]);
			}
		}

		view.find("*[bl-field-htmldecode]").each(function(){
			var htmlStr=$(this).text();
			if(typeof $(this).attr("bl-auto-enable-blimgview") != "undefined"){
				htmlStr=formatAndSetBLImageView(htmlStr);
			}
			$(this).html(htmlStr);
		});

		view.find("img[bl-orgional-src]").each(function(){
			$(this).BLImgX();
		});

		view.find("blimageview,.bl-imageview").each(function(){
			$(this).BLImageView();
		});

	};

	function formatAndSetBLImageView (str){
		str=str.replace(/<img([\s\S]*?)src\s*=\s*(['"])([\s\S]*?)\2([^>]*)>/gi,'<img$1bl-orgional-src=$2$3$2$4>');
		return str;
	}

	$.fn.BLImgX = function (){
		var orgionalSrc=$(this).attr("bl-orgional-src");
		if(typeof BLConfig["imgX"] != "function"){
			console.error("Bricklayer: Error! Invalid BLConfig.imgX");
		}else{
			var width=$(this).width();
			$(this).attr("src",BLConfig.imgX(orgionalSrc,width));
		}
	}

	$.fn.BLImageView = function () {
		//bl-imageview-fix-width											:TODO
		//bl-imageview-fix-height											:TODO
		//bl-imageview-tapshowbig											:TODO

		var img=$("<img />");
		img.attr("src",$(this).attr("src"));

		var styles=($(this)[0].style.cssText).split(";");
		for (var i = 0; i < styles.length; i++ ) {
			var style=styles[i].split(":");
			img.css(style[0],style[1]);
		}
		img.addClass("bl-imageview-render");

		//remove old render
		var nextsibling=$(this).next();
		if(nextsibling.hasClass("bl-imageview-render")){
			nextsibling.remove();
		}

		img.insertAfter($(this));
		img.show();
		$(this).hide();
	};
	
	//Event Kits
	$.fn.BLTableViewCellBindEvent = function () {
		var delegate=$(this).parents("*[bl-tableview-delegate]").attr("bl-tableview-delegate");
		var delegateFn=BLTableViewdelegate[delegate];
		if(delegateFn["cellOnTap"]){
			$(this).on("click tap",delegateFn["cellOnTap"]);
		}
		/*
		if(delegateFn["cellOnHold"]){
			$(this).on("hold",delegateFn["cellOnHold"]);
		}
		*/
	};

	/*
	*Animate Kits
	*/
	function BLRenderAnimate(ele){
		clearBLAnimate(ele);
		ele.find("*[bl-animate-effect]").each(function(){
			var item=$(this);
			item.addClass("bl-ani");
			item.addClass("animated");
			if(item.attr("bl-animate-delay")){
				setTimeout(function() {
					item.css("visibility","visible").addClass(item.attr("bl-animate-effect"));
				}, parseInt(item.attr("bl-animate-delay")));
			}else{
				item.css("visibility","visible").addClass(item.attr("bl-animate-effect"));
			}
			if(item.attr("bl-animate-duration")){//&& !item.attr("bl-animate-duration-cache")
				item.css("animation-duration",item.attr("bl-animate-duration"));
				item.attr("bl-animate-duration-cache","YES");
			}
		});
	}

	function BLRenderAnimateOnce(ele){
		//return;//TODO
		ele.find("*[bl-animate-effect]").each(function(){
			var item=$(this);
			if(item.hasClass("bl-animate-inited"))return;
			clearBLAnimate(item);
			item.addClass("bl-animate-inited")
			item.addClass("bl-ani");
			item.addClass("animated");
			if(item.attr("bl-animate-delay")){
				setTimeout(function() {
					item.css("visibility","visible").addClass(item.attr("bl-animate-effect"));
				}, parseInt(item.attr("bl-animate-delay")));
			}else{
				item.css("visibility","visible").addClass(item.attr("bl-animate-effect"));
			}
			if(item.attr("bl-animate-duration")){//&& !item.attr("bl-animate-duration-cache")
				item.css("animation-duration",item.attr("bl-animate-duration"));
				item.attr("bl-animate-duration-cache","YES");
			}
		});
	}
	
	function clearBLAnimate(ele){
		ele.find(".bl-ani").each(function(){
			$(this).removeClass($(this).attr("bl-animate-effect")).removeClass("animated").css("visibility","hidden");
		});
	}
	
	/*
	*Url Parameter Kits
	*/
	function getQueryString(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substring(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
	function addOrReplaceUrlParameter(paramName, paramValue){
		var url=window.location.href;
		var hashSplit = url.split('#');
		var paramSplit = hashSplit[0].split('?');
		var encodedParamName = encodeURIComponent(paramName);
		var encodedParamValue = encodeURIComponent(paramValue);
		if(paramSplit[1]) {
			if(paramSplit[1].match( new RegExp("(^|\&)" + encodedParamName + "=")  )){
				var match = new RegExp( '(' + encodedParamName + ')' + "=.*?(\\&|$)");
				paramSplit[1] = paramSplit[1].replace(match, '$1=' + encodedParamValue + '$2');
			}else{
				paramSplit[1] += "&" + encodedParamName + '=' + encodedParamValue;
			}
		} else {
			paramSplit.push(encodedParamName + '=' + encodedParamValue);
		}
		return paramSplit.join('?') + (hashSplit[1] ? "#" + hashSplit[1] : '') ;
	}

	function htmldecode(s){  
		var div = document.createElement('div');  
		div.innerHTML = s;  
		return div.innerText || div.textContent;  
	}


/*
* Public methods
*/
	/*
	*Set view Delegate
	*/
	var BLDelegate={};
	$.BLTableviewDelegate=function(delegateName,b,c){
		if(arguments.length==3){
			/*
			*delegateName,method,function
			*/
			if(!BLDelegate[delegateName]){
				BLDelegate[delegateName]={};
			}
			BLDelegate[delegateName][b]=c;
		}else{
			/*
			*delegateName,functions
			*/
			BLDelegate[delegateName]=b;
		}
	};

	$.BLDetailviewDelegate=function(delegateName,b,c){
		if(arguments.length==3){
			if(!BLDelegate[delegateName]){
				BLDelegate[delegateName]={};
			}
			BLDelegate[delegateName][b]=c;
		}else{
			BLDelegate[delegateName]=b;
		}
	};

	$.BLFormviewDelegate=function(delegateName,b,c){
		if(arguments.length==3){
			if(!BLDelegate[delegateName]){
				BLDelegate[delegateName]={};
			}
			BLDelegate[delegateName][b]=c;
		}else{
			BLDelegate[delegateName]=b;
		}
	};


	/*
	*Load Sence From Remote Url
	*/
	$.BLLoadSenceFromRemote=function(url,senceName,senceTitle,callback){
		$.get(url,function(doc){
			var sence=$(doc);
			sence.attr("bl-view-name",senceName);
			sence.attr("bl-view-title",senceTitle);
			$(document.body).append(sence);
			callback(sence);
		})
	};

	//plugin
	$.fn.BLCellOnTap = function () {
		var delegate=$(this).parents("*[bl-tableview-delegate]").attr("bl-tableview-delegate");
		var delegateFn=BLTableViewdelegate[delegate];
		$(this).on("click tap",delegateFn["cellOnTap"]);
	};
	
	function BLLoadRemoteData(view,apiname,prams,method,callback){

		if(!BLConfig["apiUrl"]){
			console.error("Bricklayer: Error! you must set BLConfig.apiUrl");
			return;
		}else if(!BLConfig["apiName"]){
			console.error("Bricklayer: Error! you must set BLConfig.apiName");
			return;
		}else if(!BLConfig["datasourceMetaName"]){
			console.error("Bricklayer: Error! you must set BLConfig.datasourceMetaName");
			return;
		}else{
			prams[BLConfig["apiName"]]=apiname;
			$.ajax({"url":BLConfig["apiUrl"],"context":view,"data":prams,"method":method,"dataType":"json",
					"success":function(rz){
						if(BLConfig["parseAJAXErrorCode"] && typeof BLConfig["parseAJAXErrorCode"]=="function"){
							BLConfig["parseAJAXErrorCode"](rz);
						}
						callback(rz,$(this));
					},//TODO：还没有写错误码
					"error":function(parserError){
						console.error("Bricklayer: Worning!BLLoadRemoteData failed");
						console.dir(parserError);
					}
			});
		}
	}

})(jQuery);
