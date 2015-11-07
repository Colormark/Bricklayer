
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

		/*  返回结构中解析
		datasourceMetaName:{
			"data_object_name":   数据对象名   //default "data"
			"loop_array_name" :   data_array 循环数组名   //BLTableView only
			"loop_array_primary_key_field_name" :  循环数组主键名（每个数据必须唯一）   //BLTableView only
		
		}
		*/

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
